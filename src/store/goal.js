import vitamon from '../api/vitamon'

/**
 * ACTION TYPES
 */
const GET_GOALS = 'GET_GOALS'

/**
 * INITIAL STATE
 */
const initialState = []


/**
 * ACTION CREATORS
 */
export const getGoals = goals => {
    return {
      type: GET_GOALS,
      goals
    }
  }

/**
 * THUNK CREATORS
 */
export const fetchGoals = userId => {
    return async dispatch => {
      try {
        const {data} = await vitamon.get(`/api/goals/${userId}`)
        // console.log(userId)
        console.log("DATAAAA", data)
        console.log("GetGoals", getGoals(data))
        dispatch(getGoals(data))
      
      } catch (error) {
        console.log(error)
      }
    }
  }

/**
 * REDUCER
 */

export default function goalsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_GOALS:
        return action.goals
      default:
        return state
    }
  }