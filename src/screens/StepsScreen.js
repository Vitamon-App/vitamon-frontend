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
        <Text>Today's Steps {this.state.steps}</Text>
        <Text>Updated Steps: {this.state.currSteps}</Text>
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
