import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/user";
// import { SimpleLineIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
// import { Asset } from 'expo-asset';
import { StyleSheet, Switch, FlatList, Platform, TouchableOpacity, View, Alert } from "react-native";
import { Block, Text, Icon, Button } from "galio-framework";
import theme from '../theme.js'
// import materialTheme from '../constants/Theme';

 class SettingsScreen extends React.Component {
  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });


  renderItem = ({ item }) => {
    // const {navigate} = this.props.navigation;
 

    switch(item.type) {
      case 'switch': 
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={theme.COLORS.SWITCH_OFF}
              thumbColor={Platform.OS === 'android' ? theme.COLORS.SWITCH_OFF : null}
              trackColor={{ false: theme.COLORS.SWITCH_OFF, true: theme.COLORS.PRIMARY }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button': 
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => Alert.alert("Not Set Up")}>
              <Block row middle space="between" style={{paddingTop:7}}>
                <Text size={14}>{item.title}</Text>
                <Icon name="angle-right" family="font-awesome" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>);
      default:
        break;
    }
  }

  render() {
    const {navigate} = this.props.navigation
    const {logout} = this.props;
    const permission = [
      { title: "Allow App to Access Pedometer Data", id: "pedometer", type: "switch" },
      { title: "Stay Signed In", id: "autosign", type: "switch" },
      { title: "Notifications", id: "Notifications", type: "button" },
    ];

    const account = [
      { title: "Edit Your Name", id: "name", type: "button" },
      { title: "Change your email", id: "email", type: "button" },
      { title: "Change your password", id: "password", type: "button" },
    ];
    
    const privacy = [
      { title: "User Agreement", id: "Agreement", type: "button" },
      { title: "Privacy", id: "Privacy", type: "button" },
      { title: "About", id: "About", type: "button" },
    ];

    return (
    
      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}>
        <FlatList
          data={permission}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <Block style={styles.title}>
              <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
                Permission Settings
              </Text>
              <Text center muted size={12}>
                The app works best when you allow us to see your steps
              </Text>
            </Block>
          }
        />
        <Block style={styles.title}>
          <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          Account Settings
          </Text>
          <Text center muted size={12}>
          Edit your info
          </Text>
        </Block>
        <FlatList
          data={account}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
        <Block style={styles.title}>
          <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
          Privacy Settings
          </Text>
          <Text center muted size={12}>
          We never sell your data
          </Text>
        </Block>
        <FlatList
          data={privacy}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
        />
  
      <Button 
          style={styles.button} 
          color={theme.COLORS.PRIMARY}
          round
          iconSize={theme.SIZES.BASE * 1}
          icon="logout"
          iconFamily="FontAwesome"
          onPress={() => {
            logout()
            navigate("Home")
          }}
        >
                  Log Out
                </Button>
        <Button 
          style={styles.button} 
          color={theme.COLORS.PRIMARY} 
          round
          // iconSize={theme.SIZES.BASE * 1}
          // icon="monster"
          // iconFamily="FontAwesome"
          onPress={() => {
            navigate("Goals");
          }}
        >
                  Back to Vitamons
                </Button>
      </View>
      
      
      
    );
  }
}


const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#f5f5f5",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    // width: 200,
    backgroundColor: "#9c9aff",
  },
  subHead1: {
    fontSize: 22,
    color: "#B46CF7",
  },
  subHead2: {
    fontSize: 22,
    color: "#7a77d9",
    marginTop: 19,
  },
  subHead3: {
    fontSize: 18,
    color: "#7a77d9",
    marginTop: 19,
  },
  buttonContainer: {
    height: 40,
    width: 90,
    marginTop: 19,
    marginHorizontal: 10,
    backgroundColor: "#97A5E9",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  textContainer: {
    height: 60,
    //width: 300,
    marginTop: 19,
    marginHorizontal: 10,
    backgroundColor: "#97A5E9",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  settings: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  }
});

export default connect(mapState, mapDispatch)(SettingsScreen);
