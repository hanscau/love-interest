import { Box, Typography, useTheme } from "@mui/material";
import { BoxProps } from "@mui/system";

const Logo = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box display={"flex"} {...props}>
      <img src="/logo.svg" alt="" />
      <Box display={"flex"} flex={1} ml={"8px"}>
        <Typography
          variant="h6"
          color={theme.palette.primary.main}
          fontWeight={700}
          letterSpacing={"-1px"}
        >
          Love
        </Typography>
        <Typography
          color={theme.palette.secondary.dark}
          variant="h6"
          fontWeight={700}
          letterSpacing={"-1px"}
        >
          Interest
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
