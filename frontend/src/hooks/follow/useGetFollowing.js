import { useState, useEffect } from 'react';

const useGetFollowing = ({ userId = 1}) => {
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchFollowing = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/follow/following/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch following');
                }

                const data = await response.json();
                setFollowing(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching following');
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchFollowing();
        }
    }, [userId]);

    return { following, isLoading, error };
};

export default useGetFollowing;
