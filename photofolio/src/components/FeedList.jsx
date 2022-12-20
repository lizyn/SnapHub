/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import Feed from './Feed';
import { fetchFeeds, fetchUsers } from '../api/axios';

function FeedList() {
  const [posts, setPosts] = useState([]);
  // const [, updateState] = React.useState();
  const [users, setUsers] = useState([]);
  // const [hasMore, setHasMore] = useState(true);
  // const [items, setItems] = useState([]);
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

  const feedsList = posts;
  const userList = users;

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
  } else {
    // setItems(feeds.slice(0, 1));
    // setItems([]);
  }

  // const fetchMoreData = () => {
  //   console.log(feeds.length);
  //   console.log(posts.length);
  //   if (feeds.length >= posts.length) {
  //     setHasMore(hasMore);
  //   }
  // };

  // return <div className="feedlist-main">{feeds}</div>;
  return (
    <div
      id="scrollableDiv"
      style={{
        height: '70vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Put the scroll bar always on the bottom */}
      <InfiniteScroll
        dataLength={1}
        // eslint-disable-next-line react/jsx-no-bind
        // next={fetchMoreData}
        next={() => {}}
        style={{ display: 'flex', flexDirection: 'column' }} // To put endMessage and loader to the top.
        inverse
        hasMore={false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={React.useCallback(() => updateState({}), [])}
        // refreshFunction={() => {
        //   console.log(`resfresh${new Date()}`);
        // }}
        // pullDownToRefresh
        // // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
        scrollableTarget="scrollableDiv"
      >
        {feeds}
      </InfiniteScroll>
    </div>
  );
}

export default FeedList;
