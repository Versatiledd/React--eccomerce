import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "../redux/cart/cart.reducer";
import menuReducer from "../redux/menu/menu.reducer";
import shopReducer from "../redux/shop/shop-reducer";
import afterBuyReducer from "../redux/afterBuy/afterBuy.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  menu: menuReducer,
  shop: shopReducer,
  pastItems: afterBuyReducer,
});

export default persistReducer(persistConfig, rootReducer);
