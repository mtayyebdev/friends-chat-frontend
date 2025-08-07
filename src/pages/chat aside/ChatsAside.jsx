import React, { useState, useEffect } from 'react'
import SingleChat from '../single chat/SingleChat.jsx'
import { SingleUserContact, InputBox } from '../../components/index.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LuContact, LuSettings } from 'react-icons/lu'

function ChatsAside() {
  const [showSideBar, setshowSideBar] = useState(false)
  const { users: chattingusers, onlineUsers } = useSelector((state) => state.chattingUsers)
  const { user } = useSelector((state) => state.user);
  const [filteredContacts, setfilteredContacts] = useState([])
  const [search, setSearch] = useState("")
  const [menuOpen, setMenuOpen] = useState(null)
  const [chatId, setchatId] = useState(null)

  const filterOnlineUsers = (e) => {
    if (e.target.checked) {
      const filterOnline = filteredContacts.filter((user) => onlineUsers?.includes(user._id));
      setfilteredContacts(filterOnline)
    } else {
      setfilteredContacts(chattingusers.filter(
      c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    ))
    }
  }

  const chatHandler = (id) => {
    setchatId(id)
  }

  useEffect(() => {
    setfilteredContacts(chattingusers.filter(
      c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    ))
  }, [search])


  return (
    <>
      <div className="h-[641px] relative flex bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className='w-[60px] relative border-r text-black dark:text-white border-blue-500'>
          <div className='text-3xl rounded cursor-pointer hover:bg-blue-600/30 flex items-center justify-center py-5 w-full' onClick={() => setshowSideBar(!showSideBar)}>
            <LuContact />
          </div>
          <div className='text-3xl mt-2 rounded cursor-pointer hover:bg-blue-600/30 flex items-center justify-center py-4 w-full'>
            <LuSettings />
          </div>
          <div className='overflow-hidden absolute bottom-10 w-full flex items-center justify-center'>
            <Link to={"/profile"}><img src={user?.avatar} alt={user?.name} className='w-[45px] h-[45px] rounded-full border-2 border-pink-500' /></Link>
          </div>
        </div>
        {/* Sidebar */}
        <aside className={`${showSideBar ? "block" : "hidden"} z-10 absolute left-[60px] top-0 sm:static w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <InputBox type='text' placeholder={"Search by name or number"} value={search} setValue={setSearch} />
            <div className="flex items-center gap-1.5 text-black dark:text-white mt-3">
              <input type="checkbox" onChange={filterOnlineUsers} id="onlineUsers" />
              <label htmlFor="onlineUsers" className='text-sm'>Show Online Users ({filteredContacts.filter((user) => onlineUsers?.includes(user._id)).length})</label>
            </div>
          </div>
          <div className="h-[542px] overflow-y-auto py-2">
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400 text-center">No contacts found</div>
            ) : (
              filteredContacts.map((contact, i) => (
                <SingleUserContact
                  key={i}
                  contact={contact}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                  fn={chatHandler}
                />
              ))
            )}
          </div>
        </aside>
        {/* Main Chat Area */}
        <main className="flex-1 ">
          <SingleChat chatId={chatId} />
        </main>
      </div>
    </>
  )
}

export default ChatsAside