import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
import { Text } from "galio-framework";
const width = Dimensions.get("window").width;
function WaterVisualData({ allGoals }) {
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

  return (
    <View style={styles.container}>
      <Text
        style={styles.subHead}
      >{`You have drank ${totalSum()} bottles of water so far `}</Text>
      <VictoryChart
        width={350}
        minDomain={{ y: 0 }}
        fill='"#F5F4F6"'
        style={{
          fill: "#F5F4F6",
        }}
      >
        <VictoryAxis
          fixLabelOverlap
          style={{
            tickLabels: { padding: 16, fontSize: 14, fill: "#F5F4F6" },
            axis: { stroke: "white", strokeWidth: 1 },
            ticks: {
              size: completedGoalsData().length,
              stroke: "white",
              strokeWidth: 2,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              padding: 16,
              fontSize: 14,
              fill: "#F5F4F6",
            },
            axis: { stroke: "white", strokeWidth: 1 },
          }}
        />
        <VictoryLine
          data={completedGoalsData()}
          x="waterGoal"
          y="totalNumberOfWaterBottles"
          style={{
            data: { stroke: "#F5F4F6" },
          }}
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
