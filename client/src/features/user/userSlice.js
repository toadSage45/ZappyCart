import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';



const initialState = {
    email : "",
    token : "",
}

const userSlice = createSlice({
    name : "user" , 
    initialState , 
    reducers : {
        loggedInUser : (state , action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
            //console.table(state.email , state.token );
        },
        logout : (state) => {
            state.email = null;
            state.token = null;
        }
        
    }
})

export default userSlice.reducer
export const {loggedInUser , logout} = userSlice.actions