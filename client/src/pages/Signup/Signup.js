import React, { useState } from 'react';
import PageLaout from "../../layouts/PageLayout";
import styles from "./Signup.module.scss";
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import Typography from '../../components/Common/Typography/Typography';
import { Link } from "react-router-dom";

const Signup = () => {
   const [] = useState({});
   const submitHandler = (e) => {
      e.preventDefault()
   }
   return (
      <PageLaout>
         <div className={styles.signup_wrapper}>
            <div className={styles.signup_img}>
               <img src="/assets/signup.jpg" alt="women.png" />
               <div className={styles.signup_slogan}>
                  <Typography variant={"h2"} color={"white"}>
                     Elite Fashion
                  </Typography>
                  <Typography variant={"h4"} color={"white"}>
                     A store that sells not just outfits but a trend.
                  </Typography>
               </div>
            </div>
            <div className={styles.form_wrapper}>
               <div className={styles.form_title}>
                  <Typography variant={"h3"} color={"paragraph"}>Create Your Account</Typography>
               </div>
               <form onSubmit={submitHandler}>
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
                        type={"text"}
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
                     <img src="/assets/icons8-google.svg" alt="" /> Signup with Google
                  </Button>
               </form>
               <div className={styles.form_link}>
                  <Typography variant={"body"}>Already have an Account?
                     <Link to="/login"> Login </Link>
                  </Typography>
               </div>
            </div>
         </div>
      </PageLaout>

   )
}

export default Signup;