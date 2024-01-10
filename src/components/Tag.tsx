import { Box, Typography, useTheme } from "@mui/material";

const Tag = ({ tag }: { tag: string }) => {
  const theme = useTheme();
  return (
    <Box
      p={"1px 6px"}
      borderRadius={"16px"}
      mr={"4px"}
      sx={{
        background: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.dark,
        borderWidth: "1.7px",
        borderStyle: "solid",
      }}
    >
      <Typography fontSize={"12px"}>#{tag.toUpperCase()}</Typography>
    </Box>
  );
};

export default Tag;
