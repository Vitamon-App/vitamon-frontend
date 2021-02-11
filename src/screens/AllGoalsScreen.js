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
      <Text size={theme.SIZES.FONT * 2} bold> Here are all your Vitamons! </Text>
          {!goals.length ? (
            <View>
              <Text h4>
                You haven't added any goals yet!
              </Text>
              {/* <Button
                title="Click Here to Adopt a Vitamon"
                 onPress={() => {
                  navigation.navigate("AddGoal");
                }}
              ></Button> */}
            </View>
          ) : null}


          {goals.length ? (
            //   <ScrollView
            //   horizontal={true}
            //   pagingEnabled={true}
            //   decelerationRate={0}
            //   scrollEventThrottle={16}
            //   snapToAlignment="center"
            //   showsHorizontalScrollIndicator={false}
            //   snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
            //   contentContainerStyle={{
            //     paddingHorizontal: theme.SIZES.BASE / 2
            //   }}
            // 
            goals.map((goal, id)=>(
              <View>
             
                 <Block safe >
              
               
                 <Monster
                monsterType={goal.type}
                monsterStatus={goal.status}
                goalId={goal.id}/>
             
               
                </Block>
              {/* <Card
              // key={`card-${goal.id}`}
              flex
              borderless
              shadowColor={theme.COLORS.BLACK}
              titleColor={theme.COLORS.WHITE}
              style={styles.card}
              title={goal.type}
              caption={goal.status}
              // location={'goals'}
              // avatar={`https://images.unsplash.com/photo-1571172964276-91faaa704e1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`}
              // image={  <Monster
              //   monsterType={goal.type}
              //   monsterStatus={goal.status}/>
              // }
              imageStyle={styles.rounded}
              imageBlockStyle={[
              // { padding: theme.SIZES.BASE / 2 },
             styles.noRadius,
              ]}
              footerStyle={ styles.full }
            >
            <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} />
            </Card> */}
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
