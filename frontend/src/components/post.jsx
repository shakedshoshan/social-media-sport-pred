    import React, { useState, useEffect } from 'react';
    import useGetUser from '../hooks/useGetUser';
    import useHandleLike from '../hooks/useHandleLike';
    import CommentsCrusel from './CommentsCrusel';
    import CommentForm from './CommentForm';
    import useCheckLiked from '../hooks/useCheckLiked';
    import FollowButton from './FollowButton';
    import { Link } from 'react-router-dom';
    
    const Post = ({ post }) => {
      const { user, isLoading, error } = useGetUser(post.user_id);
      const { addLike, removeLike, isLoading: isLoadingLike, error: errorLike } = useHandleLike();
      const [likes, setLikes] = useState(post.likes);
      const [showComments, setShowComments] = useState(false);
      const { isLiked, isLoading: isLoadingLiked, error: errorLiked } = useCheckLiked(post.id);
      const [localIsLiked, setLocalIsLiked] = useState(isLiked);
    
      useEffect(() => {
        setLocalIsLiked(isLiked);
      }, [isLiked]);
    
      const handleLike = () => {
        if (localIsLiked) {
          removeLike(post.id);
          setLikes((prevLikes) => prevLikes - 1);
        } else {
          addLike(post.id);
          setLikes((prevLikes) => prevLikes + 1);
        }
        setLocalIsLiked(!localIsLiked);
      };
    
      const toggleComments = () => {
        setShowComments(!showComments);
      };
    
      return (
        <div className="mb-4 sm:mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center">
                <Link to={`/user/${post.user_id}`} className="flex items-center">
                  {user?.profilepic ? (
                    <img
                      src={user.profilepic}
                      alt={`${user?.username}'s profile`}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 object-cover border-2 border-blue-500"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 bg-blue-500 flex items-center justify-center text-white font-bold">
                      <span>{user?.username?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-sm sm:text-lg">{user?.username}</h3>
                    <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </Link>
              </div>
              <FollowButton followedId={post.user_id} />
            </div>
            
            <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">{post.content}</p>
            <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2 sm:mb-4">Guess: {post.guess}</p>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-2 sm:pt-3">
              <button 
                className={`flex items-center ${localIsLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition-colors duration-200 text-xs sm:text-base`} 
                onClick={handleLike}
                disabled={isLoadingLike || isLoadingLiked}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 mr-1" fill={localIsLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
              </button>
              
              <button 
                onClick={toggleComments} 
                className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200 text-xs sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Comments {showComments ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
          
          {showComments && (
            <div className="bg-gray-50 p-2 sm:p-4 border-t border-gray-200">
              <CommentForm postId={post.id} />
              <CommentsCrusel postId={post.id} />
            </div>
          )}
        </div>
      );
    };
    
    export default Post;
