import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  setTimeout(() => navigate("/"), 3000);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      height={"80vh"}
    >
      <Typography variant="h1" color={theme.palette.black} mb={"8px"}>
        404: Page not Found
      </Typography>
      <Typography variant="h6" color={theme.palette.black} mb={"44px"}>
        The page you are looking for does not exist.
      </Typography>
      <Typography color={theme.palette.black}>
        Redirecting to home page in 3 seconds...
      </Typography>
    </Box>
  );
};

export default ErrorPage;
