import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link, useNavigate,} from "react-router-dom";
import { IoEyeOff ,IoEye } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from "../slices/userSlice";





const Login = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

  const auth = getAuth();
  const [email ,setEmail] = useState("")
  const [password ,setPassword] = useState("")
// input infometion end

// input field error messeage start
const [emailError, setEmailError] = useState("")
const [passwordError, setPasswordError] = useState("")
// input field error messeage end

// loader start 
const [loader , setLoader] = useState(false)
// loade end

// regex start
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// regex end

// icon showing start
const [showIcon , setShowIcon] = useState(false)
const heandelShowIcon = () =>{
  setShowIcon(!showIcon)
}
// icon showing end

// get input value start
const heandelEmail = (e) =>{
  setEmail(e.target.value)
  setEmailError("")
  
}

const heandelPassword = (e) =>{
  setPassword(e.target.value)
  setPasswordError("")
  
}
// get input value end

// registration submit start
const heandelSubmit = (e) => {
  e.preventDefault()
  if(!email){
    setEmailError("Email is Required")
  }else if(!emailRegex.test(email)){
    setEmailError("Email is not valid")
  }
  if(!password){
    setPasswordError("Password is Required")
  }
  if ( email && emailRegex.test(email) && password){
    setLoader(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    toast.success("Login Successfully")
    dispatch(userLoginInfo(user))
    localStorage.setItem("user",JSON.stringify(user))
    navigate("/home")
    setLoader(false)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    setLoader(false)
  });
  }
}
// registration submit end

  return (
    <div className="flex h-screen flex-1 flex-col justify-center lg:px-8  bg-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IoChatboxEllipsesOutline className="mx-auto h-10 w-auto text-sky-600" />
        <h2 className="mt-5 text-center uppercase text-2xl font-bold leading-9 tracking-tight text-white">
          Login 
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm registratin_form">
        <form onSubmit={heandelSubmit}>
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
              {
                loader ? 
                <div className="flex justify-center"> <ThreeDots color="#fff" /> </div>
                :
                <button type="submit" className=" Button_v_1">Login</button>
              }
        </form>
        <Link to='/forgotpassword' className="text-white flex justify-end mt-2">ForgotPassword</Link>
        <p className="mt-10 text-center text-sm text-slate-100">
        New Here? Please {" "}
          <Link
            to='/'
            className="font-semibold text-base leading-6 text-white hover:text-indigo-500"
          >
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
