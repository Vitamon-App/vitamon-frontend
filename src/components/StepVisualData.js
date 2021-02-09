import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

function StepVisualData({ userStepData }) {
  const data = [
    { GoalCompleted: 1, LengthOfGoals: userStepData },
    { GoalCompleted: 2, LengthOfGoals: 2 },
    { GoalCompleted: 3, LengthOfGoals: 9 },
    { GoalCompleted: 4, LengthOfGoals: 3 },
  ];

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar
          data={data}
          x="GoalCompleted"
          y="LengthOfGoals"
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
