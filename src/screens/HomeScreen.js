import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Keyboard,
  Alert,
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
      <Text>Welcome To Vitamon!</Text>

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

      <Button
        title="Go To Steps Screen"
        onPress={() => {
          navigation.navigate("Steps");
        }}
      >
        <Text>Go to steps</Text>
      </Button>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
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
