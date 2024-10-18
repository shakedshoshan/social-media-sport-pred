import React from 'react';
import { FaUsers } from 'react-icons/fa';
import TableCrusel from '../components/TableCrusel';
import CreateJoinButton from '../components/CreateJointButton';

const MyTables = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-600 flex items-center">
            <FaUsers className="mr-3" />
            My Tables
          </h1>
          <div className="mb-6 max-w-sm mx-auto">
            <CreateJoinButton />
          </div>
          <div className="space-y-8 mt-6">
            <TableCrusel slice={100} page='mytables'/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTables;
