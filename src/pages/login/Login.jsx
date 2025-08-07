import React, { useState } from 'react'
import { Button, InputBox } from '../../components/index.js'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ConnectSocket } from '../../store/slices/socketSlice.js'
import { useDispatch,useSelector } from 'react-redux'

function Login() {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.user)
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setshowpass] = useState(false);

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { phone, password }, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      if (response.status == 200) {
        toast.success(response.data.message);
        setPhone("");
        setPassword("");
        dispatch(ConnectSocket({userId:user?._id}))
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto">
          <div className="form max-w-md mx-auto my-5 rounded-2xl bg-white dark:bg-gray-800 shadow p-5">
            <h3 className='text-2xl font-semibold mt-3 text-gray-800 dark:text-white'>Login</h3>
            <p className='text-lg mt-1 text-gray-700 dark:text-gray-300'>Welcome Back, Sir👋</p>
            <form onSubmit={LoginHandler} className='mt-5'>
              <div>
                <label htmlFor="phone" className='text-sm text-gray-700 dark:text-gray-300'>Your Phone Number</label>
                <InputBox type='text' id={"phone"} placeholder="Phone Number" value={phone} setValue={setPhone} required={true} />
              </div>
              <div className='mt-3 relative'>
                <label htmlFor="password" className='text-gray-700 dark:text-gray-300'>Your Password</label>
                <InputBox type={showpass ? 'text' : 'password'} id={"password"} placeholder={"Enter your password"} value={password} setValue={setPassword} />
                <span onClick={() => setshowpass(!showpass)} className='absolute right-3 text-blue-500 text-xl top-9 cursor-pointer'>
                  {showpass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="mt-3 text-center">
                <Button value={"Login"} extraClass={"w-full"} size={"lg"} />
              </div>
            </form>
            <div className="mt-5 text-center">
              <p className='text-gray-700 dark:text-gray-400'>Don't have account.</p>
              <Link className='text-blue-500 hover:underline dark:text-blue-400' to={"/signup"}>Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login