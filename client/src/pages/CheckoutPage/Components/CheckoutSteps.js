import React from "react";
import { Stepper, Step, StepLabel } from '@mui/material';
import ShippmentForm from './ShippmentForm';
import OrderDetails from './SubComponents/OrderDetails';
import Payment from "./SubComponents/Payment";
import styles from "../styles/CheckoutSteps.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseStep, decreaseStep } from "../../../redux/features/paymentSteps/stepsSlice";
import Icons from "../../../components/Common/Icons/Icons";
import Typography from "../../../components/Common/Typography/Typography";
import Button from "../../../components/Common/Button/Button";

const steps = ["Shipping Address", "Confirm Order", "Payment"];

const CheckoutSteps = () => {
   const dispatch = useDispatch();
   const { activeStep } = useSelector(state => state.steps);

   const isCompliteSteps = () => {
      return steps.length === activeStep ? true : false

   }
   const nextStepHandler = () => {
      dispatch(increaseStep())
   }
   const backHandler = () => {
      if (activeStep <= 0) {
         return
      }
      dispatch(decreaseStep())
   }


   return (
      <div className={styles.steps_wrapper}>
         <Stepper activeStep={activeStep}>
            {steps.map((label) => (
               <Step key={label}>
                  <StepLabel>{label}</StepLabel>
               </Step>
            ))}
         </Stepper>
         {isCompliteSteps() ?
            <div className={styles.success_message}>
               <Icons name={"truck"} size={"6rem"} color={"#3b3841"} />
               <Typography variant={"h4"}>Thank you for your purchase!<br /> Your stylish new clothes will be on their way soon. Shop again for more fashion inspiration!
               </Typography>
               <Button variant={"primary"}
                  onClick={() => window.location.href = `https://elite-fashion.vercel.app/`}>
                  Ok</Button>
            </div> :
            <div className={styles.steps_components}>
               {activeStep === 0 &&
                  <ShippmentForm />}
               {activeStep === 1 &&
                  <OrderDetails
                     onBack={backHandler}
                     onNext={nextStepHandler} />}
               {activeStep === 2 &&
                  <Payment />
               }
            </div>
         }
      </div>
   );
}
export default CheckoutSteps;