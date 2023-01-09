import React, { useState } from 'react';
import PageLaout from "../../layouts/PageLayout";
import styles from "./Signup.module.scss";
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import AuthFormLayout from '../../layouts/AuthFormLayout';
import { useHttpHook } from "../../hooks/useHttpHook";
import { useNavigate } from "react-router-dom";

const defaulInputFeald = {
   firstName: "",
   lastName: "",
   email: "",
   password: "",
   confirmPassword: ""
}

const Signup = () => {
   const [inputData, setInputData] = useState(defaulInputFeald);
   const [hasError, setHasError] = useState(null)
   const { firstName, lastName, email, password, confirmPassword } = inputData;
   const { isLoading, errorFromServer, sendRequest } = useHttpHook();
   const navigate = useNavigate()
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setInputData({ ...inputData, [name]: value });
   }

   const submitHandler = (e) => {
      e.preventDefault()
      if (password && confirmPassword) {
         if (password.length < 8) {
            return setHasError({ name: "password", message: "Password should not be less then 8 Characters!" })
         }
         if (password !== confirmPassword) {
            return setHasError({ name: "confirmPassword", message: "Password Did not match!" })
         }
      }
      sendRequest({ method: "post", url: "auth/signup", postData: inputData });
      setHasError(null)
      if (errorFromServer) {
         setInputData(defaulInputFeald);
      }
      navigate("/login")
   };

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
                     error={errorFromServer?.name === "firstName" ? true : false}
                     required={true}
                     type={"text"}
                     label={"First Name"}
                     full
                     onChange={onChangeHandler}
                     name={"firstName"}
                     value={firstName}
                     size={"small"}
                     helperText={
                        errorFromServer?.name === "firstName" ? errorFromServer.message : ""
                     }
                  />
               </div>
               <div>
                  <Input
                     error={errorFromServer?.name === "lastName" ? true : false}
                     required={true}
                     type={"text"}
                     label={"Last Name"}
                     full
                     name={"lastName"}
                     onChange={onChangeHandler}
                     value={lastName}
                     size={"small"}
                     helperText={
                        errorFromServer?.name === "lastName" ? errorFromServer.message : ""
                     }
                  />
               </div>
               <div>
                  <Input
                     error={errorFromServer?.name === "email" ? true : false}
                     required={true}
                     type={"email"}
                     label={"Email"}
                     full
                     name={"email"}
                     onChange={onChangeHandler}
                     value={email}
                     size={"small"}
                     helperText={errorFromServer?.name === "email" ? errorFromServer.message : ""}
                  />
               </div>
               <div>
                  <Input
                     error={hasError?.name || errorFromServer?.name === "password" ? true : false}
                     required={true}
                     type={"password"}
                     label={"Password"}
                     full
                     name={"password"}
                     onChange={onChangeHandler}
                     value={password}
                     size={"small"}
                     helperText={
                        hasError?.name || errorFromServer?.name === "password" ? hasError?.message || errorFromServer.message : ""
                     }
                  />

               </div>
               <div>
                  <Input
                     error={hasError?.name || errorFromServer?.name === "confirmPassword" ? true : false}
                     required={true}
                     type={"password"}
                     label={"Confirm Password"}
                     full
                     name={"confirmPassword"}
                     onChange={onChangeHandler}
                     value={confirmPassword}
                     size={"small"}
                     helperText={
                        hasError?.name || errorFromServer?.name === "confirmPassword" ? hasError.message || errorFromServer.message : ""
                     }
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