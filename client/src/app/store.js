import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import drawerReducer from '../features/drawer/drawerSlice'
import searchReducer from '../features/search/searchSlice'
import cartReducer from '../features/cart/cartSlice'


const store = configureStore({
    reducer : {
        user : userReducer,
        search : searchReducer,
        cart : cartReducer,
        drawer : drawerReducer
    }
})

export default store;