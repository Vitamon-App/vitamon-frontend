import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";

function WelcomeScreen({ navigation, logout }) {
  return (
    <View>
      <Text>Welcome To Vitamon</Text>
      <Button
        title="logout"
        onPress={() => {
          logout();
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch)(WelcomeScreen);
