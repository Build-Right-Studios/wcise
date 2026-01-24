import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] text-white p-6 rounded-lg shadow-md flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <img
          src={profile.photo || "/assets/default-avatar.png"}
          alt="profile"
          className="w-16 h-16 rounded-full border-2 border-white object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          {profile.phone && <p className="text-sm">{profile.phone}</p>}
          <p className="text-sm">{profile.email}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <button
        onClick={() => {
          sessionStorage.clear();
          navigate("/login");
        }}
        className="bg-white text-[#4267B2] px-5 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
      >
        Logout
      </button>

    </div>
  );
};

export default ProfileHeader;
