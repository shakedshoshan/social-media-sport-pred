    import React, { useState } from 'react';
    import usePostSubmit from '../hooks/usePostSubmit';
    import useGetAllPosts from '../hooks/useGetAllPosts';
    import LogoutButton from '../components/logoutButton';
    import PostsCrusel from '../components/PostsCrusel';
    import CreatePost from '../components/CreatePost';

    export default function Home() {
      const [posts, setPosts] = useState([]);
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [guess, setGuess] = useState('');
      const [comments, setComments] = useState({});
      const { submitPost, isLoading, error } = usePostSubmit();
      const { getAllPosts, isLoadingPosts, errorPosts } = useGetAllPosts();
      




      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Home</h1>
          <LogoutButton />

          <CreatePost />

          
          <PostsCrusel />
          
        </div>
      );
    }