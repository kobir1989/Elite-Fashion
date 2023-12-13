import * as React from 'react'
import Icons from '../Icons/Icons'
import Button from './Button'
import styles from './styles/SliderButton.module.scss'

export const PrevArrow = props => {
  const { onClick } = props
  return (
    <div className={styles.arrow_prev} onClick={onClick}>
      <Button variant={'icon-btn-normal'}>
        <Icons name={'forwardArrow'} size={'1.5rem'} />
      </Button>
    </div>
  )
}

export const NextArrow = props => {
  const { onClick } = props
  return (
    <div className={styles.arrow_next} onClick={onClick}>
      <Button variant={'icon-btn-normal'}>
        <Icons name={'backArrow'} size={'1.5rem'} />
      </Button>
    </div>
  )
}
