import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { connect } from "react-redux";
import { signup } from "../store/user";

function SignUp({ navigation, signupUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("email: ", email);
  console.log("password: ", password);
  const onSignUpButtonPress = async () => {
    try {
      let newUser = {
        email: email,
        password: password,
      };
      await signupUser(newUser);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <SignUpForm
        email={email}
        password={password}
        onEmailChange={(newEmail) => setEmail(newEmail)}
        onPasswordChange={(newPassword) => setPassword(newPassword)}
        onPress={() => onSignUpButtonPress()}
      />
    </View>
  );
}
const mapDispatch = (dispatch) => {
  return {
    signupUser: (newUser) => {
      dispatch(signup(newUser));
    },
  };
};

export default connect(null, mapDispatch)(SignUp);
