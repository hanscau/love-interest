import { useRoutes } from "react-router-dom";
import Explore from "views/Explore";

export default function Routes() {
  const routes = useRoutes([{ path: "/", element: <Explore /> }]);
  return routes;
}
