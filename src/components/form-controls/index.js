import { styled } from "@mui/material/styles";
import { FormControlLabel } from "@mui/material";

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  margin: 0,
  "& .MuiFormControlLabel-label": {
    textTransform: "uppercase",
    color: "grey",
    fontFamily: "inherit",
    fontSize: "12px",
  },
}));
