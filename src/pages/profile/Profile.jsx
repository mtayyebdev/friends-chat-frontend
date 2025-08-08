import React, { useState, useEffect } from 'react'
import { FaEdit, FaLock, FaUserCircle, FaMoon, FaSun, FaPhoneAlt, FaSignOutAlt, FaCamera, FaArrowLeft } from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { DisConnectSocket } from '../../store/slices/socketSlice'
import { changeTheme } from '../../store/slices/themeSlice'

function Profile() {
  // Example user data, replace with actual data from your store/API
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(avatar)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const { user } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.themehandler);
  const dispatch = useDispatch()

  // Edit toggles
  const [editProfile, setEditProfile] = useState(false)
  const [editAvatar, setEditAvatar] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [editForm, setEditForm] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
      setEditAvatar(true)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    // Implement profile update logic here
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/updateuser`, {
        name,
        bio
      }, { withCredentials: true })
      if (res.status === 200) {
        toast.success(res.data.message)
        setEditProfile(false)
        setEditForm(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");

    }
  }

  const handleAvatarUpload = async () => {
    try {
      const formData = new FormData()
      formData.append("avatar", avatar)
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/updateuser`, formData, {
        withCredentials: true
      })
      if (res.status === 200) {
        toast.success(res.data.message)
        setEditAvatar(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");

    }
  }

  const handleAvatarClose = () => {
    setAvatar(null)
    setAvatarPreview(user?.avatar)
    setEditAvatar(false)
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    // Implement password update logic here
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/updatepassword`, {
        oldpassword: oldPassword,
        newpassword: newPassword
      }, { withCredentials: true })
      if (res.status === 200) {
        toast.success(res.data.message)
        setEditPassword(false)
        setOldPassword("")
        setNewPassword("")
        setEditForm(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  const handleLogout = async () => {
    // Implement logout logic here
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true
      })
      if (res.status === 200) {
        toast.success("Logged out successfully!")
        dispatch(DisConnectSocket())
        setTimeout(() => {
          window.location.href = "/login"
        }, 1000)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  const handleThemeSwitch = () => {
    dispatch(changeTheme())
  }

  useEffect(() => {
    setAvatarPreview(user?.avatar)
    setName(user?.name)
    setBio(user?.bio)
  }, [user])


  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {editForm && (
        <div className="form w-full h-screen absolute z-20 backdrop:blur-md bg-gray-100/90 dark:bg-gray-900/90 transition-colors px-5 flex items-center justify-center">
          {editProfile && (
            <form className="w-lg space-y-4" onSubmit={handleProfileUpdate}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                <textarea
                  id="bio"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={2}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors shadow-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="w-full cursor-pointer py-2 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold transition-colors shadow-md"
                onClick={() => { setEditProfile(false); setEditForm(false) }}
              >
                Cancel
              </button>
            </form>
          )}
          {editPassword && (
            <div className="mt-8 w-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><FaLock /> Change Password</h3>
              <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors cursor-pointer shadow-md"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  className="w-full cursor-pointer py-2 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold transition-colors shadow-md"
                  onClick={() => { setEditPassword(false); setEditForm(false) }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      <div className="nav flex items-center justify-between px-5 py-2 bg-white dark:bg-gray-800 text-black dark:text-white">
        <Link to={"/"} className='py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md'>
          <FaArrowLeft className='text-xl' />
        </Link>
        <button onClick={handleLogout} className='py-1.5 px-4 bg-red-500 flex items-center space-x-2 font-semibold hover:bg-red-600 rounded-md'>
          <p>Logout</p>
          <FaSignOutAlt className='text-xl' />
        </button>
      </div>
      <div className="container mx-auto px-5 py-4">
        <div className="flex justify-between flex-col md:flex-row gap-4">
          <div className="left w-full md:w-1/2">
            <div className="coverImage relative w-full h-[180px]">
              <img src={avatarPreview} alt="Cover" className="object-cover rounded-lg w-full h-full" />
              <div className="avatar absolute w-full flex justify-center -bottom-16 left-0">
                <div className="relative group">
                  <label htmlFor="upload">
                    <img src={avatarPreview} alt="Image" className='rounded-full border-2 border-green-500 w-[150px] h-[150px]' />
                    <span
                      className="absolute bottom-0 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow transition"
                      title="Edit Avatar"
                    >
                      <FaCamera />
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id='upload'
                      onChange={handleAvatarChange}
                    />
                  </label>
                  {editAvatar && (<div className='absolute left-0 -bottom-10 flex items-center gap-2'>
                    <button
                      className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={handleAvatarClose}
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={handleAvatarUpload}
                    >
                      Save
                    </button>
                  </div>)
                  }
                </div>
              </div>
            </div>

            <div className="profileDetails mt-20 text-black dark:text-white">
              <div className="bio text-center">
                {user?.bio}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="name flex items-center gap-2">
                  <FaUserCircle className='text-2xl' />
                  <span className='text-lg font-semibold'>{user?.name}</span>
                </div>
                <div className="phone flex items-center gap-2">
                  <FaPhoneAlt className='text-xl' />
                  <span className='text-lg font-semibold'>{user?.phone}</span>
                </div>
              </div>
            </div>

          </div>
          <div className="right mt-5 md:mt-0 w-full md:w-1/2">
            <div className="settings p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className='text-2xl text-black dark:text-white text-center font-semibold mb-4'>Settings</h2>
              <div className="editProfile px-3 py-1.5 bg-white dark:bg-blue-500 hover:bg-gray-100 dark:hover:bg-blue-600 rounded-lg shadow-md mb-4 cursor-pointer" onClick={() => { setEditProfile(!editProfile); setEditForm(true) }}>
                <button
                  className="flex items-center gap-2 text-black dark:text-white font-semibold"

                >
                  <FaEdit className='text-xl' />
                  Edit Profile
                </button>
              </div>
              <div className="changePassword px-3 py-1.5 bg-white dark:bg-blue-500 hover:bg-gray-100 dark:hover:bg-blue-600 rounded-lg shadow-md mb-4 cursor-pointer" onClick={() => { setEditPassword(!editPassword); setEditForm(true) }}>
                <button
                  className="flex items-center gap-2 text-black dark:text-white font-semibold"
                >
                  <FaLock className='text-xl' />
                  Change Password
                </button>
              </div>
              <div className="themeSwitch px-3 py-1.5 bg-white dark:bg-blue-500 hover:bg-gray-100 dark:hover:bg-blue-600 rounded-lg shadow-md mb-4 cursor-pointer" onClick={handleThemeSwitch}>
                <button
                  className="flex items-center gap-2 text-black dark:text-white font-semibold"

                >
                  {theme === "light" ? <FaMoon className='text-xl' /> : <FaSun className='text-xl' />}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile