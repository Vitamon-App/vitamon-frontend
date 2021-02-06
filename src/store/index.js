import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import user from "./user";
import goal from "./goal";

const reducer = combineReducers({
  user,
  goal,
});

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
