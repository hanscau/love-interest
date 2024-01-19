import { useRoutes } from "react-router-dom";
import CreatePost from "views/CreatePost";
import Explore from "views/Explore";
import PostPage from "views/PostPage";
import Topic from "views/Topic";
import UserPage from "views/UserPage";

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Explore /> },
    { path: "/post/create", element: <CreatePost /> },
    { path: "/post/:postID", element: <PostPage /> },
    { path: "/topic/:topicID", element: <Topic /> },
    { path: "/user/:userID", element: <UserPage /> },
  ]);
  return routes;
}
