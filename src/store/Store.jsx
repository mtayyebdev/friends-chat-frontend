import { configureStore } from '@reduxjs/toolkit';
import userHandler from './slices/userSlice';
import chattingUsersHandler from './slices/chattingUsersSlice'
import GetMessagesSlice from './slices/messagesSlice'
import SocketHandlerSlice from './slices/socketSlice'
import ThemeHandlerSlice from './slices/themeSlice'

const store = configureStore({
    reducer: {
        user: userHandler,
        chattingUsers: chattingUsersHandler,
        getmessages: GetMessagesSlice,
        socket: SocketHandlerSlice,
        themehandler: ThemeHandlerSlice
    }
});

export default store;