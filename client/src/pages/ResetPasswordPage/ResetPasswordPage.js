import React, { useState, useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/ResetPasswordPage.module.scss";
import Typography from '../../components/Common/Typography/Typography';
import ResetPasswordForm from './Components/ResetPasswordForm';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { postResetPassword } from "../../redux/actions/resetPasswordAction";
import toast from "react-hot-toast";
import { resetPasswordError } from "../../redux/features/auth/resetPasswordSlice";

const ResetPasswordPage = () => {
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [togglePassword, setTogglePassword] = useState(false);
   const [toggleConfirmPass, setToggleConfirmPass] = useState(false);
   const { loading, error, hasResetSuccess } = useSelector(state => state.resetPassword);
   const dispatch = useDispatch()
   const navigate = useNavigate();
   const { resetToken } = useParams()
   console.log(resetToken, "ID")
   //Password onChange Handler
   const onPasswordHandler = (e) => {
      if (password !== "") {
         dispatch(resetPasswordError(null))
      }
      setPassword(e.target.value)
   }
   //Confirm Password onChange Handler
   const onConfiirmPasswordHandler = (e) => {
      if (confirmPassword !== "") {
         dispatch(resetPasswordError(null))
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
   const formSubmitHandler = (e) => {
      e.preventDefault();
      if (password.length < 8 || confirmPassword.length < 8) {
         return dispatch(resetPasswordError("Password should be more then 8 characters"))
      }
      if (password !== confirmPassword) {
         return dispatch(resetPasswordError("Password did not match!"))
      }
      dispatch(postResetPassword({ password, confirmPassword, resetToken }));
   }

   //If request has success property navigate to login page.
   useEffect(() => {
      if (hasResetSuccess) {
         console.log(hasResetSuccess, "YES")
         setConfirmPassword("")
         setPassword("")
         toast.success("Password updated! Please Login to continue...")
         navigate("/login")
      }
   }, [hasResetSuccess, navigate])
   return (
      <PageLayout>
         <div className={styles.reset_password_page_wrapper}>
            <Typography variant={"h4"}>
               Reset Your Password
            </Typography>
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
                  loading={loading}
                  error={error}
                  password={password} />
            </div>
         </div>
      </PageLayout>
   )
}

export default ResetPasswordPage;