import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Post from "model/Post";

interface PostsState {
  posts: Post[];
  status: string;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3001/posts");
  return response.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: { payload: Post }) {
        state.posts.push(action.payload);
      },
      prepare(payload: Post) {
        return {
          payload: {
            ...payload,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //To prevent doubling of posts when page is loaded
        state.posts = [].concat(action.payload);
        // state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state: { posts: PostsState }) =>
  state.posts.posts;

export const selectPostById = (state: { posts: PostsState }, postId: number) =>
  state.posts.posts.find((post: Post) => post.PostID === postId);
