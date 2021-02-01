import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";

export default class StepsScreen extends React.Component {
  state = { isPedometerAvailable: false, steps: 0, currSteps: 0 };
  componentDidMount() {
    this.checkPedometer();
    this.getSteps();
    this.watchSteps();
  }

  async watchSteps() {
    await Pedometer.watchStepCount((result) => {
      this.setState({ currSteps: result.steps });
    });
  }

  async checkPedometer() {
    const result = await Pedometer.isAvailableAsync();
    this.setState({ isPedometerAvailable: result });
  }
  async getSteps() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    const { steps } = await Pedometer.getStepCountAsync(start, end);
    this.setState({ steps });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text>Is pedometer available? {(this.state.isPedometerAvailable).toString()}</Text>
        <Text>Steps taken in the last 24 hours: {this.state.steps}</Text>
        <Text>Live Steps: {this.state.currSteps}</Text>
        <Text>Walk 5 steps to get to the next phase:</Text>
    {this.state.currSteps < 5 ? <Text>Start</Text> : <Text>Next Stage</Text>}
    {this.state.currSteps < 5 ? <View style={{height: 100, width: 100, backgroundColor: 'rgb(0,255,0)'}} /> : <View style={{height: 100, width: 100, backgroundColor: 'rgb(255,0,0)'}}/> }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
