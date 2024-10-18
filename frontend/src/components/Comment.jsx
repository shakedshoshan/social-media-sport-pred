import React from 'react';
import useGetUser from '../hooks/useGetUser';

const Comment = ({ comment }) => {
  const { user, isLoading, error } = useGetUser(comment.user_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user</div>;
  }

  return (
    <div className="flex items-start space-x-3">
      {user?.profilepic ? (
        <img
          src={user.profilepic}
          alt={`${user.username}'s profile`}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 text-sm">{user?.username?.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="flex-1">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="font-medium text-sm text-gray-900 text-left">{user?.username}</p>
          <p className="text-gray-700 mt-1 text-left">{comment.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(comment.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
