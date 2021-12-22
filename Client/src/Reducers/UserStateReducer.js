import {
  GET_USER_INFO,
  GET_MY_FAVORITE_MARKERS,
  GET_MY_STORE_MARKERS
} from '../Actions/index.js';
import { initialState } from './InitialState.js';

const userStateReducer = (state = initialState, action) => {
  const copiedState = Object.assign({}, state);
  switch (action.type) {
    case GET_USER_INFO:
      copiedState.userInfo = Object.assign(state.userInfo, action.payload);
      return copiedState;
    case GET_MY_FAVORITE_MARKERS:
      {
        const id = action.payload.compId;
        const len = copiedState.myFavoriteMarkers.length;
        const values = [];
        for (let i = 0; i < len; i++) {
          values.push(copiedState.myFavoriteMarkers[i].compId);
        };
        if (values.indexOf(id) === -1) {
          copiedState.myFavoriteMarkers = copiedState.myFavoriteMarkers.concat(action.payload);
        };
      return copiedState;
    case GET_MY_STORE_MARKERS:
      {
        const id = action.payload.compId;
        const len = copiedState.myStoreMarkers.length;
        const values = [];
        for (let i = 0; i < len; i++) {
          values.push(copiedState.myStoreMarkers[i].compId);
        };
        if (values.indexOf(id) === -1) {
          copiedState.myStoreMarkers = copiedState.myStoreMarkers.concat(action.payload);
        };
      }
      return copiedState;
    default:
      return state;
  }
};

export default userStateReducer;
