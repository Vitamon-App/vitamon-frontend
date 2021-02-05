import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthForm from "../components/AuthForm";
import { connect } from "react-redux";
import { auth } from "../store/user";

function HomeScreen({ navigation, login, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login");
  const onButtonPress = async () => {
    try {
      await login(email, password, "login");
      navigation.navigate("Welcome");
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
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
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text>SignUp</Text>
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

