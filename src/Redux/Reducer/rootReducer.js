import {combineReducers} from 'redux';
import counterReducer from '../Slice/counterSlice';
import userSliceReducer from "../Slice/authSlice"
import getByIdSlice from "../Slice/SingleProductslice"

const rootReducer = combineReducers({
  counter: counterReducer,
  user:userSliceReducer,
  getById:getByIdSlice

});

export default rootReducer;
