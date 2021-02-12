import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { updateGoal } from "../store/goal";
import Monster from "../components/Monster";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Entypo } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import isToday from "date-fns/isToday";

class StepGoalDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { goal } = this.props || {};
    let progress = ((goal.completedDays / goal.numberOfDays) * 100).toFixed(0);
    let goalDetails = `Walk ${goal.quantity} steps a day`;

    return (
      <View>
        {goal.type ? (
          <View>
            <Monster monsterType={goal.type} monsterStatus={goal.status} />
            <Text>Goal Details:</Text>
            <Text>{goalDetails}</Text>
            <Text>Goal Length: {goal.numberOfDays} days</Text>
            {/* <Text>Your Steps From The Past 24 Hours: {this.state.steps}</Text> */}
            <Text>Days Completed: {goal.completedDays} days</Text>
            <Text>Completion Status:</Text>
            <AnimatedCircularProgress
              size={200}
              width={15}
              fill={progress}
              backgroundColor="#7E5EC8"
              tintColor="#2C148B"
            >
              {(fill) => <Text>{progress}%</Text>}
            </AnimatedCircularProgress>

            <Text>Vitamon Status: {goal.status}</Text>
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
                    <DataTable.Cell>
                      {day.status && (
                        <Entypo name="check" size={24} color="black" />
                      )}
                      {!this.props.isPedometerAvailable &&
                        !day.status &&
                        isToday(day.date) && (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.handleUpdate();
                            }}
                            style={styles.button}
                          >
                            <Text style={styles.buttonText}>Complete</Text>
                          </TouchableOpacity>
                        )}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {day.steps > 0 && <Text>{day.steps}</Text>}
                    </DataTable.Cell>
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
