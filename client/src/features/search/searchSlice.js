import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: "",
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchQuery: (state, action) => {
            state.text = action.payload.text;
        }
    }
})

export default searchSlice.reducer
export const { searchQuery } = searchSlice.actions