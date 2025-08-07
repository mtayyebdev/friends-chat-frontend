import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetMessagesHandler = createAsyncThunk(
  "getmessages",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/message/getmessages/${id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GetMessagesSlice = createSlice({
  name: "getmessages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    sentMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(GetMessagesHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMessagesHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.data;
      })
      .addCase(GetMessagesHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { sentMessage } = GetMessagesSlice.actions;
export default GetMessagesSlice.reducer;
