import React from 'react';
import styles from "./styles/ButtonGroup.module.scss";
import Button from './Button';
import Typography from '../Typography/Typography';
import { addToCart, removeFromCart } from "../../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ButtonGroup = ({ variant = "normal", item }) => {
   const dispatch = useDispatch()
   return (
      <div className={`${styles.btn_group} ${styles[`btn_${variant}`]}`}>
         <Button
            variant={"icon-btn-normal"}
            onClick={() => {
               dispatch(removeFromCart(item?.id))
            }}>
            <RemoveIcon sx={{ fontSize: "1rem", color: "#cc2121" }} />
         </Button>
         <Typography variant={"body"}>
            {item?.quantity}
         </Typography>
         <Button
            variant={"icon-btn-normal"}
            onClick={() => { dispatch(addToCart(item)) }}>
            <AddIcon sx={{ fontSize: "1rem", color: "#116954" }} />
         </Button>
      </div>
   )
}

export default ButtonGroup