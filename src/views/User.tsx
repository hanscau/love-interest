import { Favorite, Search } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import PostListItem from "components/PostListItem";
import PostFilter from "components/PostsFilter";
import Profile from "components/Profile";
import TextInput from "components/TextInput";
import { mockPosts } from "model/Post";
import { mockUsers } from "model/User";

const User = () => {
  const theme = useTheme();
  const user = mockUsers;
  const posts = mockPosts;

  return (
    <Box>
      <Paper sx={{ p: "16px", borderRadius: "16px", mb: "22px" }}>
        <Box display={"flex"} alignItems={"center"} mb={"16px"}>
          <Profile user={user}></Profile>
          <Box sx={{ flex: "1 1 auto" }}></Box>
          <Button
            variant="contained"
            endIcon={<Favorite />}
            sx={{ background: theme.palette.primary.light }}
          >
            Show Interest
          </Button>
        </Box>
        <Typography>
          User’s Bio or maybe some random information that they want to include
          in their profile. Do I need to show gender and age? maybe but if it’s
          a normal post then it’ll just be the description of the topic
        </Typography>
      </Paper>
      <Box display={"flex"} gap={"12px"} mb={"22px"}>
        <TextInput
          placeholder="Search"
          sx={{ flex: "1" }}
          InputIcon={
            <Search sx={{ color: theme.palette.secondary.dark, mr: "12px" }} />
          }
        ></TextInput>
        <PostFilter />
      </Box>
      <Box display="flex" flexDirection="column" gap="4px" mt={"16px"}>
        {posts.map((post) => (
          <PostListItem post={post}></PostListItem>
        ))}
      </Box>
    </Box>
  );
};

export default User;
