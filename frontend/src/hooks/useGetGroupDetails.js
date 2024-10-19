import { useState, useEffect } from 'react';

const useGetGroupDetails = (groupId) => {
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/group/details/${groupId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch group details');
        }

        const data = await response.json();
        if (data.success) {
          setGroupDetails(data.group);
        } else {
          throw new Error(data.message || 'Failed to fetch group details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  return { groupDetails, loading, error };
};

export default useGetGroupDetails;
