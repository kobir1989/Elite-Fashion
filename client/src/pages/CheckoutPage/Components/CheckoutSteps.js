import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import CheckoutForm from './CheckoutForm';
import OrderDetails from './OrderDetails';
import PaymentForm from './PaymentForm';
import styles from "../styles/CheckoutSteps.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseStep, decreaseStep } from "../../../redux/features/stepsSlice";


const steps = ["Shipping Address", "Confirm Order", "Payment"];

const CheckoutSteps = () => {
   const dispatch = useDispatch();
   const { activeStep } = useSelector(state => state.steps);
   console.log(activeStep)

   const isCompliteSteps = () => {
      return steps.length === activeStep ? true : false
   }
   const nextStepHandler = () => {
      dispatch(increaseStep())
   }
   console.log(isCompliteSteps())

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
            <div>
               <Typography>Thanks</Typography>
            </div>
            :
            <div className={styles.steps_components}>
               {activeStep === 0 && <CheckoutForm />}
               {activeStep === 1 &&
                  <OrderDetails
                     onBack={backHandler}
                     onNext={nextStepHandler} />}
               {activeStep === 2 &&
                  <PaymentForm
                     onBack={backHandler}
                     onNext={nextStepHandler} />}
            </div>
         }
      </div>
   );
}
export default CheckoutSteps;