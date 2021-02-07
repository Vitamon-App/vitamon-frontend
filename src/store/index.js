import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import user from "./user";
import goal from "./goal";
import friends from "./friends";
import friend from "./friend"

const reducer = combineReducers({
  user,
  friends,
  friend,
  goal,
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
