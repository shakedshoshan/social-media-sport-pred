import { useState } from 'react';
import toast from 'react-hot-toast';

const useHandleLike = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addLike = async (postId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/post/addLikeToPost/${postId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add like');
      }

      const result = await response.json();
      toast.success(result.message);
      return result;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { addLike, isLoading, error };
};

export default useHandleLike;
