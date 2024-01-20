import { Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import PostListItem from "components/PostListItem";
import TextInput from "components/TextInput";
import { fetchPosts, selectAllPosts } from "features/posts/postsSlice";
import { fetchTopics, selectAllTopics } from "features/topics/topicsSlice";
import Topic, { mockTopics } from "model/Topic";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "reduxHooks";

const Header = (props: TypographyProps) => {
  const theme = useTheme();
  return (
    <Typography
      fontWeight={700}
      fontSize={"20px"}
      sx={{ color: theme.palette.secondary.dark }}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

const TopicListItem = ({
  topic,
  onClick,
}: {
  topic: Topic;
  onClick: () => void;
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        onClick={onClick}
        sx={{
          background: "url('https://picsum.photos/id/20/300/200')",
          backgroundSize: "cover",
          height: "120px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          position: "relative",
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
          alignItems={"flex-end"}
          gap={"8px"}
          m="8px 12px"
          zIndex={5}
        >
          <Typography fontSize={"20px"} color={"white"} fontWeight={700}>
            {topic.topic}
          </Typography>
          <Typography fontSize={"12px"} color={"white"} mb="2px">
            {topic.topicPosts} Posts
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

const Explore = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const posts = useAppSelector(selectAllPosts);
  const topics = useAppSelector(selectAllTopics);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const topicsStatus = useAppSelector((state) => state.topics.status);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }

    if (topicsStatus === "idle") {
      dispatch(fetchTopics());
    }
  }, [postsStatus, topicsStatus, dispatch]);

  return (
    <Box sx={{ flex: 1 }}>
      <TextInput
        InputIcon={
          <Search sx={{ color: theme.palette.secondary.dark, mr: "8px" }} />
        }
        sx={{ mt: "8px" }}
        placeholder="Search"
      ></TextInput>
      <Header mt={"24px"}>Interest</Header>
      <Grid mt="0px" container spacing={2}>
        {topics.map((topic, i) => (
          <TopicListItem
            topic={topic}
            key={i}
            onClick={() => navigate(`/topic/${topic.id}`)}
          />
        ))}
      </Grid>
      <Header mt={"24px"} mb={"16px"}>
        Recent
      </Header>
      <Box display="flex" flexDirection="column" gap="4px">
        {posts.map((post, i) => (
          <PostListItem
            post={post}
            key={i}
            onClick={() => navigate(`/post/${post.id}`)}
          ></PostListItem>
        ))}
      </Box>
    </Box>
  );
};

export default Explore;
