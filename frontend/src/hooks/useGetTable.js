import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetTable = (groupId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/group/users/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setUsers(data.users);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchUsers();
    }
  }, [groupId]);

  return { users, loading, error };
};

export default useGetTable;
