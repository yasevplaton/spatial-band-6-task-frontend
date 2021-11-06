import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowModal } from "../../root-slice/root-selectors";
import { setShowModal } from "../../root-slice/root-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

export const ModalComponent = () => {
  const open = useSelector(getShowModal);
  const dispatch = useDispatch();

  const handleClose = useCallback(
    () => dispatch(setShowModal(false)),
    [dispatch]
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              Добро пожаловать! Скоро здесь будет инструкция по работе с
              приложением
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
