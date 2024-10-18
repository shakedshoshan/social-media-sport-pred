import { useState } from 'react';
import { FaUsers, FaUserPlus } from 'react-icons/fa';
import useCreateGroup from '../hooks/useCreateGroup';
import useJoinGroup from '../hooks/useJoinGroup';
import { toast } from 'react-hot-toast';

const CreateJoinButton = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const { createGroup, isLoading: isCreateLoading } = useCreateGroup();
  const { joinGroup, isLoading: isJoinLoading } = useJoinGroup();

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const group = await createGroup(groupName);
    setIsCreateModalOpen(false);
    setGroupName('');
    
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    const group = await joinGroup(secretCode);
    setIsJoinModalOpen(false);
    setSecretCode('');
  };

  return (
    <div className="flex flex-col space-y-4 mt-4 mb-12">
      {/* Create Group Button */}
      <button
        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <FaUsers className="mr-2" />
        Create Group
      </button>

      {/* Join Group Button */}
      <button
        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 transform hover:scale-105"
        onClick={() => setIsJoinModalOpen(true)}
      >
        <FaUserPlus className="mr-2" />
        Join Group
      </button>

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Create a New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Group Name</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter group name"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Join a Group</h2>
            <form onSubmit={handleJoinGroup}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Secret Code</label>
                <input
                  type="text"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  placeholder="Enter secret code"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setIsJoinModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJoinButton;
