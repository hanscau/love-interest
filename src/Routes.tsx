import { useRoutes } from "react-router-dom";
import CreatePost from "views/CreatePost";
import Explore from "views/Explore";
import InterestPage from "views/InterestPage";
import PostPage from "views/PostPage";
import TopicPage from "views/TopicPage";
import UserPage from "views/UserPage";

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Explore /> },
    { path: "/interest", element: <InterestPage /> },
    { path: "/post/create", element: <CreatePost /> },
    { path: "/post/:postID", element: <PostPage /> },
    { path: "/topic/:topicID", element: <TopicPage /> },
    { path: "/user/:userID", element: <UserPage /> },
  ]);
  return routes;
}
