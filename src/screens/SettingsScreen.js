import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";

function SettingsScreen({ navigation, logout }) {
  //We must logout in settings inorder to aviod user is undefined  error
  return (
    <View>
      <Text style={styles.textStyle}>Settings</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            logout();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  textStyle: {
    color: "#f5f5f5",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    // width: 200,
    backgroundColor: "#9c9aff",
  },
  subHead1: {
    fontSize: 22,
    color: "#B46CF7",
  },
  subHead2: {
    fontSize: 22,
    color: "#7a77d9",
    marginTop: 19,
  },
  subHead3: {
    fontSize: 18,
    color: "#7a77d9",
    marginTop: 19,
  },
  buttonContainer: {
    height: 40,
    width: 90,
    marginTop: 19,
    marginHorizontal: 10,
    backgroundColor: "#97A5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

export default connect(mapState, mapDispatch)(SettingsScreen);
