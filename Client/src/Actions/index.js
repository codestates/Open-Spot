export const SELECT_LOGIN_OR_SIGNIN = 'SELECT_LOGIN_OR_SIGNIN';

export const selectLoginOrSignin = (boolean) => {
  return {
    type: SELECT_LOGIN_OR_SIGNIN,
    payload: boolean
  };
};
