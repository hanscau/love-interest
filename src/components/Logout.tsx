import { logout } from "features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "reduxHooks";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  dispatch(logout());

  navigate("/");

  return <h1>Logout</h1>;
};

export default Logout;
