import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import Monster from '../components/Monster'
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { fetchGoals } from "../store/goal";
import { setGoals } from "../store/allTheUsersGoals";


class AllGoalsScreen extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.setUserGoals(this.props.user.goals);
  }

  render() {
    const goals = this.props.goals;
    const { navigation } = this.props;
    console.log("goals:", goals);
    return (
      <View>
         {!goals.length ? <View>
       <Text>You haven't added any goals yet!</Text>
       <Button title="Click Here to Adopt a Vitamon"
      //  onPress={() => {
      //   navigation.navigate("AddGoal");
      // }}
      ></Button>
       </View> : <View></View>}
       
        {goals.length ? (
          <FlatList
            keyExtractor={(goal) => {
              return goal.usergoal.id.toString();
            }}
            data={goals}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>Goals:</Text>
                  <Text>status: {item.usergoal.status}</Text>
                  <Text>number of days: {item.usergoal.numberOfDays}</Text>
                  <Text>completed days: {item.usergoal.completedDays}</Text>
                  <Text>type: {item.type} </Text>
                  <Button
                    title="Details"
                    onPress={() => {
                      navigation.navigate("SingleGoal", {
                        id: item.id,
                      });
                    }}
                  />
                </View>
              );
            }}
          />
        ) : (
          <View> </View>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddGoal");
          }}
        >
          <Text>Add A New Goal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mediumLogo: {
    width: 100,
    height: 100,
  }
})


const mapState = (state) => {
  return {
    user: state.user,
    goals: state.goals,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setUserGoals: (goals) => {
      dispatch(setGoals(goals));
    },
  };
};

export default connect(mapState, mapDispatch)(AllGoalsScreen);
