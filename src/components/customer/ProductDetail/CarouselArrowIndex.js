import PropType from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Typography, Box, IconButton } from "@mui/material";
//
import Iconify from "../../../utils/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(() => ({
  zIndex: 9,
  display: "flex",
  alignItems: "center",
  position: "absolute",
  bottom: "16px",
  right: "16px",
  color: "#fff",
  borderRadius: 4,
  backgroundColor: alpha("#161C24", 0.48),
}));

const ArrowStyle = styled(IconButton)(() => ({
  padding: 6,
  opacity: 0.48,
  color: "#fff",
  "&:hover": { opacity: 1 },
}));

// ----------------------------------------------------------------------

CarouselArrowIndex.PropType = {
  index: PropType.number,
  total: PropType.number,
  onNext: PropType.func,
  onPrevious: PropType.func,
};

export default function CarouselArrowIndex({
  index,
  total,
  onNext,
  onPrevious,
  customIcon,
  ...other
}) {
  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        <Iconify
          icon={"eva:arrow-left-fill"}
          sx={{
            width: 20,
            height: 20,
          }}
        />
      </ArrowStyle>

      <Typography variant="subtitle2">
        {index + 1}/{total}
      </Typography>

      <ArrowStyle size="small" onClick={onNext}>
        <Iconify
          icon={"eva:arrow-right-fill"}
          sx={{
            width: 20,
            height: 20,
          }}
        />
      </ArrowStyle>
    </RootStyle>
  );
}
