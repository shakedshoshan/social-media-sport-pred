import { useState, useEffect } from 'react';

const useGetGames = () => {
  const [nbaGames, setNbaGames] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getThreeDaysFromNow = () => {
      const today = new Date();
      const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));
      return threeDaysFromNow.toISOString().split('T')[0];
    };

    const targetDate = getThreeDaysFromNow();
    const fetchNbaGames = async () => {
      setIsLoading(true);
      const url = `https://therundown-therundown-v1.p.rapidapi.com/sports/4/events/${targetDate}?include=scores&affiliate_ids=1%2C2%2C3&offset=0`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '948f8b4495mshce728272b155600p12d3a9jsndb97509bab0d',
          'x-rapidapi-host': 'therundown-therundown-v1.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setNbaGames(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNbaGames();
  }, []);

  return { nbaGames, isLoading, error };
};

export default useGetGames;