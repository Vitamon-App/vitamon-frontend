import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { fetchGoals } from "../store/goal"

class AllGoalsScreen extends React.Component {
constructor() {
    super()
}
async componentDidMount() {
await this.props.fetchGoal(this.props.user.id)
   
}
    render(){
      const goals = this.props.goals
      console.log("GOOOOOOOOALS", goals)
        const {user} = this.props
        // console.log("PROPS", this.props)
        // console.log("GOALSSS IN RENDER", this.props.fetchGoal)
        // console.log('USERR', user)
        // console.log('USERR ID', user.id)
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
      userId: state.user.id,
      goals: state.goals || []
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      fetchGoal: (userId) => {
        dispatch(fetchGoals(userId));
      },
    };
  };
  
  export default connect(mapState, mapDispatch)(AllGoalsScreen);