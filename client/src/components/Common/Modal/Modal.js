import React from 'react';
import ReactDOM from "react-dom";
import styles from "./styles/Modal.module.scss";
import { motion, AnimatePresence } from "framer-motion"
const portalElement = document.getElementById("portal");

const Backdrop = (props) => {
   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ default: { ease: "linear" } }}
            className={styles.backdrop}
            onClick={props.onClose}>
         </motion.div>
      </AnimatePresence>

   );
};

const ModalOverlay = ({ children }) => {
   return (
      <AnimatePresence>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ default: { ease: "linear" } }}
            className={styles.overlay}>
            <div>{children}</div>
         </motion.div>
      </AnimatePresence>
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