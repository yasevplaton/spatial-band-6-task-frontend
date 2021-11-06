import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowModal } from "../../root-slice/root-selectors";
import { setShowModal } from "../../root-slice/root-slice";
import { Button } from "@mui/material";
import { useGetSchools } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";

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
  outline: "none",
};

export const ModalComponent = () => {
  const open = useSelector(getShowModal);
  const { isLoading } = useGetSchools();
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
              <p style={{ textAlign: "center" }}>Добро пожаловать!</p>
              <p>
                Рады, что вы узнали о нашем сервисе. Здесь вы можете определить,
                где в Москве оптимально строить школы. Прежде всего, стоит
                обратить внимание на <b> существующие школы</b> - у нас на карте
                они различаются по цвету и размеру. Цвет показывает нагрузку на
                школу в текущий момент, а размер отвечает за количество
                учеников. Далее просим отметить яркую <b> тепловую карту</b> со
                множеством показателей, которые помогут не потеряться в море
                факторов. Переключаясь между ними, вы сможете с легкостью
                оценить обстановку в городе. Основной показатель, который
                обязательно нужно принять во внимание -
                <b> потенциал размещения новых объектов</b>. Он позволяет не
                только визуально выделить места, где не хватает школ, но также
                оценить масштаб необходимого строительства, требующегося для
                стабилизации дефицита. По сути, потенциал отвечает на главный
                вопрос - где нужно строить школы и каких размеров, причем
                <b> с учетом изменения спроса в будущем</b>. С помощью
                <b> гибкой настройки отображения</b> вы сможете отобрать районы,
                размещение школы в которых будет максимально эффективно, и
                значительно сузить поиск оптимальной площадки для строительства.
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button variant="text" onClick={handleClose}>
                    Найти место для школы
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
