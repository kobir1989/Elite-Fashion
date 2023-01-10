import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import AuthFormLayout from '../../layouts/AuthFormLayout';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/authAction";
import toast from 'react-hot-toast';

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const { loading, error, success } = useSelector(state => state.auth);
   console.log(success)
   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(userLogin({ email, password }));
   };

   useEffect(() => {
      if (success) {
         navigate("/");
         toast.success("Login Successfull")
      }
   }, [success])

   return (
      <PageLayout>
         <AuthFormLayout
            to={"signup"}
            title={"Login to Your Account"}
            link={"Signup"}
            linkText={"Don't"}
            img={"/assets/women-red.jpg"}
            loading={loading}>
            <form className={styles.login_form} onSubmit={submitHandler}>
               <div>
                  <Input
                     required={true}
                     error={error ? true : false}
                     type={"email"}
                     label={"Email"}
                     full
                     value={email}
                     onChange={(e) => { setEmail(e.target.value) }}
                     helperText={
                        error ? error.message : ""
                     }
                  />
               </div>
               <div>
                  <Input
                     required={true}
                     error={error ? true : false}
                     type={"password"}
                     label={"Password"}
                     full
                     value={password}
                     onChange={(e) => { setPassword(e.target.value) }}
                     helperText={
                        error ? error.message : ""
                     }
                  />

               </div>
               <Button variant={"btn-black"} type={"submit"}>
                  Login
               </Button>
               <Button variant={"primary"} type={"button"}>
                  <img src="/assets/icons8-google.svg" alt="" /> Continue with Google
               </Button>
            </form>
            <div className={styles.forget_password_link}>
               <Typography variant={"body"}> <Link to="/">Forgot Your Password?</Link></Typography>
            </div>
         </AuthFormLayout>
      </PageLayout >
   )
}

export default Login