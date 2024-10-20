import { useState, useEffect } from 'react';
// import useAuth from '../../zustand/useAuth';

const useIsFollow = (followedId) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const { authUser } = useAuth();

    useEffect(() => {
        const checkFollowStatus = async () => {
            

            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/follow/is-following/${followedId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        // 'Authorization': `Bearer ${authUser.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch follow status');
                }

                const data = await response.json();
                setIsFollowing(data.isFollowing);
            } catch (err) {
                setError(err.message || 'An error occurred while checking follow status');
            } finally {
                setIsLoading(false);
            }
        };

        checkFollowStatus();
    }, [ followedId]);

    return { isFollowing, isLoading, error };
};

export default useIsFollow;

