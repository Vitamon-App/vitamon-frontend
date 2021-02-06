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
      <Button
        title="See My Friends"
        onPress={() => {
          navigation.navigate("Friends");
        }}
      />

      <Button
        title="Goal Details"
        onPress={() => {
          navigation.navigate("SingleGoal", { id: 1 });
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
