import { useState, useEffect } from 'react';

const useGetFollowers = ({userId}) => {
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/follow/followers/${userId}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch followers');
                }

                const data = await response.json();
                setFollowers(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching followers');
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchFollowers();
        }
    }, [userId]);

    return { followers, isLoading, error };
};

export default useGetFollowers;
