import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Keyboard,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../components/SearchBar";
import { connect } from "react-redux";
import { findFriend, clearFriend } from "../store/friend";
import { addFriendThunk, fetchFriends } from "../store/friends";

import { Text, Card, Block, NavBar, Icon, Button } from "galio-framework";
import theme from "../theme";

const width = Dimensions.get("window").width;

function AddFriendScreen({
  searchFriend,
  user,
  foundFriend,
  friends,
  addFriend,
  navigation,
  clearFoundFriend,
}) {
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    if (foundFriend.name) {
      clearFoundFriend();
    }
  }, []);

  //searchEmail is on state, set on change when the user types input
  //searchEmail is then passed to the reducer as input on submit
  const onSubmit = async () => {
    Keyboard.dismiss();
    try {
      await searchFriend(searchEmail);
      setSearchEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonPress = async () => {
    try {
      const friendId = foundFriend.id;
      await addFriend(user.id, friendId);

      navigation.navigate("Home");

      Alert.alert("Friend Added!");

      //  navigation.navigate("Friends")
      //  await setFriends(user.id)
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=> {

  // }, )
  console.log(foundFriend);
  return (
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
      <Text /* size={theme.SIZES.FONT * 2} */ style={styles.textStyle} bold>
        Search for a friend by email!
      </Text>
      <Block flex space="space">
        <View>
          <SearchBar
            term={searchEmail}
            // search bar component expects a prop called term
            onTermChange={(newSearchEmail) => setSearchEmail(newSearchEmail)}
            onTermSubmit={onSubmit}
          />

          {foundFriend.name ? (
            <Text style={styles.searchResult}>
              We found {foundFriend.name} with that email
            </Text>
          ) : (
            <Text> </Text>
          )}

          {foundFriend.email &&
          !friends.map((friend) => friend.email).includes(foundFriend.email) ? (
            <View style={styles.cardContainer}>
              <Image
                source={{ uri: `${foundFriend.imageUrl}` }}
                style={{
                  width: 380,
                  height: 290,
                  /* borderRadius: 400 / 2, */
                }}
              />

              <Card
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                titleColor={theme.COLORS.WHITE}
                style={styles.card}
                title={foundFriend.name}
                caption={foundFriend.email}
                //location={"goals"}
                // avatar={`https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`}
                image={`${foundFriend.imageUrl}`}
                imageStyle={styles.rounded}
                imageBlockStyle={[
                  // { padding: theme.SIZES.BASE / 2 },
                  styles.noRadius,
                ]}
                footerStyle={styles.full}
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0, 0.8)"]}
                  style={styles.gradient}
                />
              </Card>
              <Text h3> Add {foundFriend.name} as a friend!</Text>
              <View>
                <Button
                  //style={styles.button}
                  small
                  round
                  color="#5539AA"
                  title="add friend"
                  onPress={() => onButtonPress()}
                >
                  <Text style={styles.buttonText}> add friend </Text>
                </Button>
              </View>
            </View>
          ) : (
            <>
              {foundFriend.name && foundFriend.name !== "nobody" ? (
                <View /* style={styles.foundResultContainer} */>
                  <View style={styles.imageResult}>
                    <Image
                      source={{ uri: `${foundFriend.imageUrl}` }}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 400 / 2,
                      }}
                    />
                  </View>
                  <Text style={styles.searchResult}>
                    {foundFriend.name} is already your friend!
                  </Text>
                  <Text style={styles.searchResult}>
                    Search for someone else to add!
                  </Text>
                </View>
              ) : (
                <Text></Text>
              )}
            </>
          )}

          {/* <Text>you entered: {searchEmail}</Text> */}
        </View>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  textStyle: {
    color: "#f5f5f5",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    //marginTop: 10,
    //width: 200,
    backgroundColor: "#5539AA",
  },
  full: {
    position: "absolute",
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
    position: "absolute",
    overflow: "hidden",
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  textStyle: {
    color: "#5539AA",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 10,
  },
  searchResult: {
    color: "#5539AA",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  foundResultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultCont: {
    marginTop: 19,
  },
  imageResult: {
    marginTop: 10,
    alignItems: "center",
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
    clearFoundFriend: () => {
      dispatch(clearFriend());
    },
  };
};

export default connect(mapState, mapDispatch)(AddFriendScreen);
