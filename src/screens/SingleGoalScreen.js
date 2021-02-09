import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setGoal, updateGoal } from "../store/goal";
import WaterGoalDetails from "../components/WaterGoalDetails";
import StepGoalDetails from "../components/StepGoalDetails";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import add from "date-fns/add";
import { Pedometer } from "expo-sensors";
import sub from "date-fns/sub";

class SingleGoalScreen extends React.Component {
  constructor() {
    super();
    this.state = { days: [], isPedometerAvailable: false };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setDays = this.setDays.bind(this);
    this.checkPedometer = this.checkPedometer.bind(this);
    // this.getSteps = this.getSteps.bind(this);
  }

  async componentDidMount() {
    const goals = this.props.goals;
    // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName.
    const { id } = this.props.route.params;
    const singleGoal = goals.find((goal) => goal.usergoal.id === id);
    await this.props.getGoal(singleGoal);
    this.setDays();
    this.checkPedometer();
  }

  async setDays() {
    const { goal } = this.props;
    const goalDays = goal.usergoal.numberOfDays;
    const start = new Date(goal.usergoal.createdAt);
    const end = add(start, { days: goalDays - 1 });
    const dates = eachDayOfInterval({
      start,
      end,
    });
    const result = dates.map((date) => {
      return { date: date, status: false, steps: 0 };
    });

    const { completedDays } = goal.usergoal;
    for (let i = 0; i < completedDays; i++) {
      result[i].status = true;
    }

    for (let i = 0; i < result.length; i++) {
      let startDate = new Date(result[i].date);
      let endDate = new Date(result[i].date);
      startDate.setDate(endDate.getDate() - 1);
      try {
        const { steps } = await Pedometer.getStepCountAsync(startDate, endDate);
        result[i - 1].steps = steps;
        if (steps > goal.usergoal.quantity && !result[i].status) {
          result[i].status = true;
          this.handleUpdate();
        }
      } catch (err) {
        console.log(err);
      }
    }

    this.setState({ days: result });
  }

  async handleUpdate() {
    const { goal } = this.props;
    await this.props.editGoal(goal, {
      completedDays: (goal.usergoal.completedDays += 1),
    });
    await this.setDays();
  }

  async checkPedometer() {
    const result = await Pedometer.isAvailableAsync();
    this.setState({ isPedometerAvailable: result });
  }

  render() {
    console.log("DAYS ON STATE", this.state.days);

    const { goal } = this.props || {};
    console.log("THE CURRENT GOAL", goal);
    return (
      <View>
        {goal.type && goal.type === "Water" ? (
          <WaterGoalDetails
            goal={this.props.goal}
            days={this.state.days}
            handleUpdate={this.handleUpdate}
          />
        ) : (
          <View></View>
        )}
        {goal.type && goal.type === "Steps" ? (
          <StepGoalDetails goal={this.props.goal} days={this.state.days} />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: 400,
  },
  button: {
    marginRight: 10,
    width: 120,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 11,
    textAlign: "center",
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    goal: state.goal,
    goals: state.goals,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getGoal: (goal) => {
      dispatch(setGoal(goal));
    },
    editGoal: (goal, update) => {
      dispatch(updateGoal(goal, update));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleGoalScreen);
