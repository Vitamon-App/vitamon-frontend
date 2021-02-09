import vitamon from "../api/vitamon";

/**
 * ACTION TYPES
 */
const SET_GOAL = "SET_GOAL";
const EDIT_GOAL = "EDIT_GOAL";

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

export const editGoal = (goal) => {
  return {
    type: EDIT_GOAL,
    goal,
  };
};



/**
 * THUNK CREATORS
 */

export const updateGoal = (goal, update) => async (dispatch) => {
  try {
    const { data } = await vitamon.put(
      `/api/goals/${goal.usergoal.id}`,
      update
    );
    dispatch(editGoal(data));
  } catch (err) {
    console.log("There was a problem updating the goal", err);
  }
};
/**
 * REDUCER
 */

export default function goalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GOAL:
      return action.goal;
    case EDIT_GOAL:
      return {
        ...state,
        usergoal: {
          ...state.usergoal,
          completedDays: action.goal.completedDays,
          status: action.goal.status,
        },
      };
    default:
      return state;
  }
}
