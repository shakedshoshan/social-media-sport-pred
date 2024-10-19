    import React, { useState, useRef, useEffect } from 'react';
    import useGetAllMessages from '../hooks/chat/useGetAllMessages';
    import useCreateMessage from '../hooks/chat/useCreateMessag';
    import { FaComments, FaPaperPlane } from 'react-icons/fa';
    import useAuth from '../zustand/useAuth';
    

    const GroupChat = ({ groupId }) => {
      const { messages, isLoading, error, refetch } = useGetAllMessages(groupId);
      const { createMessage, isLoading: isSending, error: sendError } = useCreateMessage();
      const [newMessage, setNewMessage] = useState('');
      const [displayedMessages, setDisplayedMessages] = useState([]);
      const [messageCount, setMessageCount] = useState(10);
      const messagesEndRef = useRef(null);
      const { authUser } = useAuth();

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      useEffect(() => {
        if (messages.length > 0) {
          const sortedMessages = messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setDisplayedMessages(sortedMessages.slice(0, messageCount));
          scrollToBottom();
        }
      }, [messages, messageCount]);

      const handleSend = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        await createMessage(groupId, newMessage);
        setNewMessage('');
        window.location.reload();
      };

      const loadMoreMessages = () => {
        setMessageCount(prevCount => prevCount + 10);
      };

      return (
        <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaComments className="mr-2" />
              Group Chat
            </h2>
            <form onSubmit={handleSend} className="bg-white rounded-lg">
              <div className="flex flex-row items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-3/4 md:flex-grow border-none rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 text-black focus:ring-blue-300"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-1/4 md:w-auto bg-blue-400 text-white rounded-r-lg hover:bg-blue-500 focus:outline-none flex items-center justify-center ${
                    isSending ? 'opacity-50 cursor-not-allowed' : ''
                  } md:px-6 md:py-2 h-10 md:h-auto`}
                >
                  <span className="hidden md:inline mr-2">{isSending ? 'Sending...' : 'Send'}</span>
                  <FaPaperPlane className="md:ml-2" />
                </button>
              </div>
            </form>
            {sendError && <div className="text-red-500 mt-2">Error: {sendError}</div>}
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Loading messages...</div>
            ) : (
              <>
                {displayedMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${
                      message.username === authUser.username 
                        ? 'justify-end' 
                        : 'justify-start'
                    } mb-4`}
                  >
                    <div className={`rounded-lg shadow p-3 ${
                      message.username === authUser.username 
                        ? 'bg-blue-100' 
                        : 'bg-white'
                    }`}
                      style={{ width: '75%' }}
                    >
                      <div className="flex items-center mb-1">
                        <img
                          src={message.profilepic}
                          alt={message.username}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div className={`text-xs font-semibold ${
                          message.username === authUser.username 
                            ? 'text-blue-700' 
                            : 'text-blue-600'
                        }`}>
                          {message.username}
                        </div>
                        <div className="text-xs text-gray-500 ml-auto">
                          {new Date(message.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className={`text-base font-semibold text-left ${
                        message.username === authUser.username 
                          ? 'text-blue-800' 
                          : 'text-gray-700'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {messages.length > displayedMessages.length && (
                  <div className="flex justify-center">
                    <button
                      onClick={loadMoreMessages}
                      className="bg-slate-200 hover:bg-slate-300 rounded-full text-slate-800 py-1 px-3 text-sm"
                    >
                      Load More Messages
                    </button>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      );
    };

    export default GroupChat;
