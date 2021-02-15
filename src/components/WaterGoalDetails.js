import React from "react";
import {
  StyleSheet,
  // Text,
  StatusBar,
  // Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import GifMonster from "./GifMonster";
import Constants from "expo-constants";

const { statusBarHeight } = Constants;
// galio components
import {
  Block,
  Card,
  Text,
  Icon,
  NavBar,
  Image,
  Button,
} from "galio-framework";
import theme from "../theme";
import Monster from "../components/Monster";
import { connect } from "react-redux";
import { DataTable } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { setGoal, updateGoal } from "../store/goal";
import { Entypo } from "@expo/vector-icons";
// import DataTable from './DataTableForm'

import { isFuture } from "date-fns";

const { width, height } = Dimensions.get("screen");

class WaterGoalDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { goal } = this.props || {};
    let progress = ((goal.completedDays / goal.numberOfDays) * 100).toFixed(0);
    let goalDetails = `drink ${goal.quantity} bottles of water a day`;

    return (
      <Block>
        <ScrollView>
          <GifMonster monsterStatus={goal.status} monsterType={goal.type} />
          <Block center>
            <Block flex style={styles.header}>
              <Block>
                <Block>
                  {goal.type && (
                    <View>
                      {goal.status === "start" && (
                        <Text style={styles.headline}>
                          {" "}
                          What will your little egg hatch into? Keep feeding
                          your Vitamon by completing your goals to find out!
                        </Text>
                      )}
                      {goal.status === "middle" && (
                        <Text style={styles.instructions}>
                          {" "}
                          Your Vitamon is growing from being fed by your healthy
                          habits!{" "}
                        </Text>
                      )}
                      {goal.status === "warning" && (
                        <Text style={styles.instructions}>
                          {" "}
                          Seems like you've missed a day or two, get back on
                          track to get your Vitamon healthy again.{" "}
                        </Text>
                      )}
                      {goal.status === "fail" && (
                        <Text style={styles.instructions}>
                          {" "}
                          Unfortunetly, you've missed too many days. Your
                          Vitamon can not recover.{" "}
                        </Text>
                      )}
                      {goal.status === "complete" && (
                        <Text style={styles.instructions}>
                          {" "}
                          Congratulations! You completed your goal! Your Vitamon
                          is full grown!{" "}
                        </Text>
                      )}
                      <Text style={styles.text}>
                        You said you'd {goalDetails} for {goal.numberOfDays}{" "}
                        days
                      </Text>

                      <Text>
                        So far, you've completed {goal.completedDays} out of{" "}
                        {goal.numberOfDays} days!
                      </Text>
                      <Text
                        p
                        color={theme.COLORS.MUTED}
                        size={theme.SIZES.FONT * 0.875}
                        style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                      >
                        Completion Status:
                      </Text>
                      <Block>
                        <Block flex left>
                          <AnimatedCircularProgress
                            size={200}
                            width={15}
                            fill={Number(progress)}
                            tintColor="#7E5EC8"
                            backgroundColor="#2C148B"
                          >
                            {(fill) => <Text>{progress}%</Text>}
                          </AnimatedCircularProgress>
                        </Block>
                        <Block flex right>
                          <Text style={styles.headline}>
                            Check off Completed Days Below
                          </Text>
                        </Block>

                      </Block>

                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Day</DataTable.Title>
                          <DataTable.Title>Date</DataTable.Title>
                          <DataTable.Title>Completed?</DataTable.Title>
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
                                  <Entypo
                                    name="check"
                                    size={24}
                                    color={theme.COLORS.PRIMARY}
                                  />
                                )}
                              </DataTable.Cell>
                              <DataTable.Cell>
                                {!day.status && !isFuture(day.date) && (
                                  <TouchableOpacity
                                  style={styles.button}
                                    onPress={() => {
                                      this.props.handleUpdate();
                                    }}
                                  >
                                    <Text style={styles.buttonText}>
                                      Complete
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </DataTable.Cell>
                            </DataTable.Row>
                          );
                        })}
                      </DataTable>
                    </View>
                  )}
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: 350,
  },
  button: {
    marginRight: 10,
    width: 120,
    backgroundColor: theme.COLORS.PRIMARY,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "#5539AA",
    fontSize: 11,
    textAlign: "center",
  },
  headlineContainer: {
    paddingTop: "18%",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme.COLORS.WHITE,
  },
  headline: {
    marginTop: 10,
    color: theme.COLORS.OCEANBLUE,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "600",
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
    color: theme.COLORS.BLUEVIOLET,
    fontWeight: "500",
  },
  text: {
    alignSelf: "center",
    // margin: 5,
    fontSize: 0.035 * width,
    textAlign: "center",
    padding: 5,
    color: theme.COLORS.BLUEVIOLET,
    fontWeight: "500",
  },
  input: {
    height: 55,
    borderRadius: 5,
    // overflow: "hidden",
    backgroundColor: theme.COLORS.WHITE,
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
    backgroundColor: theme.COLORS.PRIMARY,
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

// const mapState = (state) => {
//   return {
//     user: state.user,
//     goal: state.goal,
//     goals: state.goals,
//   };
// };

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

export default connect(null, mapDispatch)(WaterGoalDetails);
