import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/ForgetPasswordPage.module.scss";
import ForgetPasswordForm from './Components/ForgetPasswordForm';
import SuccessMessage from './Components/SuccessMessage';
import { useForgetPasswordMutation } from '../../redux/features/auth/authApi'

const ForgetPasswordPage = () => {
   const [email, setEmail] = useState("")
   const [error, setError] = useState(null)
   const [forgetPassword, { isError, isSuccess, isLoading, error: forgetPasswordError }] = useForgetPasswordMutation()

   //onChange Handler
   const emailChangeHandler = (e) => {
      setEmail(e.target.value)
      if (e.target.value !== "") {
         setError(null)
      }
   }
   //Form submit Handler
   const formSubmitHandler = (e) => {
      e.preventDefault()
      forgetPassword({ email })
   }

   useEffect(() => {
      if (isError) {
         setError(forgetPasswordError?.data?.message)
      }
   }, [isError, forgetPasswordError?.data?.message])
   return (
      <PageLayout>
         <div className={styles.forget_password_page_wrapper}>
            {isSuccess ?
               <SuccessMessage email={email} />
               :
               <ForgetPasswordForm
                  error={error}
                  email={email}
                  emailChangeHandler={emailChangeHandler}
                  formSubmitHandler={formSubmitHandler}
                  loading={isLoading} />
            }
         </div>
      </PageLayout>
   )
}

export default ForgetPasswordPage;