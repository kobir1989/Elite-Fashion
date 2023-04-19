import React from 'react';
import Button from '../../../components/Common/Button/Button';
import Input from '../../../components/Common/Input/Input';
import styles from "../styles/ResetPasswordForm.module.scss";
import Icons from '../../../components/Common/Icons/Icons';

const ResetPasswordForm = (
   {
      error,
      password,
      loading,
      confirmPassword,
      formSubmitHandler,
      confirmPasswordHandler,
      passwordHandler,
      togglePassword,
      toggleConfirmPass,
      togglePasswordHanadler,
      toggleConfirmPasswordHanadler
   }
) => {
   return (
      <form className={styles.rest_password_form} onSubmit={formSubmitHandler}>
         <div className={styles.input_wrapper}>
            <div className={styles.password_view_icon}>
               <Button
                  variant={"icon-btn-normal"}
                  onClick={togglePasswordHanadler}>
                  <Icons
                     name={togglePassword ? "eyeClosed" : "eyeOpen"}
                     color={"#b5b5b5"} size={"1.2rem"} />
               </Button>
            </div>
            <Input
               error={error ? true : false}
               errorMessage={error ? error : ""}
               value={password}
               onChange={passwordHandler}
               required={true}
               label={"New Password"}
               full
               name={"password"}
               size={"small"}
               type={togglePassword ? "text" : "password"} />
         </div>
         <div className={styles.confirm_input_wrapper}>
            <div className={styles.confirm_password_view_icon}>
               <Button
                  variant={"icon-btn-normal"}
                  onClick={toggleConfirmPasswordHanadler}>
                  <Icons
                     name={toggleConfirmPass ? "eyeClosed" : "eyeOpen"}
                     color={"#b5b5b5"} size={"1.2rem"} />
               </Button>
            </div>
            <Input
               error={error ? true : false}
               errorMessage={error ? error : ""}
               value={confirmPassword}
               onChange={confirmPasswordHandler}
               required={true}
               label={"Confirm New Password"}
               full
               name={"confirmPassword"}
               size={"small"}
               type={toggleConfirmPass ? "text" : "password"} />
         </div>
         <Button disabled={loading} type={"submit"}>Submit</Button>
      </form>
   )
}

export default ResetPasswordForm;