import { Box, Paper, PaperProps, Typography, useTheme } from "@mui/material";
import HTMLImage from "./HTMLImage";
import { DeleteForever, Image } from "@mui/icons-material";

interface ImageInputProps extends PaperProps {
  value: File | null;
  deleteImage: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  src?: string;
}

const ImageInput = ({
  sx,
  value,
  deleteImage,
  src,
  onChange,
  ...rest
}: ImageInputProps) => {
  const theme = useTheme();
  return (
    <Paper
      sx={[
        {
          minHeight: "255px",
          p: "17px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {value ? (
        <Box position={"relative"}>
          <HTMLImage
            src={src ? src : URL.createObjectURL(value)}
            alt="User posted image"
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={"12px"}
            position="absolute"
            width={"100%"}
            height={"100%"}
            top={0}
            left={0}
            sx={{
              cursor: "pointer",
              background: "rgba(255, 255, 255, 0.0)",
              opacity: 0,
              transition:
                "background 0.2s ease-in-out, opacity 0.2s ease-in-out",
              "&:hover": { background: "rgba(255, 255, 255, 0.5)", opacity: 1 },
            }}
            onClick={deleteImage}
          >
            <DeleteForever
              fontSize="large"
              sx={{ color: theme.palette.black }}
            />

            <Typography
              color={theme.palette.black}
              fontWeight={700}
              fontSize={"28px"}
            >
              Remove Image
            </Typography>
          </Box>
        </Box>
      ) : (
        <label htmlFor="file-upload">
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            gap={"12px"}
            sx={{ cursor: "pointer" }}
          >
            <Image fontSize="large" sx={{ color: theme.palette.black }} />
            <Typography
              color={theme.palette.black}
              fontWeight={700}
              fontSize={"28px"}
            >
              Upload an Image
            </Typography>
          </Box>
          <input
            id="file-upload"
            type="file"
            name="postImage"
            accept="image/*"
            hidden
            onChange={onChange}
          />
        </label>
      )}
    </Paper>
  );
};

export default ImageInput;
