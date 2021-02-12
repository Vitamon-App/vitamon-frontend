import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { Pedometer } from "expo-sensors";
import LottieView from "lottie-react-native";

export default class StepsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isPedometerAvailable: true,
      currSteps: 0,
      goalSteps: "1",
      animation: 0,
    };

    this.watchSteps = this.watchSteps.bind(this);
    this.checkPedometer = this.checkPedometer.bind(this);
  }

  componentDidMount() {
    this.checkPedometer();
    this.watchSteps();
    this.animation.play(0, 0);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  async watchSteps() {
    this._subscription = await Pedometer.watchStepCount((result) => {
      this.setState({ currSteps: result.steps });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  async checkPedometer() {
    const result = await Pedometer.isAvailableAsync();
    this.setState({ isPedometerAvailable: result });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isPedometerAvailable ? (
          <Text>You're ready to play!</Text>
        ) : (
          Alert.alert(
            "You need to allow access to your pedometer to play this game"
          )
        )}

        <Text>Input your quick step goal:</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.goalSteps}
          onChangeText={(newValue) => this.setState({ goalSteps: newValue })}
          onEndEditing={() => {
            Keyboard.dismiss();
          }}
        />
        {Number(this.state.goalSteps) > 1 && (
          <Text>
            Walk {this.state.goalSteps} steps to get the Vitamon to dance!
          </Text>
        )}
        <Text>Progress: {this.state.currSteps}</Text>
        {this.state.currSteps < Number(this.state.goalSteps) &&
        this.state.goalSteps
          ? null
          : this.resetAnimation()}
        <LottieView
          isStopped={this.state.isStopped}
          ref={(animation) => {
            this.animation = animation;
          }}
          loop={true}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#eee",
          }}
          source={require("../../assets/40864-the-awkward-monster.json")}
        />
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
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
