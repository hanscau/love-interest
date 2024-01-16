import { Image } from "@mui/icons-material";
import { Paper, PaperProps, Typography, useTheme } from "@mui/material";

interface ImageInputProps extends PaperProps {}

const ImageInput = (props: ImageInputProps) => {
  const theme = useTheme();
  const { sx, ...rest } = props;
  return (
    <Paper
      sx={[
        {
          height: "255px",
          p: "8px 17px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <Image fontSize="large" sx={{ color: theme.palette.secondary.dark }} />
      <Typography
        color={theme.palette.secondary.dark}
        fontWeight={700}
        fontSize={"28px"}
      >
        Upload an Image
      </Typography>
    </Paper>
  );
};

export default ImageInput;
