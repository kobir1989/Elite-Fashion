import React from 'react'
import styles from '../styles/Emoji.module.scss';
import { emojiArray } from '../../../staticData/staticData';

const Emoji = ({ onEmojiSelect }) => {

  return (
    <div className={styles.emoji_container}>
      {emojiArray.map((emoji) => (
        <button key={emoji.name}
          emoji={emoji}
          onClick={() => onEmojiSelect(emoji.code)}>
          {emoji.code}
        </button>
      ))}
    </div>
  )
}

export default Emoji;