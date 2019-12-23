export const SET_USER_INFO = "USER/set-user-info";

export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    payload: userInfo
  };
}
