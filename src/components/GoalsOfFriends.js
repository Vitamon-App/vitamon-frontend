import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Card, Block, NavBar, Icon, Button } from "galio-framework";
import theme from "../theme";
import friendsReducer from "../store/friends";

const width = Dimensions.get("window").width;
class GoalsOfFriends extends React.Component {
  render() {
    const { friend } = this.props.route.params;
    const goals = friend.goals;
    console.log(goals);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.pic}
          resizeMode="cover"
          source={{ uri: `${friend.imageUrl}` }}
        />

        <Text style={styles.name}>{`${friend.name} 's  goal(s):`}</Text>
        <Block flex space="between">
          {goals.length !== 0 ? (
            goals.map((card, idx) => (
              <Card
                key={`card-idx`}
                flex
                //borderless
                shadowColor={theme.COLORS.BLACK}
                titleColor={card.full ? theme.COLORS.WHITE : null}
                style={styles.card}
                title={
                  <View style={styles.view}>
                    <Text style={styles.goalTitle}>
                      {`Goal # ${idx + 1}:  ${card.type}`}
                    </Text>
                  </View>
                }
                caption={
                  <View>
                    <Text style={styles.goal}>
                      Quantity: {card.quantity}
                      {card.type === "Water" ? (
                        <Text>
                          {" "}
                          bottles per day
                        </Text>
                      ) : (
                        <Text>
                          {" "}
                          steps per day 
                        </Text>
                      )}
                    </Text>
                    {card.status === "complete" ? (
                      <Text style={styles.goal}>
                        Goal Status: {friend.name} has {card.status}d all{" "}
                        {card.numberOfDays} days
                      </Text>
                    ) : (
                      <Text style={styles.goal}>Goal Status: In Progress</Text>
                    )}
                  </View>
                }
                // location={card.location}
                //avatar={`${card.avatar}?${id}`}
                footerStyle={card.full ? styles.full : null}
              >
                {card.full ? (
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0, 0.8)"]}
                    style={styles.gradient}
                  />
                ) : null}
              </Card>
            ))
          ) : (
            <View>
              <Text style={styles.emptyGoals}>This friend doesn't have goals</Text>
            </View>
          )}
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5539AA",
    //"#004B99",
    //"#F5F4F6",
    alignItems: "center",
  },
  pic: {
    resizeMode: "center",
    width: 400,
    height: 400,
    borderRadius: 400 / 2,
  },
  name: {
    fontSize: 50,
    padding: 10,
    color: "#F5F4F6",
    //"#004B99",
    alignSelf: "flex-start",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  goalTitle: {
    fontSize: 30,
    padding: 10,
    color: "#004B99",
    //alignSelf: "flex-start",
    //textAlignVertical: "center",
    textAlign: "left",
    marginLeft: 20,
    fontWeight: "bold",
  },
  goal: {
    fontSize: 20,
    padding: 5,
    color: "#2c148b",

    //alignSelf: "flex-start",
    //textAlignVertical: "center",
  },
  friend: {
    fontSize: 80,
    padding: 10,
    color: "#004b99",
  },
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    //alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  emptyGoals: {
    color: "#F5F4F6",
  },
});

export default GoalsOfFriends;
