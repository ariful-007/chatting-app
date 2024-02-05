import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoEye,IoEyeOff } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slice/userSlice';


const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // gate input start
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("") 
  // gate input end
  // gate input error start
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  // gate input error end
  // gate regex start
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // gate regex end

  // gate icon start
  const [showIcon, setShowIcon] = useState(false)
  const handelShowIcon = () =>{
    setShowIcon(!showIcon)
  }
  // gate icon end    

  // gate function start
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }
  // gate function end

  const handelSubmit = (e) => {
    e.preventDefault()
    if(!email){
      setEmailError("Email is Required")
    }
    else if(!emailRegex.test(email)){
      setEmailError("Invalid Email")
    }
    if(!password){
      setPasswordError("Password is Required")
    }
    if(email && emailRegex.test(email) && password ){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(userLoginInfo(user))
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successfully")
        navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  }

  return (
    <div id="login_form">
      <div className="main_menu">
        <h2>Login Here</h2>
        <form onSubmit={handelSubmit}>
            <input onChange={handleEmail} value={email} type="text" placeholder="Email" />
            <p className="error_message">{emailError}</p>
            <div className=" relative">
            <input onChange={handlePassword} value={password} type={showIcon ? "text" : "password"} placeholder="Password" />
            {
              showIcon?
              <IoEye onClick={handelShowIcon} className=" absolute right-4 cursor-pointer  top-[64%] translate-y-[-50%]" />
              :
              <IoEyeOff onClick={handelShowIcon} className=" absolute right-4 cursor-pointer top-[64%] translate-y-[-50%]" />
            }
            </div>
            <p className="error_message">{passwordError}</p>
          <button type="submit"className="Button_v_1">login</button>
        </form>
        <Link to='/forgotpassword' className="forgot_btn">ForgotPassword</Link>
        <p className="menu_text">
          New Here? Please {" "}
          <Link to='/' className="menu_btn" >Registration</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;