import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetPostsByUser = (id) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5000/api/post/getPostsByUser', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(id)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch posts');
                }

                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
                toast.error(err.message || 'Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default useGetPostsByUser;
