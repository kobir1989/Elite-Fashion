import React, { useState, useCallback } from 'react';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import { useSelector, useDispatch } from "react-redux";
import { setHasError } from "../../../redux/features/userProfileSlice";
import { updateUserProfile } from "../../../redux/actions/userProfileAction";
import toast from 'react-hot-toast';
import styles from "../styles/Settings.module.scss";
import { LinearProgress } from '@mui/material';
import { Link } from "react-router-dom";
import DragAndDrop from './DragAndDrop';

const Settings = () => {
   const { userProfileData, isLoading, error, updateSuccess } = useSelector(state => state.userProfile);
   const [image, setImage] = useState("");
   const [imageUrl, setImageUrl] = useState(userProfileData?.profilePic);
   const [uploadError, setUploadError] = useState(null)
   const [email, setEmail] = useState(userProfileData?.email);
   const [name, setName] = useState(userProfileData?.name);
   const [phone, setPhone] = useState(userProfileData?.phone);
   const [address, setAddress] = useState(userProfileData?.address);
   const [city, setCity] = useState(userProfileData?.city);
   const dispatch = useDispatch();

   //File Upload Handler
   const onDrop = useCallback(acceptedFiles => {
      setImage(acceptedFiles[0])
      setImageUrl(URL.createObjectURL(acceptedFiles[0]))
   }, []);
   // console.log(image, "IMGH")
   const submitHandler = (e) => {
      e.preventDefault()
      if (phone.length < 10) {
         return dispatch(setHasError({
            name: "phone",
            message: "Phone Number should be more then 10 digits"
         }));
      }
      dispatch(updateUserProfile({
         id: userProfileData?._id,
         name,
         phone,
         address,
         email,
         city,
         image
      }));
      if (updateSuccess) {
         toast.dismiss()
         toast.success("Your Account Updated");
         setUploadError(null)
         setImageUrl("")
      }
   };
   return (
      <div className={isLoading ? `${styles.profile_update_form_wrapper} ${styles.loading_on}` : `${styles.profile_update_form_wrapper}`}>
         {isLoading &&
            <div className={styles.loading_progress}>
               <LinearProgress color='secondary' />
            </div>}
         <div>
            <Typography variant={"h4"}>Profile Settings</Typography>
         </div>
         <form onSubmit={submitHandler}>
            <DragAndDrop
               hasError={uploadError}
               imgUrl={imageUrl}
               setImageUrl={setImageUrl}
               onDrop={onDrop} />
            <Input
               error={error?.name === "email" ? true : false}
               required={true}
               type={"text"}
               label={"Email"}
               full
               name={"email"}
               onChange={(e) => { setEmail(e.target.value) }}
               value={email}
               size={"small"}
               helperText={error?.name === "email" ? error.message : ""}
            />
            <Input
               error={error?.name === "name" ? true : false}
               required={true}
               type={"text"}
               label={"Name"}
               full
               name={"name"}
               onChange={(e) => { setName(e.target.value) }}
               value={name}
               size={"small"}
               helperText={error?.name === "name" ? error.message : ""}
            />
            <Input
               error={error?.name === "phone" ? true : false}
               required={true}
               type={"number"}
               label={"Phone Number"}
               full
               name={"phone"}
               onChange={(e) => { setPhone(e.target.value) }}
               value={phone}
               size={"small"}
               helperText={error?.name === "phone" ? error.message : ""}
            />
            <Input
               error={error?.name === "city" ? true : false}
               required={true}
               type={"text"}
               label={"City"}
               full
               name={"city"}
               onChange={(e) => { setCity(e.target.value) }}
               value={city}
               size={"small"}
               helperText={error?.name === "city" ? error.message : ""}
            />
            <Input
               error={error?.name === "address" ? true : false}
               required={true}
               type={"text"}
               label={"Shipping Address"}
               full
               name={"address"}
               onChange={(e) => { setAddress(e.target.value) }}
               value={address}
               size={"small"}
               helperText={error?.name === "address" ? error.message : ""}
            />
            <div className={styles.form_buttons}>
               <Link to={"/forget/password"} variant={"white"} type={"submit"}
                  style={{ marginTop: "1.5rem" }}>
                  Update Password?
               </Link>
               <Button variant={"primary"} type={"submit"}
                  style={{ marginTop: "1.5rem" }}>
                  Update Profile
               </Button>
            </div>
         </form>
      </div>
   )
}

export default Settings