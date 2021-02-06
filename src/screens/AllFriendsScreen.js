import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { connect } from "react-redux";
import { fetchFriends } from "../store/user";

class AllFriendsScreen extends React.Component {
  render() {
    console.log("HERE ARE THE FRIENDS", this.props.user.friends);
    
    const friends = this.props.user.friends || [];
    return (
      <View>
        {friends.length ? (
          <View>
            <Text>Friend List:</Text>
            <FlatList
              keyExtractor={(friend) => {
                return friend.id.toString();
              }}
              data={friends}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                );
              }}
            />
               <Button
        title="Add a New Friend!"
        onPress={() => {
          this.props.navigation.navigate("AddFriend");
        }}
      />
          </View>
        ) : (
          <View>
            <Text>Go to the find friends page!</Text>
            <Button
        title="Click here to add a friend!"
        onPress={() => {
          this.props.navigation.navigate("AddFriend");
        }}
      />
          </View>
        )}
      </View>
    );
  }
}
const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFriends: (user) => {
      dispatch(fetchFriends(user));
    },
  };
};

export default connect(mapState, mapDispatch)(AllFriendsScreen);
