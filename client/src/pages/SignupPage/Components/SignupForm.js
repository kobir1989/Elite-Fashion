import React from 'react';
import Button from '../../../components/Common/Button/Button';
import Input from '../../../components/Common/Input/Input';
import styles from "../styles/SignupPage.module.scss";
const SignupForm = ({
   submitHandler,
   onChangeHandler,
   firstName,
   lastName,
   error,
   password,
   email,
   confirmPassword
}) => {
   return (
      <div>
         <form onSubmit={submitHandler} className={styles.signup_form}>
            <div>
               <Input
                  error={error?.name === "firstName" ? true : false}
                  required={true}
                  type={"text"}
                  label={"First Name"}
                  full
                  onChange={onChangeHandler}
                  name={"firstName"}
                  value={firstName}
                  size={"small"}
                  helperText={
                     error?.name === "firstName" ? error.message : ""
                  }
               />
            </div>
            <div>
               <Input
                  error={error?.name === "lastName" ? true : false}
                  required={true}
                  type={"text"}
                  label={"Last Name"}
                  full
                  name={"lastName"}
                  onChange={onChangeHandler}
                  value={lastName}
                  size={"small"}
                  helperText={
                     error?.name === "lastName" ? error.message : ""
                  }
               />
            </div>
            <div>
               <Input
                  error={error?.name === "email" ? true : false}
                  required={true}
                  type={"email"}
                  label={"Email"}
                  full
                  name={"email"}
                  onChange={onChangeHandler}
                  value={email}
                  size={"small"}
                  helperText={error?.name === "email" ? error.message : ""}
               />
            </div>
            <div>
               <Input
                  error={error?.name === "password" ? true : false}
                  required={true}
                  type={"password"}
                  label={"Password"}
                  full
                  name={"password"}
                  onChange={onChangeHandler}
                  value={password}
                  size={"small"}
                  helperText={error?.name === "password" ? error.message : ""}
               />

            </div>
            <div>
               <Input
                  error={error?.name === "confirmPassword" ? true : false}
                  required={true}
                  type={"password"}
                  label={"Confirm Password"}
                  full
                  name={"confirmPassword"}
                  onChange={onChangeHandler}
                  value={confirmPassword}
                  size={"small"}
                  helperText={error?.name === "confirmPassword" ? error.message : ""}
               />
            </div>
            <Button variant={"primary"} type={"submit"}>
               Create Account
            </Button>
            <Button variant={"btn-border-black"} type={"button"}>
               <img src="/assets/icons8-google.svg" alt="google.svg" /> Continue with Google
            </Button>
         </form>
      </div>
   )
}

export default SignupForm