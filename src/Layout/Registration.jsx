import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff ,IoEye } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ThreeDots } from 'react-loader-spinner'



const Registration = () => {
  const navigate = useNavigate()
  const auth = getAuth();
// input infometion start
  const [fullName ,setFullName] = useState("")
  const [email ,setEmail] = useState("")
  const [password ,setPassword] = useState("")
  const [rePassword ,setRePassword] = useState("")
// input infometion end

// input field error messeage start
const [fullNameError, setFullNameError] = useState("")
const [emailError, setEmailError] = useState("")
const [passwordError, setPasswordError] = useState("")
const [rePasswordError, setRePasswordError] = useState("")
// input field error messeage end

// loader start 
const [loader , setLoader] = useState(false)
// loade end

// regex start
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRegex = /^[a-zA-Z]+$/;
// regex end

// icon showing start
const [showIcon , setShowIcon] = useState(false)
const heandelShowIcon = () =>{
  setShowIcon(!showIcon)
}
// icon showing end

// get input value start
const heandelFullName = (e) =>{
  setFullName(e.target.value)
  setFullNameError("")
}

const heandelEmail = (e) =>{
  setEmail(e.target.value)
  setEmailError("")
  
}

const heandelPassword = (e) =>{
  setPassword(e.target.value)
  setPasswordError("")
  
}

const heandelRePassword = (e) =>{
  setRePassword(e.target.value)
  setRePasswordError("")
}
// get input value end

// registration submit start
const heandelSubmit = (e) => {
  e.preventDefault()
  if(!fullName){
    setFullNameError("FullName is Required")
  }else if(!nameRegex.test(fullName)){
    setFullNameError("Name is not valid")
  }
  if(!email){
    setEmailError("Email is Required")
  }else if(!emailRegex.test(email)){
    setEmailError("Email is not valid")
  }
  if(!password){
    setPasswordError("Password is Required")
  }
  if(!rePassword){
    setRePasswordError("Re-password is Required")
  }
  if(password!== rePassword){
    setRePasswordError("Password and Re-password not Match")
  }

  if (fullName && nameRegex.test(fullName) && email && emailRegex.test(email) && password && rePassword && password === rePassword){
    setLoader(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    toast.success("Registrstion Successfully")
    setLoader(false)
    navigate('/login')
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
    const errorMessage = error.message;
    if(errorMessage.includes("auth/email-already-in-use")){
      setEmailError("Email is already in use")
      toast.error("Email is already in use" )
    }
    setLoader(false)
  });
  }
}
// registration submit end

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IoChatboxEllipsesOutline className="mx-auto h-10 w-auto text-sky-600" />
        <h2 className="mt-5 text-center uppercase text-2xl font-bold leading-9 tracking-tight text-white">
          Registration New
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm registratin_form">
        <form onSubmit={heandelSubmit}>
              <input type="text" onChange={heandelFullName}  value={fullName} placeholder="Full Name"/>
              <p className="error_message">{fullNameError}</p>
              <input type="text" onChange={heandelEmail} value={email} placeholder="Email" />
              <p className="error_message">{emailError}</p>
              <div className="relative">
                <input type={showIcon ? "text" : "password"} onChange={heandelPassword}  value={password} placeholder="Password"/>
                {
                  showIcon ? 
                  <IoEye onClick={heandelShowIcon}  className=" icon_passwor" />
                  :
                  <IoEyeOff onClick={heandelShowIcon} className=" icon_passwor" />
                }
              </div>
              <p className="error_message">{passwordError}</p>
              <div className="relative">
              <input type={showIcon ? "text" : "password"} onChange={heandelRePassword} value={rePassword} placeholder="Re-enter Password"/>
                {
                  showIcon ? 
                  <IoEye onClick={heandelShowIcon}  className=" icon_passwor" />
                  :
                  <IoEyeOff onClick={heandelShowIcon} className=" icon_passwor" />
                }
              </div>
              <p className="error_message">{rePasswordError}</p>
              {
                loader ? 
                <div className="flex justify-center"> <ThreeDots color="#000" /> </div>
                :
                <button type="submit" className=" Button_v_1">Sign in</button>
              }
        </form>
        <p className="mt-10 text-center text-sm text-slate-100">
        You already have an account? Please {" "}
          <Link
            to='/login'
            className="font-semibold text-base leading-6 text-white hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
