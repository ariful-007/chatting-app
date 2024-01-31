import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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

// get input value start
const heandelFullName = (e) =>{
  setFullName(e.target.value)
}

const heandelEmail = (e) =>{
  setEmail(e.target.value)
  
}

const heandelPassword = (e) =>{
  setPassword(e.target.value)
  
}

const heandelRePassword = (e) =>{
  setRePassword(e.target.value)
  
}
// get input value end

// registration submit start
const heandelSubmit = (e) => {
  e.preventDefault()
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
              <input type="email" onChange={heandelEmail} value={email} placeholder="Email" />
              <input type="password" onChange={heandelPassword}  value={password} placeholder="Password"/>
              <input type="password" onChange={heandelRePassword} value={rePassword} placeholder="Re-enter Password"/>
              <button type="submit" className=" Button_v_1">Sign in</button>
        </form>
        <p className="mt-10 text-center text-sm text-black">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
