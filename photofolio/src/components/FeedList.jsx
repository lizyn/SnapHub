import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Feed from './Feed';
import { fetchPosts, fetchPhotos, fetchUsers } from '../api/axios';

function FeedList() {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const handlePostChange = (postId) => {
    const updatedPosts = posts.filter((x) => x.id !== postId);
    setPosts(updatedPosts);
  };
  useEffect(() => {
    async function fetchData() {
      const postsData = await fetchPosts();
      setPosts(postsData);
    }

    async function fetchPhotoData() {
      const photoData = await fetchPhotos();
      setPhotos(photoData);
    }

    async function fetchUserData() {
      const userData = await fetchUsers();
      setUsers(userData);
    }
    fetchData();
    fetchPhotoData();
    fetchUserData();
  }, []);

  const postsList = posts;
  const photoList = photos;
  const userList = users;

  const populateFeeds = () => {
    const feeds = [];
    postsList.forEach((post) => {
      const photo = photoList.find((x) => x.postId === post.id);
      const user = userList.find((x) => x.id === post.userId);
      if (user && photo) {
        feeds.push(
          <Feed
            author={`${user.firstName} ${user.lastName}`}
            img={photo.src}
            key={post.id}
            avatar={user.avatar}
            likes={post.likes}
            commentIds={post.comments}
            title={post.title}
            postId={post.id}
            handlePostChange={handlePostChange}
          />
        );
      }
    });
    return feeds;
  };
  let feeds = <CircularProgress />;
  if (userList && postsList && photoList) {
    feeds = populateFeeds();
  }

  return <div className="feedlist-main">{feeds}</div>;
}

export default FeedList;
