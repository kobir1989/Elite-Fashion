import React, { useState } from 'react';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import { useSelector, useDispatch } from "react-redux";
import { setHasError } from "../../../redux/features/userProfileSlice";
import { updateUserProfile } from "../../../redux/actions/userProfileAction";
import { toast } from 'react-hot-toast';

const Settings = () => {
   const { userProfileData, updateError, updateData } = useSelector(state => state.userProfile);
   const [email, setEmail] = useState(userProfileData?.email);
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmNewPassword, setConfirmNewPassword] = useState("");
   const dispatch = useDispatch();
   console.log(updateData)
   const submitHandler = (e) => {
      e.preventDefault()
      if (newPassword.length < 8) {
         return dispatch(setHasError({
            name: "oldPassword",
            message: "Password should be more then 8 characters"
         }));
      }
      if (newPassword !== confirmNewPassword) {
         return dispatch(setHasError({ name: "confirmNewPassword", message: "Password did not match" }))
      }
      dispatch(updateUserProfile({
         id: userProfileData?._id,
         oldPassword,
         newPassword,
         confirmNewPassword,
         email
      }));
      if (updateData.success) {
         setConfirmNewPassword("")
         setNewPassword("")
         setOldPassword("")
         toast.success("Your Account Updated")
      }
   };
   return (
      <div>
         <div>
            <Typography variant={"h4"}>Profile Settings</Typography>
         </div>
         <form onSubmit={submitHandler}>
            <Input
               error={updateError?.name === "email" ? true : false}
               required={true}
               type={"text"}
               label={"Email"}
               full
               name={"email"}
               onChange={(e) => { setEmail(e.target.value) }}
               value={email}
               size={"small"}
               helperText={updateError?.name === "email" ? updateError.message : ""}
            />
            <Input
               error={updateError?.name === "oldPassword" ? true : false}
               required={true}
               type={"password"}
               label={"Old Password"}
               full
               name={"oldPassword"}
               onChange={(e) => { setOldPassword(e.target.value) }}
               value={oldPassword}
               size={"small"}
               helperText={updateError?.name === "oldPassword" ? updateError.message : ""}
            />
            <Input
               error={updateError?.name === "newPassword" ? true : false}
               required={true}
               type={"password"}
               label={"New Password"}
               full
               name={"newPassword"}
               onChange={(e) => { setNewPassword(e.target.value) }}
               value={newPassword}
               size={"small"}
               helperText={updateError?.name === "newPassword" ? updateError.message : ""}
            />
            <Input
               error={updateError?.name === "confirmNewPassword" ? true : false}
               required={true}
               type={"password"}
               label={"Confirm New Password"}
               full
               name={"confirmNewPassword"}
               onChange={(e) => { setConfirmNewPassword(e.target.value) }}
               value={confirmNewPassword}
               size={"small"}
               helperText={updateError?.name === "confirmNewPassword" ? updateError.message : ""}
            />
            <Button variant={"primary"} type={"submit"}
               style={{ marginTop: "1.5rem" }}>
               Update Profile
            </Button>
         </form>
      </div>
   )
}

export default Settings