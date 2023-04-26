import React from 'react'
import styles from '../styles/MessageListItem.module.scss';
import Typography from '../../Common/Typography/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const MessageListItem = ({ isSender, message, time }) => {
  const messageTimeFromNow = dayjs(time).fromNow();
  return (
    <div className={isSender ? `${styles.message_list_wapper_end}` : `${styles.message_list_wapper_start}`}>
      <div className={isSender ? `${styles.message_wrapper_blue}` : `${styles.message_wrapper_red}`}>
        <Typography variant='body'>
          {message}
        </Typography>
      </div>
      <div className={styles.message_time}>
        <Typography variant='small'>{messageTimeFromNow}</Typography>
      </div>
    </div>

  )
}

export default MessageListItem;