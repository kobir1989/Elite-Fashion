import React, { useState } from 'react'
import Modal from '../Common/Modal/Modal';
import styles from './styles/ChatPopup.module.scss';
import Typography from '../Common/Typography/Typography';
import Icons from '../Common/Icons/Icons';
import Button from '../Common/Button/Button';
import MessageListItem from './Components/MessageListItem';

const ChatPopup = ({ onCloseHandler }) => {
  const [message, setMessage] = useState('')

  //onSubmit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
  }
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
            <MessageListItem isUser={false} message="  Welcome to Elite Fashion! We're here to help you find what you're looking for and make your shopping experience as smooth as possible. Ask us anything!" />
            <MessageListItem isUser={true} message='Hello There' />
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