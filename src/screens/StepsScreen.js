import React from "react";
import { StyleSheet, Dimensions, View, Keyboard, Alert } from "react-native";
import { Text, Input, Button } from "galio-framework";
import { Pedometer } from "expo-sensors";
import LottieView from "lottie-react-native";
import theme from "../theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const width = Dimensions.get("window").width;

const initialState = {
  isPedometerAvailable: false,
  currSteps: 0,
  goalSteps: "",
  autoPlay: false,
  speed: 1,
};

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default class StepsScreen extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.watchSteps = this.watchSteps.bind(this);
    this.checkPedometer = this.checkPedometer.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this._unsubscribe = this._unsubscribe.bind(this);
  }

  componentDidMount() {
    this.checkPedometer();
    this.watchSteps();
  }
  componentDidUpdate() {
    if (
      this.state.currSteps > Number(this.state.goalSteps) &&
      Number(this.state.goalSteps) > 0 &&
      !this.state.autoPlay
    ) {
      this.setState({ autoPlay: true, speed: 1 });
      this.animation.play(0, 150);
    }
  }

  async handlePress() {
    await this._unsubscribe();
    this.setState({
      isPedometerAvailable: true,
      currSteps: 0,
      goalSteps: "",
      autoPlay: false,
      speed: 0,
    });
    await this.watchSteps();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async watchSteps() {
    this._subscription = await Pedometer.watchStepCount((result) => {
      this.setState({ currSteps: result.steps });
    });
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  async checkPedometer() {
    const result = await Pedometer.isAvailableAsync();
    this.setState({ isPedometerAvailable: result });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4>Welcome To Quick Goals! {"\n"}</Text>

        {this.state.isPedometerAvailable ? (
          <Text p>You're ready to play</Text>
        ) : (
          Alert.alert(
            "You need to allow access to your pedometer to play this game"
          )
        )}
        <DismissKeyboard>
          <Text p>Set your quick step goal:</Text>

          <Input
            keyboardType="numeric"
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
            autoPlay={this.state.autoPlay}
            speed={this.state.speed}
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: "#eee",
            }}
            source={require("../../assets/40864-the-awkward-monster.json")}
          />
          <Text p>Progress:</Text>
          <Text p> {this.state.currSteps} steps</Text>
        </DismissKeyboard>
        {this.state.autoPlay && (
          <Button
            round
            shadowless={true}
            onPress={this.handlePress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Play Again!</Text>
          </Button>
        )}
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
  touchableContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#7E5EC8",
    paddingVertical: 12,
    borderRadius: 10,
  },
  input: {
    borderColor: theme.COLORS.PRIMARY,
    width: width * 0.4,
    backgroundColor: "#F2F2F2",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
