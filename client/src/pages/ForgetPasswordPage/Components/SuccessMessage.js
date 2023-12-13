import React from 'react'
import Typography from '../../../components/Common/Typography/Typography'
import Button from '../../../components/Common/Button/Button'
import { Link } from 'react-router-dom'
import '../styles/SuccessMessage.module.scss'
import Icons from '../../../components/Common/Icons/Icons'
import styles from '../styles/SuccessMessage.module.scss'

const SuccessMessage = ({ email }) => {
  return (
    <div className={styles.success_message_wrapper}>
      <Typography variant={'h4'}>
        Password Reset Email Sent!
        <Icons name={'check'} color={'#116954'} />
      </Typography>
      <Typography variant={'small'} color={'paragraph'}>
        We have sent a password reset email to the email address associated with
        your <br />
        Account: <span>{email}</span> Please check your inbox and follow the
        instructions to reset your password.
      </Typography>
      <div className={styles.back_btn}>
        <Link to={'/'}>
          <Button variant={'rounded'}>Back</Button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessMessage
