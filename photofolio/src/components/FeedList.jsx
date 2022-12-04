import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Feed from './Feed';
import { fetchFeeds, fetchUsers } from '../api/axios';

function FeedList() {
  const [posts, setPosts] = useState([]);
  // const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const userId = '63899e8d4bd2e0bd159d0e10';
  const handlePostChange = (postId) => {
    const updatedPosts = posts.filter((x) => x.id !== postId);
    setPosts(updatedPosts);
  };
  useEffect(() => {
    async function fetchData() {
      const postsData = await fetchFeeds(userId);
      setPosts(postsData);
    }

    // async function fetchPhotoData() {
    //   const photoData = await fetchPhotos();
    //   setPhotos(photoData);
    // }

    async function fetchUserData() {
      const userData = await fetchUsers();
      setUsers(userData);
    }
    fetchData();
    fetchUserData();
  }, []);

  const feedsList = posts;
  // const photoList = photos;
  const userList = users;

  const populateFeeds = () => {
    const feeds = [];
    feedsList.forEach((post) => {
      // const photo = photoList.find((x) => x.postId === post.id);
      // eslint-disable-next-line no-underscore-dangle
      const user = userList.find((x) => x._id === post.userId);
      console.log(user);
      if (user && post.photo) {
        feeds.push(
          <Feed
            author={`${user.firstName} ${user.lastName}`}
            img={post.photo}
            key={post.id}
            avatar={user.avatar}
            likes={post.likes}
            commentIds={post.comments}
            title={post.title}
            // eslint-disable-next-line no-underscore-dangle
            postId={post._id}
            handlePostChange={handlePostChange}
          />
        );
      }
    });
    return feeds;
  };
  let feeds = <CircularProgress />;
  if (userList && feedsList) {
    feeds = populateFeeds();
  } else if (feedsList.length === 0) {
    feeds = (
      <h5>
        Seems that you do not have feeds. Go add users you like to your follow
        list!
      </h5>
    );
  }

  return <div className="feedlist-main">{feeds}</div>;
}

export default FeedList;
