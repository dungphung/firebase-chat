import { createStore, combineReducers } from "redux";
import rootReducers from "../reducers/index";

export default function configureStore(initialState = {}) {
  return createStore(combineReducers(rootReducers), initialState);
}
