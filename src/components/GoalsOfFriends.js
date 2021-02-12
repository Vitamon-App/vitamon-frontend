import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { fetchFriends } from "../store/friends";

class GoalsOfFriends extends React.Component {
 

  render() {
    const { goals } = this.props;
    console.log(goals)
    return (
      <FlatList
        data={goals}
        style={styles.title}
        renderItem={({ item }) => {
         
              return(
               
               item? <Text style={styles.goal}>{item.type}, {item.quantity} , {item.status}</Text>:
               <Text> This friend doesn't have goals</Text>)



        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  goal: {
    
    fontSize: 20,
    padding: 10,
    color: "#424347",
    alignSelf: "flex-start",
    textAlignVertical: "center",
  },
 
});

const mapState = (state) => {
  return {
    user: state.user,
    friends: state.friends,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFriend: (userId) => {
      dispatch(fetchFriend(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(GoalsOfFriends);
