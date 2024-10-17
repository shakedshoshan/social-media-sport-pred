import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetUser = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch user');
        }
        
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred while fetching the user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, isLoading, error };
};

export default useGetUser;
