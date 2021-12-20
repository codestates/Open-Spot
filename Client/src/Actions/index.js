export const SELECT_LOGIN_OR_SIGNIN = 'SELECT_LOGIN_OR_SIGNIN';
export const IS_USER_OR_GUEST = 'IS_USER_OR_GUEST';

export const selectLoginOrSignin = (boolean) => ({
  type: SELECT_LOGIN_OR_SIGNIN,
  payload: boolean
});

export const isUserOrGuest = (boolean) => ({
  type: IS_USER_OR_GUEST,
  payload: boolean
});
