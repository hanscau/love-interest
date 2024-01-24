import { Box, Grid, Skeleton } from "@mui/material";

const TopicListSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        sx={{
          height: "120px",
          borderRadius: "6px",
        }}
      >
        <Skeleton variant="rounded" height={"100%"} width={"100%"}></Skeleton>
      </Box>
    </Grid>
  );
};

export default TopicListSkeleton;
