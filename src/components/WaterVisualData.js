import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

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
      <Text>{`You have dranked ${totalSum()} bottles of water so far `}</Text>
      <VictoryChart
        width={350}
        minDomain={{ y: 0 }}
        theme={VictoryTheme.material}
      >
        <VictoryLine
          data={completedGoalsData()}
          x="waterGoal"
          y="totalNumberOfWaterBottles"
        />
      </VictoryChart>

      <Text>Water Goals Compeleted</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dff6f9",
    height: 400,
  },
});
export default WaterVisualData;
