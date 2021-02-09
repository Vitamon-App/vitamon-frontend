import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import Monster from "../components/Monster";
import { Pedometer } from "expo-sensors";
import { connect } from "react-redux";
import { fetchGoals } from "../store/allTheUsersGoals";
const width = Dimensions.get('window').width;

class AllGoalsScreen extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    console.log("USERS IN COMPONENT", this.props.user)
   await this.props.setUserGoals(this.props.user.id);
  }

  render() {
    const goals = this.props.goals;
    const { navigation } = this.props;
    console.log("goals in ALL GOALS:", goals);
    return (
<ScrollView>
      <View style={styles.headlineContainer}>
         {!goals.length ? <View>
       <Text style={styles.headline}>You haven't added any goals yet!</Text>
       <Button title="Click Here to Adopt a Vitamon"
      //  onPress={() => {
      //   navigation.navigate("AddGoal");
      // }}
      ></Button>
       </View> : null}


        {goals.length ? (
          <View>
          <Text style={styles.headline}>Goals:</Text>
          <FlatList
            keyExtractor={(goal) => {
              return goal.usergoal.id.toString();
            }}
            data={goals}
            renderItem={({ item }) => {
              return (
                <View>

                  <Text style={styles.subheading}>Goals:</Text>
                  <Monster monsterType={item.type} monsterStatus={item.usergoal.status} />
                  <Text style={styles.subheading}>status: {item.usergoal.status}</Text>
                  <Text style={styles.subheading}>number of days: {item.usergoal.numberOfDays}</Text>
                  <Text style={styles.subheading}>completed days: {item.usergoal.completedDays}</Text>
                  <Text style={styles.subheading}>type: {item.type} </Text>
                  {/* <Button
                    title="Details"
                    onPress={() => {
                      console.log("ITEM", item);
                      navigation.navigate("SingleGoal", {
                        id: item.usergoal.id,
                      });
                    }}
                  /> */}
      <TouchableOpacity style={styles.buttonTwo}
      onPress={() => {
        navigation.navigate("SingleGoal", {
          id: item.usergoal.id,
        });
      }}>
      <Text style={styles.buttonText}> Go to Details</Text>
    </TouchableOpacity>

                </View>
              );
            }}
          />
          </View>
        ) : (
         null
        )}

        <TouchableOpacity
        style={styles.button}
          onPress={() => {
            navigation.navigate("AddGoal");
          }}
        >
          <Text style={styles.buttonText}>Add A New Goal</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
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
	outerContainer: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#FFF',
		marginHorizontal: '5%',
		marginVertical: '2%',
		maxWidth: '95%',
		justifyContent: 'space-between'
	},
	leftRequestContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		borderRadius: 5,
		marginVertical: '2%',
		marginLeft: 15,
		backgroundColor: '#FFF'
	},
	rightRequestContainer: {
		display: 'flex',
		alignSelf: 'center',
		borderRadius: 5
	},
	photo: {
		height: 60,
		width: 60,
		borderRadius: 30,
		marginRight: '7%',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	icon: {
		color: '#9FC78A',
		paddingLeft: '2%',
		marginRight: '2%'
	},
	iconNo: {
		color: 'black',
		paddingLeft: '2%',
		marginRight: '2%'
	},
	iconContainer: {
		flexDirection: 'row'
	},
	requestBottom: {
		display: 'flex',
		flexDirection: 'row'
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
    paddingVertical: 10,
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
      dispatch(fetchGoals(goals));
    },
  };
};

export default connect(mapState, mapDispatch)(AllGoalsScreen);
