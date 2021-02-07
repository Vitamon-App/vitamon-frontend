import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { setFriends } from "../store/friends";

function WelcomeScreen({ navigation, logout, user, getFriends, friends }) {
  useEffect(() => {
    getFriends(user.friends);
  }, [friends]);

  return (
    <View>
      <Text>Welcome To Vitamon</Text>
      <Button
        title="Settings"
        onPress={() => {
          // logout();
          navigation.navigate("Settings");
        }}
      />

      <Button
        title="See My Friends"
        onPress={() => {
          navigation.navigate("Friends");
        }}
      />
<<<<<<< HEAD
=======

      <Button
        title="Goal Details"
        onPress={() => {
          navigation.navigate("SingleGoal", { id: 2 });
        }}
      />

      <Button
        title="User Stats"
        onPress={() => {
          navigation.navigate("UserStats");
        }}
      />
>>>>>>> main
    </View>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    friends: state.friends,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
    getFriends: (friends) => {
      dispatch(setFriends(friends));
    },
  };
};

export default connect(mapState, mapDispatch)(WelcomeScreen);
