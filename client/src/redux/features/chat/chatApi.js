import { apiSlice } from '../../api/apiSlice';

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChatRoom: builder.mutation({
      query: (data) => ({
        url: '/create/chat-room',
        method: 'POST',
        body: data
      })
    }),
    getChatRoom: builder.query({
      query: ({ userId }) => `/chatRoom/${userId}`,
    }),
    newMessage: builder.mutation({
      query: ({ roomId, data }) => ({
        url: `/new/message/${roomId}`,
        method: 'POST',
        body: data
      })
    }),
    getConversation: builder.query({
      query: (roomId) => `/messages/${roomId}`
    })
  })
});

export const {
  useCreateChatRoomMutation,
  useNewMessageMutation,
  useGetChatRoomQuery,
  useGetConversationQuery
} = chatApi;