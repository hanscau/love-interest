import Logout from "components/Logout";
import { getCurrentUser } from "features/user/userSlice";
import { useAppSelector } from "hooks/useRedux";
import { useRoutes } from "react-router-dom";
import CreatePost from "views/CreatePost";
import ErrorPage from "views/ErrorPage";
import Explore from "views/Explore";
import InterestPage from "views/InterestPage";
import PostPage from "views/PostPage";
import TopicPage from "views/TopicPage";
import UserPage from "views/UserPage";

export default function Routes() {
  const currentUser = useAppSelector(getCurrentUser);

  const routes = useRoutes([
    { path: "/", element: <Explore /> },
    { path: "/logout", element: <Logout /> },
    { path: "/interest", element: <InterestPage /> },
    {
      path: "/post/create",
      element: currentUser ? <CreatePost /> : <ErrorPage />,
    },
    { path: "/post/:postID", element: <PostPage /> },
    { path: "/topic/:topicID", element: <TopicPage /> },
    { path: "/user/:userID", element: <UserPage /> },
    { path: "*", element: <ErrorPage /> },
  ]);
  return routes;
}
