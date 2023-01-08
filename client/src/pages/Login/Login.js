import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import AuthFormLayout from '../../layouts/AuthFormLayout';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

const Login = () => {
   return (
      <PageLayout>
         <AuthFormLayout
            to={"signup"}
            title={"Login to Your Account"}
            link={"Signup"}
            linkText={"Don't"}
            img={"/assets/women-red.jpg"}>
            <form className={styles.login_form}>
               <div>
                  <Input
                     // error
                     type={"email"}
                     label={"Email"}
                     full
                  />
               </div>
               <div>
                  <Input
                     // error
                     type={"password"}
                     label={"Password"}
                     full
                  />

               </div>
               <Button variant={"btn-black"} type={"submit"}>
                  Login
               </Button>
               <Button variant={"primary"} type={"button"}>
                  <img src="/assets/icons8-google.svg" alt="" /> Continue with Google
               </Button>
            </form>
            <div class={styles.forget_password_link}>
               <Link to="/">Forgot Your Password?</Link>
            </div>
         </AuthFormLayout>
      </PageLayout >
   )
}

export default Login