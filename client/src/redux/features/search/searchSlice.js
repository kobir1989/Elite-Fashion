import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openSearchBox: false
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setOpenSearchBox: (state, action) => {
      state.openSearchBox = action.payload
    }
  }
})

export const { setOpenSearchBox } = searchSlice.actions

export default searchSlice.reducer
