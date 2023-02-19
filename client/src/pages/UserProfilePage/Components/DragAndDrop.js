import React, { useState } from 'react';
import Typography from '../../../components/Common/Typography/Typography';
import Button from '../../../components/Common/Button/Button';
import Icons from '../../../components/Common/Icons/Icons';
import styles from "../styles/DragAndDrop.module.scss";
import { useDropzone } from 'react-dropzone';

const DragAndDrop = ({ onDrop, hasError, imgUrl, setImageUrl }) => {

   //Drag nad Drop 
   const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(
      {
         onDrop,
         accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"]
         }
      });
   const removeUploadedImg = (e) => {
      setImageUrl("")
      e.stopPropagation()
   }
   return (
      <div>
         {/* Upload section Start*/}
         <div className={hasError?.file ? `${styles.upload_wrapper} ${styles.imageError}` : `${styles.upload_wrapper}`}  {...getRootProps()}>
            {hasError?.file
               &&
               <Typography variant={"small"} color={"red"}>
                  {hasError?.file}
               </Typography>
            }
            {isDragActive &&
               <div className={isDragReject ? `${styles.drag_error}` : `${styles.drag_active}`}>
                  <Typography
                     color={isDragReject ? "red" : "primary"}>
                     {isDragReject ? "Upload only .jpeg .png .jpg Image" : " Drop the files here"}
                  </Typography>
               </div>
            }
            <div className={styles.upload_body}>
               {imgUrl ?
                  <div className={styles.uploaded_img}>
                     <Button
                        variant={"icon-btn-normal"}
                        onClick={(e) => { removeUploadedImg(e) }}>
                        <Icons
                           name={"cross"}
                           color={"#cc2121"}
                           size={"1rem"} />
                     </Button>
                     <img src={imgUrl} alt="profilePic.png" />
                  </div>
                  :
                  <>
                     <Icons
                        name={"camera"}
                        size={"2rem"}
                        color={"#aeb4be"} />
                     <Typography
                        variant={"body"}>
                        Drag & drop Your Profile Picture here
                     </Typography>
                  </>
               }
               <div className={styles.with_border}>
                  <Typography
                     variant={"body"}
                     color={"paragraph"}
                  >
                     OR
                  </Typography>
               </div>
            </div>
            <Button variant={"primary"}>
               <Icons name={"uploadIcon"} />
               Select File
            </Button>
            <Typography
               variant={"small"}
               color={"paragraph"}
            >
               Image Size (480 * 480) image Type *JPEG, *PNG and *JPG
            </Typography>
            <input type={"file"}
               {...getInputProps()}
               style={{ display: "none" }} />
         </div>
      </div >
   )
}

export default DragAndDrop;