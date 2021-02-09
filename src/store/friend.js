import vitamon from "../api/vitamon";
// this redux file is specically for searching for a friend
/**
 * ACTION TYPES
 */
const GET_FRIEND = "GET_FRIEND";


/**
 * INITIAL STATE
 */
const defaultFriend = {};

/**
 * ACTION CREATORS
 */
const getFriend = (foundFriend) => ({ type: GET_FRIEND, foundFriend });


/**
 * THUNK CREATORS
 */

export const findFriend = (email) => async (dispatch) => {
  try {
    const {data} = await vitamon.get(`/api/users/${email}`);
    if(data){
        dispatch(getFriend(data));
    } else {
       dispatch(getFriend({"name" : "nobody"}))
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * REDUCER
 */
export default function (state = defaultFriend, action) {
  switch (action.type) {
    case GET_FRIEND:
      return action.foundFriend;
    default:
      return state;
  }
}
