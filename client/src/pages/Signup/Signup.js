import React, { useState } from 'react';
import PageLaout from "../../layouts/PageLayout";
import styles from "./Signup.module.scss";
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import AuthFormLayout from '../../layouts/AuthFormLayout';

const Signup = () => {
   const [] = useState({});
   const submitHandler = (e) => {
      e.preventDefault()
   }
   return (
      <PageLaout>
         <AuthFormLayout
            to={"login"}
            title={"Create Your Account"}
            link={"Login"}
            linkText={"Already"}>
            <form onSubmit={submitHandler} className={styles.signup_form}>
               <div>
                  <Input
                     // error
                     type={"text"}
                     label={"Last Name"}
                     full
                  />
               </div>
               <div>
                  <Input
                     // error
                     type={"text"}
                     label={"First Name"}
                     full
                  />
               </div>
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
               <div>
                  <Input
                     // error
                     type={"password"}
                     label={"Confirm Password"}
                     full
                  />
               </div>
               <Button variant={"btn-black"} type={"submit"}>
                  Create Account
               </Button>
               <Button variant={"primary"} type={"button"}>
                  <img src="/assets/icons8-google.svg" alt="google.svg" /> Continue with Google
               </Button>
            </form>
         </AuthFormLayout>
      </PageLaout>

   )
}

export default Signup;