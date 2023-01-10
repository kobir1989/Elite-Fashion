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
   const { error, loading, success } = useSelector(state => state.auth);
   console.log(success, "SIGNUP PAGE")
   const dispatch = useDispatch();
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
      };
      dispatch(userSignup(inputData));
   };

   useEffect(() => {
      if (success) {
         navigate("/");
         setInputData(defaulInputFeald);
         toast.success("Signup Successfull")
      }
   }, [success])

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
                     error={hasError?.name || error?.name === "password" ? true : false}
                     required={true}
                     type={"password"}
                     label={"Password"}
                     full
                     name={"password"}
                     onChange={onChangeHandler}
                     value={password}
                     size={"small"}
                     helperText={
                        hasError?.name || error?.name === "password" ? hasError?.message || error.message : ""
                     }
                  />

               </div>
               <div>
                  <Input
                     error={hasError?.name || error?.name === "confirmPassword" ? true : false}
                     required={true}
                     type={"password"}
                     label={"Confirm Password"}
                     full
                     name={"confirmPassword"}
                     onChange={onChangeHandler}
                     value={confirmPassword}
                     size={"small"}
                     helperText={
                        hasError?.name || error?.name === "confirmPassword" ? hasError.message || error.message : ""
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