import React, { useState, useEffect } from 'react';
import PageLaout from "../../layouts/PageLayout";
import styles from "./Signup.module.scss";
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import AuthFormLayout from '../../layouts/AuthFormLayout';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../redux/actions/authAction";
import toast from 'react-hot-toast';
import { setError } from '../../redux/features/authSlice';

const defaulSignupValue = {
   firstName: "",
   lastName: "",
   email: "",
   password: "",
   confirmPassword: ""
}

const Signup = () => {
   const [inputData, setInputData] = useState(defaulSignupValue);
   const { firstName, lastName, email, password, confirmPassword } = inputData;
   const { error, loading, success } = useSelector(state => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate()

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
      if (success) {
         navigate("/");
         setInputData(defaulSignupValue);
         toast.success("Signup Successfull")
      }
   }, [success, navigate])

   return (
      <PageLaout>
         <AuthFormLayout
            to={"login"}
            title={"Create Your Account"}
            link={"Login"}
            linkText={"Already"}
            loading={loading}>
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