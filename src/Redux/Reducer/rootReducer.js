import {combineReducers} from 'redux';
import counterReducer from '../Slice/counterSlice';
import userSliceReducer from '../Slice/loginslice';
import getByIdSlice from '../Slice/SingleProductslice';
import productReducer from '../Slice/productSlice';
import categoryReducer from '../Slice/categorySlice';
import authReducer from '../Slice/authSlice';
import postApiSlice from '../Slice/postApiSlice';
import perfectpatnerSlice from '../Slice/perfectpatnerSlice';
import orderSlice from '../Slice/orderSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  getById: getByIdSlice,
  user: userSliceReducer,
  getById: getByIdSlice,
  post: postApiSlice,
  PatnerGet: perfectpatnerSlice,
  order: orderSlice,
});

export default rootReducer;
