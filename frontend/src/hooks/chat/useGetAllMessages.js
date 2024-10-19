import { useState, useEffect } from 'react';


const useGetAllMessages = (groupId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/chat/messages/${groupId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch messages');
        }

        setMessages(data.messages);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (groupId) {
      fetchMessages();
    }
  }, [groupId]);


  return { messages, isLoading, error };
};

export default useGetAllMessages;
