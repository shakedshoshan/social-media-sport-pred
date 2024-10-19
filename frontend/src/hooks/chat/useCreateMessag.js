import { useState } from 'react';


const useCreateMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMessage = async (groupId, content) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId, content })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create message');
      }

      setIsLoading(false);
      return data.chatMessage;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { createMessage, isLoading, error };
};

export default useCreateMessage;
