import { Store, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { login, logout } from "features/user/userSlice";

export const authMiddleware = createListenerMiddleware();
authMiddleware.startListening({
  matcher: isAnyOf(login, logout),
  effect: (action, listenerApi) => {
    localStorage.setItem("savedUserData", JSON.stringify(action.payload));
  },
});

export const getSaveUserData = () => {
  const savedUserData = localStorage.getItem("savedUserData");
  return savedUserData ? JSON.parse(savedUserData) : null;
};
