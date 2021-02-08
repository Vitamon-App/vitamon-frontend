import React from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import { Asset } from "expo-asset";
import { connect } from "react-redux";
import { setFriends } from "../store/friends";

class AllFriendsScreen extends React.Component {
  componentDidMount() {
    this.props.getFriends(this.props.user.friends);
  }

  render() {
    const friends = this.props.friends || [];
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
                    {/* <Image source={resource(`${item.imageUrl}`)} /> */}
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
    friends: state.friends,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFriends: (friends) => {
      dispatch(setFriends(friends));
    },
  };
};

export default connect(mapState, mapDispatch)(AllFriendsScreen);
