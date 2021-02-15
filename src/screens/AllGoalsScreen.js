import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Monster from "../components/Monster";
import { connect } from "react-redux";
import { fetchGoals } from "../store/allTheUsersGoals";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
// Galio components
import { Block, Text, Button } from "galio-framework";
import theme from "../theme";
const width = Dimensions.get("window").width;
const cardWidth = width - theme.SIZES.BASE * 2;

function AllGoalsScreen({ navigation, goals, user, setUserGoals }) {
  useEffect(() => {
    setUserGoals(user.id);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setUserGoals(user.id);
    }, [])
  );

  return (
    <Block safe flex>
      <ScrollView contentContainerStyle={styles.cards}>
        <Block styles={styles.container}>
          <Text h5>
            {"\n"}
            Feed your Vitamons by achieving your goals!{"\n"}
          </Text>
          <Text p>Tap on a goal to see your progress</Text>
          {!goals.length ? (
            <View>
              <Text h4>You haven't added any goals yet!</Text>
            </View>
          ) : null}

          {goals.length
            ? goals.map((goal, index, id) => (
                <View style={styles.goalContainer} key={index}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("SingleGoal", { id: goal.id })
                    }
                  >
                    <Block>
                      <Block style={styles.goalContainer}>
                        <Monster
                          style={styles.vitamon}
                          monsterType={goal.type}
                          monsterStatus={goal.status}
                          goalId={goal.id}
                        />
                      </Block>
                      <Block style={styles.textContainer}>
                        <Text style={styles.goalText} p>
                          Type: {goal.type}
                        </Text>
                        <Text style={styles.goalText} p>
                          Status:{" "}
                          {goal.status === "Completed"
                            ? "Complete"
                            : "In progress"}
                        </Text>
                      </Block>
                    </Block>
                  </TouchableWithoutFeedback>
                </View>
              ))
            : null}
          <Block style={styles.container}>
            <Button
              shadowless={true}
              style={styles.button}
              onPress={() => {
                navigation.navigate("AddGoal");
              }}
            >
              <Text style={styles.buttonText}>Add A New Goal</Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.CULTURED,
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: theme.COLORS.OCEANBLUE,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  goalText: {
    fontWeight: "600",
    color: theme.COLORS.CULTURED,
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.CULTURED,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  goalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 20,
    backgroundColor: theme.COLORS.BLUEVIOLET,
  },
  vitamon: {
    borderColor: "transparent",
    backgroundColor: theme.COLORS.CULTURED,
    borderRadius: 90,
  },
  textContainer: {
    backgroundColor: theme.COLORS.BLUEVIOLET,
    color: "white",
    width: width,
    borderRadius: 5,
    width: 373,
    alignItems: "center",
  },
  test: {
    backgroundColor: "black",
    width: width,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    goals: state.goals,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setUserGoals: (userId) => {
      dispatch(fetchGoals(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(AllGoalsScreen);
