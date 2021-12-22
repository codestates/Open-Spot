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
      copiedState.myFavoriteMarkers.forEach((marker) => {
        if (marker.compId !== action.payload.compId) {
          copiedState.myFavoriteMarkers = copiedState.myFavoriteMarkers.concat(action.payload);
        }
      });
      return copiedState;
    case GET_MY_STORE_MARKERS:
      copiedState.myStoreMarkers.forEach((storeMarker) => {
        if (storeMarker.compId !== action.payload.compId) {
          copiedState.myStoreMarkers = copiedState.myStoreMarkers.concat(action.payload);
        }
      });
      return copiedState;
    default:
      return state;
  }
};

export default userStateReducer;
