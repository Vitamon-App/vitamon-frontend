import React, {useState, useReducer} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import SearchBar from '../components/SearchBar'
import { connect } from "react-redux";
import { findFriend } from '../store/friend'



function AddFriendScreen({searchFriend, user, friend}) {
  const [term, setTerm] = useState('')


  // console.log("LOOKING FOR FRIENDS", user.friends)

 const searchAPI = async () => {
   try{
  searchFriend(term)
   } catch (err) {
     console.log(err)
   }
 }

//  const onClick = async (friendId) => {

//  }
  return (
      <View style={styles.mainBackground}>
          <SearchBar 
          term={term} 
          onTermChange={(newTerm)=> setTerm(newTerm)} 
          onTermSubmit={searchAPI}
          />
          <Text>Search for a friend by email!</Text>
          {friend.name ? 
          <Text>We found {friend.name} with that email</Text> :
          <Text> </Text>}
       
         {friend.email ?  (
           <View>
         <Text> Add {friend.name} as a friend!</Text>
         <Button 
         title="add friend"
        //  onPress={onClick(results.id)}
         />
         </View>) :
         <Text></Text>
         }
          
         
          

          <Text>you entered: {term}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    mainBackground: {
        backgroundColor: 'white'
    }
})

const mapState = (state) => {
    return {
      user: state.user,
      friend: state.friend
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
    searchFriend: (email) => {
        dispatch(findFriend(email));
      },
    };
  };

export default connect(mapState, mapDispatch)(AddFriendScreen);


