import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ProgressBar, Colors, DataTable } from "react-native-paper";
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { updateGoal } from "../store/goal";

class StepGoalDetails extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   isPedometerAvailable: false,
    //   steps: [],
    // };
    // this.handleUpdate = this.handleUpdate.bind(this);
    // this.checkPedometer = this.checkPedometer.bind(this);
    // this.getSteps = this.getSteps.bind(this);
  }
  // componentDidMount() {
  //   this.checkPedometer();
  //   this.getSteps();
  // }

  // async handleUpdate() {
  //   const { goal } = this.props;
  //   await this.props.editGoal(goal, {
  //     completedDays: (goal.usergoal.completedDays += 1),
  //   });
  // }

  // async checkPedometer() {
  //   const result = await Pedometer.isAvailableAsync();
  //   this.setState({ isPedometerAvailable: result });
  // }
  // async getSteps() {
  //   const end = new Date();
  //   const start = new Date();
  //   const { steps } = await Pedometer.getStepCountAsync(start, end);
  //   this.setState({ steps });
  // }

  render() {
    let goalDetails = "";
    let progress = 0;
    const { goal } = this.props || {};
    if (goal.id) {
      progress = goal.usergoal.completedDays / goal.usergoal.numberOfDays;
      goalDetails = `Walk ${goal.usergoal.quantity} steps a day`;
    }

    return (
      <View>
        {goal.type ? (
          <View>
            <Text>Goal Details:</Text>
            <Text>{goalDetails}</Text>
            <Text>Goal Length: {goal.usergoal.numberOfDays} days</Text>
            {/* <Text>Your Steps From The Past 24 Hours: {this.state.steps}</Text> */}
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
                <DataTable.Title>Completed?</DataTable.Title>
                <DataTable.Title>Steps</DataTable.Title>
                <DataTable.Title></DataTable.Title>
              </DataTable.Header>
              {this.props.days.map((day, i) => {
                return (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{i + 1}</DataTable.Cell>
                    <DataTable.Cell>
                      {day.date.toLocaleDateString()}
                    </DataTable.Cell>
                    <DataTable.Cell>{day.status ? "Yes" : "No"}</DataTable.Cell>
                    <DataTable.Cell>{day.steps}</DataTable.Cell>
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
