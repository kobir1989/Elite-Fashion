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
import { isAuth } from "../../helpers/isAuth.helper";

const defaultLoginValue = {
   email: "",
   password: ""
};

const LoginPage = () => {
   const [loginValue, setLoginValue] = useState(defaultLoginValue);
   const { email, password } = loginValue;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {
      loading,
      error,
      userInfo
   } = useSelector(state => state.auth);
   const isLoggedIn = isAuth(userInfo)

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

   useEffect(() => {
      if (isLoggedIn) {
         navigate("/");
         toast.success("Welcome Back");
         setLoginValue(defaultLoginValue);
      }
   }, [isLoggedIn, navigate])

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
                     name="email"
                     value={email}
                     onChange={onChangeHandler}
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
                     name="password"
                     value={password}
                     onChange={onChangeHandler}
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
               <Typography variant={"body"}>
                  <Link to="/">
                     Forgot Your Password?
                  </Link>
               </Typography>
            </div>
         </AuthFormLayout>
      </PageLayout >
   )
}

export default LoginPage;