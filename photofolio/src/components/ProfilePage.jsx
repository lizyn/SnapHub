/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProfilePage.css';
// import { Avatar } from '@mui/material';

// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import UserRow from './UserRow';
import CreatePostModal from './CreatePostModal';
import Feed from './Feed';
// import { rootUrl } from './Config';
// import likeIcon from '../icons/Like.svg';
// import followerIcon from '../icons/People.svg';
// import NewIcon from '../icons/New.svg';
// import userMe from '../images/userMe.jpg';
import { fetchUserPost, fetchUsers } from '../api/axios';

function ProfilePage(props) {
  ProfilePage.propTypes = {
    closePostModal: PropTypes.func.isRequired,
    postModalIsOpen: PropTypes.bool.isRequired,
    // setPostModalOpen: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  const { closePostModal, postModalIsOpen, setAlert } = props;
  let { userId } = useParams();
  const now = Date.now();
  // const user = {
  //   name: 'Tatiana Dokidis',
  //   userId: '63899e8d4bd2e0bd159d0e10',
  //   userProfile:
  //     'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/119.jpg'
  // };

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [edited, setEdited] = useState(false);
  // const [isFollowing, setIsFollowing] = useState(false);
  // const currentUserId = '63899e8d4bd2e0bd159d0e10';

  useEffect(() => {
    setPhotos([]);
    async function fetchUser() {
      if (!userId) userId = sessionStorage.getItem('user');
      const userData = await fetchUsers(userId);
      if (userData) {
        setUser(userData[0]);
      }
    }
    async function fetchPhotoData() {
      let photoData = [];
      if (userId) photoData = await fetchUserPost(userId);
      if (Array.isArray(photoData) && photoData.length !== 0) {
        setPhotos(photoData);
      }
    }
    // console.log(sessionStorage.getItem('user'), 'and', user, 'and', userId);
    // async function followStatus() {
    //   try {
    //     const url = `${rootUrl}/follows/${currentUserId}/${userId}`;
    //     console.log(url);
    //     const data = await axios.get(url);
    //     console.log(data.status === 200);
    //     if (data.status === 200) setIsFollowing(true);
    //   } catch (err) {
    //     setIsFollowing(false);
    //   }
    // }
    if (!sessionStorage.getItem('app-token')) window.location.replace('/login');
    fetchUser();
    fetchPhotoData();
    // followStatus();
    // console.log(userId);
  }, [userId, edited]);

  // const orange = createTheme({
  //   status: {
  //     danger: '#e53e3e'
  //   },
  //   palette: {
  //     primary: {
  //       main: '#FFDD2B',
  //       darker: '#000'
  //     },
  //     neutral: {
  //       main: '#FFDD2B',
  //       contrastText: '#FFF'
  //     }
  //   }
  // });
  const userPosts = photos;

  const handlePostChange = (postId) => {
    const updatedPosts = photos.filter((x) => x._id !== postId);
    setPhotos(updatedPosts);
  };

  const handleEditPost = () => {
    // console.log('editedpost');
    setEdited((x) => !x);
  };

  const handleHidePost = (postId) => {
    // eslint-disable-next-line no-underscore-dangle
    setPhotos(userPosts.filter((x) => x._id !== postId));
  };

  if (!sessionStorage.getItem('app-token')) return <div />;
  if (!user && !userId) {
    return <CircularProgress />;
  }
  return (
    <div>
      <CreatePostModal
        closeModal={closePostModal}
        open={postModalIsOpen}
        setAlert={setAlert}
        curUserFirstName={`${user.firstName} ${user.lastName}`}
        curUserAvatar={user.avatar}
        // eslint-disable-next-line no-underscore-dangle
        curUserId={user._id}
      />
      <div className="profileMain">
        <div className="profileUser">
          <UserRow
            userId={user._id || '63899e8d4bd2e0bd159d0e10'}
            avatar={user.avatar}
            name={
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.username || 'User 42'
            }
            showFollow={false}
            // isFollowing={isFollowing}
          />
          {/* <Avatar
            alt="me"
            className="Avatar"
            src={user.avatar}
            sx={{ width: 100, height: 100 }}
          />
          <div className="profileDes">
            {user.firstName && user.lastName ? (
              <p>{`${user.firstName} ${user.lastName}`}</p>
            ) : (
              <p>{user.username}</p>
            )}
            <p>This user have no self introduction yet.</p>
          </div> */}
        </div>
        <div className="profileStats">
          <div className="followerStats">
            {/* <div>
              <img src={likeIcon} alt="like" />
              <p>348 Likes</p>
            </div>
            <div>
              <img src={followerIcon} alt="followers" />
              <p>2,390 Followers</p>
            </div> */}
            {/* <div>
              <img src={followerIcon} alt="followers" />
              <p>Following</p>
            </div> */}
            Joined since 2022-12-20
          </div>
          {/* <div className="newpost">
            <ThemeProvider theme={orange}>
              <Fab
                variant="extended"
                color="primary"
                sx={{ zIndex: 999 }}
                onClick={() => setPostModalOpen((o) => !o)}
              >
                <img src={NewIcon} className="newPostSign" alt="new" />
                New Post
              </Fab>
            </ThemeProvider>
          </div> */}
        </div>

        <div className="profileActivity">
          {!photos || photos.length === 0 ? (
            <h5>This user have not made any post yet</h5>
          ) : (
            <ImageList
              sx={{
                width: 800,
                height: 500,
                overflow: 'scroll'
              }}
              cols={3}
              rowHeight={164}
            >
              {userPosts.map((item) => (
                <ImageListItem
                  // eslint-disable-next-line no-underscore-dangle
                  key={item._id}
                  sx={{ width: '95% !important', height: '90% !important' }}
                >
                  <Feed
                    author={`${user.firstName} ${user.lastName}`}
                    img={item.photo}
                    // eslint-disable-next-line no-underscore-dangle
                    key={item._id}
                    // eslint-disable-next-line no-underscore-dangle
                    userId={user._id}
                    avatar={user.avatar}
                    likes={item.likes || 0}
                    likedBy={item.likedBy || []}
                    commentIds={item.comments}
                    title={item.title}
                    // eslint-disable-next-line no-underscore-dangle
                    postId={item._id}
                    msAge={now - Date.parse(item.date)}
                    handlePostChange={handlePostChange}
                    curUserId={user._id}
                    handleHidePost={handleHidePost}
                    inPostDetail
                    handleEditPost={handleEditPost}
                    edited={edited}
                  >
                    <img
                      src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.alt}
                      loading="lazy"
                    />
                  </Feed>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
