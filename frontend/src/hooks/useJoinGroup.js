import { useState } from 'react';
import toast from 'react-hot-toast';


const useJoinGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const joinGroup = async (secretCode) => {


    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/group/join', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretCode }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        return data.group;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error joining group:', error);
      toast.error('An error occurred while joining the group');
    } finally {
      setIsLoading(false);
    }
  };

  return { joinGroup, isLoading };
};

export default useJoinGroup;
