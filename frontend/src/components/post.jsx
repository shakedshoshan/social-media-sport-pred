import React, { useState, useEffect } from 'react';
// import AddCommentForm from './AddCommentForm';
import useGetUser from '../hooks/useGetUser';
import useHandleLike from '../hooks/useHandleLike';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const { user, isLoading, error } = useGetUser(post.user_id);
  const { addLike, isLoading: isLoadingLike, error: errorLike } = useHandleLike();
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(liked => !liked);
    addLike(post.id);
  };

  useEffect(() => {
    setLikes(likes => likes + 1);
  },[liked])

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-md shadow-sm">
        <div className="flex flex-row right-0 scale-90">  
            {user?.profilepic ? (
            <img
                src={user.profilepic}
                alt={`${user?.username}'s profile`}
                className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            ) : (
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-xl">{user?.username?.charAt(0).toUpperCase()}</span>
            </div>
            )}
            <h1 className="text-xl mb-3">{user?.username}</h1>
        </div>    
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-lg">{post.content}</p>
        <p className="text-sm text-gray-500">Guess: {post.guess}</p>
            
       
        <div className="flex flex-col items-center mt-2">
        <hr className="border-t border-1 border-gray-300" width="100%"/>
        <div className="flex flex-row items-center justify-between mt-4 w-full">
          <div className="flex items-center">
            <button className="flex items-center text-blue-500 hover:text-blue-600" onClick={handleLike}>
              {liked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              )}
              {likes}
            </button>
          </div>
          <div className="border-l border-gray-300 h-6 mx-4"></div>
          <div className="flex items-center">
            <h4 className="font-semibold text-blue-500 hover:text-blue-600">Comments</h4>
            {/* {comments[post.id]?.map(comment => (
            <p key={comment.id} className="ml-4 text-gray-700">
                - {comment.content}
            </p>
            ))} */}
            {/* <AddCommentForm postId={post.id} onAddComment={onAddComment} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
