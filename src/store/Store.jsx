import { configureStore } from '@reduxjs/toolkit';
import userHandler from './slices/userSlice';
import chattingUsersHandler from './slices/chattingUsersSlice'
import GetMessagesSlice from './slices/messagesSlice'
import SocketHandlerSlice from './slices/socketSlice'

const store = configureStore({
    reducer: {
        user: userHandler,
        chattingUsers: chattingUsersHandler,
        getmessages: GetMessagesSlice,
        socket: SocketHandlerSlice
    }
});

export default store;