import { useState } from 'react';
import useAuth from '../../zustand/useAuth';

const useCreateGuess = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuth();

  const createGuess = async (event_id, winner_team_id, point_difference) => {
    setIsLoading(true);
    setError(null);

    if (!authUser) {
      setError('You must be logged in to make a guess');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/guess', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ event_id, winner_team_id, point_difference })
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message || 'An error occurred while creating the guess');
      }

      setIsLoading(false);
      return json;
    } catch (err) {
      setError('An error occurred while creating the guess');
      setIsLoading(false);
    }
  };

  return { createGuess, isLoading, error };
};

export default useCreateGuess;
