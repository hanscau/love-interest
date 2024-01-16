import { useRoutes } from "react-router-dom";
import CreatePost from "views/CreatePost";
import Explore from "views/Explore";
import Post from "views/Post";
import Topic from "views/Topic";
import User from "views/User";

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Explore /> },
    { path: "/topic/:topicID", element: <Topic /> },
    { path: "/post/:postID", element: <Post /> },
    { path: "/user/:userID", element: <User /> },
    { path: "/post/create", element: <CreatePost /> },
  ]);
  return routes;
}
