import React, { useState, useEffect } from 'react'
import PageLayout from '../../layouts/PageLayout'
import styles from './styles/ResetPasswordPage.module.scss'
import Typography from '../../components/Common/Typography/Typography'
import ResetPasswordForm from './Components/ResetPasswordForm'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useResetPasswordMutation } from '../../redux/features/auth/authApi'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)
  const [toggleConfirmPass, setToggleConfirmPass] = useState(false)
  const [error, setError] = useState(null)
  const [resetPassword, { isLoading, isError, isSuccess, error: resetError }] =
    useResetPasswordMutation()
  const navigate = useNavigate()
  const { resetToken } = useParams()

  //Password onChange Handler
  const onPasswordHandler = e => {
    if (password !== '') {
      setError(null)
    }
    setPassword(e.target.value)
  }
  //Confirm Password onChange Handler
  const onConfiirmPasswordHandler = e => {
    if (confirmPassword !== '') {
      setError(null)
    }
    setConfirmPassword(e.target.value)
  }
  //Password view Toggle Handler
  const togglePasswordHanadler = () => {
    setTogglePassword(!togglePassword)
  }
  //Confirm Password view Toggle Handler
  const toggleConfirmPasswordHanadler = () => {
    setToggleConfirmPass(!toggleConfirmPass)
  }
  //Form onSubmit Handler
  const formSubmitHandler = e => {
    e.preventDefault()
    if (password.length < 8 || confirmPassword.length < 8) {
      return setError('Password should be more then 8 characters')
    }
    if (password !== confirmPassword) {
      return setError('Password did not match!')
    }
    resetPassword({ resetToken, password, confirmPassword })
  }

  //If request has success property navigate to login page.
  useEffect(() => {
    if (isError) {
      setError(resetError?.data?.message)
    } else if (isSuccess) {
      setConfirmPassword('')
      setPassword('')
      toast.success('Password updated! Please Login to continue...')
      navigate('/login')
    }
  }, [isSuccess, navigate, isError, resetError?.data?.message])
  return (
    <PageLayout>
      <div className={styles.reset_password_page_wrapper}>
        <Typography variant={'h4'}>Reset Your Password</Typography>
        <div className={styles.reset_form_wrapper}>
          <ResetPasswordForm
            passwordHandler={onPasswordHandler}
            confirmPasswordHandler={onConfiirmPasswordHandler}
            confirmPassword={confirmPassword}
            formSubmitHandler={formSubmitHandler}
            togglePassword={togglePassword}
            toggleConfirmPass={toggleConfirmPass}
            togglePasswordHanadler={togglePasswordHanadler}
            toggleConfirmPasswordHanadler={toggleConfirmPasswordHanadler}
            loading={isLoading}
            error={error}
            password={password}
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default ResetPasswordPage
