import React, { useState } from 'react';

const roles = ['Author', 'Reviewer', 'Editor'];

export default function Loginpage() {
  const [role, setRole] = useState('Author');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isLogin ? 'Logging in' : 'Signing up'} as ${role}`);
    // You can send role + email/password to your backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-[#1d3b58] mb-6">
          {isLogin ? 'Login' : 'Sign Up'} as {role}
        </h2>

        <div className="flex justify-between bg-gray-100 p-1 rounded-xl mb-6">
          {roles.map((r) => (
            <button
              key={r}
              className={`w-full py-2 rounded-xl transition-all ${
                role === r ? 'bg-[#1d3b58] text-white font-semibold' : 'text-[#1d3b58]'
              }`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-[#1d3b58] hover:bg-[#163048] text-white font-semibold py-3 rounded-lg transition-all"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-[#1d3b58]">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
