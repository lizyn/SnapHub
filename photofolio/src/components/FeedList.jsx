/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

// import CircularProgress from '@mui/material/CircularProgress';
import Feed from './Feed';
import { fetchFeeds, fetchUsers } from '../api/axios';
import FeedInfinite from './FeedInfinite';

function FeedList(props) {
  FeedList.propTypes = {
    curUserId: PropTypes.string
  };

  FeedList.defaultProps = {
    curUserId: ''
  };

  const { curUserId } = props;

  const [posts, setPosts] = useState([]);

  // const [, updateState] = React.useState();
  const [users, setUsers] = useState([]);

  // const [items, setItems] = useState([]);
  // let items = [];
  const userId = '63899e8d4bd2e0bd159d0e10';

  const handlePostChange = (postId) => {
    const updatedPosts = posts.filter((x) => x.id !== postId);
    setPosts(updatedPosts);
  };

  async function fetchData() {
    const postsData = await fetchFeeds(userId);
    setPosts(postsData);
  }

  async function fetchUserData() {
    const userData = await fetchUsers();
    setUsers(userData);
  }

  useEffect(() => {
    fetchData();
    fetchUserData();
    setInterval(() => {
      fetchData();
      fetchUserData();
    }, 3000);
  }, []);

  // useEffect(() => {
  //   window.alert(1);
  // }, [posts.length]);

  const feedsList = posts;
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
      const user = userList.find((x) => x._id === post.userId);
      if (user && post.photo) {
        feeds.push(
          <Feed
            author={`${user.firstName} ${user.lastName}`}
            img={post.photo}
            key={post._id}
            userId={user._id}
            avatar={user.avatar}
            likes={post.likes || 0}
            likedBy={post.likedBy || []}
            commentIds={post.comments}
            title={post.title}
            postId={post._id}
            msAge={now - Date.parse(post.date)}
            handlePostChange={handlePostChange}
            curUserId={curUserId}
            handleHidePost={handleHidePost}
          />
        );
      }
    });
    feeds.sort((a, b) => b.props.msAge - a.props.msAge);
    return feeds;
  };
  // let feeds = <CircularProgress />;

  const feeds = populateFeeds();
  // if (feeds.length === 0) {
  //   feeds = (
  //     <h3>
  //       Seems that you do not have any feeds. Go add users you like to your
  //       follow list!
  //     </h3>
  //   );
  // } else {
  //   items = feeds.slice(0, num);
  // }

  // return <div className="feedlist-main">{feeds}</div>;
  return <FeedInfinite feeds={feeds} />;
}

export default FeedList;
