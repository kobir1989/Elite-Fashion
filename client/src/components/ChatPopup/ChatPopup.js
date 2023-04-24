import React, { useEffect, useState } from 'react'
import Modal from '../Common/Modal/Modal';
import styles from './styles/ChatPopup.module.scss';
import Typography from '../Common/Typography/Typography';
import MessageListItem from './Components/MessageListItem';
import { useGetChatRoomQuery, useGetConversationQuery } from '../../redux/features/chat/chatApi';
import { useSelector } from 'react-redux';
import MessageForm from './Components/MessageForm';
import { socket } from '../../socket';

const ChatPopup = ({ onCloseHandler }) => {
  const [skipConversation, setSkipConversation] = useState(true);
  const [updatedMessages, setUpdatedMessages] = useState([]);
  const { userInfo } = useSelector(state => state?.auth);

  //chat room query
  const { data: [chatRoom] = [] } = useGetChatRoomQuery(
    { userId: userInfo?._id },
    {
      refetchOnMountOrArgChange: true
    });

  //conversation query
  const { data: conversation, isLoading, isError, isSuccess } = useGetConversationQuery(chatRoom?._id, {
    refetchOnMountOrArgChange: true,
    skip: skipConversation
  })

  //if chat room has id property then conversation query will be unSkiped
  useEffect(() => {
    if (chatRoom?._id) {
      setSkipConversation(false)
    }
    if (isSuccess) {
      setUpdatedMessages(conversation?.messages)
    }
  }, [chatRoom?._id, isSuccess])


  //Socket real-time chat 
  useEffect(() => {
    socket.on('message', (message) => {
      setUpdatedMessages(prevMsgs => [...prevMsgs, message])
    })
  }, [])

  //Sorting the conversation array to show the latest message
  const sortedMessages = updatedMessages.slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))

  return (
    <Modal onClose={onCloseHandler}>
      <div className={styles.chat_modal_wrapper}>
        <div className={styles.chat_modal_heading}>
          <img src="/assets/user.jpg" alt="admin" />
          <Typography variant='body'>
            Admin
          </Typography>
        </div>
        {/*chat body */}
        <div className={styles.chat_body_container}>
          <div className={styles.conversation_wrapper}>
            {!isError && !isLoading && sortedMessages?.length > 0 && sortedMessages.map((message) => (
              <MessageListItem
                isSender={userInfo?._id === message?.sender?._id || userInfo?._id === message?.sender ? true : false}
                message={message?.message}
                time={message?.createdAt}
                key={message?._id}
              />
            ))}
          </div>
          <MessageForm roomId={chatRoom?._id} />
        </div>
      </div>
    </Modal>
  )
}

export default ChatPopup;