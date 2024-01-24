import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import PostListItem from "components/PostListItem";
import PostFilter from "components/PostsFilter";
import TextInput from "components/TextInput";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { useGetTopic, useGetTopicPosts } from "hooks/useAPI";
import PostListItemSkeleton from "components/skeletons/PostLitsItemSkeleton";
import { getCurrentUser } from "features/user/userSlice";
import { openLoginModal } from "features/loginModal/loginModalSlice";
import { useSearch } from "hooks/useSearch";

const TopicPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { topicID } = useParams<{ topicID: string }>();
  const currentUser = useAppSelector(getCurrentUser);

  const { search, setSearch, filterPost } = useSearch();

  const onNewPost = () => {
    if (currentUser === null) {
      dispatch(openLoginModal());
    } else {
      navigate("/post/create");
    }
  };

  const { data: topic, isLoading: topicLoading } = useGetTopic(topicID || "");
  const { data: posts, isLoading: postsLoading } = useGetTopicPosts(
    topicID || ""
  );

  return (
    <Box flex={1}>
      <Paper
        sx={{
          width: "100%",
          height: "350px",
          background: topicLoading
            ? "#e7e7e7"
            : topic && `url('${topic.topicImageURL}')`,
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
        {topicLoading ? (
          <Box zIndex={5} p="16px" alignItems={"flex-end"} width={"100%"}>
            <Skeleton width="250px" sx={{ fontSize: "20px" }}></Skeleton>
            <Skeleton width="120px" sx={{ fontSize: "12px" }}></Skeleton>
          </Box>
        ) : (
          topic && (
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
                {posts?.length} posts
              </Typography>
              <Button
                variant="contained"
                endIcon={<Add />}
                color="secondary"
                onClick={() => onNewPost()}
              >
                Post in {topic.topic}
              </Button>
            </Box>
          )
        )}
      </Paper>
      <Box display={"flex"} gap={"12px"} mt={"18px"}>
        <TextInput
          sx={{ flex: "1" }}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputIcon={
            <Search sx={{ color: theme.palette.black, mr: "12px" }}></Search>
          }
        ></TextInput>
        <PostFilter />
      </Box>
      <Box display="flex" flexDirection="column" gap="4px" mt={"16px"}>
        {postsLoading
          ? [1, 2, 3].map((i) => <PostListItemSkeleton key={i} />)
          : posts &&
            posts
              .filter(filterPost)
              .map((post) => (
                <PostListItem
                  post={post}
                  key={post.id}
                  onClick={() => navigate(`/post/${post.id}`)}
                ></PostListItem>
              ))}
      </Box>
    </Box>
  );
};

export default TopicPage;
