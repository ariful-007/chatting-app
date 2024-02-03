import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const headelLogOut = () =>{
    signOut(auth).then(() => {
      navigate("/login");
      dispatch(userLoginInfo(null));
      localStorage.removeItem("user");
    }).catch((error) => {
      // An error happened.
    });

  }


  return (
    <nav className="bg-cyan-600 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <div className="img">
            <img src="" className=" w-full" alt="" />
          </div>
          <h1 className=" text-2xl font-bold text-black capitalize">Ariful islam</h1>
        </div>
        <div className=" flex gap-4 md:gap-8 lg:gap-14 menu_icon">
          <Link to='/home'> <FaHome /> </Link>
          <Link to='/chat'> <IoChatboxEllipses /> </Link>
          <Link to='/'> <IoMdNotifications /> </Link>
          <div className=" cursor-pointer">
            <IoIosLogIn onClick={headelLogOut} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
