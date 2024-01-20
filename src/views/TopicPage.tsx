import { Add, Search } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import axios from "axios";
import PostListItem from "components/PostListItem";
import PostFilter from "components/PostsFilter";
import TextInput from "components/TextInput";
import { selectAllPosts } from "features/posts/postsSlice";
import Post from "model/Post";
import { emptyTopic, mockTopics } from "model/Topic";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "reduxHooks";
import { API_URL } from "util/url";

const TopicPage = () => {
  const theme = useTheme();
  const { topicID } = useParams<{ topicID: string }>();

  const [topic, setTopic] = useState(emptyTopic);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/topics/${topicID}`)
      .then((res) => {
        console.log(res.data);
        setTopic(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });

    axios
      .get(`${API_URL}/posts/topic/${topicID}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [topicID]);

  return (
    <Box flex={1}>
      <Paper
        sx={{
          width: "100%",
          height: "350px",
          background: `url('${topic.topicImageURL}')`,
          backgroundSize: "cover",
          borderRadius: "6px",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            background:
              "linear-gradient(185deg, rgba(109.44, 109.44, 109.44, 0) 0%, rgba(40.25, 40.36, 40.35, 0.50) 100%)",
            borderRadius: "6px",
          }}
        ></Box>
        <Box
          display={"flex"}
          zIndex={5}
          p="16px"
          alignItems={"flex-end"}
          width={"100%"}
        >
          <Typography
            color={"white"}
            fontSize={"20px"}
            fontWeight={700}
            mr={"8px"}
          >
            {topic.topic}
          </Typography>
          <Typography color={"white"} fontSize={"12px"} flex={1}>
            {topic.topicPosts} posts
          </Typography>
          <Button variant="contained" endIcon={<Add />} color="secondary">
            Post in {topic.topic}
          </Button>
        </Box>
      </Paper>
      <Box display={"flex"} gap={"12px"} mt={"18px"}>
        <TextInput
          sx={{ flex: "1" }}
          placeholder="Search"
          InputIcon={
            <Search
              sx={{ color: theme.palette.secondary.dark, mr: "12px" }}
            ></Search>
          }
        ></TextInput>
        <PostFilter />
      </Box>
      <Box display="flex" flexDirection="column" gap="4px" mt={"16px"}>
        {posts.map((post) => (
          <PostListItem post={post} key={post.id}></PostListItem>
        ))}
      </Box>
    </Box>
  );
};

export default TopicPage;
