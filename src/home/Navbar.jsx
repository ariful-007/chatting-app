
import { Link, useNavigate } from "react-router-dom";
import { IoHomeSharp,IoChatboxEllipses,IoNotifications,IoLogOut } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../slice/userSlice';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";


const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState()

  const data = useSelector((state) => state.userLoginInfo.userInfo)
  console.log(data)

  const heandelLogout = () => {
    signOut(auth).then(() => {
      navigate('/login')
      dispatch(userLoginInfo(null))
      localStorage.removeItem("user")
    }).catch((error) => {
      console.log(error)
    });
  }
  
  return (
    <nav id="navbar" className="bg-gray-700 py-2 px-4">
      <div className="main_navbar">
        <div className="navbar_img">
          <div className="navbar_img_round relative group">
            <img src='' alt="" />
            <h1 className="displayImg group-hover:opacity-0">{data?.displayName[0]}</h1>
            <div className="overlay hidden group-hover:block">
            <FaCloudUploadAlt />
            </div>
          </div>
          <h1>{data?.displayName}</h1>
        </div>
        <div className="nav_icon_menu">
          <div className="nav_box">
          <Link to='/home' className="nav_icon"> <IoHomeSharp/> </Link>
          </div>
          <div className="nav_box">
          <Link to='/chat' className="nav_icon"> <IoChatboxEllipses/> </Link>
          </div>
          <div className="nav_box">
          <Link to='/notification' className="nav_icon"> <IoNotifications /> </Link>
          </div>
          <div className="nav_box">
          <Link onClick={heandelLogout} to='/login' className="nav_icon"> <IoLogOut  /></Link>
          </div>
        </div>
      </div>
      <div className="modal">
        <div className="profileImages">
          <h1>Update Your Profile Picture </h1>
          <input className=" my-4" type="file" />
          <div className=" flex gap-7">
          <button className="Button_v_2 py-2 px-8">Uplode</button>
          <button className="Button_v_3 py-2 px-8">cansel</button>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
