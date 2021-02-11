import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

function StepVisualData({ allGoals }) {
  const completedGoalsData = () => {
    let data = [];
    let xValue = 0;
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].status === "complete" && allGoals[i].type === "Steps") {
        const amtOfStepsForEachGoal =
          allGoals[i].completedDays * allGoals[i].quantity;
        xValue++;
        let yValue = amtOfStepsForEachGoal;

        const completionObject = {
          stepGoal: xValue,
          totalNumberOfSteps: yValue,
        };
        data.push(completionObject);
      }
    }
    return data;
  };

  /* const data = [
    { stepGoal: 1, totalNumberOfSteps: 1000},
  ]; */

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryLine
          data={completedGoalsData()}
          x="stepGoal"
          y="totalNumberOfSteps"
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
    backgroundColor: "#faecd9",
  },
});
export default StepVisualData;
