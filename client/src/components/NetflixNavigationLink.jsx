import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export default function NetflixNavigationLink({ sx, children, ...others }) {
  return (
    <Link
      {...others}
      component={RouterLink}
      sx={{ color: "text.primary", textDecoration: "none", ...sx }}
    >
      {children}
    </Link>
  );
}
