import vitamon from "../api/vitamon";

/**
 * ACTION TYPES
 */
const SET_GOAL = "SET_GOAL";

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
export const setGoal = (goal) => {
  return {
    type: SET_GOAL,
    goal,
  };
};

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */

export default function goalsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GOAL:
      return action.goal;
    default:
      return state;
  }
}
