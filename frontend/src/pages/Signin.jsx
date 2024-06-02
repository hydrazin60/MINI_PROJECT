import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
 
export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ });

  const { email, password } = formData;
 
 function onChange(e) {
 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      setErrorMessage("Plight all fild are require");
      setTimeout(() => {
        setErrorMessage(null)
      },  3000);
    }
      
  };

  return (
    <section>
      <h1 className="text-5xl text-blue-600 text-center mt-6 font-bold">
        Sign In Page
      </h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] gap-9 mb-12 md:mb-6">
          <img
            className="rounded-full Sign-In-page-Logo h-36"
            src="/logo.png"
            alt="key picture"
          />
          <span className="signin-page-write-container inline-block p-3 mt-2 circular-border-animation">
          <p className="Sign-In-Page-write">
              This project is a full-stack application built with the MERN stack
              (MongoDB, Express.js, React.js, Node.js) that allows users to
              create an account, update their profile, and manage their personal
              information. Firebase is integrated into the project for
              authentication and real-time database functionalities.
            </p>
          </span>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20     text-black font-bold">
          <form onSubmit={handleSubmit}>
          <label>Email Account*</label>
            <input
              className="mb-6 rounded-2xl border-2 w-full px-4 py-2 text-xl text-gray-700 bg-white  border-black transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email account!"
            />
            <div className="relative mb-6">
            <label>Email  Password*</label>
              <input
                className="w-full rounded-2xl border-2 px-4 py-2 text-xl text-gray-700 bg-white  border-black transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Enter Password!"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="absolute right-3 top-9 text-xl cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="absolute right-3 top-9 text-xl cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-500 hover:text-red-800 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forget-password"
                  className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                >
                  Forget password
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue800"
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
            {errorMessage && (
              <div className="text-red-600 p-2">{errorMessage}</div>
            )}
            <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
}
 