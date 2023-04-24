import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNewMessageMutation } from '../../../redux/features/chat/chatApi';
import Button from '../../Common/Button/Button';
import Icons from '../../Common/Icons/Icons';
import styles from '../styles/MessageForm.module.scss';
import Emoji from './Emoji';
import { AnimatePresence, motion } from 'framer-motion';
import { socket } from '../../../socket'

const MessageForm = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const { userInfo } = useSelector(state => state?.auth)
  const [newMessage] = useNewMessageMutation()
  const [toggleEmoji, setToggleEmoji] = useState(false);

  //Emoji select handler
  const handleEmojiSelect = (emojiCode) => {
    setMessage((text) => text + emojiCode);
  };

  const handleEmoji = () => {
    setToggleEmoji(!toggleEmoji)
  }
  //onSubmit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      message,
      sender: userInfo?._id,
      receiver: '63fa2849be7d427bf4c9b164'
    }
    newMessage(
      {
        roomId,
        data: data
      }
    )
    setMessage('')
    setToggleEmoji(false)
    socket.emit('message', data)
  }


  return (
    <div className={styles.message_form_wrapper}>
      <AnimatePresence>
        {toggleEmoji &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className={styles.emoji_wrapper}
          >
            <Emoji onEmojiSelect={handleEmojiSelect} />
          </motion.div>
        }
      </AnimatePresence>

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
        <div className={styles.emoji_icon_button}>
          <Button variant='icon-btn-normal' onClick={handleEmoji}>
            <Icons name='emoji' />
          </Button>
        </div>
        <Button variant='icon-btn-normal' type='submit'>
          <Icons name='sendIcon' />
        </Button>
      </form>
    </div>
  )
}

export default MessageForm;