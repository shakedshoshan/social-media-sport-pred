import { useState, useEffect } from 'react';

const useCheckLiked = (postId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLikeStatus = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/post/checkIfUserLikedPost/${postId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to check like status');
        }

        const data = await response.json();
        setIsLiked(data.hasLiked);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      checkLikeStatus();
    }
  }, [postId]);

  return { isLiked, isLoading, error };
};

export default useCheckLiked;
