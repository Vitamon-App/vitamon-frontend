import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

function WaterVisualData({ userWaterData }) {
  const data = [
    { GoalCompleted: 1, LengthOfGoals: userWaterData },
    { GoalCompleted: 2, LengthOfGoals: 5 },
    { GoalCompleted: 3, LengthOfGoals: 14 },
    { GoalCompleted: 4, LengthOfGoals: 2 },
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
    backgroundColor: "#7ed9bf",
  },
});
export default WaterVisualData;
