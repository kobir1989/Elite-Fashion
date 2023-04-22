import React, { useEffect, useState } from 'react'
import Modal from '../Common/Modal/Modal';
import styles from './styles/ChatPopup.module.scss';
import Typography from '../Common/Typography/Typography';
import Icons from '../Common/Icons/Icons';
import Button from '../Common/Button/Button';
import MessageListItem from './Components/MessageListItem';
import { useNewMessageMutation, useGetChatRoomQuery, useGetConversationQuery } from '../../redux/features/chat/chatApi';
import { useSelector } from 'react-redux';

const ChatPopup = ({ onCloseHandler }) => {
  const [skipConversation, setSkipConversation] = useState(true)
  const [message, setMessage] = useState('');
  const { userInfo } = useSelector(state => state?.auth)
  const [newMessage] = useNewMessageMutation()
  const { data: [chatRoom] = [] } = useGetChatRoomQuery(
    { userId: userInfo?._id },
    {
      refetchOnMountOrArgChange: true
    });
  const { data: conversation, isLoading, isError } = useGetConversationQuery(chatRoom?._id, {
    refetchOnMountOrArgChange: true,
    skip: skipConversation
  })


  //onSubmit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    newMessage(
      {
        roomId: chatRoom?._id,
        data: {
          message,
          sender: userInfo?._id,
          receiver: '63fa2849be7d427bf4c9b164'
        }
      }
    )
    setMessage('')
  }

  useEffect(() => {
    if (chatRoom?._id) {
      setSkipConversation(false)
    }
  }, [chatRoom?._id])
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
            <MessageListItem
              isSender={false}
              message="Welcome to Elite Fashion! We're here to help you find what you're looking for and make your shopping experience as smooth as possible. Ask us anything!"
              time={Date.now()}
            />
            {!isError && !isLoading && conversation?.messages?.length > 0 && conversation?.messages.map((message) => (
              <MessageListItem
                isSender={userInfo?._id === message?.sender ? true : false}
                message={message?.message}
                time={message?.createdAt}
                key={message?._id}
              />
            ))}
          </div>
          <div className={styles.message_form_wrapper}>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='message'
                placeholder='Message'
                required
                autoComplete='off'
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
              />
              <Button variant='icon-btn-normal' type='submit'>
                <Icons name='sendIcon' />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>

  )
}

export default ChatPopup;