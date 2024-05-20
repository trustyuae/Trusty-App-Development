import {combineReducers} from 'redux';
import counterReducer from '../Slice/counterSlice';
import authReducer from '../Slice/authSlice';
import categoryReducer from '../Slice/categorySlice';
import productReducer from '../Slice/productSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
