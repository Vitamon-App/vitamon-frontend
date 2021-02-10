import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthForm from "../components/AuthForm";
import { connect } from "react-redux";
import { auth } from "../store/user";

function HomeScreen({ navigation, login, user, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login");

  useEffect(() => {
    if (user.id) {
      navigation.navigate("Welcome");
    } else if (error) {
      Alert.alert("Log in attempt failed. Please try again.");
    }
  }, [user, error]);

  const onButtonPress = async () => {
    Keyboard.dismiss();
    try {
      await login(email, password, "login");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Header.png")} style={{ top: 10 }} />
      <Text style={styles.subHeader}>
        The once a day way to achieve your goals.
      </Text>

      {!user.id && (
        <AuthForm
          formType={formType}
          email={email}
          password={password}
          onEmailChange={(newEmail) => setEmail(newEmail)}
          onPasswordChange={(newPassword) => setPassword(newPassword)}
          onPress={() => onButtonPress()}
        />
      )}
      <Image
        style={styles.largeLogo}
        source={require("../../assets/icon2.png")}
      />

      {!user.id && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.buttonText}> Not a User? Sign Up</Text>
        </TouchableOpacity>
      )}

      {user.id && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        >
          <Text style={styles.buttonText}> Back to DashBoard</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mediumLogo: {
    width: 100,
    height: 100,
  },
  largeLogo: {
    width: 300,
    height: 300,
    top: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f114af",
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#f114af",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  bottomText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "red",
    top: 10,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (email, password, formType) => {
      dispatch(auth(email, password, formType));
    },
  };
};

export default connect(mapState, mapDispatch)(HomeScreen);
