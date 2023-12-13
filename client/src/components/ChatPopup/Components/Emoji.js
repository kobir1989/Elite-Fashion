import React from 'react'
import styles from '../styles/Emoji.module.scss'
import { emojiArray } from '../../../staticData/staticData'

const Emoji = ({ onEmojiSelect, ...props }) => {
  return (
    <div className={styles.emoji_container}>
      {emojiArray.map(emoji => (
        <button
          {...props}
          key={emoji.name}
          emoji={emoji}
          onClick={() => onEmojiSelect(emoji.code)}
        >
          {emoji.code}
        </button>
      ))}
    </div>
  )
}

export default Emoji
