import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import Monster from '../components/Monster'
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { fetchGoals } from "../store/goal";


class AllGoalsScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    const goals = this.props.user.goals;
    console.log(goals)
    const { navigation } = this.props;
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
        <FlatList
          keyExtractor={(goal) => {
            return goal.id.toString();
          }}
          data={goals}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>Goals:</Text>
                <Monster monsterStatus={item.usergoal.status} monsterType={item.type} />
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
  };
};

export default connect(mapState)(AllGoalsScreen);
