
import { Link, useNavigate } from "react-router-dom";
import { IoHomeSharp,IoChatboxEllipses,IoNotifications,IoLogOut } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slice/userSlice';


const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
          <div className="navbar_img_round">
            <img src="/" alt="" />
          </div>
          <h1>Ariful Islam</h1>
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
    </nav>
  );
};

export default Navbar;
