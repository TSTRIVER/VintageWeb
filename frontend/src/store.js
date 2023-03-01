import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {newProductReducer, newReviewReducer, productDetailsReducer, productsReducer,productReducer,} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import {forgotPasswordReducer, profileUpdateReducer} from "./reducers/profileUpdatered";
import {cartReducer} from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileUpdateReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product:productReducer,
});
let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    },
  };

const middleware = [thunk];

const Store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default Store;