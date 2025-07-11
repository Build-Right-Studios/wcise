import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';

const predefinedTags = [
  'AI', 'Machine Learning', 'Deep Learning', 'NLP', 'Data Science',
  'IoT', 'Cybersecurity', 'Blockchain', 'Cloud Computing', 'Big Data',
  'Computer Vision', 'Robotics', 'Embedded Systems', 'Software Engineering', 'Web Development',
  'Mobile Computing', 'Image Processing', 'Neural Networks', 'Fuzzy Logic', 'Quantum Computing',
  'Bioinformatics', 'AR/VR', 'Digital Signal Processing', 'Wireless Networks', '5G Technology',
  'Data Mining', 'Natural Language Generation', 'Ethical AI', 'Edge Computing', 'Autonomous Vehicles',
  'Smart Cities', 'Sustainable Computing', 'Reinforcement Learning', 'GPU Computing', 'Operating Systems',
  'Compiler Design', 'Cyber Law', 'HCI', 'Game Development', 'Distributed Systems',
  'E-Learning', 'Information Retrieval', 'Database Systems', 'Data Structures', 'Algorithms',
  'Pattern Recognition', 'Knowledge Representation', 'Semantic Web', 'Virtual Reality', 'Speech Recognition'
];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("Author");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const primaryGradientBg = "bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6]";

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
        role: selectedRole
      });

      alert(response.data.message);
      localStorage.setItem('token', response.data.token);

      if (selectedRole === "Author") navigate("/author/dashboard");
      else if (selectedRole === "Editor") navigate("/editor/dashboard");
      else if (selectedRole === "Reviewer") navigate("/reviewer/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        name: name || email.split('@')[0],
        email,
        password,
        confirmPassword,
        role: selectedRole,
        tags: selectedRole === "Reviewer" ? tags : []
      });

      alert(response.data.message);
      localStorage.setItem('token', response.data.token);

      if (selectedRole === "Author") navigate("/author/dashboard");
      else if (selectedRole === "Editor") navigate("/editor/dashboard");
      else if (selectedRole === "Reviewer") navigate("/reviewer/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className={`min-h-screen w-screen p-4 flex items-center justify-center ${primaryGradientBg} font-inter`}>
      <motion.div className="overflow-hidden max-w-md w-full bg-white p-8 rounded-2xl shadow-xl" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>

        <motion.div className="relative h-10 flex justify-between mb-4">
          <div className={`w-1/2 text-center text-xl font-semibold ${isLogin ? 'text-black' : 'text-gray-400'}`}>Login Form</div>
          <div className={`w-1/2 text-center text-xl font-semibold ${!isLogin ? 'text-black' : 'text-gray-400'}`}>Signup Form</div>
        </motion.div>

        <motion.div className="relative flex h-12 w-full mb-4 justify-between border border-gray-300 rounded-2xl overflow-hidden">
          {["Author", "Editor", "Reviewer"].map((role) => (
            <React.Fragment key={role}>
              <input type="radio" name="role" id={role.toLowerCase()} checked={selectedRole === role} onChange={() => setSelectedRole(role)} className="hidden" />
              <label htmlFor={role.toLowerCase()} className={`slide h-full w-1/3 text-base font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-300 ${selectedRole === role ? "text-white cursor-default select-none" : "text-gray-700"}`}>{role}</label>
            </React.Fragment>
          ))}
          <div className={`absolute h-full w-1/3 left-0 z-0 rounded-2xl ${primaryGradientBg} transition-transform duration-600`} style={{ transform: selectedRole === "Author" ? "translateX(0%)" : selectedRole === "Editor" ? "translateX(100%)" : "translateX(200%)" }} />
        </motion.div>

        <motion.div className="relative flex h-12 w-full mb-6 justify-between border border-gray-300 rounded-2xl overflow-hidden">
          {["Login", "Signup"].map((option) => {
            const isSelected = (option === "Login" && isLogin) || (option === "Signup" && !isLogin);
            return (
              <React.Fragment key={option}>
                <input type="radio" name="slide" id={option.toLowerCase()} checked={isSelected} onChange={() => setIsLogin(option === "Login")} className="hidden" />
                <label htmlFor={option.toLowerCase()} className={`slide h-full w-1/2 text-lg font-medium text-center leading-[48px] cursor-pointer z-10 transition-colors duration-600 ${isSelected ? "text-white cursor-default select-none" : "text-gray-700"}`}>{option}</label>
              </React.Fragment>
            );
          })}
          <div className={`absolute h-full w-1/2 left-0 z-0 rounded-2xl ${primaryGradientBg} transition-transform duration-600`} style={{ transform: isLogin ? "translateX(0%)" : "translateX(100%)" }} />
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <motion.div className="flex w-[200%] transition-transform duration-600" style={{ transform: isLogin ? "translateX(0%)" : "translateX(-50%)" }}>

            <motion.form onSubmit={handleLoginSubmit} className="w-full max-w-full px-2 py-4">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 w-full pl-4 rounded-2xl border border-gray-300 mb-4" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 w-full pl-4 rounded-2xl border border-gray-300 mb-4" />
              <input type="submit" value="Login" className="h-12 w-full bg-blue-500 text-white rounded-2xl" />
            </motion.form>

            <motion.form onSubmit={handleSignupSubmit} className="w-full max-w-full px-2 py-4">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12 w-full pl-4 rounded-2xl border border-gray-300 mb-4" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 w-full pl-4 rounded-2xl border border-gray-300 mb-4" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 w-full pl-4 rounded-2xl border border-gray-300 mb-4" />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="h-12 w-full pl-4 rounded-2xl border border-gray-300 mb-4" />

              {selectedRole === "Reviewer" && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Select Tags:</p>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {predefinedTags.map((tag) => (
                      <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`px-3 py-1 text-sm rounded-full border ${tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border-gray-400'}`}>{tag}</button>
                    ))}
                  </div>
                </div>
              )}

              <input type="submit" value="Signup" className="h-12 w-full bg-blue-500 text-white rounded-2xl" />
            </motion.form>

          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
