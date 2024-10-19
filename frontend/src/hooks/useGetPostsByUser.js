import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../zustand/useAuth';

const useGetPostsByUser = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            if (!authUser) return;

            try {
                const res = await fetch('http://localhost:5000/api/post/getPostsByUser', {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setPosts(data);
                } else {
                    toast.error(data.message || 'Error fetching posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                toast.error('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authUser]);

    return { posts, loading };
};

export default useGetPostsByUser;
