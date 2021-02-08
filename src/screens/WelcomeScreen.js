import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";
import { setFriends } from "../store/friends";
// import { TouchableOpacity } from "react-native-gesture-handler";

function WelcomeScreen({ navigation, logout, user, getFriends, friends }) {
  useEffect(() => {
    getFriends(user.friends);
  }, [friends]);

  return (
    <View>
      {/* <Image style={styles.mediumLogo} source ={require('/Users/vmt/vitamon/assets/icon2.png')} /> */}
      <Image source={require('../../assets/Welcome.png')} />
   
      
      <Text style={styles.subHeader}>Navigate Below</Text>
      <Image source={require('../../assets/blob.png')}/>
      <Text> or go to your user settings or profile:</Text>
      <View style={{flexDirection: "row"}}>
         {/* <Button
        title="Settings"
        onPress={() => {
          // logout();
          navigation.navigate("Settings");
        }}
      /> */}
       <TouchableOpacity
       style={styles.buttonOne}
      //  style={{alignSelf: "flex-start"}}
        onPress={() => {
          // logout();
          navigation.navigate("Settings");
        }}> 
      <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

      {/* <Button
        title="See My Friends"
        onPress={() => {
          navigation.navigate("Friends");
        }}
      />

      <Button
        title="Goal Details"
        onPress={() => {
          navigation.navigate("SingleGoal", { id: 2 });
        }}
      /> */}

      {/* <Button
        title="User Stats"
        onPress={() => {
          navigation.navigate("UserStats");
        }}
      /> */}
      
        
   
       <TouchableOpacity
       style={styles.buttonTwo}
        onPress={() => {
          // logout();
          navigation.navigate("UserStats");
        }}> 
    <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Cochin",
    color: "red",
  },
  mediumLogo: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  buttonOne: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-start"
  },
  buttonTwo: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-end"
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  }
})

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
