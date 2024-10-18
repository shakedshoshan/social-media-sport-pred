import React from 'react';
import useGetComments from '../hooks/useGetComments';
import Comment from './Comment';


const CommentsCrusel = ({ postId }) => {
  const { comments, isLoading, error } = useGetComments(postId);

  if (isLoading) {
    return <div className="text-center">Loading comments...</div>;
  }

  

  return (
    <div className="mt-4">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-1">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 p-3 rounded-lg">
              <Comment comment={comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsCrusel;
