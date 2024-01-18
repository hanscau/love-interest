import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user/userSlice";
import loginModalReducer from "features/loginModal/loginModalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loginModal: loginModalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
