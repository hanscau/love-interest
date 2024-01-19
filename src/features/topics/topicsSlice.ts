import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Topic from "model/Topic";

interface TopicsState {
  topics: Topic[];
  status: string;
  error: string | null;
}

const initialState: TopicsState = {
  topics: [],
  status: "idle",
  error: null,
};

export const fetchTopics = createAsyncThunk("topics/fetchTopics", async () => {
  const response = await fetch("http://localhost:3001/topics");
  return response.json();
});

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: { payload: Topic }) {
        state.topics.push(action.payload);
      },
      prepare(payload: Topic) {
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
      .addCase(fetchTopics.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        //To prevent doubling of posts when page is loaded
        state.topics = [].concat(action.payload);
        // state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { postAdded } = topicsSlice.actions;
export default topicsSlice.reducer;

export const selectAllTopics = (state: { topics: TopicsState }) =>
  state.topics.topics;

export const selectTopicById = (
  state: { topic: TopicsState },
  topicID: number
) => state.topic.topics.find((topic: Topic) => topic.topicID === topicID);
