import { ThumbUp } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Typography,
  responsiveFontSizes,
  useTheme,
} from "@mui/material";

interface LikeInteractProp extends BoxProps {
  like: number;
  fontSize: string;
  iconSize: string;
}

const LikeInteract = (props: LikeInteractProp) => {
  const { like, fontSize, iconSize, ...rest } = props;
  const theme = useTheme();
  return (
    <Box display={"flex"} alignItems={"center"} {...rest}>
      <ThumbUp
        sx={{
          color: theme.palette.primary.main,
          fontSize: iconSize,
          mr: "6px",
        }}
      ></ThumbUp>
      <Typography
        fontSize={fontSize}
        mb={"-2px"}
        mr={"8px"}
        sx={{ color: theme.palette.primary.main }}
      >
        {like}
      </Typography>
    </Box>
  );
};

export default LikeInteract;
