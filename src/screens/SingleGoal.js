import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ProgressBar, Colors, DataTable } from "react-native-paper";
import { setGoal, updateGoal } from "../store/goal";

class SingleGoal extends React.Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    const goals = this.props.user.goals;
    // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName.
    const { id } = this.props.route.params;
    const singleGoal = goals.find((goal) => goal.id === id);
    await this.props.getGoal(singleGoal);
  }

  async handleUpdate() {
    const { goal } = this.props;
    await this.props.editGoal(goal, {
      completedDays: (goal.usergoal.completedDays += 1),
    });
  }

  render() {
    // customize the goal details based on the type of goal. This will be easy to update if we add additional goal types.
    let goalDetails = "";
    let progress = 0;

    const { goal } = this.props || {};
    let dayArray = [];
    if (goal.id) {
      progress = goal.usergoal.completedDays / goal.usergoal.numberOfDays;
      dayArray = new Array(goal.usergoal.numberOfDays).fill(false);
      dayArray.fill(true, 0, goal.usergoal.completedDays);

      if (goal.type === "Water") {
        goalDetails = `Drink ${goal.usergoal.quantity} glasses of water a day`;
        // if (goal.usergoal.status === "start") {
        //   imgSrc =
        // }
      } else if (goal.type === "Steps") {
        goalDetails = `Walk ${goal.usergoal.quantity} steps a day`;
      }
    }

    return (
      <View>
        {goal.id &&
          goal.usergoal.completedDays === goal.usergoal.numberOfDays && (
            <Text>You Completed Your Goal!</Text>
          )}
        {goal.id &&
        goal.usergoal.completedDays !== goal.usergoal.numberOfDays ? (
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
            <Text>Vitamon Status: {goal.usergoal.status}</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Day</DataTable.Title>
                <DataTable.Title>Goal Completed?</DataTable.Title>
                <DataTable.Title></DataTable.Title>
              </DataTable.Header>
              {dayArray.map((day, i) => {
                return (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{i + 1}</DataTable.Cell>
                    <DataTable.Cell>{day ? "Yes" : "No"}</DataTable.Cell>
                    <DataTable.Cell>
                      {!day && goal.type === "Water" ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.handleUpdate();
                          }}
                          style={styles.button}
                        >
                          <Text style={styles.buttonText}>
                            Complete This Day
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: 400,
  },
  button: {
    marginRight: 10,
    // marginTop: 20,
    width: 120,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 11,
    textAlign: "center",
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
    getGoal: (goal) => {
      dispatch(setGoal(goal));
    },
    editGoal: (goal, update) => {
      dispatch(updateGoal(goal, update));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleGoal);
