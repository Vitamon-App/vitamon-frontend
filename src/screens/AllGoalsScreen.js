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
      const goals = this.props.user.goals
    //map or FlatList
      console.log("GOALSSS", goals)
     
    return (
        <View>
             <FlatList
      keyExtractor={(goal) => {
        return goal.id.toString();
      }}
      data={goals}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>Goals:</Text>
            <Text>status: {item.usergoal.status}</Text>
            <Text>number of days: {item.usergoal.numberOfDays}</Text>
            <Text>completed days: {item.usergoal.completedDays}</Text>
          </View>
        );
      }}
    />
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