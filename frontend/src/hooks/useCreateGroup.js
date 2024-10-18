import { useState } from 'react';
import toast from 'react-hot-toast';
// import useAuth from '../zustand/useAuth';


const useCreateGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
//   const { authUser } = useAuth();

  const createGroup = async (name) => {

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/group/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        return data.group;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('An error occurred while creating the group');
    } finally {
      setIsLoading(false);
    }
  };

  return { createGroup, isLoading };
};

export default useCreateGroup;
