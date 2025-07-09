import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';



const initialState = {
    email : "",
    token : "",
    name : "" , 
    role : "" , 
    _id : "" 
}

const userSlice = createSlice({
    name : "user" , 
    initialState , 
    reducers : {
        loggedInUser : (state , action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state._id = action.payload._id;
            //console.table(state.email , state.token );
        },
        logout : (state) => {
            state.email = null;
            state.token = null;
            state.name = null;
            state.role = null;
            state._id = null;
            
        }
        
    }
})

export default userSlice.reducer
export const {loggedInUser , logout} = userSlice.actions