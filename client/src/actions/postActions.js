import { createAsyncThunk } from "@reduxjs/toolkit";

//Blog Post Create
export const createPost = createAsyncThunk(
    "post/createPost",
    async (postData, { rejectWithValue }) => {
      try {
        const res = await fetch("/api/post/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
  
        const data = await res.json();
        if (!res.ok) {
          return rejectWithValue(data.message);
        }
        return data;
      } catch (error) {
        return rejectWithValue("Something went wrong");
      }
    }
  );
// Blog Post Update 
  export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({ postId, userId, formData }, { rejectWithValue }) => {
      try {
        const res = await fetch(`/api/post/updatepost/${postId}/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
        if (!res.ok) {
          return rejectWithValue(data.message);
        }
        return data;
      } catch (error) {
        return rejectWithValue("Something went wrong");
      }
    }
  );

  // Fetch specific post
export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/post/getposts?postId=${postId}`);
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.message);
      }
      return data.posts[0];
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);


// fetch all posts

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/post/getposts?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      return data.posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
