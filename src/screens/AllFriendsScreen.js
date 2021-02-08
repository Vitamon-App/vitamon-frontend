import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { connect } from "react-redux";

class AllFriendsScreen extends React.Component {
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

export default connect(mapState)(AllFriendsScreen);
