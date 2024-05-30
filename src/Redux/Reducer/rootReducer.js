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
import ViewToCartSlice from '../Slice/car_slice/viewcart';
import profileSlice from '../Slice/profileSlice';
import wishlistSlice from '../Slice/wishlistSlice';
import DeleteToCartSlice from '../Slice/car_slice/deletecart';
import OrderToCartSlice from '../Slice/car_slice/placeordercart';
import OrderDetailCartSlice from '../Slice/car_slice/orderdeatails';

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
  AddToCart: AddToCartSlice,
  DeleteToCart: DeleteToCartSlice,
  PatnerGet: perfectpatnerSlice,
  order: orderSlice,
  ViewToCart: ViewToCartSlice,
  profile: profileSlice,
  wishlist: wishlistSlice,
  OrderToCart: OrderToCartSlice,
  OrderDetailCart: OrderDetailCartSlice,
});

export default rootReducer;
