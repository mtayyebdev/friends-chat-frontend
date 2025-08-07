import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socket = null;

const SocketHandlerSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    error: null,
  },
  reducers: {
    ConnectSocket: (state, action) => {
      if (!socket) {
        socket = io(import.meta.env.VITE_API_BASEURL,{
          withCredentials:true,
          query:{
            userId:action.payload.userId
          }
        });
        socket.connect();
        
        socket.on("connect_error", (err) => {
          console.log("❌ Socket Connection Error:", err);
        });
        state.connected = true;
        state.error = null;
      }
    },
    DisConnectSocket: (state, action) => {
      if (socket) {
        socket.disconnect();
        socket = null;
        console.log("❌ Socket Disconnected");
      }
      state.connected = false;
    },
  },
});

export const { ConnectSocket, DisConnectSocket } = SocketHandlerSlice.actions;
export const getSocket = () => socket;
export default SocketHandlerSlice.reducer;
