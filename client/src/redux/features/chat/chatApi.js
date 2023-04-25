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
      query: ({ userId }) => `/chat-room/${userId}`,
    }),

    getConversation: builder.query({
      query: (roomId) => `/messages/${roomId}`
    }),

    newMessage: builder.mutation({
      query: ({ roomId, data }) => ({
        url: `/new/message/${roomId}`,
        method: 'POST',
        body: data
      }),

      // pessimistic update the cache.
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(apiSlice.util.updateQueryData('getConversation', arg.roomId, (draft) => {
            draft?.messages.push(response?.data?.newMessage)
          }))
        } catch (error) {
          console.log(error)
        }
      }
    }),
  })
});

export const {
  useCreateChatRoomMutation,
  useNewMessageMutation,
  useGetChatRoomQuery,
  useGetConversationQuery
} = chatApi;