import React, {useState, useReducer} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import SearchBar from '../components/SearchBar'
import { connect } from "react-redux";
import { findFriend } from '../store/friend'
import { addFriendThunk } from '../store/friends'



function AddFriendScreen({searchFriend, addFriend, user, friend, friends}) {
  const [searchEmail, setSearchEmail] = useState('')


  // console.log("LOOKING FOR FRIENDS", user.friends)
//searchEmail is on state, set on change when the user types input
//searchEmail is then passed to the reducer as input on submit 
 const onSubmit = () => {
   try{
  searchFriend(searchEmail)
   } catch (err) {
     console.log(err)
   }
 }
 

 const onClick = (userId, friendId) => {
   try{
     addFriend(userId, friendId)
    } catch (err) {
      console.log(err)
    }
 }

//  console.log("FRIENDS", friends)

 console.log("FRIEND ID", friend.id)
 console.log("USER ID", user.id)
  return (
      <View style={styles.mainBackground}>
     
          <SearchBar 
          term={searchEmail} 
          // search bar component expects a prop called term
          onTermChange={(newSearchEmail)=> setSearchEmail(newSearchEmail)} 
          onTermSubmit={onSubmit}
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
         onPress={onClick(user.id, friend.id)}
         />
         </View>) :
         <Text></Text>
         }
          
         
          

          <Text>you entered: {searchEmail}</Text>
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
      friend: state.friend,
      friends: state.friends

    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
    searchFriend: (email) => {
        dispatch(findFriend(email))
      },
      addFriend: (userId, friendId) => {
        dispatch(addFriendThunk(userId, friendId))
      }
    };
  };

export default connect(mapState, mapDispatch)(AddFriendScreen);


