import { Box, Skeleton } from "@mui/material";

const PostListItemSkeleton = () => {
  return (
    <Box display="flex" gap="16px" height={"108px"} width={"100%"}>
      <Skeleton variant="circular" width={"40px"} height={"40px"}></Skeleton>
      <Skeleton
        variant="rounded"
        height={"100%"}
        sx={{ flex: "1 1 auto" }}
      ></Skeleton>
    </Box>
  );
};

export default PostListItemSkeleton;
