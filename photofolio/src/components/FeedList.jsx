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

  const handleHidePost = (postId) => {
    // eslint-disable-next-line no-underscore-dangle
    setPosts(feedsList.filter((x) => x._id !== postId));
  };

  const populateFeeds = () => {
    const feeds = [];
    if (!userList || !feedsList) return feeds;
    const now = Date.now();
    feedsList.forEach((post) => {
      // const photo = photoList.find((x) => x.postId === post.id);
      // eslint-disable-next-line no-underscore-dangle
      const user = userList.find((x) => x._id === post.userId);
      if (user && post.photo) {
        feeds.push(
          <Feed
            author={`${user.firstName} ${user.lastName}`}
            img={post.photo}
            // eslint-disable-next-line no-underscore-dangle
            key={post._id}
            // eslint-disable-next-line no-underscore-dangle
            userId={user._id}
            avatar={user.avatar}
            likes={post.likes || 0}
            likedBy={post.likedBy || []}
            commentIds={post.comments}
            title={post.title}
            // eslint-disable-next-line no-underscore-dangle
            postId={post._id}
            msAge={now - Date.parse(post.date)}
            handlePostChange={handlePostChange}
            handleHidePost={handleHidePost}
          />
        );
      }
    });
    feeds.sort((a, b) => b.props.msAge - a.props.msAge);
    return feeds;
  };
  let feeds = <CircularProgress />;

  feeds = populateFeeds();
  if (feeds.length === 0) {
    feeds = (
      <h3>
        Seems that you do not have any feeds. Go add users you like to your
        follow list!
      </h3>
    );
  }

  return <div className="feedlist-main">{feeds}</div>;
}

export default FeedList;
