import { Box, BoxProps } from "@mui/material";
import "App.css";

interface HTMLImageProps extends BoxProps {
  src: string;
  alt: string;
}

const HTMLImage = (props: HTMLImageProps) => {
  const { src, alt, sx, ...rest } = props;

  return (
    <Box
      sx={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <img className="postImage" src={src} alt={alt} />
    </Box>
  );
};

export default HTMLImage;
