import React, { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userHandler } from './store/slices/userSlice.js'
import { chattingUsersHandler, setOnlineUsers } from './store/slices/chattingUsersSlice.js'
import { ConnectSocket, getSocket } from './store/slices/socketSlice.js'

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  const { connected } = useSelector((state) => state.socket);
  const { theme } = useSelector((state) => state.themehandler);

  useEffect(() => {
    dispatch(chattingUsersHandler())
    dispatch(userHandler())
    document.documentElement.setAttribute("class",theme)
  }, [])

  useEffect(() => {
    if (user?._id && !connected) {
      dispatch(ConnectSocket({ userId: user?._id }));
      getSocket().on("onlineUsers", (userIds) => {
        dispatch(setOnlineUsers(userIds))
      })
    }
  }, [user, connected])

  return (
    <Outlet />
  )
}

export default App