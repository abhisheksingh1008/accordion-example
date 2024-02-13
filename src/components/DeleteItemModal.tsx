import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import classes from "../styles/Modal.module.css";
import Modal from "./Modal";

type DeleteItemModalProps = {
  onDelete: () => void;
  closeModal: () => void;
};

const DeleteItemModal: FC<DeleteItemModalProps> = ({
  onDelete,
  closeModal,
}) => {
  return (
    <Modal onBackdropClick={closeModal}>
      <div className={classes["modal-content"]}>
        <div className={classes["modal-top"]}>
          <p className={classes["modal text"]}>
            Are you sure you want to delete?
          </p>
          <span className={classes["modal-close-btn"]} onClick={closeModal}>
            <RxCross2 size="1.5rem" />
          </span>
        </div>
        <div className={classes["modal-actions"]}>
          <button className={classes["action-btn"]} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={classes["action-btn"]}
            style={{
              color: "white",
              border: "none",
              backgroundColor: "red",
            }}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItemModal;
