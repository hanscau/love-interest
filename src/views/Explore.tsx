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
import { useNavigate } from "react-router-dom";
import { useGetAllPosts, useGetAllTopics } from "hooks/useAPI";
import PostListItemSkeleton from "components/skeletons/PostLitsItemSkeleton";
import TopicListItem from "components/TopicListItem";
import TopicListSkeleton from "components/skeletons/TopicListSkeleton";

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

const Explore = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    data: posts,
    isLoading: isPostLoading,
    error: postError,
  } = useGetAllPosts();
  const {
    data: topics,
    isLoading: isTopicLoading,
    error: topicError,
  } = useGetAllTopics();

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
        {isTopicLoading
          ? [1, 2, 3, 4, 5, 6].map((i) => <TopicListSkeleton key={i} />)
          : topics &&
            topics?.map((topic, i) => (
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
        {isPostLoading
          ? [1, 2, 3].map((i) => <PostListItemSkeleton key={i} />)
          : posts &&
            posts.map((post, i) => (
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
