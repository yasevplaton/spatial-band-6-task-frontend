import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  backgroundColor: "transparent",
  border: "none",
  "&:before": {
    display: "none",
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.8rem" }} />}
    {...props}
  />
))(() => ({
  paddingRight: "0.5rem",
  backgroundColor: "none",
  flexDirection: "row-reverse",
  textTransform: "uppercase",
  color: "grey",
  fontFamily: "inherit",
  fontSize: "12px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
}));
