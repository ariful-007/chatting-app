import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { IoEye,IoEyeOff } from "react-icons/io5";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  // gate input start
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  // gate input end
  // gate input error start
  const [fulNameError, setFullNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [repasswordError, setRepasswordError] = useState("")
  // gate input error end
  // gate regex start
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const nameRegex = /^[a-zA-Z]+$/;
  // gate regex end
  // gate loader start
  const [loader, setLoader] = useState(false)
  // gate loader end
  // gate icon start
  const [showIcon, setShowIcon] = useState(false)
  const handelShowIcon = () =>{
    setShowIcon(!showIcon)
  }
  // gate icon end

  // gate input function start
  const handleFullName = (e) => {
    setFullName(e.target.value)
    setFullNameError("")
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailError("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }
  const handleRepassword = (e) => {
    setRepassword(e.target.value)
    setRepasswordError("")
  }
  // gate input function end 
  const handelSubmit = (e) => {
    e.preventDefault()
    if(!fullName){
      setFullNameError("FullName is Required")
    }else if(!nameRegex.test(fullName)){
      setFullNameError("FullName is Invalid")
    }
    if(!email){
      setEmailError("Email is Required")
    }
    else if(!emailRegex.test(email)){
      setEmailError("Invalid Email")
    }
    if(!password){
      setPasswordError("Password is Required")
    }
    if(!repassword){
      setRepasswordError("Repassword is Required")
    }
    if(password !== repassword){
      setRepasswordError("Password and Re-password not Match")
    } 
    if(fullName && nameRegex.test(fullName) && email && emailRegex.test(email) && password && repassword && password === repassword){
      setLoader(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Registration successfully")
        navigate("/login")
        setLoader(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      }); 
    }
  }

  return (
    <div id="registration_form">
      <div className="main_menu">
        <h2>Registration Form</h2>
        <form onSubmit={handelSubmit}>
            <input onChange={handleFullName} value={fullName} type="text" placeholder="Full Name" />
            <p className="error_message">{fulNameError}</p>
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
            <div className=" relative">
            <input onChange={handleRepassword} value={repassword} type={showIcon ? "text" : "password"} placeholder="Re-Password" />
            {
              showIcon?
              <IoEye onClick={handelShowIcon} className=" absolute right-4 cursor-pointer  top-[64%] translate-y-[-50%]" />
              :
              <IoEyeOff onClick={handelShowIcon} className=" absolute right-4 cursor-pointer top-[64%] translate-y-[-50%]" />
            }
            </div>
            <p className="error_message">{repasswordError}</p>

            { 
              loader ?
              <div className=" flex justify-center"><ThreeDots  color="#000" /></div>
              :
              <button type="submit"className="Button_v_1"> Register </button>
            }

        </form>
        <p className="menu_text">
            You already have an account? Please {" "}
          <Link to='/login' className="menu_btn" >Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
