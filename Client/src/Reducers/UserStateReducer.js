import {
  GET_USER_INFO
} from '../Actions/index.js';
import { initialState } from './InitialState.js';

const userStateReducer = (state = initialState, action) => {
  const copiedState = Object.assign({}, state);
  switch (action.type) {
    case GET_USER_INFO:
      copiedState.userInfo = Object.assign(state.userInfo, action.payload);
      return copiedState;
    default:
      return state;
  }
};

export default userStateReducer;
