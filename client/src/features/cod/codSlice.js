import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';



const initialState = {
    cod: false
}

const codSlice = createSlice({
    name: "cod",
    initialState,
    reducers: {
        changeCod: (state, action) => {
            state.cod = action.payload.cod;
        }

    }
})

export default codSlice.reducer
export const { changeCod } = codSlice.actions