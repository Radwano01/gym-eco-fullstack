import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux/cartSlice";
import checkoutSlice from "../redux/checkoutSlice";


const rootReducer = combineReducers({
    cart:cartSlice,
    address: checkoutSlice
})

const store = configureStore({
    reducer:rootReducer,
       middleware:(getDefaultNormalizer)=>
       getDefaultNormalizer({
           serializableCheck: false,
       })
})

export default store