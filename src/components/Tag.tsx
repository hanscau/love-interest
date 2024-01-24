import { Close, Delete } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

interface TagProps {
  tag: string;
  deletable?: boolean;
  onDelete?: () => void;
}

const Tag = ({ tag, deletable, onDelete = () => null }: TagProps) => {
  const theme = useTheme();
  return (
    <Box
      p={"1px 6px"}
      borderRadius={"16px"}
      mr={"4px"}
      display={"flex"}
      alignItems={"center"}
      gap={"4px"}
      sx={{
        background: theme.palette.secondary.light,
        borderColor: theme.palette.black,
        borderWidth: "1.7px",
        borderStyle: "solid",
      }}
    >
      <Typography fontSize={"12px"}>#{tag.toUpperCase()}</Typography>
      {deletable && (
        <IconButton size="small" onClick={() => onDelete()}>
          <Close sx={{ fontSize: "12px" }}></Close>
        </IconButton>
      )}
    </Box>
  );
};

export default Tag;
