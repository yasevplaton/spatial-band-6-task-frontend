import { IconButton } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import styles from "./help-button.module.scss";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setShowModal } from "../../root-slice/root-slice";

export const HelpButton = () => {
  const dispatch = useDispatch();
  const openModal = useCallback(() => {
    dispatch(setShowModal(true));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <IconButton aria-label="help" onClick={openModal}>
        <HelpIcon />
      </IconButton>
    </div>
  );
};
