import React, { useState } from 'react';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/CheckoutForm.module.scss";
import Typography from '../../../components/Common/Typography/Typography';
import { increaseStep } from "../../../redux/features/stepsSlice";
import { setShipmentDetails } from "../../../redux/features/orderSlice";

const CheckoutForm = () => {
   const { userInfo } = useSelector(state => state.auth);
   const [phone, setPhone] = useState("");
   const [city, setCity] = useState("");
   const [address, setAddress] = useState("");
   const [hasError, setHasError] = useState(false);
   const dispatch = useDispatch();

   const submitFormHandler = (e) => {
      e.preventDefault()
      if (phone.length < 10) {
         setHasError(true);
         return;
      }
      dispatch(setShipmentDetails({ phone, city, address, userId: userInfo?._id }));
      dispatch(increaseStep())
      setAddress("");
      setCity("");
      setPhone("");
   }
   return (
      <div className={styles.shipping_details}>
         <Typography variant={"h4"}>Shipping Details</Typography>
         <form onSubmit={submitFormHandler}>
            <Input
               color={"primary"}
               label={userInfo?.name || "Name"}
               disabled
               fullWidth={true}
               size={"small"}
               value={userInfo?.name}
            />
            <Input color={"primary"}
               label={userInfo?.email || "Email"}
               fullWidth={true}
               disabled
               size={"small"}
               name={"email"}
               value={userInfo?.email}
            />
            <Input color={"primary"}
               error={hasError === true && phone.length < 10 ? true : false}
               type={"number"}
               label={"Phone Number"}
               fullWidth={true}
               size={"small"}
               name={"phone"}
               value={phone}
               onChange={(e) => { setPhone(e.target.value) }}
               required={true}
               helperText={hasError === true ? "Invalid Phone Number" : ""}
            />
            <Input color={"primary"}
               type={"text"}
               label={"City"}
               fullWidth={true}
               size={"small"}
               name={"city"}
               value={city}
               onChange={(e) => { setCity(e.target.value) }}
               required={true}
            />
            <Input color={"primary"}
               type={"text"}
               label={"Full Address"}
               fullWidth={true}
               size={"small"}
               name={"address"}
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               required={true}
            />
            <Link to="/payment">
            </Link>
            <Button type="submit" variant={"btn-black"}>Submit</Button>
         </form>
      </div>

   )
}

export default CheckoutForm;