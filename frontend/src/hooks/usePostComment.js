import { useState } from 'react';
import axios from 'axios';

const usePostComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitComment = async (content, postId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/comment/createComment', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content, postId })
      });
      
      if (!response.ok) {
        throw new Error('Failed to post comment');
      }
      
      const data = await response.json();

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || 'An error occurred while posting the comment');
      throw err;
    }
  };

  return { submitComment, isLoading, error };
};

export default usePostComment;
