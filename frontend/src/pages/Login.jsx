import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("Author");
  const navigate = useNavigate();

  const primaryGradientBg =
    "bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6]";
  const buttonHoverGradient =
    "bg-gradient-to-r from-[#0073e6] via-[#0059b3] to-[#003366]";

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const formContainerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.07,
        duration: 0.3,
      },
    },
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === "Author") {
      navigate("/dashboard");
    } else if (selectedRole === "Editor") {
      navigate("/editor-dashboard");
    } else if (selectedRole === "Reviewer") {
      navigate("/reviewer-dashboard");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === "Author") {
      navigate("/dashboard");
    } else if (selectedRole === "Editor") {
      navigate("/editor-dashboard");
    } else if (selectedRole === "Reviewer") {
      navigate("/reviewer-dashboard");
    }
  };

  return (
    <div
      className={`min-h-screen w-screen p-4 flex items-center justify-center ${primaryGradientBg} font-inter`}
    >
      <motion.div
        className="overflow-hidden max-w-md w-full bg-white p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.div
          className="flex w-[200%] transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
          style={{ transform: isLogin ? "translateX(0%)" : "translateX(-50%)" }}
        >
          <div className="w-1/2 text-4xl font-semibold text-center">
            Login Form
          </div>
          <div className="w-1/2 text-4xl font-semibold text-center">
            Signup Form
          </div>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          className="relative flex h-12 w-full mt-6 mb-4 justify-between border border-gray-300 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {["Author", "Editor", "Reviewer"].map((role) => (
            <React.Fragment key={role}>
              <input
                type="radio"
                name="role"
                id={role.toLowerCase()}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
                className="hidden"
              />
              <label
                htmlFor={role.toLowerCase()}
                className={`slide h-full w-1/3 text-base font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-300 ${
                  selectedRole === role
                    ? "text-white cursor-default select-none"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </label>
            </React.Fragment>
          ))}
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

        {/* Login/Signup Toggle */}
        <motion.div
          className="relative flex h-12 w-full mt-4 mb-2 justify-between border border-gray-300 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {["Login", "Signup"].map((option) => {
            const isSelected =
              (option === "Login" && isLogin) ||
              (option === "Signup" && !isLogin);
            return (
              <React.Fragment key={option}>
                <input
                  type="radio"
                  name="slide"
                  id={option.toLowerCase()}
                  checked={isSelected}
                  onChange={() => setIsLogin(option === "Login")}
                  className="hidden"
                />
                <label
                  htmlFor={option.toLowerCase()}
                  className={`slide h-full w-1/2 text-lg font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-600 ${
                    isSelected
                      ? "text-white cursor-default select-none"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </label>
              </React.Fragment>
            );
          })}
          <div
            className={`absolute h-full w-1/2 left-0 z-0 rounded-2xl ${primaryGradientBg} transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
            style={{
              transform: isLogin ? "translateX(0%)" : "translateX(100%)",
            }}
          ></div>
        </motion.div>

        {/* Forms */}
        <motion.div
          className="flex w-[200%] transition-transform duration-600 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
          style={{
            transform: isLogin ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          {/* Login Form */}
          <motion.form
            onSubmit={handleLoginSubmit}
            className="w-1/2 px-2 py-4"
            variants={formContainerVariants}
            initial="hidden"
            animate={isLogin ? "visible" : "hidden"}
          >
            <motion.div className="field h-12 w-full mt-5" variants={formItemVariants}>
              <input
                type="text"
                placeholder="Email Address"
                required
                className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
              />
            </motion.div>
            <motion.div className="field h-12 w-full mt-5" variants={formItemVariants}>
              <input
                type="password"
                placeholder="Password"
                required
                className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
              />
            </motion.div>
            <motion.div className="pass-link mt-1 text-right text-sm" variants={formItemVariants}>
              <a href="#" className="text-[#1a75ff] no-underline hover:underline">
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
                className="h-full w-full relative z-10 bg-transparent border-none text-white rounded-2xl text-xl font-medium cursor-pointer"
              />
            </motion.div>
          </motion.form>

          {/* Signup Form */}
          <motion.form
            onSubmit={handleSignupSubmit}
            className="w-1/2 px-2 py-4"
            variants={formContainerVariants}
            initial="hidden"
            animate={!isLogin ? "visible" : "hidden"}
          >
            <motion.div className="field h-12 w-full mt-5" variants={formItemVariants}>
              <input
                type="text"
                placeholder="Email Address"
                required
                className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
              />
            </motion.div>
            <motion.div className="field h-12 w-full mt-5" variants={formItemVariants}>
              <input
                type="password"
                placeholder="Password"
                required
                className="h-full w-full outline-none pl-4 rounded-2xl border border-gray-300 border-b-2 text-base transition-all duration-300 focus:border-[#1a75ff] placeholder:text-gray-500 focus:placeholder:text-[#1a75ff]"
              />
            </motion.div>
            <motion.div className="field h-12 w-full mt-5" variants={formItemVariants}>
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
                className="h-full w-full relative z-10 bg-transparent border-none text-white rounded-2xl text-xl font-medium cursor-pointer"
              />
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
