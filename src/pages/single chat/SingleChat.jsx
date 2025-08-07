import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuImage, LuSend, LuX } from 'react-icons/lu'
import { GetMessagesHandler, sentMessage } from '../../store/slices/messagesSlice'
import axios from 'axios';
import { toast } from 'react-toastify'
import { getSocket } from '../../store/slices/socketSlice'

function SingleChat({ chatId }) {
  const MessageRef = useRef(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [isChatId, setisChatId] = useState(false)
  const [chatterData, setchatterData] = useState(null);
  const { users: chattingusers, onlineUsers } = useSelector((state) => state.chattingUsers);
  const { messages } = useSelector((state) => state.getmessages);
  const { user } = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const sendMessage = async () => {
    if (!input.trim() && !file) {
      toast.error("Please enter a message or select a file to send.");
      return;
    }
    const formData = new FormData();
    formData.append("text", input);
    formData.append("file", file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/message/sendmessage/${chatId}`, formData, {
        withCredentials: true
      });
      if (res.status == 200) {
        dispatch(sentMessage(res.data.data));
        setInput("");
        setFile(null);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  const handleFile = () => {
    fileRef.current.click()
  }

  const ClearFile = () => {
    if (!fileRef.current) return;
    setFile(null)
  }

  useEffect(() => {
    if (chatId != null) {
      setisChatId(true)
      setchatterData(chattingusers.find((user) => user._id === chatId));
      dispatch(GetMessagesHandler(chatId))
    } else {
      setisChatId(false)
    }
  }, [chatId])

  useEffect(() => {
    if (isChatId) {
      const socket = getSocket();
      socket.on("newMessage", (message) => {
        dispatch(sentMessage(message));
      });
    }
  }, [isChatId, chatId, dispatch]);

  useEffect(() => {

    if (MessageRef.current) {
      MessageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-blue-600 dark:bg-blue-700 text-white shadow">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center mr-3">
          {isChatId ? <img src={chatterData.avatar} alt={chatterData.name} /> : <span className="text-blue-600 font-bold text-lg">U</span>}
        </div>
        <div>
          <div className="font-semibold">{isChatId ? chatterData.name : "Username"}</div>
          <div className="text-xs text-blue-200">{onlineUsers?.includes(chatId) ? "Online" : "Offline"}</div>
        </div>
      </div>
      {/* Chat Messages */}
      <div className="overflow-y-auto h-[519px] px-4 py-6 space-y-3">
        {isChatId ? messages.map((msg, idx) => (
          <div key={idx} ref={MessageRef} className={`flex ${msg.sender == user._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg shadow relative
              ${msg.sender == user._id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
              } break-words whitespace-pre-line`}>
              {msg.attachments ? <img src={msg.attachments} alt="image" className='w-[100px] h-[100px]' /> : ""}
              <div>{msg.content}</div>
              <div className="text-xs text-gray-200 dark:text-gray-400 text-right mt-1">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        )) : ""}
      </div>
      {/* Input Area */}
      <div className="px-4 py-2 bg-blue-600 dark:bg-blue-700 flex items-center relative gap-2">
        {
          file && <div className="file absolute bottom-[78px] left-3">
            <div className="relative">
              <span className='absolute bg-white top-0 right-0 cursor-pointer' onClick={ClearFile}>
                <LuX />
              </span>
              <img src={file ? URL.createObjectURL(file) : ""} className='w-[100px] h-[100px]' alt="" />
            </div>
          </div>
        }
        <input
          type="text"
          className="px-3 py-2 bg-white text-black outline-hidden focus:ring-2 focus:ring-blue-500 rounded-lg w-full border border-gray-300 dark:border-gray-500 placeholder:text-slate-500 text-base"
          placeholder="Type a message"
          value={input}
          disabled={!isChatId}
          onChange={e => setInput(e.target.value)}
        />
        <input type="file" className='hidden' disabled={!isChatId} ref={fileRef} onChange={e => setFile(e.target.files[0])} />
        <button
          className='px-4 py-2 rounded-lg bg-white hover:bg-gray-200 text-black cursor-pointer font-semibold'
          disabled={!isChatId}
          onClick={handleFile}
        >
          <LuImage className='text-xl' />
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white hover:bg-gray-200 text-black cursor-pointer font-semibold"
          disabled={!isChatId}
          onClick={sendMessage}
        >
          <LuSend className='text-xl' />
        </button>
      </div>
    </div>
  )
}

export default SingleChat