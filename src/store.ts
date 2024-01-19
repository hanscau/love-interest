import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user/userSlice";
import loginModalReducer from "features/loginModal/loginModalSlice";
import postsReducer from "features/posts/postsSlice";
import topicsReducer from "features/topics/topicsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loginModal: loginModalReducer,
    posts: postsReducer,
    topics: topicsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
