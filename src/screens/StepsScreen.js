import React from "react";
import { StyleSheet, Dimensions, View, Keyboard, Alert } from "react-native";

import { Text, Input, Card, Block, Icon, Button } from "galio-framework";
import { Pedometer } from "expo-sensors";
import LottieView from "lottie-react-native";
import theme from "../theme";
const width = Dimensions.get("window").width;

export default class StepsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isPedometerAvailable: false,
      currSteps: 0,
      goalSteps: "",
      animate: false,
    };

    this.watchSteps = this.watchSteps.bind(this);
    this.checkPedometer = this.checkPedometer.bind(this);
  }

  componentDidMount() {
    this.checkPedometer();
    this.watchSteps();
    this.play.animation(0, 0);
  }
  componentDidUpdate() {
    if (
      this.state.currSteps >= Number(this.state.goalSteps) &&
      Number(this.state.goalSteps) > 0 &&
      !this.state.animate
    ) {
      this.setState({ animate: true });
      this.animation.play(0, 160);
    }
  }

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
          <Text p>You're ready to play!</Text>
        ) : (
          Alert.alert(
            "You need to allow access to your pedometer to play this game"
          )
        )}

        <Text p>Set your quick step goal:</Text>
        <Input
          style={styles.input}
          autoCapitalize="none"
          placeholder="enter step goal"
          autoCorrect={false}
          value={this.state.goalSteps}
          onChangeText={(newValue) => this.setState({ goalSteps: newValue })}
          onEndEditing={() => {
            Keyboard.dismiss();
          }}
        />
        {Number(this.state.goalSteps) > 1 && (
          <Text p>
            Walk {this.state.goalSteps} steps to get the Vitamon to dance!
          </Text>
        )}
        <LottieView
          autoPlay={false}
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
        <Text h5>Progress:</Text>
        <Text p> {this.state.currSteps} steps</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F4F6",
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
  input: {
    borderColor: theme.COLORS.PRIMARY,
    width: width * 0.4,
    backgroundColor: "#F2F2F2",
  },
});
