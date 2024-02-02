
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')

  const heandelEmail = (e) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const heandelSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setEmailError('Email is required')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError('Email is not valid')
    } else {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your Email")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        
      });
      setEmailError('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
    <form onSubmit={heandelSubmit} className="bg-white p-8 rounded shadow-md w-96">
      
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="text-gray-600 mb-6">Enter your email address to reset your password.</p>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Email"
        value={email}
        onChange={heandelEmail}
      />
      <p className='text-red-500 p-2 font-medium '>{emailError}</p>
      <div className="flex justify-end">
        <button
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-800 mr-2"
          type="submit"
        >
          Reset Password
        </button>
        <Link to='/login' className=" bg-indigo-600 text-white p-2 rounded" >
          Back to login
        </Link>
      </div>
    </form>
    </div>
  );
};

export default ForgotPassword;