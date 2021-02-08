import vitamon from "../api/vitamon";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const ADD_FRIEND = "ADD_FRIEND"

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const addFriend = (userId, friendId) => ({type: ADD_FRIEND, userId, friendId})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await vitamon.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async (dispatch) => {
  let res;
  try {
    res = await vitamon.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await vitamon.post("/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const signup = (newUser) => async (dispatch) => {
  try {
    console.log("in redux:signup");
    const { data } = await vitamon.post("/auth/signup", newUser);
    dispatch(getUser(data));
  } catch (err) {
    console.log(err);
  }
};

export const findUser = (email) => async (dispatch) => {
  try {
    const {data} = await vitamon.get(`/api/users/${email}`);
    dispatch(getUser(data));
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
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
