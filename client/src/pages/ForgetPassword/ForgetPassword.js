import React, { useState } from 'react';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import Typography from '../../components/Common/Typography/Typography';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/ForgetPassword.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postForgetPassword } from "../../redux/actions/forgetPasswordAction"
import { setError } from "../../redux/features/authSlice";
import LinearProgress from '@mui/material/LinearProgress';
import Icons from '../../components/Common/Icons/Icons';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
   const [email, setEmail] = useState("")
   const dispatch = useDispatch()
   const navigate = useNavigate()
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
               <div className={styles.success_message_wrapper}>
                  <Typography variant={"h4"}>
                     Password Reset Email Sent!
                     <Icons name={"check"} color={"#116954"} />
                  </Typography>
                  <Typography variant={"small"} color={"paragraph"}>
                     We have sent a password reset email to the email address associated with your <br />Account: <span>{email}</span> Please check your inbox and follow the instructions to reset your password.
                  </Typography>
                  <div className={styles.back_btn}>
                     <Button
                        variant={"rounded"}
                        onClick={() => { navigate("/") }}>
                        Back
                     </Button>
                  </div>
               </div> :
               <>
                  <Typography variant={"h4"}>Forgot your password?</Typography>
                  <form onSubmit={formSubmitHandler}>
                     <div className={styles.loading_progress}>
                        {loading &&
                           <LinearProgress
                              color="secondary"
                              sx={{
                                 borderRadius: "8px 8px 0 0"
                              }} />
                        }
                     </div>
                     <Typography variant={"small"} color={"paragraph"}>
                        Enter your email address below and we’ll send you a link to reset your password
                     </Typography>
                     <div className={styles.input_wraper}>
                        <Input
                           error={error ? true : false}
                           name={"email"}
                           type={"email"}
                           full size={"small"}
                           label={"Email"}
                           required={true}
                           value={email}
                           onChange={emailChangeHandler}
                           errorMessage={error ? error.message : ""}
                        />
                     </div>
                     <Button type={"submit"} variant={"primary"}>
                        Submit
                     </Button>
                  </form>
               </>
            }
         </div>
      </PageLayout>
   )
}

export default ForgetPassword;