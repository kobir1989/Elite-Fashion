import React, { useEffect, useState } from 'react'
import Modal from '../Common/Modal/Modal';
import styles from './styles/ChatPopup.module.scss';
import Typography from '../Common/Typography/Typography';
import MessageListItem from './Components/MessageListItem';
import { useGetChatRoomQuery, useGetConversationQuery } from '../../redux/features/chat/chatApi';
import { useSelector } from 'react-redux';
import MessageForm from './Components/MessageForm';
import { socket } from '../../socket';
import TextSkeleton from '../Common/Skeleton/TextSkeleton';

const ChatPopup = ({ onCloseHandler }) => {
  const [messages, setMessages] = useState([])
  const { userInfo } = useSelector(state => state?.auth);

  //chat room query
  const { data: [chatRoom] = [] } = useGetChatRoomQuery(
    { userId: userInfo?._id },
    {
      refetchOnMountOrArgChange: true
    });
  //conversation query
  const { data: conversation = [], isLoading, isSuccess, isFetching } = useGetConversationQuery(chatRoom?._id, {
    refetchOnMountOrArgChange: true,
  })
  useEffect(() => {
    if (isSuccess || isFetching) {
      setMessages(conversation?.messages)
    }
    // eslint-disable-next-line
  }, [isSuccess, isFetching])

  // listen for incoming messages
  useEffect(() => {
    socket.on("getMessage", (message) => {
      // console.log(message, 'SOCKET_CLIENT_MESSAGE')
      const notification = new Audio('/assets/Notification.mp3');
      notification.play();
      setMessages(prevMsg => [...prevMsg, message])
    });
    // clean up event listener
    return () => socket.off("getMessage");
  }, [])

  //Sorting the conversation array to show the latest message
  const sortedMessages = messages?.length > 0 ? messages.slice().sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)) : null

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
            {isLoading && <TextSkeleton row={6} height={10} />}
            {sortedMessages?.length > 0 && sortedMessages.map((message) => (
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