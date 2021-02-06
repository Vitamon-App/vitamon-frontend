import vitamon from "../api/vitamon";

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
const getFriend = (friend) => ({ type: GET_FRIEND, friend });


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

// export const addFriendThunk = (userId, friendId) => async (dispatch) => {
//   try {
//     const {data} = await vitamon.put(`/api/${user.id}/friend/${friendId}`)
//     dispatch(addFriend(data))
//   } catch (err) {
//     console.log(err)
//   }
// }

/**
 * REDUCER
 */
export default function (state = defaultFriend, action) {
  switch (action.type) {
    case GET_FRIEND:
      return action.friend;
    default:
      return state;
  }
}
