import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

// Initial State
const initialState = {
  userInfo: null
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserPayload: (state, action) => {
      state.userInfo = action.payload.userPayload
    },
    logout: (state, _action) => {
      state.userInfo = null
      Cookies.remove('jwt')
    }
  }
})

// auth Selector
export const selectAuth = state => state.auth

export default authSlice.reducer
export const { setError, logout, setUserPayload } = authSlice.actions
