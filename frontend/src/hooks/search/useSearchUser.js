import { useState } from 'react';

const useSearchUser = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchUsers = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/auth/search?query=${query}`,
                {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            setError('Failed to search users. Please try again.');
            console.error('Error in searchUsers:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return { searchUsers, searchResults, isLoading, error };
};

export default useSearchUser;
