import React from "react";
import {
  StyleSheet,
  // Text,
  View,
  TextInput,
  FlatList,
  // Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Monster from "../components/Monster";
import { Pedometer } from "expo-sensors";
import { withNavigation } from '@react-navigation/compat';
import { connect } from "react-redux";
import { fetchGoals } from "../store/allTheUsersGoals";
// Galio components
import {
  Text, Card, Block, NavBar, Icon, Button,  DeckSwiper
} from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme';
const width = Dimensions.get("window").width;
const cardWidth = width - theme.SIZES.BASE * 2;

class AllGoalsScreen extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    await this.props.setUserGoals(this.props.user.id);
  }

  render() {
    const goals = this.props.goals;
    const { navigation } = this.props;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
      <ScrollView contentContainerStyle={styles.cards}>
      <Block flex space="between">
      <Text size={theme.SIZES.FONT * 2} bold> Feed your Vitamons by achieving your Goals!</Text>
          {!goals.length ? (
            <View>
              <Text h4>
                You haven't added any goals yet!
              </Text>
        
            </View>
          ) : null}


          {goals.length ? (
      
            goals.map((goal, id)=>(
              <View>
             
                 <Block safe >
              
               
                 <Monster
                monsterType={goal.type}
                monsterStatus={goal.status}
                goalId={goal.id}/>
             
               
                </Block>
          
            </View>
            )))
      
           : null}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AddGoal");
            }}
          >
            <Text style={styles.buttonText}>Add A New Goal</Text>
          </TouchableOpacity>
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
    // alignItems: 'center',
    justifyContent: 'flex-end',
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
    goals: state.goals,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setUserGoals: (goals) => {
      dispatch(fetchGoals(goals));
    },
  };
};

export default connect(mapState, mapDispatch)(AllGoalsScreen);
