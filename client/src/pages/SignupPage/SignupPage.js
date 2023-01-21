import React, { useState, useEffect } from 'react';
import PageLaout from "../../layouts/PageLayout";
import AuthFormLayout from '../../layouts/AuthFormLayout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../redux/actions/authAction";
import toast from 'react-hot-toast';
import { setError } from '../../redux/features/authSlice';
import SignupForm from './Components/SignupForm';

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
   const { error, loading, userInfo } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate()
   console.log(userInfo, "SSS")
   const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setInputData({ ...inputData, [name]: value });
      if (e.target.value !== "") {
         dispatch(setError(null))
      }
   }

   const submitHandler = (e) => {
      e.preventDefault()
      if (password && confirmPassword) {
         if (password.length < 8) {
            return dispatch(setError({ name: "password", message: "Password should not be less then 8 Characters!" }));
         }
         if (password !== confirmPassword) {
            return dispatch(setError({ name: "confirmPassword", message: "Password Did not match!" }));
         }
      };
      dispatch(userSignup(inputData));
   };

   useEffect(() => {
      if (userInfo?._id) {
         navigate("/");
         setInputData(defaulSignupValue);
         toast.success("Signup Successfull")
      }
   }, [userInfo?._id, navigate])

   return (
      <PageLaout>
         <AuthFormLayout
            to={"login"}
            title={"Create Your Account"}
            link={"Login"}
            linkText={"Already"}
            loading={loading}>
            <SignupForm submitHandler={submitHandler}
               onChangeHandler={onChangeHandler}
               firstName={firstName}
               lastName={lastName}
               error={error}
               password={password}
               email={email}
               confirmPassword={confirmPassword} />
         </AuthFormLayout>
      </PageLaout>

   )
}

export default SignupPage;