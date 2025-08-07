import React from 'react'
import { useSelector } from 'react-redux'

function SingleUserContact({
    contact,
    menuOpen,
    setMenuOpen,
    fn
}) {
    const { onlineUsers } = useSelector((state) => state.chattingUsers)
    const { user } = useSelector((state) => state.user)

    const handleMenuClick = (id) => {
        setMenuOpen(menuOpen === id ? null : id)
    }

    const handleDelete = (id) => {
        // Implement delete logic here
        // alert(`Delete contact ${id}`)
        setMenuOpen(null)
    }

    const handleBlock = (id) => {
        // Implement block logic here
        // alert(`Block contact ${id}`)
        setMenuOpen(null)
    }

    return (
        <>
            <div onClick={() => fn(contact._id)}>
                <div className="relative flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {
                            <img src={contact.avatar ? contact.avatar : ""} alt={contact.name} className="w-full h-full rounded-full object-cover" />
                        }
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-gray-800 dark:text-white">{contact.name}{" "}{user?._id==contact?._id && <span className="text-xs text-gray-500 dark:text-gray-400">(You)</span>}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${onlineUsers?.includes(contact?._id) ? 'bg-green-500' : 'bg-gray-400'} ml-2`} title={onlineUsers?.includes(contact?._id) ? "Online" : "Offline"}></div>
                    {/* 3 dots menu */}
                    <div className="relative ml-2">
                        <button
                            type="button"
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={e => { e.stopPropagation(); handleMenuClick(contact._id); }}
                        >
                            <svg width="20" height="20" fill="currentColor" className="text-gray-500 dark:text-gray-300">
                                <circle cx="4" cy="10" r="2" />
                                <circle cx="10" cy="10" r="2" />
                                <circle cx="16" cy="10" r="2" />
                            </svg>
                        </button>
                        {menuOpen === contact._id && (
                            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={e => { e.stopPropagation(); handleDelete(contact._id); }}
                                >
                                    Delete Contact
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={e => { e.stopPropagation(); handleBlock(contact._id); }}
                                >
                                    Block Contact
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleUserContact