import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';



const initialState = {
    visibility: false
}

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setVisibility: (state, action) => {
            state.visibility = action.payload.visibility;
        }

    }
})

export default drawerSlice.reducer
export const { setVisibility } = drawerSlice.actions