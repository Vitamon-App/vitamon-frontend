import React from "react";
import {   
  StyleSheet,
StatusBar,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Monster from "../components/Monster";
import GifMonster from './GifMonster'
import { connect } from "react-redux";
import { DataTable } from "react-native-paper";
import { updateGoal } from "../store/goal";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Entypo } from "@expo/vector-icons";
import { isFuture } from "date-fns";
const { statusBarHeight } = Constants;
import Constants from 'expo-constants';
// galio components
import {
  Block, Card, Text, Icon, NavBar, Image, Button
} from 'galio-framework';

import theme from '../theme.js'
const { width, height } = Dimensions.get('screen');

class StepGoalDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { goal } = this.props || {};
    let progress = ((goal.completedDays / goal.numberOfDays) * 100).toFixed(0);
    let goalDetails = `Walk ${goal.quantity} steps a day`;

    return (

      <Block>
           <ScrollView>

           <GifMonster monsterStatus={goal.status} monsterType={goal.type}/>
           <Block center >
           <Block flex style={styles.header}>

      <View>
        {goal.type && (
          <View>
              {/* <Text>Goal Details:</Text>
            <Monster monsterType={goal.type} monsterStatus={goal.status} /> */}
                        {(goal.status === 'start') && 
              <Text style={styles.headline}> What will your little egg hatch into? Keep feeding your Vitamon by completing your goals to find out!</Text> }
                       {(goal.status === 'middle') && 
              <Text style={styles.instructions}> Your Vitamon is growing from being fed by your healthy habits! </Text> }
                                 {(goal.status === 'warning') && 
              <Text style={styles.instructions}> Seems like you've missed a day or two, get back on track to get your Vitamon healthy again. </Text> }
                                           {(goal.status === 'fail') && 
              <Text style={styles.instructions}> Unfortunately, you've missed too many days. Your Vitamon can not recover. </Text> }
                                                      {(goal.status === 'complete') && 
              <Text style={styles.instructions}> Congratulations! You completed your goal! Your Vitamon is full grown! </Text> }
              <Text style={styles.text}>You said you'd {goalDetails} for {goal.numberOfDays} days</Text>
            {/* <Text>{goalDetails}</Text>
            <Text>Goal Length: {goal.numberOfDays} days</Text> */}
            {/* <Text>Your Steps From The Past 24 Hours: {this.state.steps}</Text> */}
            {/* <Text>Days Completed: {goal.completedDays} days</Text> */}
            <Text >
                So far, you've completed {goal.completedDays} out of {goal.numberOfDays} days!
              </Text>
            <Text
                      p
                      color={theme.COLORS.MUTED}
                      size={theme.SIZES.FONT * 0.875}
                      style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                    >Completion Status:</Text>
            <AnimatedCircularProgress
              size={200}
              width={15}
              fill={Number(progress)}
              backgroundColor="#7E5EC8"
              tintColor="#2C148B"
              // childrenContainerStyle={{backgroundColor: 'black'}}
            >
              {(fill) => <Text>{progress}%</Text>}
            </AnimatedCircularProgress>

            {/* <Text>Vitamon Status: {goal.status}</Text> */}
            <Text style={styles.headline}>Check out Completed Days Below</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Day</DataTable.Title>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Completed?</DataTable.Title>
                <DataTable.Title style={{flex: "center"}}>Steps</DataTable.Title>

                <DataTable.Title></DataTable.Title>
              </DataTable.Header>
              {this.props.days.map((day, i) => {
                return (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{i + 1}</DataTable.Cell>
                    <DataTable.Cell>
                      {day.date.toLocaleDateString()}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {day.status && (
                        <Entypo name="check" size={24} color={theme.COLORS.PRIMARY} />
                      )}
                      {!this.props.isPedometerAvailable &&
                        !day.status &&
                        !isFuture(day.date) && (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.handleUpdate();
                            }}
                            style={styles.button}
                          >
                            <Text style={styles.buttonText}>Complete</Text>
                          </TouchableOpacity>
                        )}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {day.steps > 0 && <Text>{day.steps}</Text>}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
        )}
      </View>
      </Block>
      </Block>
      </ScrollView>
      </Block>
   
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
    width: 120,
    backgroundColor: theme.COLORS.OCEANBLUE,
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
    paddingTop: "18%",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme.COLORS.WHITE,
  },
  headline: {
    marginTop: 10,
    color: theme.COLORS.OCEANBLUE,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "600",
  },
  subheading: {
    fontWeight: "700",
    fontSize: 20,
    padding: 15,
    color: "#424347",
  },

  name: {
    fontSize: 0.045 * width,
    fontWeight: "700",
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#424347",
  },
  email: {
    fontSize: 20,
    padding: 10,
    color: "#424347",
  },
  instructions: {
    alignSelf: "center",
    margin: 15,
    maxWidth: "90%",
    fontSize: 0.045 * width,
    textAlign: "center",
    padding: 10,
    color: theme.COLORS.BLUEVIOLET,
    fontWeight: "500",

  },
  text : {
    alignSelf: "center",
    // margin: 5,
    fontSize: 0.035 * width,
    textAlign: "center",
    padding: 5,
    color: theme.COLORS.BLUEVIOLET,
    fontWeight: "500",
  },
  input: {
    height: 55,
    borderRadius: 5,
    // overflow: "hidden",
    backgroundColor: theme.COLORS.WHITE,
    fontSize: 20,
    marginHorizontal: 15,
    paddingLeft: 10,
  },
  sendButton: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Avenir",
  },
  buttonContainer: {
    width: "40%",
    alignSelf: "center",
    marginHorizontal: 15,
    marginTop: "4%",
    backgroundColor: "#9FC78A",
    paddingVertical: 12,
    borderRadius: 10,
  },
  
  buttonTwo: {
    marginLeft: 10,
    marginTop: 20,
    alignSelf: "flex-end",
    backgroundColor: "#f114af",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },

  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

const mapDispatch = (dispatch) => {
  return {
    editGoal: (goal, update) => {
      dispatch(updateGoal(goal, update));
    },
  };
};

export default connect(null, mapDispatch)(StepGoalDetails);
