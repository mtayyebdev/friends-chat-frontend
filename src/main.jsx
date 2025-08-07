import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login, Support, ChatsAside, Profile, Signup, SingleChat, Error } from './pages/index.js'
import { PublicRoute, PrivateRoute } from './components/index.js'
import { Provider } from 'react-redux'
import store from './store/Store.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <PrivateRoute><ChatsAside /></PrivateRoute>,
        path: ""
      },
      {
        element: <PrivateRoute><SingleChat /></PrivateRoute>,
        path: "/chat"
      },
      {
        element: <PrivateRoute><Profile /></PrivateRoute>,
        path: "profile"
      }
    ]
  },
  {
    element: <PublicRoute><Login /></PublicRoute>,
    path: "/login"
  },
  {
    element: <PublicRoute><Signup /></PublicRoute>,
    path: "/signup"
  },
  {
    element: <Support />,
    path: "/support"
  },
  {
    element: <Error />,
    path: "*"
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer autoClose={3000} />
    <RouterProvider router={router} />
  </Provider>
)