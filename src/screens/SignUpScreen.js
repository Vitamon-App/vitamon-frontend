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
      navigation.navigate("Welcome");
    } catch (error) {
      console.log(error);
    }
  };

  const backToLogin = () => {
    navigation.navigate("Home")
  }

  return (
    <View>
      <Text style={styles.buttonText}>Sign Up</Text>
      <SignUpForm
        email={email}
        password={password}
        onEmailChange={(newEmail) => setEmail(newEmail)}
        onPasswordChange={(newPassword) => setPassword(newPassword)}
        onPress={() => onSignUpButtonPress()}
        backToLogin ={()=> backToLogin()}
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

const styles = StyleSheet.create({
  buttonText: {
    color: "#333333",
    fontSize: 18,
  },
});

export default connect(null, mapDispatch)(SignUp);
