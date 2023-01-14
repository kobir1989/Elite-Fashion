import React from 'react';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import { useSelector } from "react-redux";

const CheckoutForm = () => {
   const { isAuth } = useSelector(state => state.auth);
   return (
      <form>
         <Input
            color={"primary"}
            label={isAuth?.userPayload?.name || "Name"}
            disabled
            fullWidth={true}
            size={"small"}
            value={isAuth?.userPayload?.name}
         />
         <Input color={"primary"}
            label={isAuth?.userPayload?.email || "Email"}
            fullWidth={true}
            disabled
            size={"small"}
            name={"email"}
            value={isAuth?.userPayload?.email}
         />
         <Input color={"primary"}
            // error={error || false}
            type={"number"}
            label={"Phone Number"}
            fullWidth={true}
            size={"small"}
            name={"phone"}
            value={""}
            required={true}
            helperText={""} />
         <Input color={"primary"}
            // error={error || false}

            type={"text"}
            label={"City"}
            fullWidth={true}
            size={"small"}
            name={"city"}
            value={""}
            required={true}
            helperText={""} />
         <Input color={"primary"}
            // error={error || false}

            type={"text"}
            label={"Full Address"}
            fullWidth={true}
            size={"small"}
            name={"address"}
            value={""}
            required={true}
            helperText={""} />
         <Button variant={"red"}>Make Payment</Button>
      </form>
   )
}

export default CheckoutForm;