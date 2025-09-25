import { forwardRef } from "react";
import IconButton from "@mui/material/IconButton";

// Forward ref so parent components can access the button directly
const PlayerControlButton = forwardRef(({ children, ...others }, ref) => (
  <IconButton
    ref={ref}
    sx={{
      padding: { xs: 0.5, sm: 1 },  // responsive padding
      "& svg, & span": { transition: "transform .3s" }, // smooth hover animation
      "&:hover svg, &:hover span": {
        msTransform: "scale(1.3)",
        WebkitTransform: "scale(1.3)",
        transform: "scale(1.3)",  // scales icon when hovered
      },
    }}
    {...others} // any extra props like onClick
  >
    {children}  {/* The icon, e.g., Play, Pause, Volume */}
  </IconButton>
));

export default PlayerControlButton;
