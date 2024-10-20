import { useState } from 'react';
import axios from 'axios';

const useAddFollow = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addFollow = async (followed_id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/follow', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ followed_id })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'An error occurred while adding follow');
            throw err;
        }
    };

    return { addFollow, isLoading, error };
};

export default useAddFollow;
