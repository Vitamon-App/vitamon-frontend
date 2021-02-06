import React from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { fetchGoals } from "../store/goal"

class AllGoalsScreen extends React.Component {
constructor() {
    super()
}

    render(){
      const goals = this.props.user.goals.usergoal
      console.log("GOALSSS", goals)
    console.log(this.props)
    return (
        <View>
            <Text>All Goals</Text>
        </View>
    )
    }
}

const mapState = (state) => {
    return {
      user: state.user,
    };
  };
  
 
  
  export default connect(mapState)(AllGoalsScreen);