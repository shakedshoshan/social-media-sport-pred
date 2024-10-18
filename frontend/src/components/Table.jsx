import React from 'react';
import useGetTable from '../hooks/useGetTable';

const Table = ({groupId}) => {
  const { users, loading, error } = useGetTable(groupId);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-700 to-blue-900">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Rank
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Player
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[100px] md:max-w-none">
                    {user.username}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                {user.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
