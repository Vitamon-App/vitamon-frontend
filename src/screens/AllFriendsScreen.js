import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

import { connect } from "react-redux";
import { fetchFriends } from "../store/friends";
import GoalsOfFriends from "../components/GoalsOfFriends";
// Galio components
import { Text, Card, Block, NavBar, Icon, Button } from "galio-framework";
import theme from "../theme";

const width = Dimensions.get("window").width;

class AllFriendsScreen extends React.Component {
  async componentDidMount() {
    await this.props.getFriends(this.props.user.id);
  }

  render() {
    const user = this.props.user;
    const friends = this.props.friends || [];

    friends.push(this.props.user);
    const { navigation } = this.props;
    let leaderBoard = {};
    friends.forEach((friend) => {
      leaderBoard[`${friend.name}`] = 0;
      friend.goals.forEach((goal) => {
        if (goal.status === "complete") {
          leaderBoard[`${friend.name}`]++;
        }
      });
    });

    friends.pop();
    let ranking = Object.entries(leaderBoard);
    let highest = [];

    ranking.forEach((rank) => {
      if (rank[1] > 0) {
        highest = rank;
      }
      if (highest[1] < rank[1]) {
        highest = rank;
      }
    });
    if (highest[0] === user.name) {
      highest[0] = "You are";
    }

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            <View style={styles.container}>
              <Text size={theme.SIZES.FONT * 2} color="#2C148B" bold>
                {" "}
                Here are all your friends!{" "}
              </Text>
            </View>

            <Text style={styles.goalLeader} color="#2C148B">
              {highest.length === 0
                ? "None of your friends have completed goals to be"
                : `${highest[0]} is`}{" "}
              the goal leader
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
              <View style={styles.container}>
                <Text
                  style={{ marginVertical: theme.SIZES.FONT / 4 }}
                  color="#2C148B"
                  h5
                >
                  You haven't Added Any Friends Yet!
                </Text>
              </View>
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

  goalLeader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",

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
