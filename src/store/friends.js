import vitamon from "../api/vitamon";

/**
 * ACTION TYPES
 */
const SET_FRIENDS = "SET_FRIENDS";
const ADD_FRIEND = "ADD_FRIEND"


/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
export const setFriends = (friends) => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};
export const addFriend = (friend) => {
  return {
    type: ADD_FRIEND,
    friend,
  };
};

/**
 * THUNK CREATORS
 */

export const addFriendThunk = (userId, friendId) => async (dispatch) => {
  try {
    const {data} = await vitamon.post(`/api/users/${userId}/add/${friendId}`)
    dispatch(addFriend(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    case ADD_FRIEND: 
      return {
        ...state, friends: [...state.friends, action.friend]
      }
    default:
      return state;
  }
}
