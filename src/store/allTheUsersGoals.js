import vitamon from "../api/vitamon";
/**
 * ACTION TYPES
 */

const ADD_GOAL = "ADD_GOAL";

/**
 * INITIAL STATE
 */
const initialState = { goals: [] };

/**
 * ACTION CREATORS
 */

export const addGoal = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  };
};

/**
 * THUNK CREATORS
 */

export const addGoalToUser = (newGoal) => async (dispatch) => {
  try {
    const { data } = await vitamon.post(`/api/goals/add`, newGoal);
    dispatch(addGoal(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL:
      return { ...state, goals: [...state.goals, action.goal] };

    default:
      return state;
  }
}
