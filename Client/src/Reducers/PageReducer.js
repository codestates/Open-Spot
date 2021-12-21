import {
  SELECT_LOGIN_OR_SIGNIN,
  SELECT_SOCIAL_LOGIN_BUTTON
} from '../Actions/index.js';
import { initialState } from './InitialState.js';

const pageReducer = (state = initialState, action) => {
  const copiedState = Object.assign({}, state);

  switch (action.type) {
    case SELECT_LOGIN_OR_SIGNIN:
      copiedState.isLoginTab = action.payload;
      return copiedState;
    case SELECT_SOCIAL_LOGIN_BUTTON:
      copiedState.socialLoginBtn = action.payload;
      return copiedState;
    // default 값으로 항상 초기state를 반환함
    default:
      return state;
  }
};

export default pageReducer;
