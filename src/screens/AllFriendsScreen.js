import React from "react";

import { StyleSheet, Text, View, Button, FlatList, Image, Dimensions, TouchableOpacity} from "react-native";
import { Asset } from 'expo-asset';
import { connect } from "react-redux";
import { setFriends } from "../store/friends";
const width = Dimensions.get('window').width;


class AllFriendsScreen extends React.Component {
  componentDidMount() {
    this.props.getFriends(this.props.user.friends);
  }

  render() {
    const friends = this.props.friends || [];
    return (
      <View style={styles.headlineContainer}>
        {friends.length ? (
          <View>

            <Text style={styles.headline}>Friend List:</Text>
            <Text style={styles.name}>Here are all your friends!</Text>
             <FlatList
          

              keyExtractor={(friend) => {
                return friend.id.toString();
              }}
              data={friends}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Image source={{ uri: `${item.imageUrl}`}} />
                    <Text style={styles.subheading}>name: {item.name}</Text>
                    <Text style={styles.email}>email: {item.email}</Text>
                  </View>
                );
              }}
            />
          
       <TouchableOpacity style={styles.button}
      onPress={() => {
        this.props.navigation.navigate("AddFriend");
      }}>
      <Text style={styles.buttonText}> Add a New Friend!</Text>
    </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.headline}>Go to the find friends page!</Text>
       <TouchableOpacity style={styles.button}
      onPress={() => {
        this.props.navigation.navigate("AddFriend");
      }}>
      <Text style={styles.buttonText}> Click here to add a friend!</Text>
    </TouchableOpacity>

          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headlineContainer: {
		paddingTop: '18%',
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#8c55fa'
	},
	headline: {
		marginTop: 10,
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		marginBottom: 20,
		fontWeight: '500'
	},
	subheading: {
		fontWeight: '700',
		fontSize: 20,
		padding: 15,
		color: '#424347'
	},
	outerContainer: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#FFF',
		marginHorizontal: '5%',
		marginVertical: '2%',
		maxWidth: '95%',
		justifyContent: 'space-between'
	},
	leftRequestContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		borderRadius: 5,
		marginVertical: '2%',
		marginLeft: 15,
		backgroundColor: '#FFF'
	},
	rightRequestContainer: {
		display: 'flex',
		alignSelf: 'center',
		borderRadius: 5
	},
	photo: {
		height: 60,
		width: 60,
		borderRadius: 30,
		marginRight: '7%',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	icon: {
		color: '#9FC78A',
		paddingLeft: '2%',
		marginRight: '2%'
	},
	iconNo: {
		color: 'black',
		paddingLeft: '2%',
		marginRight: '2%'
	},
	iconContainer: {
		flexDirection: 'row'
	},
	requestBottom: {
		display: 'flex',
		flexDirection: 'row'
	},
	name: {
		fontSize: 0.045 * width,
		fontWeight: '700',
		alignSelf: 'center',
		textAlignVertical: 'center',
		color: '#424347'
	},
	email: {
		fontSize: 20,
		padding: 10,
		color: '#424347'
	},
	instructions: {
		alignSelf: 'center',
		margin: 15,
		maxWidth: '90%',
		fontSize: 0.045 * width,
		textAlign: 'center',
		padding: 10,
		color: '#424347'
	},
	input: {
		height: 48,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: 'white',
		fontSize: 20,
		marginHorizontal: 15,
		paddingLeft: 10
	},
	sendButton: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Avenir'
	},
	buttonContainer: {
		width: '40%',
		alignSelf: 'center',
		marginHorizontal: 15,
		marginTop: '4%',
		backgroundColor: '#9FC78A',
		paddingVertical: 12,
		borderRadius: 10
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#f114af",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20
  }, 
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  }
})


const mapState = (state) => {
  return {
    user: state.user,
    friends: state.friends,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getFriends: (friends) => {
      dispatch(setFriends(friends));
    },
  };
};

export default connect(mapState, mapDispatch)(AllFriendsScreen);
