import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { base_url } from "../Utils/constants";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("Kobe@2001");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
      const res = await fetch(base_url + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          emailId,
          password,
        }),
      });
      const data = await res.json();
      console.log("Backend response:", data);
      console.log("errror", res.ok);
      if (!res.ok) {
        return;
      }

      dispatch(addUser(data));
      return navigate("/");
    } catch (err) {
      console.log("errror", err);
    }
  };

  const handelSignUp = async () => {
    try {
      const res = await axios.post(
        base_url + "signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 mb-4">
            <span className="text-3xl">✨</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="text-slate-400 mt-2">
            {isSignUp
              ? "Create your account to get started"
              : "Login to continue to your account"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl rounded-3xl p-7 sm:p-9">
          <h2 className="text-xl font-semibold text-white mb-6">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>

          {/* First Name */}
          {isSignUp && (
            <>
              <fieldset className="mb-4">
                <label
                  className="block text-sm font-medium text-slate-200 mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition"
                  placeholder="Enter first name"
                />
              </fieldset>

              <fieldset className="mb-4">
                <label
                  className="block text-sm font-medium text-slate-200 mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition"
                  placeholder="Enter last name"
                />
              </fieldset>
            </>
          )}

          {/* Email */}
          <fieldset className="mb-4">
            <label
              className="block text-sm font-medium text-slate-200 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition"
              placeholder="Enter your email"
            />
          </fieldset>

          {/* Password */}
          <fieldset className="mb-6">
            <label
              className="block text-sm font-medium text-slate-200 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition"
              placeholder="Enter your password"
            />
          </fieldset>

          {/* Submit */}
          <button
            type="button"
            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition duration-200 active:scale-[0.98]"
            onClick={() => {
              isSignUp ? handelSignUp() : handelLogin();
            }}
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>

          {/* Toggle */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}

              <button
                type="button"
                onClick={() => setIsSignUp((value) => !value)}
                className="ml-2 text-indigo-400 hover:text-indigo-300 font-semibold transition"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © 2026 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
