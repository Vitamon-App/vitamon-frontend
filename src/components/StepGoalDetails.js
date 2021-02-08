import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ProgressBar, Colors, DataTable } from "react-native-paper";
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { updateGoal } from "../store/goal";

class StepGoalDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      isPedometerAvailable: false,
      steps: 0,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.checkPedometer = this.checkPedometer.bind(this);
    this.getSteps = this.getSteps.bind(this);
  }
  componentDidMount() {
    this.checkPedometer();
    this.getSteps();
  }

  async handleUpdate() {
    const { goal } = this.props;
    await this.props.editGoal(goal, {
      completedDays: (goal.usergoal.completedDays += 1),
    });
  }

  async checkPedometer() {
    const result = await Pedometer.isAvailableAsync();
    this.setState({ isPedometerAvailable: result });
  }
  async getSteps() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    const { steps } = await Pedometer.getStepCountAsync(start, end);
    this.setState({ steps });
    if (this.state.steps >= this.props.goal.usergoal.quantity) {
      this.handleUpdate();
    }
  }

  render() {
    let goalDetails = "";
    let progress = 0;
    const { goal } = this.props || {};
    let dayArray = [];
    if (goal.id) {
      progress = goal.usergoal.completedDays / goal.usergoal.numberOfDays;
      if (!dayArray.length) {
        dayArray = new Array(goal.usergoal.numberOfDays).fill(false);
      }
      dayArray.fill(true, 0, goal.usergoal.completedDays);

      goalDetails = `Walk ${goal.usergoal.quantity} steps a day`;
    }

    const isToday = (someDate) => {
      const today = new Date();
      return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
      );
    };

    console.log("GOAL", new Date(goal.createdAt));
    return (
      <View>
        {goal.id &&
          goal.usergoal.completedDays === goal.usergoal.numberOfDays && (
            <Text>You Completed Your Goal!</Text>
          )}
        {goal.id &&
        goal.usergoal.completedDays !== goal.usergoal.numberOfDays ? (
          <View>
            <Text>Goal Details:</Text>
            <Text>{goalDetails}</Text>
            <Text>Goal Length: {goal.usergoal.numberOfDays} days</Text>
            <Text>Your Steps From The Past 24 Hours: {this.state.steps}</Text>
            <Text>Days Completed: {goal.usergoal.completedDays} days</Text>
            <Text>
              Completion Status:{" "}
              {(
                (goal.usergoal.completedDays / goal.usergoal.numberOfDays) *
                100
              ).toFixed(0)}
              %
            </Text>

            <ProgressBar style={styles.progress} progress={progress} />
            <Text>Vitamon Status: {goal.usergoal.status}</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Day</DataTable.Title>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Goal Completed?</DataTable.Title>
                <DataTable.Title></DataTable.Title>
              </DataTable.Header>
              {dayArray.map((day, i) => {
                const start = new Date(goal.createdAt);
                const date = new Date();
                date.setDate(start.getDate() + i);
                return (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{i + 1}</DataTable.Cell>
                    <DataTable.Cell>{date.toLocaleDateString()}</DataTable.Cell>
                    <DataTable.Cell>{day ? "Yes" : "No"}</DataTable.Cell>
                    <DataTable.Cell></DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
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

const mapDispatch = (dispatch) => {
  return {
    editGoal: (goal, update) => {
      dispatch(updateGoal(goal, update));
    },
  };
};

export default connect(null, mapDispatch)(StepGoalDetails);
