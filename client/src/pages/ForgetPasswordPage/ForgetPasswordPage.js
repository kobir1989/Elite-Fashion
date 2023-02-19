import React, { useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/ForgetPasswordPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postForgetPassword } from "../../redux/actions/forgetPasswordAction"
import { setError } from "../../redux/features/authSlice";
import ForgetPasswordForm from './Components/ForgetPasswordForm';
import SuccessMessage from './Components/SuccessMessage';

const ForgetPasswordPage = () => {
   const [email, setEmail] = useState("")
   const dispatch = useDispatch()
   const { loading, error, isRequestSuccess } = useSelector(state => state.forgetPassword);
   // console.log(isRequestSuccess, "SUCCESS")
   //onChange Handler
   const emailChangeHandler = (e) => {
      setEmail(e.target.value)
      if (e.target.value !== "") {
         dispatch(setError(null))
      }
   }
   //Form submit Handler
   const formSubmitHandler = (e) => {
      e.preventDefault()
      dispatch(postForgetPassword({ email }));
   }
   return (
      <PageLayout>
         <div className={styles.forget_password_page_wrapper}>
            {isRequestSuccess ?
               <SuccessMessage email={email} />
               :
               <ForgetPasswordForm
                  error={error}
                  email={email}
                  emailChangeHandler={emailChangeHandler}
                  formSubmitHandler={formSubmitHandler}
                  loading={loading} />
            }
         </div>
      </PageLayout>
   )
}

export default ForgetPasswordPage;