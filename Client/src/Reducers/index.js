import { combineReducers } from 'redux';
import pageReducer from './PageReducer.js';
import userStateReducer from './UserStateReducer.js';

const rootReducer = combineReducers({
  pageReducer,
  userStateReducer
});

export default rootReducer;
