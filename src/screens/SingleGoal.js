import React from "react";

import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import Monster from '../components/Monster'
import { connect } from "react-redux";
import { ProgressBar, Colors, DataTable } from "react-native-paper";
import { setGoal, updateGoal } from "../store/goal";
const width = Dimensions.get('window').width;


class SingleGoal extends React.Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    const goals = this.props.goals;
    // you can pass down custom params on props using react navigation, which we access as props.route.params.paramName
    const { id } = this.props.route.params;
    const singleGoal = goals.find((goal) => goal.usergoal.id === id);
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
    if (goal.type) {
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
    console.log("GOAL IN SINGLE", goal);

    return (
<ScrollView style={styles.headlineContainer}>
     <View >
        {/* {goal.type &&

          goal.usergoal.completedDays === goal.usergoal.numberOfDays && (
            <Text style={styles.headline}>You Completed Your Goal!</Text>
          )} */}
        {goal.type 
        ? (
          <View>

            <Text style={styles.headline}>Goal Details:</Text>
            <Monster monsterType={goal.type} monsterStatus={goal.usergoal.status} />
            <Text style={styles.subheading}>{goalDetails}</Text>
            <Text style={styles.subheading}>Goal Length: {goal.usergoal.numberOfDays} days</Text>
            <Text style={styles.subheading}>Days Completed: {goal.usergoal.completedDays} days</Text>
            <Text style={styles.subheading}>
              Completion Status:{" "}
              {(
                (goal.usergoal.completedDays / goal.usergoal.numberOfDays) *
                100
              ).toFixed(0)}
              %
            </Text>

            <ProgressBar style={styles.progress} progress={progress} />
            <Text style={styles.subheading}>Vitamon Status: {goal.usergoal.status}</Text>
            <DataTable>
              <DataTable.Header >
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
                      {!day ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.handleUpdate();
                          }}
                          style={styles.button}
                        >
                          <Text style={styles.buttonText}>
                            Complete
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    margin: 10,
    width: 350,
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
    headlineContainer: {
      paddingTop: '18%',
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#8c55fa'
    },
    headline: {
      marginTop: 10,
      color: 'white',
      fontSize: 26,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: '500'
    },
    subheading: {
      fontWeight: '700',
      fontSize: 20,
      padding: 15,
      color: '#424347'
    },
    
    name: {
      fontSize: 0.045 * width,
      fontWeight: '700',
      alignSelf: 'center',
      textAlignVertical: 'center',
      color: '#424347'
    },
    email: {
      fontSize: 20,
      padding: 10,
      color: '#424347'
    },
    instructions: {
      alignSelf: 'center',
      margin: 15,
      maxWidth: '90%',
      fontSize: 0.045 * width,
      textAlign: 'center',
      padding: 10,
      color: '#424347'
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      fontSize: 20,
      marginHorizontal: 15,
      paddingLeft: 10
    },
    sendButton: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Avenir'
    },
    buttonContainer: {
      width: '40%',
      alignSelf: 'center',
      marginHorizontal: 15,
      marginTop: '4%',
      backgroundColor: '#9FC78A',
      paddingVertical: 12,
      borderRadius: 10
    },
    button: {
      marginLeft: 10,
      marginTop: 20,
      backgroundColor: "#f114af",
      // paddingVertical: 10,
      borderRadius: 10,
      bottom: 20
    }, 
    buttonTwo: {
      marginLeft: 10,
      marginTop: 20,
      alignSelf: "flex-end",
      backgroundColor: "#f114af",
      paddingVertical: 10,
      borderRadius: 10,
      bottom: 20
    },
  
    buttonText: {
      fontWeight: "600",
      color: "white",
      fontSize: 18,
      textAlign: "center",
    }
  });

const mapState = (state) => {
  return {
    user: state.user,
    goal: state.goal,
    goals: state.goals,
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
