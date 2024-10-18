import React from 'react';
import useGetTablesByUser from '../hooks/useGetTablesByUser';
import Table from './Table';

const TableCrusel = ({slice = 3, page = 'home'}) => {
  const { groups, loading, error } = useGetTablesByUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {page === 'home' || page === 'profile' ? (
        <div className="overflow-x-auto space-y-10">
          {groups.slice(0, slice).map((group, index) => (
            <div key={index} className="mb-8 ">
              <h3 className="text-md border-l-4 border-blue-500 pl-3 font-bold mb-3 text-blue-600 hover:text-blue-800 transition-colors duration-300  left-0">
                {group.name}
              </h3>
              <Table groupId={group.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.slice(0, slice).map((group, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl  border-blue-500 pl-3 font-bold mb-3 text-blue-600 hover:text-blue-800 transition-colors duration-300  left-0">
                {group.name}
              </h3>
              <Table groupId={group.id} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TableCrusel;
