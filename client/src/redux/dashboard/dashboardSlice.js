import { fetchUserPosts } from "@/actions/postActions";
import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
      posts: [],
      loading: false,
      error: null,
      hasMore: true,
    },
    reducers: {
      addPosts(state, action) {
        state.posts = [...state.posts, ...action.payload];
        state.hasMore = action.payload.length >= 9;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.posts = action.payload;
          state.error = null;
        })
        .addCase(fetchUserPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { addPosts } = dashboardSlice.actions;
  export default dashboardSlice.reducer;