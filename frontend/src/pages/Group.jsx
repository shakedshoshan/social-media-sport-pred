import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaComments, FaTrophy, FaInfoCircle } from 'react-icons/fa';
import useGetTable from '../hooks/useGetTable';
import Table from '../components/Table';
import useGetGroupDetails from '../hooks/useGetGroupDetails';
import GroupChat from '../components/GroupChat';

const Group = () => {
  const { id } = useParams();
  const { users, loading: tableLoading, error: tableError } = useGetTable(id);
  const { groupDetails, loading: groupDetailsLoading, error: groupDetailsError } = useGetGroupDetails(id);


  if (tableLoading || groupDetailsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (tableError || groupDetailsError) {
    return <div className="text-center py-10 text-red-500">{tableError || groupDetailsError}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Table and Details - full width on mobile, 2/3 width on larger screens */}
          <div className="w-full md:w-2/3 space-y-0 md:space-y-6 order-1 md:order-2">
            <div className="bg-white rounded-t-lg md:rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaTrophy className="text-yellow-500 mr-2" />
                {groupDetails.name}
              </h2>
              <Table groupId={id} />
            </div>
            <div className="bg-white rounded-b-lg md:rounded-lg shadow-md p-2 md:p-6 order-3 md:order-3">
              <h3 className="text-xl font-semibold mb-4 items-center hidden md:flex">
                <FaInfoCircle className="text-blue-500 mr-2" />
                Group Details
              </h3>
              <div className="flex flex-row items-center justify-between md:flex-col md:items-start space-y-0 md:space-y-2">
                <div className="flex items-center">
                  <FaUsers className="text-blue-500 mr-2" />
                  <span>{users.length}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-green-500 mr-2" />
                  <span className="hidden md:inline">Created on </span>
                  {new Date(groupDetails.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Group Chat - full width on mobile, 1/3 width on larger screens */}
          <div className="w-full md:w-1/3  order-2 md:order-1">
            
            <GroupChat groupId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
