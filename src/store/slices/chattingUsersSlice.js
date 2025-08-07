import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const chattingUsersHandler = createAsyncThunk(
  "getChattingUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/message/users`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chattingUsersSlice = createSlice({
  name: "chattingUsers",
  initialState: {
    users: [],
    onlineUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chattingUsersHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chattingUsersHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(chattingUsersHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOnlineUsers } = chattingUsersSlice.actions;
export default chattingUsersSlice.reducer;
