import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { setGoal, updateGoal } from "../store/goal";
import WaterGoalDetails from "../components/WaterGoalDetails";
import StepGoalDetails from "../components/StepGoalDetails";

class SingleGoalScreen extends React.Component {
  constructor() {
    super();

    this.state = { days: [] };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setDays = this.setDays.bind(this);
  }

  async componentDidMount() {
    const goals = this.props.user.goals;
    // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName.
    const { id } = this.props.route.params;
    const singleGoal = goals.find((goal) => goal.id === id);
    await this.props.getGoal(singleGoal);
    this.setDays();
  }

  setDays() {
    const { goal } = this.props;
    if (goal.id) {
      const start = new Date(goal.usergoal.createdAt);
      const date = new Date();
      date.setDate(start.getDate() + i);
      this.setState({
        days: new Array(goal.usergoal.numberOfDays).fill({
          date: date.setDate(start.getDate() + 1),
          status: false,
        }),
      });
    }
  }

  async handleUpdate() {
    const { goal } = this.props;
    await this.props.editGoal(goal, {
      completedDays: (goal.usergoal.completedDays += 1),
    });
  }

  render() {
    const { goal } = this.props || {};
    console.log(this.state.days);

    return (
      <View>
        {goal.id && goal.type === "Water" ? (
          <WaterGoalDetails goal={this.props.goal} />
        ) : (
          <View></View>
        )}
        {goal.id && goal.type === "Steps" ? (
          <StepGoalDetails goal={this.props.goal} />
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
