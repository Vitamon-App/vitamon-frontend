import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

function SingleGoal({ route, user }) {
  // we can access the user by connecting the component to redux and mapping the user on state to props.
  const goals = user.goals;
  // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName. We will eventually do this from the AllGoals screen but right now it's happening on the Welcome screen.
  const { id } = route.params;
  // we want only the goal with the matching id that we passed down from All Goals.
  const singleGoal = goals.find((goal) => goal.usergoal.goalId === id);
  // customize the goal details based on the type of goal. This will be easy to update if we add additional goal types.
  let goalDetails = "";
  if (singleGoal.type === "Water") {
    goalDetails = `Drink ${singleGoal.usergoal.quantity} glasses of water a day`;
  } else if (singleGoal.type === "Steps") {
    goalDetails = `Walk ${singleGoal.usergoal.quantity} steps a day`;
  }

  return (
    <View>
      <Text>Goal Details:</Text>
      <Text>{goalDetails}</Text>
      <Text>Goal Length: {singleGoal.usergoal.numberOfDays} days</Text>
      <Text>Days Completed: {singleGoal.usergoal.completedDays} days</Text>
      <Text>
        Completion Status:{" "}
        {(
          (singleGoal.usergoal.completedDays /
            singleGoal.usergoal.numberOfDays) *
          100
        ).toFixed(0)}
        %
      </Text>
    </View>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapState)(SingleGoal);
