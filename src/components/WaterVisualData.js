import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

function WaterVisualData({ allGoals }) {
  console.log("&&&ALLGOALS: ", allGoals);

  const completedGoalsData = () => {
    let data = [];
    let xValue = 0;
    for (let i = 0; i < allGoals.length; i++) {
      let currElement = allGoals[i];
      if (allGoals[i].status === "complete" && allGoals[i].type === "Water") {
        const amtOfBottlesForEachGoal =
          allGoals[i].completedDays * allGoals[i].quantity;
        xValue++;
        let yValue = amtOfBottlesForEachGoal;

        const completionObject = {
          waterGoal: xValue,
          totalNumberOfWaterBottles: yValue,
        };
        data.push(completionObject);
      }
    }
    return data;
  };
  /* const data = [
    { waterGoal: 1, totalNumberOfWaterBottles: 5 },
  ]; */

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryLine
          data={completedGoalsData()}
          x="waterGoal"
          y="totalNumberOfWaterBottles"
          style={{
            data: {
              fill: "#7ed9bf",
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dff6f9",
  },
});
export default WaterVisualData;
