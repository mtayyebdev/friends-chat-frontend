import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuSend, LuX, LuSmile, LuPaperclip } from 'react-icons/lu'
import {FaEllipsisV} from 'react-icons/fa'
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
  const [isTyping, setIsTyping] = useState(false);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 shadow-lg transition-colors duration-300">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-gray-200 dark:ring-slate-700 transition-all duration-300">
              {isChatId ?
                <img src={chatterData.avatar} alt={chatterData.name} className="w-full h-full object-cover" /> :
                <span className="text-white font-bold text-lg">U</span>
              }
            </div>
            {onlineUsers?.includes(chatId) && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse transition-colors duration-300"></div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-gray-900 dark:text-white font-semibold text-lg transition-colors duration-300">{isChatId ? chatterData?.name : "Username"}</div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${onlineUsers?.includes(chatId) ? 'bg-green-400' : 'bg-gray-400 dark:bg-slate-500'} animate-pulse transition-colors duration-300`}></div>
              <div className="text-gray-500 dark:text-slate-400 text-sm transition-colors duration-300">{onlineUsers?.includes(chatId) ? "Active now" : "Last seen recently"}</div>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 hover:scale-110">
          <FaEllipsisV className="w-5 h-5 text-gray-500 dark:text-slate-400 transition-colors duration-300" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {isChatId ? messages.map((msg, idx) => (
          <div key={idx} ref={idx === messages.length - 1 ? MessageRef : null}
            className={`flex ${msg.sender == user._id ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`group max-w-xs lg:max-w-md xl:max-w-lg relative transform transition-all duration-300 hover:scale-[1.02]
              ${msg.sender == user._id ? 'ml-auto' : 'mr-auto'}`}>

              <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300
                ${msg.sender == user._id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-800/90 text-gray-900 dark:text-slate-100 border border-gray-200 dark:border-slate-700/50 rounded-bl-md'
                } break-words whitespace-pre-line`}>

                {/* Message bubble glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300
                  ${msg.sender == user._id ? 'bg-blue-400' : 'bg-gray-200 dark:bg-slate-600'}`}></div>

                {msg.attachments && (
                  <div className="mb-3 relative">
                    <img
                      src={msg.attachments}
                      alt="attachment"
                      className='w-full max-w-[200px] h-auto rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
                    />
                  </div>
                )}

                {msg.content && (
                  <div className="relative z-10 text-sm leading-relaxed">{msg.content}</div>
                )}

                <div className={`text-xs mt-2 ${msg.sender == user._id ? 'text-blue-100' : 'text-gray-500 dark:text-slate-400'} flex items-center justify-end space-x-1 transition-colors duration-300`}>
                  <span>{formatTime(msg.timestamp)}</span>
                  {msg.sender == user._id && (
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                      <div className="w-1 h-1 bg-current rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-slate-500 transition-colors duration-300">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300">
                <LuSend className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose from existing conversations or start a new one</p>
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg transition-colors duration-300">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-slate-400 rounded-full animate-bounce transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-slate-400 rounded-full animate-bounce delay-100 transition-colors duration-300"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-slate-400 rounded-full animate-bounce delay-200 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File Preview */}
      {file && (
        <div className="relative z-10 px-4 pb-2">
          <div className="bg-white dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700/50 rounded-xl p-3 backdrop-blur-sm shadow-lg transition-colors duration-300">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img src={URL.createObjectURL(file)} className='w-16 h-16 rounded-lg object-cover shadow-md' alt="preview" />
                <button
                  onClick={ClearFile}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm transition-colors duration-200"
                >
                  <LuX className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-slate-300 text-sm font-medium transition-colors duration-300">{file.name}</p>
                <p className="text-gray-500 dark:text-slate-500 text-xs transition-colors duration-300">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="relative z-10 px-4 pb-4">
        <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
          <div className="flex items-end space-x-2 p-3">
            <div className="flex space-x-2">
              <button
                className='p-2 rounded-full bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white cursor-pointer transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={!isChatId}
                onClick={handleFile}
              >
                <LuPaperclip className='w-5 h-5' />
              </button>
            </div>

            <div className="flex-1 relative">
              <textarea
                className="w-full bg-transparent text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 border-none outline-none resize-none min-h-[40px] max-h-32 py-2 px-3 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent transition-colors duration-300"
                placeholder="Type a message..."
                value={input}
                disabled={!isChatId}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db transparent'
                }}
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                className='p-2 rounded-full bg-gray-100 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white cursor-pointer transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={!isChatId}
              >
                <LuSmile className='w-5 h-5' />
              </button>

              <button
                type="submit"
                className={`p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
                  ${input.trim() || file
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-slate-700/50 text-gray-400 dark:text-slate-400'
                  } transition-colors duration-300`}
                disabled={!isChatId}
                onClick={sendMessage}
              >
                <LuSend className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        className='hidden'
        disabled={!isChatId}
        ref={fileRef}
        onChange={e => setFile(e.target.files[0])}
        accept="image/*"
      />

      <style jsx="true">{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-300 {
          scrollbar-color: #d1d5db transparent;
        }
        .scrollbar-thumb-slate-600 {
          scrollbar-color: #475569 transparent;
        }
        .scrollbar-track-transparent {
          scrollbar-track-color: transparent;
        }
        @media (prefers-color-scheme: dark) {
          .scrollbar-thumb-gray-300 {
            scrollbar-color: #475569 transparent;
          }
        }
      `}</style>
    </div>
  )
}

export default SingleChat