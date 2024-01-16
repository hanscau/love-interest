import { Box, Paper, Typography } from "@mui/material";

const PostFilter = () => {
  return (
    <Box display={"flex"}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "140px",
          borderRadius: "16px 0px 0px 16px",
        }}
      >
        <Typography fontWeight={700}>Latest</Typography>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "140px",
          borderRadius: "0px 16px 16px 0px",
        }}
      >
        <Typography fontWeight={700}>Popular</Typography>
      </Paper>
    </Box>
  );
};

export default PostFilter;
