import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Block, Button, Card, Icon, Input, NavBar } from 'galio-framework';
import { connect } from "react-redux";

function WelcomeScreen({ navigation}) {
  return (
    <View>
      <Image source={require("../../assets/Welcome.png")} />
      <Text style={styles.subHeader}>Navigate Below</Text>
     
      {/* <Image source={require("../../assets/waterbaby.gif")} /> */}
      <Text> or go to your user settings or profile:</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.buttonOne}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTwo}
          onPress={() => {
            navigation.navigate("UserStats");
          }}
        >
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
    
    color: "red",
  },
  mediumLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  buttonOne: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonTwo: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    //friends: state.friends,
  };
};



export default connect(mapState)(WelcomeScreen);
