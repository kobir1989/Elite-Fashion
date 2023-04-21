import React from 'react'
import styles from '../styles/MessageListItem.module.scss';
import Typography from '../../Common/Typography/Typography';
import Icons from '../../Common/Icons/Icons';

const MessageListItem = ({ isUser, message }) => {
  return (
    <div className={isUser ? `${styles.message_list_wapper_end}` : `${styles.message_list_wapper_start}`}>
      <div className={isUser ? `${styles.message_wrapper_blue}` : `${styles.message_wrapper_red}`}>
        <Typography variant='body'>
          {message}
        </Typography>
      </div>
      <div className={styles.message_time}>
        <Typography variant='small'>just now</Typography>
        <Icons name='check' size='1rem' />
      </div>
    </div>

  )
}

export default MessageListItem;