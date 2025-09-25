import { Stack } from "@mui/material";
import Slider from "@mui/material/Slider";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayerControlButton from "./PlayerControlButton";

export default function VolumeControllers({ value, muted, onVolumeChange, onToggleMute }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <PlayerControlButton onClick={onToggleMute}>
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </PlayerControlButton>

      <Slider
        min={0}
        max={1}
        step={0.01}
        value={value ?? 0.8}          // default value to prevent uncontrolled -> controlled
        onChange={(event, newValue) => onVolumeChange?.(newValue)}
        sx={{ width: 100 }}
      />
    </Stack>
  );
}
