import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  //Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, Card, Block, Icon, Button } from "galio-framework";
import theme from "../theme";
import { SimpleLineIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import WaterVisualData from "../components/WaterVisualData";
import StepVisualData from "../components/StepVisualData";

import { fetchGoals } from "../store/allTheUsersGoals";
import LottieView from "lottie-react-native";
import animationData from "../../assets/38463-error.json";

const width = Dimensions.get("window").width;
function UserStatsScreen({ user, goals, setUserGoals }) {
  console.log("user.goals: ", goals);

  useEffect(() => {
    setUserGoals(user.id);
  }, []);

  const [selected, setSelected] = useState("text");
  const changeSelectedToText = () => {
    setSelected("text");
  };
  const changeSelectedToVisual = () => {
    setSelected("visual");
  };

  // checks if user has any water goals
  const isWater = () => {
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Water") {
        //Need to return string in order to aviod falsey value

        return i.toString();
      }
    }

    return false;
  };

  const isLengthOfWaterGoalsMoreThenOne = () => {
    let lengthOfCompleted = 0;
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Water" && goals[i].status === "complete") {
        lengthOfCompleted++;
      }
    }
    if (lengthOfCompleted === 1) {
      return false;
    } else {
      return true;
    }
  };

  const completedWater = () => {
    let sum = 0;
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Water" && goals[i].status === "complete") {
        let total = goals[i].quantity * goals[i].completedDays;
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

  const isLengthOfStepsGoalsMoreThenOne = () => {
    let lengthOfCompleted = 0;
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Steps" && goals[i].status === "complete") {
        lengthOfCompleted++;
      }
    }
    if (lengthOfCompleted === 1) {
      return false;
    } else {
      return true;
    }
  };
  const completedSteps = () => {
    let sum = 0;
    for (let i = 0; i < goals.length; i++) {
      if (goals[i].type === "Steps" && goals[i].status === "complete") {
        let total = goals[i].quantity * goals[i].completedDays;
        sum += total;
      }
    }
    return sum;
  };

  return (
    // <Block>
    <ScrollView>
      {/* <Text style={styles.textStyle}>UserStats</Text> */}
      {/* <Image
        source={require("../../assets/profile2.png")}
        // source={{
        //   uri:
        //     '../public/images/anonymous-avatar-sm.jpg',
        // }}
        style={{ alignSelf: "center" }}
      /> */}
      {goals.length ? (
        <Block>
          <View style={styles.header}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 400 / 2 }}
              source={{ uri: user.imageUrl }}
              //resizeMode={"cover"}
            />
            <Text style={styles.subHead1}> {user.name}'s Profile</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
              <Button
                small
                round
                size="small"
                style={styles.button}
                color="#2C148B"
                onPress={() => changeSelectedToText()}
              >
                <Text style={styles.buttonText}>Text</Text>
              </Button>
            </View>
            <Text> {"     "}</Text>
            <View style={styles.buttonContainer}>
              <Button
                small
                round
                size="small"
                style={styles.button}
                color="#2C148B"
                onPress={() => changeSelectedToVisual()}
              >
                <Text style={styles.buttonText}>Visual</Text>
              </Button>
            </View>
          </View>
          <View>
            {selected === "text" ? (
              <View>
                <Card
                  style={styles.cards}
                  shadowColor={theme.COLORS.BLACK}
                  style={styles.card}
                  flex
                  borderless
                >
                  <Text style={styles.subHead3}>Water Stats</Text>
                  {/*  <SimpleLineIcons name="drop" size={15} color={"blue"} /> */}
                  {isWater() ? (
                    completedWater() ? (
                      <View>
                        <View style={styles.lottieImage}>
                          <LottieView
                            autoPlay
                            loop
                            style={{
                              width: 100,
                              height: 100,
                              backgroundColor: "#eee",
                              alignItems: "center",
                              shadowColor: "#F5F4F6",
                            }}
                            source={require("../../assets/lf30_editor_twphuvjm.json")}
                          />
                          <Text style={styles.textStyle}>
                            By completing your water goal you have dranked{" "}
                            {completedWater()} bottles of water !
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <Text>No water goals completed yet </Text>
                    )
                  ) : (
                    <Text>You dont have any water goals !!</Text>
                  )}
                </Card>
                <Card borderless>
                  <Text style={styles.subHead3}>Step Stats</Text>
                  {isSteps() ? (
                    completedSteps() ? (
                      <View style={styles.lottieImage}>
                        <LottieView
                          autoPlay
                          loop
                          style={{
                            width: 200,
                            height: 200,
                            backgroundColor: "#eee",
                            alignItems: "center",
                            shadowColor: "#F5F4F6",
                          }}
                          source={require("../../assets/lf20_foxtV6.json")}
                        />
                        <Text style={styles.textStyle}>
                          By completing your step goals you have walked{" "}
                          {completedSteps()} steps!
                        </Text>
                      </View>
                    ) : (
                      <Text>No step goals completed yet </Text>
                    )
                  ) : (
                    <Text>You dont have any step goals !</Text>
                  )}
                </Card>
              </View>
            ) : (
              <View>
                <View style={styles.chartContainer1}>
                  <Text style={styles.subHead3}>Water Stats</Text>
                  {isWater() ? (
                    completedWater() ? (
                      isLengthOfWaterGoalsMoreThenOne() ? (
                        <WaterVisualData allGoals={goals} />
                      ) : (
                        <Text> You only completed one water goal so far.</Text>
                      )
                    ) : (
                      <Text>No water goals completed yet </Text>
                    )
                  ) : (
                    <Text>You dont have any water goals!</Text>
                  )}
                </View>
                <View style={styles.chartContainer2}>
                  <Text style={styles.subHead3}>Steps Stats</Text>
                  {isSteps() ? (
                    completedSteps() ? (
                      isLengthOfStepsGoalsMoreThenOne() ? (
                        <StepVisualData allGoals={goals} />
                      ) : (
                        <Text>You only completed one step goal so far.</Text>
                      )
                    ) : (
                      <Text>No step goals completed yet </Text>
                    )
                  ) : (
                    <Text>You dont have any step goals!</Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </Block>
      ) : (
        <View>
          <View>
            <View style={styles.header}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 400 / 2 }}
                source={{ uri: user.imageUrl }}
                //resizeMode={"cover"}
              />

              <Text style={styles.subHead1}>{user.name}'s Profile</Text>
            </View>
            <Text style={styles.subHeadNoProflie}>
              Sorry No Stats Available
            </Text>
          </View>
          <View style={styles.lottieImage}>
            <LottieView
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#eee",
                alignItems: "center",
              }}
              source={require("../../assets/38463-error.json")}
            />
          </View>
          <Text style={styles.subHeadNoProflie}>
            Stats Will Be Available Once
          </Text>
          <Text style={styles.subHeadNoProflie}>You Have Complete A Goal</Text>
        </View>
      )}
    </ScrollView>
    // </Block>
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
  cards: {
    width,
    backgroundColor: "#2C148B",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textStyle: {
    color: "#f5f5f5",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    // width: 200,
    backgroundColor: "#5539AA",
  },
  subHead1: {
    fontSize: 38,
    textAlign: "center",
    color: "#2C148B",
    fontWeight: "bold",
  },
  subHead2: {
    fontSize: 22,
    color: "#7a77d9",
    marginTop: 19,
  },
  subHead3: {
    fontSize: 28,
    textAlign: "center",
    color: "#2C148B",
    fontWeight: "bold",
    // marginTop: 5,
  },
  subHeadNoProflie: {
    fontSize: 18,
    marginTop: 19,
    textAlign: "center",
    color: "#2C148B",
    fontWeight: "bold",
    // marginTop: 5,
  },
  buttonContainer: {
    height: 40,
    width: 90,
    marginTop: 19,
    marginHorizontal: 10,
    backgroundColor: "#5539AA",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonWrapper: {
    marginTop: 19,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer1: {
    marginTop: 10,
  },
  chartContainer2: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  lottieImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //padding: 15,
    //backgroundColor: "#F5F4F6",
    shadowColor: "#F5F4F6",
    shadowOpacity: 0.0,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default connect(mapState, mapDispatch)(UserStatsScreen);
