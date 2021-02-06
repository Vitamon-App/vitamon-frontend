/**
 * ACTION TYPES
 */
const SET_FRIENDS = "SET_FRIENDS";

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

/**
 * THUNK CREATORS
 *

/**
 * REDUCER
 */

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    default:
      return state;
  }
}
