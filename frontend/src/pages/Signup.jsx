import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  function onChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please Fill All Fields.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/miniproject/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        setErrorMessage(data.message || "An error occurred during signup");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred during signup.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
      console.log(error);
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-blue-700 text-center mt-6 font-bold">
        Registration Form
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
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 border-2 border-black p-3 rounded-lg shadow-2xl bg-white text-black font-bold">
          <form onSubmit={handleSubmit}>
            <label>Full Name*</label>
            <input
              type="text"
              id="username"
              onChange={onChange}
              placeholder="Enter your Name*"
              className="mb-3 w-full px-4 py-2 text-xl text-gray-700 border-zinc-600 border-2 transition ease-in-out rounded-2xl"
            />
            <label>Email Account*</label>
            <input
              className="mb-6 border-zinc-600 border-2 w-full px-4 py-2 text-xl bg-white transition ease-in-out rounded-2xl"
              type="email"
              id="email"
              onChange={onChange}
              placeholder="Enter your email account*"
            />
            <div className="relative mb-6">
              <span>Enter Password*</span>
              <input
                className="mb-6 border-zinc-600 border-2 w-full px-4 py-2 text-xl bg-white transition ease-in-out rounded-2xl"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={onChange}
                placeholder="Enter Password*"
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
            <div className="flex flex-wrap mt-3 rounded-3xl px-4 py-2 border-green-600 border-4 w-full">
              <div>
                <label>Current Address</label>
                <input
                  id="address"
                  onChange={onChange}
                  type="text"
                  className="m-1 px-2 py-2 text-xl w-60 border-zinc-600 border-2 transition ease-in-out rounded-2xl"
                />
              </div>
              <div>
                <label>Contact Number</label>
                <input
                  id="phonenumber"
                  onChange={onChange}
                  type="number"
                  className="m-1 px-2 py-2 text-xl w-60 text-gray-700 border-zinc-600 border-2 transition ease-in-out rounded-2xl"
                />
              </div>
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              {loading ? <span>Loading....</span> : "Sign Up"}
            </button>
            {errorMessage && (
              <div className="text-red-700 mt-2">{errorMessage}</div>
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





 