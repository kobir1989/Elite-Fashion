import * as React from 'react';
import Icons from '../Icons/Icons';
import Button from './Button';

export const PrevArrow = (props) => {
   const { className, style, onClick } = props;
   return (
      <div style={
         {
            position: "absolute",
            top: "50%",
            right: "-3.5%"
         }} onClick={onClick}>
         <Button variant={"icon-btn-normal"}>
            <Icons name={"forwardArrow"} size={"1.5rem"} />
         </Button>
      </div>
   );
};

export const NextArrow = (props) => {
   const { className, style, onClick } = props;
   return (
      <div style={{
         position: "absolute",
         top: "50%",
         left: "-3.5%"
      }} onClick={onClick}>
         <Button variant={"icon-btn-normal"}>
            <Icons name={"backArrow"} size={"1.5rem"} />
         </Button>
      </div>
   );
};
