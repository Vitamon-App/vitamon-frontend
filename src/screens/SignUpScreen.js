import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import SignUpForm from "../components/SignUpForm";
import { signup } from "../store/user";

function SignUp(navigation) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignUpButtonPress = async () => {
    let newUser = {
      email: email,
      password: password,
    };
    try {
      await signup(newUser);
      navigation.navigate("Welcome");
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
        onPress={() => oonSignUpButtonPress()}
      />
    </View>
  );
}
const mapDispatch = (dispatch) => {
  return {
    signup: (newUser) => {
      dispatch(signup(newUser));
    },
  };
};

export default connect(null, mapDispatch)(SignUp);
