import React from 'react';
import ReactDOM from "react-dom";
import styles from "./styles/Modal.module.scss";
const portalElement = document.getElementById("portal");

const Backdrop = (props) => {
   return (
      <div
         className={styles.backdrop}
         onClick={props.onClose}
      ></div>
   );
};

const ModalOverlay = ({ children }) => {
   return (
      <div className={styles.overlay}>
         <div>{children}</div>
      </div>
   );
};

const Modal = ({ onClose, children, height }) => {
   return (
      <>
         {ReactDOM.createPortal(
            <Backdrop onClose={onClose} />,
            portalElement
         )}
         {ReactDOM.createPortal(
            <ModalOverlay height={height}>{children}</ModalOverlay>,
            portalElement
         )}
      </>
   );
}

export default Modal;