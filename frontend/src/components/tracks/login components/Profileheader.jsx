import React from 'react';

const ProfileHeader = ({ profile }) => {
  return (
    <div className="bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] text-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={profile.photo} alt="profile" className="w-16 h-16 rounded-full border-2 border-white" />
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm">{profile.phone}</p>
          <p className="text-sm">{profile.email}</p>
        </div>
      </div>
      </div>
  );
};

export default ProfileHeader;
