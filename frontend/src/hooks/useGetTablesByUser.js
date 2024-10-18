import { useState, useEffect } from 'react';

const useGetTablesByUser = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupIds = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/group/groups/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        if (data.success) {
          setGroups(data.groups);
        } else {
          setError('Failed to fetch group IDs');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching group IDs');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupIds();
  }, []);

  return { groups, loading, error };
};

export default useGetTablesByUser;
