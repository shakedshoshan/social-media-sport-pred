import { useState } from 'react';

const useRemoveFollow = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeFollow = async (followed_id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/follow/${followed_id}`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to remove follow');
            }

            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'An error occurred while removing follow');
            throw err;
        }
    };

    return { removeFollow, isLoading, error };
};

export default useRemoveFollow;

