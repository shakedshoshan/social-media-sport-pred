import React, { useState } from 'react';
import usePostSubmit from '../hooks/usePostSubmit';
import useAuth from '../zustand/useAuth';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [guess, setGuess] = useState('');
    const { submitPost, isLoading } = usePostSubmit();
    const { authUser } = useAuth();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
          await submitPost(content, guess);
          setContent('');
          setGuess('');
          window.location.reload();
        } catch (err) {
          console.error('Error creating post:', err);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 w-full mx-auto">
            <div className="flex items-start space-x-3 mb-4">
                <img
                    src={authUser?.profilePic || 'default-avatar.png'}
                    alt="User avatar"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{authUser?.username || 'Anonymous'}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">What's on your mind?</p>
                </div>
            </div>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    className="w-full p-2 sm:p-3 mb-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm sm:text-base"
                    placeholder="Share your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="3"
                    required
                ></textarea>
                <input
                    type="text"
                    className="w-full p-2 sm:p-3 mb-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    placeholder="Make a guess..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 ease-in-out text-sm sm:text-base"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;