import Box from "@mui/material/Box";

export default function MaturityRate({ children }) {
  return (
    <Box
      sx={{
        py: 1,
        pl: 1.5,
        pr: 3,
        fontSize: 22,
        display: "flex",
        alignItems: "center", // fixed typo here
        color: "text.primary",
        border: "3px #dcdcdc",
        borderLeftStyle: "solid",
        bgcolor: "#33333399",
      }}
    >
      {children}
    </Box>
  );
}
