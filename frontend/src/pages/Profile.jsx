import React from 'react';
import useAuth from '../zustand/useAuth';
const Profile = () => {
  const { authUser } = useAuth();

  return (
    <div className=" mx-auto px-4 py-8 mt-0">
      <h1 className="text-2xl font-bold mb-4">{authUser.username} Profile</h1>
    </div>
  );
};

export default Profile;
