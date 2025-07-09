import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

import searchReducer from '../features/search/searchSlice'


const store = configureStore({
    reducer : {
        user : userReducer,
        search : searchReducer
    }
})

export default store;