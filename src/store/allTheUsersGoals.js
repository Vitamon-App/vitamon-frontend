import vitamon from "../api/vitamon";
/**
 * ACTION TYPES
 */

const ADD_GOAL = "ADD_GOAL";
const SET_GOALS = "SET_GOALS";

/**
 * INITIAL STATE
 */
const initialState = [];

/**
 * ACTION CREATORS
 */

export const addGoal = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  };
};
export const setGoals = (goals) => {
  return {
    type: SET_GOALS,
    goals,
  };
};

/**
 * THUNK CREATORS
 */
export const fetchGoals = (userId) => async (dispatch) => {
  try {
    const {data} = await vitamon.get(`/api/goals/${userId}`)
    dispatch(setGoals(data))
  } catch(err) {
    console.log(err)
  }
}

export const addGoalToUser = (newGoal) => async (dispatch) => {
  try {
    const { data } = await vitamon.post(`/api/goals/add`, newGoal);
    let type;
    if (newGoal.goalId === 1) {
      type = "Steps";
    } else if (newGoal.goalId === 2) {
      type = "Water";
    }
    const goal = {
      type: type,
      id: newGoal.id,
      usergoal: data,
    };
    dispatch(addGoal(goal));
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
      return [...state, action.goal];
    case SET_GOALS:
      return action.goals;
    default:
      return state;
  }
}
