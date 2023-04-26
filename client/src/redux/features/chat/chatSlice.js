import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  showChatModal: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChatModal: (state, _action) => {
      state.showChatModal = !state.showChatModal
    },
  }
})

export const { toggleChatModal } = chatSlice.actions;
export default chatSlice.reducer;
