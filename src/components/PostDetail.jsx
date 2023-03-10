import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import LikeIconOutlined from '@mui/icons-material/ThumbUpOutlined';
import LikeIconFilled from '@mui/icons-material/ThumbUp';
import { MentionsInput, Mention } from 'react-mentions';
// import { useHistory } from 'react-router-dom';
import { rootUrl } from './Config';
import commentIcon from '../icons/Comment.svg';
import sendIcon from '../icons/Send.svg';
import {
  fetchComments,
  createComment,
  deleteComment,
  deletePost,
  hidePost
} from '../api/axios';
import CommentRow from './CommentRow';
import './PostDetail.css';
import EditPostModals from './EditPostModal';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: 600,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  zIndex: 4000
};

function PostDetail(props) {
  PostDetail.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    postTimeStr: PropTypes.string,
    img: PropTypes.string,
    avatar: PropTypes.string,
    numberLikes: PropTypes.number,
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    handlePostChange: PropTypes.func.isRequired,
    liked: PropTypes.bool,
    handleHidePost: PropTypes.func.isRequired,
    handleLikeClickFeed: PropTypes.func.isRequired,
    curUserId: PropTypes.string.isRequired,
    // curUserName: PropTypes.string,
    // curUserAvatar: PropTypes.string,
    handleEditPost: PropTypes.func
  };

  PostDetail.defaultProps = {
    postTimeStr: 'a while ago',
    img: '/',
    avatar: '/',
    numberLikes: 0,
    // curUserName: '',
    // curUserAvatar: '/',
    liked: false,
    handleEditPost: () => {}
  };

  const {
    open,
    setOpen,
    img,
    author,
    avatar,
    title,
    postTimeStr,
    postId,
    userId,
    handlePostChange,
    numberLikes,
    liked,
    handleHidePost,
    handleLikeClickFeed,
    curUserId,
    // curUserName,
    // curUserAvatar,
    handleEditPost
  } = props;

  const [comments, setComments] = useState([]);
  const [postLiked, setPostLiked] = useState(liked);
  const [numLikes, setNumLikes] = useState(numberLikes);
  const [commentInput, setCommentInput] = useState('');
  const [commentSubmit, setCommentSubmit] = useState('');
  const [mentionCandidates, setMentionCandidates] = useState([]);

  const getMentionCandidates = async () => {
    try {
      const response = await axios.get(`${rootUrl}/users`);
      // console.log(response);
      const candidates = response.data.data.map((user) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        display:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username || 'User 42'
      }));
      // console.log('----------');
      // console.log(candidates);
      setMentionCandidates(candidates);
    } catch (err) {
      // console.log(err);
      // return err;
    }
  };
  const [postDeleted, setPostDeleted] = useState(false);
  const [commentEdited, setCommentEdited] = useState(false);
  // const [postModalIsOpen, setPostModalOpen] = useState(false);
  const [testState, setTestState] = useState(false);
  // const closePostModal = () => setPostModalOpen(false);
  const closeEditPostModal = () => setTestState(false);
  let commentlist;
  // const [alert, setAlert] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const commentsData = await fetchComments(postId);
      // console.log(commentsData);
      if (Array.isArray(commentsData) && commentsData.length >= 0) {
        // console.log('fetched');
        commentlist = commentsData;
        setComments(commentlist);
      }
    }
    fetchData();
    setPostLiked(liked);
    setNumLikes(numberLikes);
  }, [commentSubmit, postDeleted, commentEdited, liked]);

  useEffect(() => {
    getMentionCandidates();
  }, []);

  const handleClose = (e, r) => {
    if (r === 'backdropClick') {
      setOpen(false);
    }
  };

  const handleLikeClick = () => {
    handleLikeClickFeed();
    setPostLiked((currentLike) => !currentLike);
    if (postLiked) setNumLikes(numLikes - 1);
    else setNumLikes(numLikes + 1);
  };

  const handlePostEdit = async () => {
    setOpen(false);
    setTestState((x) => !x);
  };

  const handleHideClick = async () => {
    setOpen(false);
    hidePost(postId, curUserId);
    handleHidePost(postId);
  };

  const handlePostDelete = async (id) => {
    try {
      const response = await deletePost(id);
      handlePostChange(id);
      return response.status;
    } catch (err) {
      return err.message;
    }
  };

  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    setPostDeleted((currentDelete) => !currentDelete);
  };

  const populateComments = () => {
    const allComments = [];
    comments.forEach((comment) => {
      allComments.push(
        <CommentRow
          // eslint-disable-next-line no-underscore-dangle
          key={comment._id}
          userId={comment.userId}
          commentText={comment.text}
          // eslint-disable-next-line no-underscore-dangle
          commentId={comment._id}
          commentDel={handleCommentDelete}
          commentEd={setCommentEdited}
        >
          {comment.text}
        </CommentRow>
      );
    });
    return allComments;
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const convertMentionInComment = (comment) => {
    let clickableComment = comment;
    clickableComment = clickableComment
      .split('@@@^')
      .join('<a href="/profile/');
    clickableComment = clickableComment.split('@@@|').join('">@');
    clickableComment = clickableComment.split('$@@@').join('</a>');
    clickableComment = `${clickableComment}`;
    return clickableComment;
  };

  const handleCommentSubmit = async () => {
    const comment = convertMentionInComment(commentInput);
    await createComment(curUserId, postId, comment);
    setCommentSubmit(comment);
    setCommentInput('');
  };

  const allComments = populateComments();
  return (
    <div className="post-modal-main">
      <EditPostModals
        closeModal={closeEditPostModal}
        open={testState}
        setAlert={() => {}}
        postId={postId}
        title={title}
        img={img}
        curUserId={userId}
        curUserName={author}
        curUserAvatar={avatar}
        handleEditPost={handleEditPost}
      />
      <Modal
        open={open || false}
        onClose={handleClose}
        aria-labelledby="post-title"
        aria-describedby="post-description"
      >
        <Box className="post-detail-text" sx={style}>
          <div className="post-detail-left">
            <img src={img} className="post-detail-image" alt="post" />
            <div className="post-detail-description">
              <Link to={`/profile/${userId}`}>
                <Avatar
                  alt="me"
                  className="Avatar"
                  src={avatar}
                  sx={{
                    width: 70,
                    height: 70,
                    position: 'absolute',
                    top: '77%',
                    left: '2%'
                  }}
                />
              </Link>
              <p className="post-detail-description-user">{title}</p>
              <div className="post-detail-description-text">
                <p>text description</p>
              </div>
            </div>
          </div>
          <div className="post-detail-right">
            <div className="post-detail-userhead">
              <Link to={`/profile/${userId}`}>
                <Avatar
                  alt="me"
                  className="Avatar"
                  src={avatar}
                  sx={{ width: 60, height: 60 }}
                />
              </Link>
              <p className="postUsername">{author}</p>
              <p className="postTime">{postTimeStr}</p>
            </div>
            <div>
              {curUserId === userId && (
                <div>
                  <button type="submit" onClick={() => handlePostEdit(postId)}>
                    Edit Post
                  </button>
                  <button
                    type="submit"
                    className="deleteButton"
                    onClick={() => handlePostDelete(postId)}
                  >
                    Delete Post
                  </button>
                </div>
              )}
              {curUserId !== userId && (
                <button
                  type="submit"
                  className="deleteButton"
                  onClick={handleHideClick}
                >
                  Hide Post
                </button>
              )}
            </div>
            <div className="post-detail-comments">{allComments}</div>
            <div className="post-detail-actions">
              <div className="post-detail-postStats">
                <div className="post-detail-stats">
                  <IconButton
                    onClick={handleLikeClick}
                    aria-label="like"
                    sx={{ curser: 'pointer' }}
                  >
                    {postLiked ? (
                      <LikeIconFilled
                        sx={{
                          color: 'orange!important'
                        }}
                      />
                    ) : (
                      <LikeIconOutlined />
                    )}
                  </IconButton>
                  <p>
                    {numLikes <= 1 ? `${numLikes} Like` : `${numLikes} Likes`}
                  </p>
                </div>
                <div className="post-detail-stats">
                  <img src={commentIcon} alt="comment" />
                  <p>{comments.length} Comments</p>
                </div>
              </div>
              <div className="post-detail-post-comment">
                <button type="submit" onClick={handleCommentSubmit}>
                  <img src={sendIcon} alt="send comment" />
                </button>
                <MentionsInput
                  className="comments-textarea"
                  value={commentInput}
                  placeholder="Post a comment. Mention with '@'"
                  onChange={handleCommentChange}
                  singleLine
                  allowSpaceInQuery
                  style={{
                    width: '75%',
                    maxWidth: '20em'
                  }}
                >
                  <Mention
                    trigger="@"
                    data={mentionCandidates}
                    markup="@@@^__id__@@@|__display__$@@@"
                    style={{ backgroundColor: '#FFDD2B' }}
                    displayTransform={(id, display) => `@${display}`}
                    // renderSuggestion={this.renderUserSuggestion}
                  />
                </MentionsInput>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PostDetail;
