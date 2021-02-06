import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import user from "./user";
import goal from "./goal";
import goals from "./goal";
import friends from "./friends";

const reducer = combineReducers({
  user,
  goals,
  friends,
  goal,
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
