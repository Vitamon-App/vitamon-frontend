import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SimpleLineIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import WaterVisualData from "../components/WaterVisualData";
import StepVisualData from "../components/StepVisualData";

import { fetchGoals } from "../store/allTheUsersGoals";
function UserStatsScreen({ user, goals, setUserGoals }) {
  //console.log("user.goals: ", user.goals);

  useEffect(() => {
    setUserGoals(user.id);
  }, [goals]);

  const [selected, setSelected] = useState("text");
  const changeSelectedToText = () => {
    setSelected("text");
  };
  const changeSelectedToVisual = () => {
    setSelected("visual");
  };
  const isWater = () => {
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Water") {
        //Need to return string in order to aviod falsey value
        return i.toString();
      }
    }
    return false;
  };

  const completedWater = () => {
    let sum = 0;
    for (let i = 0; i < goals.length; i++) {
      if (
        goals[i].type === "Water" &&
        goals[i].status === "complete"
      ) {
        let total =
          goals[i].quantity * goals[i].completedDays;
        sum += total;
      }
    }
    return sum;
  };
  const isSteps = () => {
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Steps") {
        //Need to return string in order to aviod falsey value
        return i.toString();
      }
    }
    return false;
  };

  const completedSteps = () => {
    let sum = 0;
    for (let i = 0; i < goals.length; i++) {
      if (
        goals[i].type === "Steps" &&
        goals[i].status === "complete"
      ) {
        let total =
          goals[i].quantity * goals[i].completedDays;
        sum += total;
      }
    }
    return sum;
  };
  return (
    <ScrollView>
      {/* <Text style={styles.textStyle}>UserStats</Text> */}
      <Image
        source={require("../../assets/profile2.png")}
        // source={{
        //   uri:
        //     '../public/images/anonymous-avatar-sm.jpg',
        // }}
        style={{ alignSelf: "center" }}
      />
      {user.goals.length ? (
        <View>
          <View>
            <Text style={styles.subHead1}>Current Stats</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => changeSelectedToText()}>
                <Text style={styles.buttonText}>Text</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => changeSelectedToVisual()}>
                <Text style={styles.buttonText}>Visual</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {selected === "text" ? (
              <View>
                <Text style={styles.subHead2}>Text stuff</Text>
                {}
                <Text style={styles.subHead3}>Water Stats</Text>
                <SimpleLineIcons name="drop" size={15} color={"blue"} />
                {isWater(user) ? (
                  user.goals[Number(isWater(user))].status === "complete" ? (
                    <Text>
                      By completing your water goal you have dranked{" "}
                      {completedWater()} bottles of water !!!!!
                    </Text>
                  ) : (
                    <Text>No water goals completed yet </Text>
                  )
                ) : (
                  <Text>You dont have any water goals !!</Text>
                )}
                <Text style={styles.subHead3}>Steps Stats</Text>
                {isSteps(user) ? (
                  user.goals[Number(isSteps(user))].status === "complete" ? (
                    <Text>
                      By completing your step goals you have walked{" "}
                      {completedSteps()} steps!!!!!
                    </Text>
                  ) : (
                    <Text>No step goals completed yet </Text>
                  )
                ) : (
                  <Text>You dont have any step goals !!</Text>
                )}
              </View>
            ) : (
              <View>
                <Text style={styles.subHead2}>Visual stuff</Text>
                <View style={styles.chartContainer1}>
                  <Text style={styles.subHead3}>Water Stats</Text>
                  {isWater(user) ? (
                    user.goals[Number(isWater(user))].status === "complete" ? (
                      <WaterVisualData
                        userWaterData={
                          user.goals[Number(isWater(user))].numberOfDays
                        }
                      />
                    ) : (
                      <Text>No water goals completed yet </Text>
                    )
                  ) : (
                    <Text>You dont have any water goals!!</Text>
                  )}
                </View>
                <View style={styles.chartContainer2}>
                  <Text style={styles.subHead3}>Steps Stats</Text>
                  {isSteps(user) ? (
                    user.goals[Number(isSteps(user))].status === "complete" ? (
                      <StepVisualData
                        userStepData={
                          user.goals[Number(isSteps(user))].numberOfDays
                        }
                      />
                    ) : (
                      <Text>No step goals completed yet </Text>
                    )
                  ) : (
                    <Text>You dont have any step goals!!</Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View>
          <Text>No Stats Available</Text>
        </View>
      )}
    </ScrollView>
  );
}
const mapState = (state) => {
  return {
    user: state.user,
    goals: state.goals,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setUserGoals: (userId) => {
      dispatch(fetchGoals(userId));
    },
  };
};
const styles = StyleSheet.create({
  textStyle: {
    color: "#f5f5f5",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    // width: 200,
    backgroundColor: "#9c9aff",
  },
  subHead1: {
    fontSize: 22,
    color: "#B46CF7",
  },
  subHead2: {
    fontSize: 22,
    color: "#7a77d9",
    marginTop: 19,
  },
  subHead3: {
    fontSize: 18,
    color: "#7a77d9",
    marginTop: 19,
  },
  buttonContainer: {
    height: 40,
    width: 90,
    marginTop: 19,
    marginHorizontal: 10,
    backgroundColor: "#97A5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  chartContainer1: {
    marginTop: 10,
  },
  chartContainer2: {
    marginTop: 10,
  },
});

export default connect(mapState, mapDispatch)(UserStatsScreen);
