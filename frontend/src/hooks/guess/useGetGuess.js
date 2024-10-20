import { useState, useEffect } from 'react';


const useGetGuess = () => {
  const [guess, setGuess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const getGuess = async (event_id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/guess/${event_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred while retrieving the guess');
      } else {
        setGuess(data.guess);
        return data.guess;
      }

      setIsLoading(false);
    } catch (err) {
      setError('An error occurred while retrieving the guess');
      setIsLoading(false);
    }
  };

  return { getGuess, isLoading, error };
};

export default useGetGuess;
