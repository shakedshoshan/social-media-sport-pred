import React, { useState } from 'react';
import usePostSubmit from '../hooks/usePostSubmit';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [guess, setGuess] = useState('');
    const { submitPost, isLoading } = usePostSubmit();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
          await submitPost(title, content, guess);
          setTitle('');
          setContent('');
          setGuess('');
          window.location.reload();
        } catch (err) {
          console.error('Error creating post:', err);
        }
    };

    return (
        <form onSubmit={handlePostSubmit} className="mb-6">
            <input
                type="text"
                className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <input
                type="text"
                className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                required
            />
            <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={isLoading}
            >
                {isLoading ? 'Posting...' : 'Post'}
            </button>
        </form>
    );
};

export default CreatePost;