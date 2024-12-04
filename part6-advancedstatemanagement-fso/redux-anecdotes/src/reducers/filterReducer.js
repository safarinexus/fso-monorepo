import { createSlice } from '@reduxjs/toolkit' 

const filterSlice = createSlice({
    name: "filter", 
    initialState: '', 
    reducers: {
        filterChange(state, action) {
            if (state !== action.payload) {
                state = action.payload
            }
            return state
        }
    }
})


export const { filterChange } = filterSlice.actions
export default filterSlice.reducer