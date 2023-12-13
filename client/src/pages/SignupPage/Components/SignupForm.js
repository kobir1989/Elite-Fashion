import React, { useState } from 'react'
import Button from '../../../components/Common/Button/Button'
import Input from '../../../components/Common/Input/Input'
import styles from '../styles/SignupPage.module.scss'
import Icons from '../../../components/Common/Icons/Icons'

const SignupForm = ({
  submitHandler,
  onChangeHandler,
  firstName,
  lastName,
  error,
  isLoading,
  password,
  email,
  confirmPassword
}) => {
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)
  const toggleViewPassword = () => {
    setViewPassword(!viewPassword)
  }
  const toggleViewConfirmPassword = () => {
    setViewConfirmPassword(!viewConfirmPassword)
  }
  return (
    <div>
      <form onSubmit={submitHandler} className={styles.signup_form}>
        <div>
          <Input
            error={
              error?.name === 'firstName' || error?.name === 'name'
                ? true
                : false
            }
            required={true}
            type={'text'}
            label={'First Name'}
            full
            onChange={onChangeHandler}
            name={'firstName'}
            value={firstName}
            size={'small'}
            helperText={error?.name === 'firstName' ? error.message : ''}
          />
        </div>
        <div>
          <Input
            error={error?.name === 'firstName' ? true : false}
            required={true}
            type={'text'}
            label={'Last Name'}
            full
            name={'lastName'}
            onChange={onChangeHandler}
            value={lastName}
            size={'small'}
            helperText={error?.name === 'firstName' ? error.message : ''}
          />
        </div>
        <div>
          <Input
            error={
              error?.name === 'email' || error?.name === 'name' ? true : false
            }
            required={true}
            type={'email'}
            label={'Email'}
            full
            name={'email'}
            onChange={onChangeHandler}
            value={email}
            size={'small'}
            helperText={
              error?.name === 'email' || error?.name === 'name'
                ? error.message
                : ''
            }
          />
        </div>
        <div className={styles.password_input_wrapper}>
          <div className={styles.view_password}>
            <Button variant={'icon-btn-normal'} onClick={toggleViewPassword}>
              <Icons
                name={viewPassword ? 'eyeClosed' : 'eyeOpen'}
                color={'#b5b5b5'}
                size={'1.3rem'}
              />
            </Button>
          </div>
          <Input
            error={error?.name === 'password' ? true : false}
            required={true}
            type={viewPassword ? 'text' : 'password'}
            label={'Password'}
            full
            name={'password'}
            onChange={onChangeHandler}
            value={password}
            size={'small'}
            helperText={error?.name === 'password' ? error.message : ''}
          />
        </div>
        <div className={styles.confirm_password_input_wrapper}>
          <div className={styles.view_password}>
            <Button
              variant={'icon-btn-normal'}
              onClick={toggleViewConfirmPassword}
            >
              <Icons
                name={viewConfirmPassword ? 'eyeClosed' : 'eyeOpen'}
                color={'#b5b5b5'}
                size={'1.3rem'}
              />
            </Button>
          </div>
          <Input
            error={error?.name === 'confirmPassword' ? true : false}
            required={true}
            type={viewConfirmPassword ? 'text' : 'password'}
            label={'Confirm Password'}
            full
            name={'confirmPassword'}
            onChange={onChangeHandler}
            value={confirmPassword}
            size={'small'}
            helperText={error?.name === 'confirmPassword' ? error.message : ''}
          />
        </div>
        <Button disabled={isLoading} variant={'primary'} type={'submit'}>
          Create Account
        </Button>
        {/* <Button variant={"btn-border-black"} type={"button"}>
               <img src="/assets/icons8-google.svg" alt="google.svg" /> Continue with Google
            </Button> */}
      </form>
    </div>
  )
}

export default SignupForm
