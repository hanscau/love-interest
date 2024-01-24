import { Box, Typography, useTheme } from "@mui/material";
import { BoxProps } from "@mui/system";

const Logo = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      {...props}
      sx={{
        cursor: "pointer",
        "&:hover h6": {
          color: theme.palette.primary.main,
          letterSpacing: "-0.5px",
        },
      }}
    >
      <img src="/logo.svg" alt="" />
      <Box display={"flex"} flex={1} ml={"8px"}>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          fontWeight={700}
          letterSpacing={"-1px"}
          sx={{ transition: "color 0.2s ease-in-out, letter-spacing 0.2s" }}
        >
          Love
        </Typography>
        <Typography
          color={theme.palette.black}
          variant="h6"
          fontWeight={700}
          letterSpacing={"-1px"}
          sx={{ transition: "color 0.2s ease-in-out, letter-spacing 0.2s" }}
        >
          Interest
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
