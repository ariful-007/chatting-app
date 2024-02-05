import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // gate close button start
  const [close, setClose] = useState(false);
  const handelClose = () => {
    setClose(!close);
  };
  // gate close button end

  const handelEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is Required");
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid Email");
    }
    else {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your Email")
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      setEmailError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handelSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <div className="flex justify-end">
          <Link to="/login" onClick={handelClose} className="text-gray-600">
            <IoMdClose className=" text-3xl font-bold " />
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          Enter your email address to reset your password.
        </p>
        <input
          type="text"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={handelEmail}
        />
        <p className=" text-red-500 font-medium">{emailError}</p>
        <div className="flex justify-end">
          <button className="bg-green-600 text-white p-2 mt-3 rounded hover:bg-green-800">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
