import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useGetAllPosts from '../hooks/useGetAllPosts';
import Post from './post';

const PostsCrusel = () => {
  const { getAllPosts, isLoadingPosts, errorPosts } = useGetAllPosts();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (getAllPosts) {
      setPosts(getAllPosts);
    }
  }, [getAllPosts]);





  return (
    <div className="container mx-auto px-4">
      {isLoadingPosts ? (
        <p className="text-center text-lg">Loading posts...</p>
      ) : errorPosts ? (
        <p className="text-center text-lg text-red-500">Error loading posts: {errorPosts}</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
    
      
 
  );
};

export default PostsCrusel;
