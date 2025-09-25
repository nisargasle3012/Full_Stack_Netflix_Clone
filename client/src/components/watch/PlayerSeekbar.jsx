import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { formatTime } from "../../utils/common";

const StyledSlider = styled(Slider)({
  height: 5,
  "& .MuiSlider-track": { backgroundColor: "red" },
  "& .MuiSlider-rail": { backgroundColor: "white", opacity: 0.85 },
  "& .MuiSlider-thumb": { height: 10, width: 10, backgroundColor: "red" },
});

export default function PlayerSeekbar({ value, max, onChange }) {
  return (
    <StyledSlider
      min={0}
      value={value ?? 0}      // default value
      max={max ?? 0}          // default max
      step={1}
      valueLabelDisplay="auto"
      valueLabelFormat={(v) => formatTime(v)}
      onChange={(event, newValue) => onChange?.(newValue)}
    />
  );
}
