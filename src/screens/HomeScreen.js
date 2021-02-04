import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthForm from "../components/AuthForm";
import {connect} from 'react-redux'
import {auth} from '../store/user'

function HomeScreen({ navigation, login, user}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login") 
  const onButtonPress = () => {
    login(email, password, formType)
    console.log("user", user)
  }

  return (
    <View style={styles.container}>
      <Text>Welcome To Vitamon!</Text>
      <AuthForm
        formType={formType}
        email={email}
        password={password}
        onEmailChange={(newEmail) => setEmail(newEmail)}
        onPasswordChange={(newPassword) => setPassword(newPassword)}
        onPress = {() => onButtonPress()}
      />

      <Button
        title="Go To Steps Screen"
        onPress={() => {
          navigation.navigate("Steps");
        }}
      />
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
  return{
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (email, password, formType) => {dispatch(auth(email, password, formType))}
  };
};

export default connect(mapState, mapDispatch)(HomeScreen)