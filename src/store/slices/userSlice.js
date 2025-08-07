import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userHandler = createAsyncThunk(
  "getuser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(userHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
