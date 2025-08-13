import React from 'react'
import Signup from './pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Bloggs from './pages/Bloggs'
import About from './pages/About'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'


const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/><Home/></>
  },
  {
    path:"/blogs",
    element:<><Navbar/><Bloggs/></>
  },
  {
    path:"/about",
    element:<><Navbar/><About/></>

  },

  {
    path:"/dashboard",
    element: <><Navbar/><ProtectedRoute><Dashboard/></ProtectedRoute></>,
    children:[
      {
        path: "write-blog",
        element:<><CreateBlog/></>
      },
      {
        path: "write-blog/:blogId",
        element: <><UpdateBlog /></>
      },
      {
        path: "your-blog",
        element:<YourBlog/>
      },
      {
        path: "comments",
        element:<Comments/>
      },
      {
        path: "profile",
        element:<Profile/>
      },
      
      
    ]
   },

  {
    path:"/login",
    element:<><Navbar/><Login/></>
  },
  {
    path:"/signup",
    element:<><Navbar/><Signup/></>
  },
])


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
