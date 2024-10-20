    import React, { useState, useEffect } from 'react';
    import useAddFollow from '../hooks/follow/useAddFollow';
    import useRemoveFollow from '../hooks/follow/useRemoveFollow';
    import useIsFollow from '../hooks/follow/useIsFollow';
    import useAuth from '../zustand/useAuth';

    const FollowButton = ({ followedId = 1, page = 'home' }) => {
        const { authUser } = useAuth();
        const { addFollow } = useAddFollow();
        const { removeFollow } = useRemoveFollow();
        const [followStatus, setFollowStatus] = useState(false);
        const { isFollowing } = useIsFollow(followedId);

        useEffect(() => {
            setFollowStatus(isFollowing);
        }, [isFollowing]);

        const handleToggleFollow = async () => {
            try {
                if (followStatus) {
                    await removeFollow(followedId);
                } else {
                    await addFollow(followedId);
                }
                setFollowStatus(!followStatus);
            } catch (err) {
                console.error(err);
            }
        };

        if (authUser?.id === followedId) return null;

        const buttonClasses = page === 'userProfile'
            ? `w-full text-base md:text-lg font-bold rounded-full px-4 py-1 transition-all duration-300 ${
                followStatus
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
            }`
            : `text-sm font-semibold rounded-full px-3 py-1 transition-all duration-300 ${
                followStatus
                    ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
            }`;

        return (
            <button
                onClick={handleToggleFollow}
                className={buttonClasses}
            >
                {followStatus ? 'Following' : 'Follow'}
            </button>
        );
    };

    export default FollowButton;
