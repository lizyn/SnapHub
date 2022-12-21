import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FeedList from './FeedList';
import CreatePostModal from './CreatePostModal';
// import searchIcon from '../icons/Search.svg';
import NewIcon from '../icons/New.svg';
import UserList from './UserList';
import { fetchCurUser } from '../api/axios';

function HomePage(props) {
  HomePage.propTypes = {
    closePostModal: PropTypes.func.isRequired,
    postModalIsOpen: PropTypes.bool.isRequired,
    setPostModalOpen: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };
  const { closePostModal, postModalIsOpen, setPostModalOpen, setAlert } = props;
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
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    avatar: '/'
  });

  useEffect(() => {
    async function getCurUser() {
      const token = sessionStorage.getItem('user');
      const userData = await fetchCurUser(token);
      setUser(userData[0]);
    }
    getCurUser();
  }, []);

  return (
    <div className="flex1">
      <CreatePostModal
        closeModal={closePostModal}
        open={postModalIsOpen}
        setAlert={setAlert}
      />
      <div className="main">
        <div className="users-section">
          <div className="user">
            <Link to="/profile">
              <Avatar
                alt="me"
                className="Avatar"
                src={user.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Link>
            <h3>
              {user.firstName || 'User'} {user.lastName || '42'}
            </h3>
          </div>
          <div className="recommendations">
            <div style={{ marginBottom: '.5em' }}>Recommended for you</div>
            <div
              style={{
                height: '40vh',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column'
                // border: '1px solid silver',
                // borderRadius: '3px'
              }}
            >
              <UserList />
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="right-top">
            {/* <div className="searchbar">
              <input
                type="text"
                placeholder="Tag, user, etc..."
                name="search"
              />
              <button type="submit">
                <img src={searchIcon} alt="search" /> Search{' '}
              </button>
            </div> */}
            <div
              className="newpost"
              style={{
                margin: 'auto'
              }}
            >
              <ThemeProvider theme={orange}>
                <Fab
                  id="newposttest"
                  variant="extended"
                  color="primary"
                  sx={{ zIndex: 998 }}
                  onClick={() => setPostModalOpen((o) => !o)}
                >
                  <img src={NewIcon} className="newPostSign" alt="new" />
                  New Post
                </Fab>
              </ThemeProvider>
            </div>
          </div>

          <div className="feed">
            {/* eslint-disable-next-line no-underscore-dangle */}
            <FeedList curUserId={user._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
