import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProfilePage.css';
import { Avatar, Fab } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CreatePostModal from './CreatePostModal';

import likeIcon from '../icons/Like.svg';
import followerIcon from '../icons/People.svg';
import NewIcon from '../icons/New.svg';
// import userMe from '../images/userMe.jpg';
import { fetchUserPost, fetchUsers } from '../api/axios';

function ProfilePage(props) {
  ProfilePage.propTypes = {
    closePostModal: PropTypes.func.isRequired,
    postModalIsOpen: PropTypes.bool.isRequired,
    setPostModalOpen: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  const { closePostModal, postModalIsOpen, setPostModalOpen, setAlert } = props;
  let { userId } = useParams();
  // const user = {
  //   name: 'Tatiana Dokidis',
  //   userId: '63899e8d4bd2e0bd159d0e10',
  //   userProfile:
  //     'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/119.jpg'
  // };

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setPhotos([]);
    async function fetchUser() {
      if (!userId) userId = '63899e8d4bd2e0bd159d0e10';
      const userData = await fetchUsers(userId);
      if (userData) {
        setUser(userData[0]);
      }
    }
    async function fetchPhotoData() {
      const photoData = await fetchUserPost(userId);
      if (Array.isArray(photoData) && photoData.length !== 0) {
        setPhotos(photoData);
      }
    }
    fetchUser();
    fetchPhotoData();
    console.log(userId);
  }, []);

  const orange = createTheme({
    status: {
      danger: '#e53e3e'
    },
    palette: {
      primary: {
        main: '#FFDD2B',
        darker: '#000'
      },
      neutral: {
        main: '#FFDD2B',
        contrastText: '#FFF'
      }
    }
  });
  const userPosts = photos;

  return (
    <div>
      <CreatePostModal
        closeModal={closePostModal}
        open={postModalIsOpen}
        setAlert={setAlert}
      />
      <div className="profileMain">
        <div className="profileUser">
          <Avatar
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
          </div>
        </div>
        <div className="profileStats">
          <div className="followerStats">
            <div>
              <img src={likeIcon} alt="like" />
              <p>348 Likes</p>
            </div>
            <div>
              <img src={followerIcon} alt="followers" />
              <p>2,390 Followers</p>
            </div>
            <div>
              <img src={followerIcon} alt="followers" />
              <p>Following</p>
            </div>
          </div>
          <div className="newpost">
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
          </div>
        </div>

        <div className="profileActivity">
          {!photos || photos.length === 0 ? (
            <h5>This user have not made any post yet</h5>
          ) : (
            <ImageList
              sx={{ width: 1100, height: 300, overflow: 'hidden' }}
              cols={3}
              gap={0}
            >
              {userPosts.map((item) => (
                <ImageListItem
                  // eslint-disable-next-line no-underscore-dangle
                  key={item._id}
                  sx={{ width: '95% !important', height: '90% !important' }}
                >
                  <img
                    src={`${item.photo}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.alt}
                    loading="lazy"
                  />
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
