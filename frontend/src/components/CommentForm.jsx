import React, { useState } from 'react';
import usePostComment from '../hooks/usePostComment';
import useAuth from '../zustand/useAuth';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');
  const { submitComment, isLoading, error } = usePostComment();
  const { authUser } = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await submitComment(content, postId);
      setContent('');
      window.location.reload(); // Refresh the page after posting comment
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-start space-x-3">
        <img
          src={authUser?.profilePic}
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-grow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="2"
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
