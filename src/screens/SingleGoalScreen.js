import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setGoal, updateGoal } from "../store/goal";
import WaterGoalDetails from "../components/WaterGoalDetails";
import StepGoalDetails from "../components/StepGoalDetails";
import { setDays } from "../lib/goalUtils";
import { Pedometer } from "expo-sensors";
import { fetchGoals } from "../store/allTheUsersGoals";

class SingleGoalScreen extends React.Component {
  constructor() {
    super();
    this.state = { days: [], isPedometerAvailable: false };
    this.handleStepsUpdate = this.handleStepsUpdate.bind(this);
    this.checkPedometer = this.checkPedometer.bind(this);
    this.handleSingleUpdate = this.handleSingleUpdate.bind(this);
  }

  async componentDidMount() {
    const goals = this.props.goals;
    // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName.
    const { id } = this.props.route.params;
    const singleGoal = goals.find((goal) => goal.id === id);
    try {
      await this.props.getGoal(singleGoal);
      const { dateArray, updates } = await setDays(singleGoal, singleGoal.type);
      this.setState({ days: dateArray }, () => {
        if (updates > 0) {
          this.handleStepsUpdate(updates);
        }
      });
    } catch (err) {
      console.log(err);
    }

    this.checkPedometer();
  }

  async handleStepsUpdate(num) {
    const { goal } = this.props;
    await this.props.editGoal(goal, {
      completedDays: (goal.completedDays += num),
    });
  }

  async handleSingleUpdate() {
    const { goal } = this.props;
    try {
      await this.props.editGoal(goal, {
        completedDays: (goal.completedDays += 1),
      });
      const updatedDays = this.state.days.map((day, index) => {
        day.status = index < goal.completedDays;
        return day;
      });
      this.setState({ days: updatedDays });
    } catch (err) {
      console.log(err);
    }
  }

  async checkPedometer() {
    const result = await Pedometer.isAvailableAsync();
    this.setState({ isPedometerAvailable: result });
  }

  render() {
    const { goal } = this.props || {};
    return (
      <View>
        {goal.type && goal.type === "Water" && (
          <WaterGoalDetails
            goal={this.props.goal}
            days={this.state.days}
            handleUpdate={this.handleSingleUpdate}
          />
        )}
        {goal.type && goal.type === "Steps" && (
          <StepGoalDetails
            goal={this.props.goal}
            days={this.state.days}
            handleUpdate={this.handleSingleUpdate}
            isPedometerAvailable={this.state.isPedometerAvailable}
           
          />
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
    setUserGoals: (userId) => {
      dispatch(fetchGoals(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleGoalScreen);
