import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  RefreshControlBase,
} from "react-native";
import { SimpleLineIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { connect } from "react-redux";
import WaterVisualData from "../components/WaterVisualData";

function UserStatsScreen({ user }) {
  //console.log("user.goals: ", user.goals);

  const [selected, setSelected] = useState("text");
  const changeSelectedToText = () => {
    setSelected("text");
  };
  const changeSelectedToVisual = () => {
    setSelected("visual");
  };
  const isWater = (theUser) => {
    for (let i = 0; i < theUser.goals.length; i++) {
      if (theUser.goals[i].type === "Water") {
        return i;
      }
    }
    return false;
  };
  const isSteps = (theStepUser) => {
    for (let i = 0; i < theStepUser.goals.length; i++) {
      if (theStepUser.goals[i].type === "Steps") {
        //Need to return string in order to aviod falsey value
        return i.toString();
      }
    }
    return false;
  };
  return (
    <View>
      <Text style={styles.textStyle}>UserStats</Text>
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
                  user.goals[Number(isWater(user))].usergoal.status ===
                  "complete" ? (
                    <Text>
                      Congrats you have compeleted your{" "}
                      {user.goals[isWater(user)].usergoal.numberOfDays} day
                      water goal!!!!!
                    </Text>
                  ) : (
                    <Text>No water goals completed yet </Text>
                  )
                ) : (
                  <Text>You dont have any water goals !!</Text>
                )}
                <Text style={styles.subHead3}>Steps Stats</Text>
                {isSteps(user) ? (
                  user.goals[isSteps(user)].usergoal.status === "complete" ? (
                    <Text>
                      Congrats you have compeleted your{" "}
                      {user.goals[isSteps(user)].usergoal.numberOfDays} day
                      steps goal!!!!!
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
                <Text style={styles.subHead3}>Water Stats</Text>
                {isWater(user) ? (
                  user.goals[Number(isWater(user))].usergoal.status ===
                  "complete" ? (
                    <WaterVisualData
                      userWaterData={
                        user.goals[isWater(user)].usergoal.numberOfDays
                      }
                    />
                  ) : (
                    <Text>No water goals completed yet </Text>
                  )
                ) : (
                  <Text>You dont have any water goals!!</Text>
                )}
              </View>
            )}
          </View>
        </View>
      ) : (
        <View>
          <Text>No Stats Available</Text>
        </View>
      )}
    </View>
  );
}
const mapState = (state) => {
  return {
    user: state.user,
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
});

export default connect(mapState, null)(UserStatsScreen);
