import update from "immutability-helper";
import { SET_USER_INFO } from "../actions/userAction";

const initialState = {
  userUid: ""
};

export function setUserInfo(state, { payload }) {
  return update(state, {
    userUid: {
      $set: payload
    }
  });
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return setUserInfo(state, action);
    default:
      return state;
  }
}
