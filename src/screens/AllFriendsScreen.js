import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { connect } from "react-redux";
import { fetchFriends } from "../store/friends";

// Galio components
import { Text, Card, Block, NavBar, Icon, Button } from "galio-framework";
import theme from "../theme";

const width = Dimensions.get("window").width;

class AllFriendsScreen extends React.Component {
  async componentDidMount() {
    await this.props.getFriends(this.props.user.id);
  }

  render() {
    const friends = this.props.friends || [];

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            <Text size={theme.SIZES.FONT * 2} bold>
              {" "}
              Here are all your friends!{" "}
            </Text>

            {friends.length ? (
              friends.map((friend, id) => (
                <Card
                  key={`card-${friend.email}`}
                  flex
                  borderless
                  shadowColor={theme.COLORS.BLACK}
                  titleColor={theme.COLORS.WHITE}
                  captionColor={theme.COLORS.WHITE}
                  style={styles.card}
                  location={
                    <View style={styles.buttonContainer}>
                      <Button
                        round
                        size="small"
                        color="#5539AA"
                        onPress={() =>
                          this.props.navigation.navigate("FriendsGoals", {
                            friend: friend,
                          })
                        }
                      >
                        GOALS
                      </Button>
                    </View>
                  }
                  //avatar={`https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`}
                  image={`${friend.imageUrl}`}
                  imageStyle={styles.cardImageRadius}
                  imageStyle={styles.rounded}
                  imageBlockStyle={[styles.noRadius]}
                  footerStyle={styles.full}
                >
                  <Text style={styles.textStyle}>{friend.name}</Text>
                </Card>
              ))
            ) : (
              <Text style={{ marginVertical: theme.SIZES.FONT / 4 }} h1>
                You haven't Added Any Friends Yet!
              </Text>
            )}

            <View style={styles.buttonContainer2}>
              <Button
                style={styles.button}
                color="#2C148B"
                round
                onPress={() => navigation.navigate("AddFriend")}
              >
                Add a new friend!
              </Button>
            </View>
          </Block>
        </ScrollView>
      </Block>
    );
  }
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
  primary: {
    backgroundColor: theme.COLORS.primary,
  },

  buttonContainer: {
    height: 40,
    width: 5,
    marginTop: 19,
    marginBottom: 20,
    marginRight: 70,
    backgroundColor: "#97A5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer2: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "#f5f5f5",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#5539AA",
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
    getFriends: (userId) => {
      dispatch(fetchFriends(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(AllFriendsScreen);
