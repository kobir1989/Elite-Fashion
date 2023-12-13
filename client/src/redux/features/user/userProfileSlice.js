import { createSlice } from '@reduxjs/toolkit'
import { updateUserProfile } from './userProfileApi'

const initialState = {
  error: null,
  isLoading: false,
  updateSuccess: false
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setHasError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    setUpdateSuccess: (state, action) => {
      state.updateSuccess = action.payload
    }
  },
  extraReducers: builder => {
    // Update profile Post request.
    builder.addCase(updateUserProfile.pending, (state, _action) => {
      state.isLoading = true
      state.error = null
      state.updateSuccess = false
    })
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateSuccess = action.payload.success
      state.error = null
    })
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
      state.updateSuccess = false
    })
  }
})

export const { setHasError, setUpdateSuccess } = userProfileSlice.actions
export default userProfileSlice.reducer
