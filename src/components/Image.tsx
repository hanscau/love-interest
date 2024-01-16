import { Box, BoxProps } from "@mui/material";
import "App.css";

interface ImageProps extends BoxProps {
  src: string;
  alt: string;
}

const Image = (props: ImageProps) => {
  const { src, alt, sx, ...rest } = props;

  return (
    <Box sx={sx} {...rest}>
      <img className="postImage" src={src} alt={alt} />
    </Box>
  );
};

export default Image;
