import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FeedList from './FeedList';
import CreatePostModal from './CreatePostModal';
import searchIcon from '../icons/Search.svg';
import NewIcon from '../icons/New.svg';
import UserList from './UserList';
import { fetchUsers } from '../api/axios';

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
  const userId = '63899e8d4bd2e0bd159d0e10';
  const [user, setUser] = useState({
    firstName: 'Efren',
    lastName: 'McDermott',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/733.jpg'
  });
  useEffect(() => {
    async function fetchUserData() {
      const userData = await fetchUsers(userId);
      setUser(userData[0]);
    }
    fetchUserData();
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
            <UserList />
          </div>
        </div>

        <div className="right-section">
          <div className="right-top">
            <div className="searchbar">
              <input
                type="text"
                placeholder="Tag, user, etc..."
                name="search"
              />
              <button type="submit">
                <img src={searchIcon} alt="search" /> Search{' '}
              </button>
            </div>
            <div className="newpost">
              <ThemeProvider theme={orange}>
                <Fab
                  variant="extended"
                  color="primary"
                  sx={{ mb: 20, zIndex: 998 }}
                  onClick={() => setPostModalOpen((o) => !o)}
                >
                  <img src={NewIcon} className="newPostSign" alt="new" />
                  New Post
                </Fab>
              </ThemeProvider>
            </div>
          </div>

          <div className="feed">
            <FeedList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
