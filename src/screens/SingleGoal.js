import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { ProgressBar, Colors } from "react-native-paper";
import { setGoal } from "../store/goal";

function SingleGoal({ route, user, goal, setGoal }) {
  const goals = user.goals;
  useEffect(() => {
    // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName.
    const { id } = route.params;
    // we want only the goal with the matching id that we passed down from All Goals.
    const singleGoal = goals.find((goal) => goal.usergoal.id === id);
    setGoal(singleGoal);
  }, [goal]);

  // customize the goal details based on the type of goal. This will be easy to update if we add additional goal types.
  let goalDetails = "";
  if (goal.type === "Water") {
    goalDetails = `Drink ${goal.usergoal.quantity} glasses of water a day`;
  } else if (goal.type === "Steps") {
    goalDetails = `Walk ${goal.usergoal.quantity} steps a day`;
  }
  const progress = goal.usergoal.completedDays / goal.usergoal.numberOfDays;

  return (
    <View>
      <Text>Goal Details:</Text>
      <Text>{goalDetails}</Text>
      <Text>Goal Length: {goal.usergoal.numberOfDays} days</Text>
      <Text>Days Completed: {goal.usergoal.completedDays} days</Text>
      <Text>
        Completion Status:{" "}
        {(
          (goal.usergoal.completedDays / goal.usergoal.numberOfDays) *
          100
        ).toFixed(0)}
        %
      </Text>
      <ProgressBar style={styles.progress} progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: 400,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    goal: state.goal,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setGoal: (goal) => {
      dispatch(setGoal(goal));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleGoal);
