import {combineReducers} from 'redux';
import counterReducer from '../Slice/counterSlice';
import authReducer from "../Slice/authSlice"

const rootReducer = combineReducers({
  counter: counterReducer,
  auth:authReducer

});

export default rootReducer;
