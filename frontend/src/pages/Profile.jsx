import React, { useState } from 'react';
import LogoutButton from '../components/logoutButton';
import PostsCrusel from '../components/PostsCrusel';
import CreatePost from '../components/CreatePost';
import TableCrusel from '../components/TableCrusel';
import useAuth from "../zustand/useAuth";
import { FaHome, FaTrophy, FaRss } from 'react-icons/fa';
import CreateJoinButton from '../components/CreateJointButton';
import UserInfo from '../components/UserInfo';


export default function Profile() {
  const { authUser } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block md:w-1/4">
            <CreateJoinButton />
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                
                <FaTrophy className="mr-2 text-yellow-500" />
                Your Tables
              </h2>
              <TableCrusel slice={3} page='profile'/>
            </div>
          </aside>
          <div className="w-full">
            

            <div className="bg-white rounded-lg shadow-md p-4">
              <UserInfo user={authUser} />
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaHome className="mr-2 text-green-500" />
                Your Posts
              </h2>
              <PostsCrusel page='profile' id={authUser.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );    
}