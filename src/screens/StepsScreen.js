import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Pedometer } from "expo-sensors";

export default class StepsScreen extends React.Component {
  state = { isPedometerAvailable: false, steps: 0, currSteps: 0 , goalSteps: '1'};
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
     
        <Text>Input your step goal:</Text>
            <TextInput 
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.goalSteps}
            onChangeText={(newValue)=> this.setState({goalSteps: newValue})}
            />
               <Text>Walk {this.state.goalSteps} steps to get to the next phase:</Text>
    {this.state.currSteps < Number(this.state.goalSteps) && this.state.goalSteps ? <Text>Start</Text> : <Text>GOAL COMPLETED!!</Text>}
    {this.state.currSteps < Number(this.state.goalSteps) && this.state.goalSteps ? <View style={{height: 100, width: 100, backgroundColor: 'rgb(255,0,255)'}} /> : <View style={{height: 100, width: 100, backgroundColor: 'rgb(0,255,0)'}}/> }
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
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1
}
});
