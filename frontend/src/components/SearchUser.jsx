import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useSearchUser from '../hooks/search/useSearchUser';

const SearchUser = () => {
    const [query, setQuery] = useState('');
    const { searchUsers, searchResults, isLoading, error } = useSearchUser();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                searchUsers(query);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchUsers]);

    const handleUserClick = () => {
        setQuery('');
        searchUsers('');
    };

    return (
        <div className="relative">
            <div className="flex items-center bg-white rounded-full shadow-md">
                <FaSearch className="ml-4 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-2 px-4 rounded-full focus:outline-none"
                />
            </div>
            
            {searchResults.length > 0 && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
                    {searchResults.map((user) => (
                        <Link
                            key={user.id}
                            to={`/user/${user.id}`}
                            className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg"
                            onClick={handleUserClick}
                        >
                            <div className="flex items-center hover:bg-gray-100 ">
                                <img
                                    src={user.profilepic}
                                    alt={user.username}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <span>{user.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchUser;
