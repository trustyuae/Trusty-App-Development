import {combineReducers} from 'redux';
import counterReducer from '../Slice/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
