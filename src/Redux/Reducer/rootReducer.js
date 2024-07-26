import { combineReducers } from 'redux';
import counterReducer from '../Slice/counterSlice';
import userSliceReducer from '../Slice/loginslice';
import getByIdSlice from '../Slice/SingleProductslice';
import productReducer from '../Slice/productSlice';
import categoryReducer from '../Slice/categorySlice';
import redytogoReducer from '../Slice/ready_to_go';
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
import ClearToCartSlice from '../Slice/car_slice/clearcart';
import updateChekoutslice from "../Slice/car_slice/updatecheckout"
import UpdateToCartSlice from '../Slice/car_slice/updatecart';
import ProductAddToCartSlice from '../Slice/car_slice/withoulogin/productaddtocart';
import ProductViewToCartSlice from '../Slice/car_slice/withoulogin/ViewProdcutcart';
import CouponDetailCartSlice from '../Slice/car_slice/coupon/couponcart';
import searchProductSlice from '../Slice/searchProductSlice';
import paginatedProductSlice from '../Slice/paginatedProductSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  category: categoryReducer,
  redytogo: redytogoReducer,
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
  ClearToCarted: ClearToCartSlice,
  checkoutupdate: updateChekoutslice,
  updateToCart: UpdateToCartSlice,
  productaddtocart: ProductAddToCartSlice,
  ProductViewToCart: ProductViewToCartSlice,
  CouponDetail: CouponDetailCartSlice,
  searchProduct: searchProductSlice,
  paginatedProducts: paginatedProductSlice

});

export default rootReducer;
