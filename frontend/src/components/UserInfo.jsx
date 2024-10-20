import React, { useState } from 'react';
import useGetFollowers from '../hooks/follow/useGetFollowers';
import useGetFollowing from '../hooks/follow/useGetFollowing';
import { FaUserFriends, FaUserPlus, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const UserInfo = ({ user = 1 }) => {
    const { followers, isLoading: isLoadingFollowers } = useGetFollowers({ userId: user.id });
    const { following, isLoading: isLoadingFollowing } = useGetFollowing({ userId: user.id });
    const [showModal, setShowModal] = useState(null);

    if (isLoadingFollowers || isLoadingFollowing) return <div className="text-center py-2">Loading...</div>;

    const renderModal = (title, data) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-3 rounded-lg shadow-xl w-full max-w-xs">
                <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
                <ul className="max-h-40 overflow-y-auto">
                    {data.map((item, index) => (
                        <React.Fragment key={item._id}>
                            <li className="p-1 hover:bg-gray-100 rounded text-sm flex items-center">
                                <img src={item.profilepic} alt={item.username} className="w-8 h-8 rounded-full mr-2" />
                                {item.username}
                            </li>
                            {index < data.length - 1 && <hr className="my-1 border-gray-200" />}
                        </React.Fragment>
                    ))}
                </ul>
                <button onClick={() => setShowModal(null)} className="mt-3 ml-auto block bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Close</button>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex justify-around items-center bg-white shadow-sm rounded-lg p-2 mb-3 text-xs md:text-sm">
                <button onClick={() => setShowModal('followers')} className="flex items-center">
                    <FaUserFriends className="text-lg mr-1" />
                    <span className="font-bold">{followers.length}</span>
                    <span className="hidden md:inline ml-1">Followers</span>
                </button>
                <button onClick={() => setShowModal('following')} className="flex items-center">
                    <FaUserPlus className="text-lg mr-1" />
                    <span className="font-bold">{following.length}</span>
                    <span className="hidden md:inline ml-1">Following</span>
                </button>
                <div className="flex items-center">
                    <FaCalendarAlt className="text-lg mr-1 text-gray-600" />
                    <span>
                        {user.created_at && !isNaN(new Date(user.created_at).getTime())
                            ? format(new Date(user.created_at), 'MMM yy')
                            : 'Unknown'}
                    </span>
                    <span className="hidden md:inline ml-1">Joined</span>
                </div>
            </div>
            {showModal === 'followers' && renderModal('Followers', followers)}
            {showModal === 'following' && renderModal('Following', following)}
        </>
    );
};

export default UserInfo;
