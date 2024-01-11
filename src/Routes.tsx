import { useRoutes } from "react-router-dom";
import Explore from "views/Explore";
import Topic from "views/Topic";

export default function Routes() {
  const routes = useRoutes([
    { path: "/", element: <Explore /> },
    { path: "/topic/:topicID", element: <Topic /> },
  ]);
  return routes;
}
