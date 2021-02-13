import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { Text, Card, Block, Icon, Button } from "galio-framework";
const width = Dimensions.get("window").width;
function WaterVisualData({ allGoals }) {
  //console.log("&&&ALLGOALS: ", allGoals);

  const completedGoalsData = () => {
    let data = [];
    let xValue = 0;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].status === "complete" && allGoals[i].type === "Water") {
        const amtOfBottlesForEachGoal =
          allGoals[i].completedDays * allGoals[i].quantity;
        xValue++;
        let yValue = amtOfBottlesForEachGoal;

        const completionObject = {
          waterGoal: `goal ${xValue}`,
          totalNumberOfWaterBottles: yValue,
        };
        data.push(completionObject);
      }
    }
    return data;
  };
  const totalSum = () => {
    let totalBottles = 0;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].status === "complete" && allGoals[i].type === "Water") {
        const amtOfBottlesForEachGoal =
          allGoals[i].completedDays * allGoals[i].quantity;
        totalBottles += amtOfBottlesForEachGoal;
      }
    }
    return totalBottles;
  };
  /* const data = [
    { waterGoal: 1, totalNumberOfWaterBottles: 5 },
  ]; */

  return (
    <View style={styles.container}>
      <Text
        style={styles.subHead}
      >{`You have dranked ${totalSum()} bottles of water so far `}</Text>
      <VictoryChart
        width={350}
        minDomain={{ y: 0 }}
        color='"#F5F4F6"'
        /*  style={{ data: { stroke: "#F5F4F6", strokeWidth: 15, strokeLinecap: "round" }  */
        //theme={VictoryTheme.material}
      >
        <VictoryLine
          data={completedGoalsData()}
          x="waterGoal"
          y="totalNumberOfWaterBottles"
        />
      </VictoryChart>

      <Text style={styles.textStyle}>Water Goals Compeleted</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7E5EC8",
    height: 400,
  },
  subHead: {
    color: "#F5F4F6",
    fontWeight: "bold",
    fontSize: 15,
  },
  textStyle: {
    color: "#F5F4F6",
  },
  cards: {
    width,
    backgroundColor: "#2C148B",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
export default WaterVisualData;
