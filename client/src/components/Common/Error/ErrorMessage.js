import React from 'react'
import Typography from '../Typography/Typography'
import styles from './styles/ErrorMessage.module.scss'
import Icons from '../Icons/Icons'

const ErrorMessage = () => {
  return (
    <div className={styles.error_wrapper}>
      <Typography variant={'h5'} color={'red'}>
        <Icons name={'error'} size={'2.9rem'} color={'#cc2121'} />
        Something went wrong!
      </Typography>
    </div>
  )
}

export default ErrorMessage
