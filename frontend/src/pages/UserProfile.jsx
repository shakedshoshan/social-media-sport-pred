import React, { useState, useEffect } from 'react';
import PostsCrusel from '../components/PostsCrusel';
import TableCrusel from '../components/TableCrusel';
import { FaHome, FaTrophy, FaRss } from 'react-icons/fa';
import UserInfo from '../components/UserInfo';
import useGetUser from '../hooks/useGetUser';
import { useParams } from 'react-router-dom';
import FollowButton from '../components/FollowButton';

export default function UserProfile() {
  const { userId } = useParams();
  const { user, isLoading, error } = useGetUser(userId);

  if (isLoading) return <div className="text-center py-2">Loading...</div>;
  if (error) return <div className="text-center py-2">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block md:w-1/4">
          <div className='mb-4 '>
            <FollowButton followedId={user?.id} page='userProfile' />
          </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaTrophy className="mr-2 text-yellow-500" />
                {user?.username}'s Tables
              </h2>
              <TableCrusel slice={3} page='profile'/>
            </div>
          </aside>
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md p-4">
              {user ? (
                <UserInfo user={user} />
              ) : (
                <div className="text-center py-2">Loading...</div>
              )}

            <div className='mb-4 md:hidden'>
              <FollowButton followedId={user?.id} page='userProfile' />
            </div>

              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaHome className="mr-2 text-green-500" />
                {user?.username}'s Posts
              </h2>
              <PostsCrusel page='profile' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );    
}