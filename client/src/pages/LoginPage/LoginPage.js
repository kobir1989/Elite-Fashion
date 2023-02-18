import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import AuthFormLayout from '../../layouts/AuthFormLayout';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import styles from "./styles/LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/authAction";
import toast from 'react-hot-toast';
import { setError } from "../../redux/features/authSlice";
import Icons from '../../components/Common/Icons/Icons';

const defaultLoginValue = {
   email: "",
   password: ""
};

const LoginPage = () => {
   const [loginValue, setLoginValue] = useState(defaultLoginValue);
   const { email, password } = loginValue;
   const [viewPassword, setViewPassword] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {
      loading,
      error,
      token
   } = useSelector(state => state.auth);

   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setLoginValue({ ...loginValue, [name]: value });
      if (e.target.value !== "") {
         dispatch(setError(null))
      }
   }

   const submitHandler = (e) => {
      e.preventDefault();
      if (password.length < 8) {
         return dispatch(setError({ message: "Incorrect Email or Password" }))
      }
      dispatch(userLogin(loginValue));
   };
   const toggleViewPassword = () => {
      setViewPassword(!viewPassword)
   }
   useEffect(() => {
      if (token) {
         navigate("/");
         toast.dismiss()
         toast.success("Welcome Back");
         setLoginValue(defaultLoginValue);
      }
   }, [token, navigate])

   return (
      <PageLayout>
         <AuthFormLayout
            to={"signup"}
            title={"Login to Your Account"}
            link={"Signup"}
            linkText={"Don't"}
            img={"/assets/women-red.jpg"}
            error={error}
            loading={loading}>
            <form className={styles.login_form} onSubmit={submitHandler}>
               <div className={styles.email_input_wrapper}>
                  <Input
                     required={true}
                     error={error ? true : false}
                     type={"email"}
                     label={"Email"}
                     size={"small"}
                     full
                     name="email"
                     value={email}
                     onChange={onChangeHandler}
                     helperText={
                        error ? error.message : ""
                     }
                  />
               </div>
               <div className={styles.password_input_wrapper}>
                  <div className={styles.view_password}>
                     <Button
                        variant={"icon-btn-normal"}
                        onClick={toggleViewPassword}>
                        <Icons
                           name={viewPassword ? "eyeClosed" : "eyeOpen"}
                           color={"#b5b5b5"} />
                     </Button>
                  </div>
                  <Input
                     required={true}
                     error={error ? true : false}
                     type={viewPassword ? "text" : "password"}
                     label={"Password"}
                     full
                     size={"small"}
                     name="password"
                     value={password}
                     onChange={onChangeHandler}
                     helperText={
                        error ? error.message : ""
                     }
                  />
               </div>
               <Button variant={"primary"} type={"submit"}>
                  Login
               </Button>
               <Button variant={"btn-border-black"} type={"button"}>
                  <img src="/assets/icons8-google.svg" alt="" /> Continue with Google
               </Button>
            </form>
            <div className={styles.forget_password_link}>
               <Typography variant={"body"}>
                  <Link to="/forget/password">
                     Forgot Your Password?
                  </Link>
               </Typography>
            </div>
         </AuthFormLayout>
      </PageLayout >
   )
}

export default LoginPage;