import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import drawerReducer from '../features/drawer/drawerSlice'
import searchReducer from '../features/search/searchSlice'
import cartReducer from '../features/cart/cartSlice'
import codReducer from '../features/cod/codSlice.js'

const store = configureStore({
    reducer : {
        user : userReducer,
        search : searchReducer,
        cart : cartReducer,
        drawer : drawerReducer,
        cod : codReducer
    }
})

export default store;