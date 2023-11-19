import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Youtube from './components/Youtube/Youtube'
import Instagram from './components/Instagram/Instagram'
import Facebook from './components/Facebook/Facebook'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Youtube/> 
      },
      {
        path: "/instagram",
        element: <Instagram/> 
      },
      {
        path: "/facebook",
        element: <Facebook/> 
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
