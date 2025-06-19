import React, { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true for Login, false for Signup
  const [selectedRole, setSelectedRole] = useState("Author");

  // Tailwind classes for gradients - defined as constan
  const primaryGradientBg =
    "bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6]";
  const buttonHoverGradient =
    "bg-gradient-to-r from-[#0073e6] via-[#0059b3] to-[#003366]"; // Reversed for hover effect based on original CSS

  // Framer Motion Variants for staggered animation of form items
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Framer Motion Variants for the form containers to control staggering
  const formContainerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren", // Parent fades out after children
        staggerChildren: 0.05,
        staggerDirection: -1, // Stagger in reverse when hiding
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1, // Form will fade in when active
      transition: {
        delayChildren: 0.1, // Delay before children start animating
        staggerChildren: 0.07, // Stagger effect for children
        duration: 0.3,
      },
    },
  };

  return (
    // Outer container for the whole page, mimicking body/html styling
    <div
      className={`min-h-screen w-screen p-4 flex items-center justify-center ${primaryGradientBg} font-inter`}
    >
      {/* Wrapper for the form card - Added Framer Motion */}
      <motion.div
        className="overflow-hidden max-w-md w-full bg-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Title Text section - Added Framer Motion */}
        <motion.div
          className="flex w-[200%] transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
          style={{ transform: isLogin ? "translateX(0%)" : "translateX(-50%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-1/2 text-4xl font-semibold text-center">
            Login Form
          </div>
          <div className="w-1/2 text-4xl font-semibold text-center">
            Signup Form
          </div>
        </motion.div>

        {/* Form Container */}
        <div className="w-full overflow-hidden">
          {/* Role Selection Controls - Added Framer Motion */}
          <motion.div
            className="relative flex h-12 w-full mt-6 mb-4 justify-between border border-gray-300 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Hidden radio buttons for state management */}
            <input
              type="radio"
              name="role"
              id="author"
              checked={selectedRole === "Author"}
              onChange={() => setSelectedRole("Author")}
              className="hidden"
            />
            <input
              type="radio"
              name="role"
              id="editor"
              checked={selectedRole === "Editor"}
              onChange={() => setSelectedRole("Editor")}
              className="hidden"
            />
            <input
              type="radio"
              name="role"
              id="reviewer"
              checked={selectedRole === "Reviewer"}
              onChange={() => setSelectedRole("Reviewer")}
              className="hidden"
            />
            {/* Author Label */}
            <label
              htmlFor="author"
              className={`slide h-full w-1/3 text-base font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-300 ${
                selectedRole === "Author"
                  ? "text-white cursor-default select-none"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedRole("Author")}
            >
              Author
            </label>
            {/* Editor Label */}
            <label
              htmlFor="editor"
              className={`slide h-full w-1/3 text-base font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-300 ${
                selectedRole === "Editor"
                  ? "text-white cursor-default select-none"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedRole("Editor")}
            >
              Editor
            </label>
            {/* Reviewer Label */}
            <label
              htmlFor="reviewer"
              className={`slide h-full w-1/3 text-base font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-300 ${
                selectedRole === "Reviewer"
                  ? "text-white cursor-default select-none"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedRole("Reviewer")}
            >
              Reviewer
            </label>
            {/* Role Slider Tab for animation */}
            <div
              className={`absolute h-full w-1/3 left-0 z-0 rounded-2xl ${primaryGradientBg} transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
              style={{
                transform:
                  selectedRole === "Author"
                    ? "translateX(0%)"
                    : selectedRole === "Editor"
                    ? "translateX(100%)"
                    : "translateX(200%)",
              }}
            ></div>
          </motion.div>

          {/* Login/Signup Toggle - Added Framer Motion */}
          <motion.div
            className="relative flex h-12 w-full mt-4 mb-2 justify-between border border-gray-300 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {/* Hidden radio buttons for state management */}
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={() => setIsLogin(true)}
              className="hidden"
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={() => setIsLogin(false)}
              className="hidden"
            />
            {/* Login Label */}
            <label
              htmlFor="login"
              className={`slide h-full w-1/2 text-lg font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-600 ${
                isLogin
                  ? "text-white cursor-default select-none"
                  : "text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </label>
            {/* Signup Label */}
            <label
              htmlFor="signup"
              className={`slide h-full w-1/2 text-lg font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-600 ${
                !isLogin
                  ? "text-white cursor-default select-none"
                  : "text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </label>
            {/* Slider Tab for animation */}
            <div
              className={`absolute h-full w-1/2 left-0 z-0 rounded-2xl ${primaryGradientBg} transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
              style={{
                transform: isLogin ? "translateX(0%)" : "translateX(100%)",
              }}
            ></div>
          </motion.div>

          {/* Form Inner Container - Now a motion.div for controlling children's animations */}
          <motion.div
            className="flex w-[200%] transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
            style={{
              transform: isLogin ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            {/* Login Form - Added Framer Motion with key to force re-render/animation */}
            <motion.form
              action="#"
              className="w-1/2 px-2 py-4"
              key={isLogin ? "loginForm" : "hiddenLoginForm"} // Key change forces remount for animation
              variants={formContainerVariants}
              initial="hidden"
              animate={isLogin ? "visible" : "hidden"}
            >
              <motion.div
                className="field h-12 w-full mt-5"
                variants={formItemVariants}
              >
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
                />
              </motion.div>
              <motion.div
                className="field h-12 w-full mt-5"
                variants={formItemVariants}
              >
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
                />
              </motion.div>
              <motion.div
                className="pass-link mt-1 text-right text-sm"
                variants={formItemVariants}
              >
                <a
                  href="#"
                  className="text-[#1a75ff] no-underline hover:underline"
                >
                  Forgot password?
                </a>
              </motion.div>
              <motion.div
                className="field btn h-12 w-full rounded-2xl relative overflow-hidden mt-5 group"
                variants={formItemVariants}
              >
                <div
                  className={`btn-layer h-full w-[300%] absolute -left-full ${buttonHoverGradient} rounded-2xl transition-all duration-400 ease-in-out group-hover:left-0`}
                ></div>
                <input
                  type="submit"
                  value="Login"
                  className="h-full w-full relative z-10 bg-transparent border-none text-white pl-0 rounded-2xl text-xl font-medium cursor-pointer"
                />
              </motion.div>
              <motion.div
                className="signup-link text-center mt-8 text-gray-600 text-sm"
                variants={formItemVariants}
              >
                Not a member?{" "}
                <a
                  href="#"
                  className="text-[#1a75ff] no-underline hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}
                >
                  Signup now
                </a>
              </motion.div>
            </motion.form>

            {/* Signup Form - Added Framer Motion with key to force re-render/animation */}
            <motion.form
              action="#"
              className="w-1/2 px-2 py-4"
              key={!isLogin ? "signupForm" : "hiddenSignupForm"} // Key change forces remount for animation
              variants={formContainerVariants}
              initial="hidden"
              animate={!isLogin ? "visible" : "hidden"}
            >
              <motion.div
                className="field h-12 w-full mt-5"
                variants={formItemVariants}
              >
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
                />
              </motion.div>
              <motion.div
                className="field h-12 w-full mt-5"
                variants={formItemVariants}
              >
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
                />
              </motion.div>
              <motion.div
                className="field h-12 w-full mt-5"
                variants={formItemVariants}
              >
                <input
                  type="password"
                  placeholder="Confirm password"
                  required
                  className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
                />
              </motion.div>
              <motion.div
                className="field btn h-12 w-full rounded-2xl relative overflow-hidden mt-5 group"
                variants={formItemVariants}
              >
                <div
                  className={`btn-layer h-full w-[300%] absolute -left-full ${buttonHoverGradient} rounded-2xl transition-all duration-400 ease-in-out group-hover:left-0`}
                ></div>
                <input
                  type="submit"
                  value="Signup"
                  className="h-full w-full relative z-10 bg-transparent border-none text-white pl-0 rounded-2xl text-xl font-medium cursor-pointer"
                />
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
