import React from 'react'
import Typography from '../../../components/Common/Typography/Typography'
import Button from '../../../components/Common/Button/Button'
import { LinearProgress } from '@mui/material'
import styles from '../styles/ForgetPasswordForm.module.scss'
import Input from '../../../components/Common/Input/Input'

const ForgetPasswordForm = ({
  loading,
  error,
  email,
  emailChangeHandler,
  formSubmitHandler
}) => {
  return (
    <div className={styles.form_wrappre}>
      <Typography variant={'h4'}>Forgot your password?</Typography>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.loading_progress}>
          {loading && (
            <LinearProgress
              color='secondary'
              sx={{
                borderRadius: '8px 8px 0 0'
              }}
            />
          )}
        </div>
        <Typography variant={'small'} color={'paragraph'}>
          Enter your email address below and we’ll send you a link to reset your
          password
        </Typography>
        <div className={styles.input_wraper}>
          <Input
            error={error ? true : false}
            name={'email'}
            type={'email'}
            full
            size={'small'}
            label={'Email'}
            required={true}
            value={email}
            onChange={emailChangeHandler}
            errorMessage={error ? error : ''}
          />
        </div>
        <Button disabled={loading} type={'submit'} variant={'primary'}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ForgetPasswordForm
