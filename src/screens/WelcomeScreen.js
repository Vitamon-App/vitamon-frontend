import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";

function WelcomeScreen({ navigation, logout, user }) {
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
       {/* Temporary button to all goals for testing purposes before nav bar exists */}
      <Button
        title="All Goals"
        onPress={() => {
          navigation.navigate("Goals");
        }}
          />

      <Button
        title="See My Friends"
        onPress={() => {
          navigation.navigate("Friends");
        }}
      />
    </View>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};


export default connect(mapState, mapDispatch)(WelcomeScreen);
