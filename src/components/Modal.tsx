import { FC, ReactNode } from "react";
import classes from "../styles/Modal.module.css";
import { createPortal } from "react-dom";

type BackdropProps = {
  onClick: () => void;
};

type ModalOverlayProps = {
  children: ReactNode;
};

type ModalProps = {
  children: ReactNode;
  onBackdropClick: () => void;
};

const Backdrop: FC<BackdropProps> = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal: FC<ModalProps> = ({ children, onBackdropClick }) => {
  return (
    <>
      {createPortal(<Backdrop onClick={onBackdropClick} />, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
