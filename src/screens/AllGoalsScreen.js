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
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { fetchGoals } from "../store/goal";

class AllGoalsScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    const goals = this.props.user.goals;
    const { navigation } = this.props;
    const sentUser = this.props.user.id;
    console.log("In all goals :", this.props.user.id);
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

const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AllGoalsScreen);
