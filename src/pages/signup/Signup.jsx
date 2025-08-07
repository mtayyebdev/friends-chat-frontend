import React, { useState } from 'react'
import { Button, InputBox } from '../../components/index.js'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Signup() {
  const navigate = useNavigate();
  const [showpass, setshowpass] = useState(false);
  const [showconformPass, setshowconformPass] = useState(false);

  const [fullname, setFullname] = useState("")
  const [phone, setPhone] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const signupHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', fullname)
      formData.append('phone', phone)
      formData.append('avatar', avatar)
      formData.append('password', password)


      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
      if (res.status === 200) {
        toast.success(res.data.message)
        setFullname("")
        setPhone("")
        setAvatar(null)
        setPassword("")
        setConfirmPassword("")
        setAvatarPreview(null)
        navigate('/login') // Redirect to login after successful signup
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred during signup.")
      return
    }
  }

  return (
    <>
      <div className="min-h-screen py-5 flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Sign Up</h2>
          <form className="space-y-6" onSubmit={signupHandler}>
            <div className="flex flex-col items-center">
              <label htmlFor="avatar" className="cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-300 dark:border-gray-600 mb-2">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">Upload Avatar</span>
            </div>
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <InputBox
                type="text"
                id="fullname"
                placeholder="Enter your full name"
                value={fullname}
                setValue={setFullname}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <InputBox
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                setValue={setPhone}
                required={true}
              />
            </div>
            <div className='relative'>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <InputBox
                type={showpass ? 'text' : 'password'}
                id="password"
                value={password}
                setValue={setPassword}
                placeholder="Enter your password"
                required={true}
              />
              <span onClick={() => setshowpass(!showpass)} className='absolute right-3 text-blue-500 text-xl top-9 cursor-pointer'>
                {showpass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className='relative'>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <InputBox
                type={showconformPass ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                placeholder="Confirm your password"
                required={true}
              />
              <span onClick={() => setshowconformPass(!showconformPass)} className='absolute right-3 text-blue-500 text-xl top-9 cursor-pointer'>
                {showconformPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <Button
              type="submit"
              value="Sign Up"
              extraClass="w-full"
              size="xl"
            />
          </form>
          <div className="mt-5 text-center">
            <p className="text-gray-700 dark:text-gray-400">Already have an account?</p>
            <Link className="text-blue-500 hover:underline dark:text-blue-400" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup