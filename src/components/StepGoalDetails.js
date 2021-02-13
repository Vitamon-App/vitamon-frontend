import React from "react";
import {   
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Monster from "../components/Monster";
import { connect } from "react-redux";
import { DataTable } from "react-native-paper";
import { updateGoal } from "../store/goal";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Entypo } from "@expo/vector-icons";
import { isFuture } from "date-fns";

const width = Dimensions.get("window").width;

class StepGoalDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { goal } = this.props || {};
    let progress = ((goal.completedDays / goal.numberOfDays) * 100).toFixed(0);
    let goalDetails = `Walk ${goal.quantity} steps a day`;

    return (
      <ScrollView style={styles.headlineContainer} >
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
                        !isFuture(day.date) && (
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
      </ScrollView>
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
  headlineContainer: {
    paddingTop: "18%",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#8c55fa",
  },
  headline: {
    marginTop: 10,
    color: "white",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  subheading: {
    fontWeight: "700",
    fontSize: 20,
    padding: 15,
    color: "#424347",
  },

  name: {
    fontSize: 0.045 * width,
    fontWeight: "700",
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#424347",
  },
  email: {
    fontSize: 20,
    padding: 10,
    color: "#424347",
  },
  instructions: {
    alignSelf: "center",
    margin: 15,
    maxWidth: "90%",
    fontSize: 0.045 * width,
    textAlign: "center",
    padding: 10,
    color: "#424347",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    fontSize: 20,
    marginHorizontal: 15,
    paddingLeft: 10,
  },
  sendButton: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  buttonContainer: {
    width: "40%",
    alignSelf: "center",
    marginHorizontal: 15,
    marginTop: "4%",
    backgroundColor: "#9FC78A",
    paddingVertical: 12,
    borderRadius: 10,
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#f114af",
    // paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },
  buttonTwo: {
    marginLeft: 10,
    marginTop: 20,
    alignSelf: "flex-end",
    backgroundColor: "#f114af",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },

  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
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
