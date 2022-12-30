import React from 'react';
import "./Button.scss";

const Button = (props) => {
   const { type = "primary", children, ...otherProps } = props;
   return (
      <button className={`button ${type}`} {...otherProps}> {children}
      </button >
   )
}

export default Button;