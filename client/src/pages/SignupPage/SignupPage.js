import React, { useState, useEffect } from 'react';
import PageLaout from "../../layouts/PageLayout";
import AuthFormLayout from '../../layouts/AuthFormLayout';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import SignupForm from './Components/SignupForm';
import { useSignupMutation } from '../../redux/features/auth/authApi'

//default sign-up state value
const defaulSignupValue = {
   firstName: "",
   lastName: "",
   email: "",
   password: "",
   confirmPassword: ""
}

const SignupPage = () => {
   const [inputData, setInputData] = useState(defaulSignupValue);
   const { firstName, lastName, email, password, confirmPassword } = inputData;
   const [error, setError] = useState(null)
   const [signup, { data: signupResponse, isError, isLoading, error: signupError }] = useSignupMutation();
   const navigate = useNavigate()

   //onChange handler
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setInputData({ ...inputData, [name]: value });
      if (e.target.value !== "") {
         setError(null)
      }
   }

   //submit handler
   const submitHandler = (e) => {
      e.preventDefault()
      if (password && confirmPassword) {
         if (password.length < 8) {
            return setError({ name: "password", message: "Password should not be less then 8 Characters!" });
         }
         if (password !== confirmPassword) {
            return setError({ name: "confirmPassword", message: "Password Did not match!" });
         }
      };
      signup(inputData)
   };

   //catching error and success state to update the UI.
   useEffect(() => {
      if (isError) {
         setError({ name: signupError?.data?.name, message: signupError?.data?.message })
      }
      else if (signupResponse?.token) {
         navigate("/");
         setInputData(defaulSignupValue);
         toast.dismiss()
         toast.success("Welcome! You've successfully signed up")
      }
      // eslint-disable-next-line
   }, [signupResponse?.token, navigate, isError])

   return (
      <PageLaout>
         <AuthFormLayout
            to={"login"}
            title={"Create Your Account"}
            link={"Login"}
            linkText={"Already"}
            error={error ? true : false}
            loading={isLoading}>
            <SignupForm submitHandler={submitHandler}
               onChangeHandler={onChangeHandler}
               firstName={firstName}
               lastName={lastName}
               error={error}
               isLoading={isLoading}
               password={password}
               email={email}
               confirmPassword={confirmPassword} />
         </AuthFormLayout>
      </PageLaout>

   )
}

export default SignupPage;