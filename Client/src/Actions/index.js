export const SELECT_LOGIN_OR_SIGNIN = 'SELECT_LOGIN_OR_SIGNIN';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SELECT_SOCIAL_LOGIN_BUTTON = 'SELECT_SOCIAL_LOGIN_BUTTON';

export const selectLoginOrSignin = (boolean) => ({
  type: SELECT_LOGIN_OR_SIGNIN,
  payload: boolean
});

export const getUserInfo = (userInfo) => ({
  type: GET_USER_INFO,
  payload: userInfo
});

export const selectSocialLoginBtn = (btnState) => ({
  type: SELECT_SOCIAL_LOGIN_BUTTON,
  payload: btnState
});
