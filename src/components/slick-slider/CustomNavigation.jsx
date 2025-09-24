import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ArrowStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  position: "absolute",
  zIndex: 9,
  height: "100%",
  opacity: 0.48,
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  transition: theme.transitions.create("opacity"),
  "&:hover": {
    opacity: 0.8,
    background: theme.palette.grey[900],
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default function CustomNavigation({
  isEnd = false,
  onNext,
  onPrevious,
  children,
  arrowWidth = 50,
  activeSlideIndex = 0,
}) {
  return (
    <>
      {activeSlideIndex > 0 && (
        <ArrowStyle
          onClick={onPrevious}
          sx={{
            left: 0,
            width: { xs: arrowWidth / 2, sm: arrowWidth },
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <ArrowBackIosNewIcon />
        </ArrowStyle>
      )}

      {children}

      {!isEnd && (
        <ArrowStyle
          onClick={onNext}
          sx={{
            right: 0,
            width: { xs: arrowWidth / 2, sm: arrowWidth },
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        >
          <ArrowForwardIosIcon />
        </ArrowStyle>
      )}
    </>
  );
}
