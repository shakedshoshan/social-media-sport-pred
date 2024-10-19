import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useGetAllPosts from '../hooks/useGetAllPosts';
import Post from './post';
import useGetPostsByUser from '../hooks/useGetPostsByUser';

const PostsCrusel = ({page='home'}) => {
  const [posts, setPosts] = useState([]);

  const { getAllPosts, isLoadingPosts, errorPosts } = page === 'home' ? useGetAllPosts() : { getAllPosts: null, isLoadingPosts: false, errorPosts: null };
  const { posts: MyPosts, loading } = page !== 'home' ? useGetPostsByUser() : { posts: null, loading: false };

  useEffect(() => {
    if (page === 'home' && getAllPosts) {
      setPosts(getAllPosts);
    } else if (page !== 'home' && MyPosts) {
      setPosts(MyPosts);
    }
  }, [page, getAllPosts, MyPosts]);





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
