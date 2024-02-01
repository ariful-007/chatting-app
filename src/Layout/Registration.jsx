import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoEyeOff ,IoEye } from "react-icons/io5";

const Registration = () => {
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

const [showIcon , setShowIcon] = useState(false)

const heandelShowIcon = () =>{
  setShowIcon(!showIcon)
}

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
  }
  if(!email){
    setEmailError("Email is Required")
  }
  if(!password){
    setPasswordError("Password is Required")
  }
  if(!rePassword){
    setRePasswordError("Re-password is Required")
  }
}
// registration submit end

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-sky-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IoChatboxEllipsesOutline className="mx-auto h-10 w-auto text-sky-600" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registration New
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm registratin_form">
        <form onSubmit={heandelSubmit}>
              <input type="text" onChange={heandelFullName}  value={fullName} placeholder="Full Name"/>
              <p className="error_message">{fullNameError}</p>
              <input type="email" onChange={heandelEmail} value={email} placeholder="Email" />
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
              <button type="submit" className=" Button_v_1">Sign in</button>
        </form>
        <p className="mt-10 text-center text-sm text-black">
        You already have an account? Please {" "}
          <Link
            to='/login'
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
