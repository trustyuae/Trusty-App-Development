import {combineReducers} from 'redux';
import counterReducer from '../Slice/counterSlice';
import userSliceReducer from '../Slice/loginslice';
import getByIdSlice from '../Slice/SingleProductslice';
import productReducer from '../Slice/productSlice';
import categoryReducer from '../Slice/categorySlice';
import authReducer from '../Slice/authSlice';
import postApiSlice from '../Slice/postApiSlice';
import perfectpatnerSlice from '../Slice/perfectpatnerSlice';
import AddToCartSlice from '../Slice/car_slice/addtocart';
import orderSlice from '../Slice/orderSlice';
import  ViewToCartSlice  from '../Slice/car_slice/viewcart';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  getById: getByIdSlice,
  user: userSliceReducer,
  getById: getByIdSlice,
  post: postApiSlice,
  PatnerGet:perfectpatnerSlice,
  AddToCart:AddToCartSlice,
  PatnerGet: perfectpatnerSlice,
  order: orderSlice,
  ViewToCart:ViewToCartSlice,
});

export default rootReducer;
