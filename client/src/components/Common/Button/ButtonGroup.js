import React from 'react';
import styles from "./styles/ButtonGroup.module.scss";
import Button from './Button';
import Typography from '../Typography/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ButtonGroup = ({ variant = "normal", onRemove, onAdd, quantity }) => {
   return (
      <div className={`${styles.btn_group} ${styles[`btn_${variant}`]}`}>
         <Button
            variant={"icon-btn-normal"} onClick={onRemove}>
            <RemoveIcon sx={{ fontSize: "1rem", color: "#cc2121" }} />
         </Button>
         <Typography variant={"body"}>
            {quantity || "0"}
         </Typography>
         <Button
            variant={"icon-btn-normal"} onClick={onAdd}>
            <AddIcon sx={{ fontSize: "1rem", color: "#116954" }} />
         </Button>
      </div>
   )
}

export default ButtonGroup;