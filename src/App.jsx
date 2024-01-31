
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Main from './Layout/Main';
import Registration from './Layout/Registration';
import Login from './Layout/Login';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main/>
    },
    {
      path:'/registration',
      element:<Registration/>
    },
    {
      path:'/login',
      element:<Login/>
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
