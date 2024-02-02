
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Registration from './Layout/Registration';
import Login from './Layout/Login';
import firebaseConfig from './firebase.Config';
import ForgotPassword from './componentes/ForgotPassword';
import Home from './componentes/Home';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Registration/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/forgotpassword',
      element:<ForgotPassword/>
    },
    {
      path:'/home',
      element:<Home/>
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
