import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Dimensions, Keyboard } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from "../components/SearchBar";
import { connect } from "react-redux";
import { findFriend } from "../store/friend";
import { addFriendThunk, fetchFriends } from "../store/friends";

import {
  Text, Card, Block, NavBar, Icon, Button
} from 'galio-framework';
import theme from '../theme';

const width = Dimensions.get("window").width;

function AddFriendScreen({
  searchFriend,
  user,
  foundFriend,
  friends,
  addFriend,
  navigation,
}) {
  const [searchEmail, setSearchEmail] = useState("");
  // const [foundFriend, setFoundFriend] = useState("");
 


  //searchEmail is on state, set on change when the user types input
  //searchEmail is then passed to the reducer as input on submit
  const onSubmit = async () => {
    Keyboard.dismiss();
    try {
      await searchFriend(searchEmail);
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonPress = async () => {
    try {
      const friendId = foundFriend.id;
      await addFriend(user.id, friendId);
    
      navigation.navigate("Home");
      // setFoundFriend("")
      return Alert.alert("Friend Added!");
      
      //  navigation.navigate("Friends")
      //  await setFriends(user.id)
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=> {

  // }, )

  return (
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
     <Text size={theme.SIZES.FONT * 2} bold>Search for a friend by email!</Text>
     <Block flex space="around">
      <SearchBar
        term={searchEmail}
        // search bar component expects a prop called term
        onTermChange={(newSearchEmail) => setSearchEmail(newSearchEmail)}
        onTermSubmit={onSubmit}
      />
      
      {foundFriend.name ? (
        <Text h3>We found {foundFriend.name} with that email</Text>
      ) : (
        <Text> </Text>
      )}

      {foundFriend.email &&
      !friends.map((friend) => friend.email).includes(foundFriend.email) ? (
        <View>
           <Text h3> Add {foundFriend.name} as a friend!</Text>
          <Card
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                titleColor={theme.COLORS.WHITE}
                style={styles.card}
                title={foundFriend.name}
                caption={foundFriend.email}
                location={'goals'}
                // avatar={`https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`}
                image={`${foundFriend.imageUrl}`}
                imageStyle={styles.rounded}
                imageBlockStyle={[
                // { padding: theme.SIZES.BASE / 2 },
               styles.noRadius,
                ]}
                footerStyle={ styles.full }
              >
              <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} />
              </Card>
          <Button 
          style={styles.button}
          round
           title="add friend" onPress={() => onButtonPress()} />
        </View>
      ) : (
        <>
          {foundFriend.name && foundFriend.name !== "nobody" ? (
            <Text>{foundFriend.name} is already your friend! Search For someone else to add!</Text>
          ) : (
            <Text></Text>
          )}
        </>
      )}

      {/* <Text>you entered: {searchEmail}</Text> */}
      </Block>
   </Block>
  );
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    foundFriend: state.foundFriend,
    friends: state.friends,
  };
};

const mapDispatch = (dispatch) => {
  return {
    searchFriend: (email) => {
      dispatch(findFriend(email));
    },
    addFriend: (userId, friendId) => {
      dispatch(addFriendThunk(userId, friendId));
    },
    setFriends: (userId) => {
      dispatch(fetchFriends(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(AddFriendScreen);
