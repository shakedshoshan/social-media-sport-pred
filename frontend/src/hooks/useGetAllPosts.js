import { useState, useEffect } from 'react';

const useGetAllPosts = () => {
	const [getAllPosts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch('http://localhost:5000/api/post/getAllPosts', {
                        method: 'GET',
                        credentials: 'include',
                      }
                );
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				const data = await response.json();
				setPosts(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, []);


	return { getAllPosts, isLoading, error };
};

export default useGetAllPosts;
