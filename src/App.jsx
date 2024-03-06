
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import firebaseConfig from './firebase.Config';
import ForgotPassword from './componentes/ForgotPassword';
import Home from './home/Home';
import Chat from './Pages/Chat';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Registration/>
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path: "/forgotpassword",
      element:<ForgotPassword/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/chat",
      element:<Chat/>
    }
    
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
