import React, { useState } from 'react';

import PropTypes from 'prop-types';
import './Feed.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LikeIconOutlined from '@mui/icons-material/ThumbUpOutlined';
import LikeIconFilled from '@mui/icons-material/ThumbUp';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PostDetail from './PostDetail';
import { likePosts } from '../api/axios';

import sendIcon from '../icons/Send.svg';
// import post1 from '../images/post1.jpg';

function Feed(props) {
  Feed.propTypes = {
    author: PropTypes.string.isRequired,
    img: PropTypes.string,
    avatar: PropTypes.string,
    likes: PropTypes.number.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    msAge: PropTypes.number,
    commentIds: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    handlePostChange: PropTypes.func.isRequired,
    curUserId: PropTypes.string.isRequired
  };

  Feed.defaultProps = {
    msAge: 0,
    img: '/',
    avatar: '/',
    commentIds: []
  };

  const {
    avatar,
    author,
    img,
    likes,
    commentIds,
    title,
    msAge,
    postId,
    userId,
    handlePostChange,
    likedBy,
    curUserId
  } = props;

  const [detailOpen, setDetailOpen] = useState(false);
  const [postLiked, setPostLiked] = useState(likedBy.includes(curUserId));
  const [numLikes, setNumLikes] = useState(likes);
  console.log('likedby', likedBy.includes(curUserId), 'includes', curUserId);

  const handleClick = () => {
    setDetailOpen(true);
  };

  const handleLikeClick = () => {
    setPostLiked((currentLike) => !currentLike);
    if (postLiked) setNumLikes(numLikes - 1);
    else setNumLikes(numLikes + 1);
    likePosts(postId, curUserId);
  };

  const parsePostTime = (ms) => {
    let postTimeStr;
    if (ms < 0) postTimeStr = 'a while ago';
    else if (ms < 1000 * 60) postTimeStr = `${Math.floor(ms / 1000)} secs ago`;
    else if (ms < 1000 * 60 * 60)
      postTimeStr = `${Math.floor(ms / 1000 / 60)} mins ago`;
    else if (ms < 1000 * 60 * 60 * 24)
      postTimeStr = `${Math.floor(ms / 1000 / 60 / 60)} hours ago`;
    else if (ms < 1000 * 60 * 60 * 24 * 30)
      postTimeStr = `${Math.floor(ms / 1000 / 60 / 60 / 24)} days ago`;
    else if (ms < 1000 * 60 * 60 * 24 * 30 * 12)
      postTimeStr = `${Math.floor(ms / 1000 / 60 / 60 / 24 / 30)} months ago`;
    else
      postTimeStr = `${Math.floor(ms / 1000 / 60 / 60 / 24 / 365)} years ago`;
    return postTimeStr;
  };

  const postTimeStr = parsePostTime(msAge);

  return (
    <div>
      <div style={{ display: 'none' }}>
        <PostDetail
          open={detailOpen}
          setOpen={setDetailOpen}
          author={author}
          avatar={avatar}
          img={img}
          likes={likes}
          likedBy={likedBy}
          commentIds={commentIds}
          title={title}
          postTimeStr={postTimeStr}
          commentNum={commentIds.length}
          postId={postId}
          userId={userId}
          liked={postLiked}
          numberLikes={numLikes}
          handlePostChange={handlePostChange}
          handleLikeClickFeed={handleLikeClick}
        />
      </div>
      <div>
        <div className="post">
          <div className="postHead">
            <Avatar
              alt="me"
              className="Avatar"
              src={avatar}
              sx={{ width: 50, height: 50, marginTop: 1, marginBottom: 1 }}
            />
            <div className="post-head-detail">
              <p className="postUsername">{author}</p>
              <p className="postTime">{postTimeStr}</p>
            </div>
          </div>
          <button type="button" onClick={handleClick}>
            <img src={img} alt="post" />
          </button>
          <div className="postActions">
            <div className="postStats">
              <div className="stats">
                <IconButton
                  onClick={handleLikeClick}
                  aria-label="like"
                  sx={{ curser: 'pointer' }}
                >
                  {postLiked ? (
                    <LikeIconFilled sx={{ color: 'orange!important' }} />
                  ) : (
                    <LikeIconOutlined />
                  )}
                </IconButton>
                <p>
                  {numLikes <= 1 ? `${numLikes} Like` : `${numLikes} Likes`}
                </p>
              </div>
              <div className="stats">
                <ForumOutlinedIcon />
                <p>{commentIds.length} Comments</p>
              </div>
            </div>
            <div className="postComment">
              <button type="submit" onClick={handleClick}>
                <img src={sendIcon} alt="send comment" />
              </button>
              <input
                type="text"
                placeholder="Post a comment"
                name="postComment"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
