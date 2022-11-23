import React from 'react';
import PropTypes from 'prop-types';
import {
  // BrowserRouter as Router,
  // Switch,
  Link
  // Route,
  // Redirect
} from 'react-router-dom';
import './Navbar.css';
// import Button from '@mui/material/Button';
import homeIcon from '../icons/Home.svg';
import newIcon from '../icons/New.svg';
import profileIcon from '../icons/Person.svg';
import logoutIcon from '../icons/Arrow_Export.svg';
// import HomePage from './HomePage';
// import ProfilePage from './ProfilePage';
// import Login from './Login';
// import Register from './Register';

function Navbar(props) {
  Navbar.propTypes = {
    // closePostModal: PropTypes.func.isRequired,
    // postModalIsOpen: PropTypes.bool.isRequired,
    setPostModalOpen: PropTypes.func.isRequired
    // setAlert: PropTypes.func.isRequired
  };

  const {
    // closePostModal, postModalIsOpen,
    setPostModalOpen
    // setAlert
  } = props;

  return (
    // <Router>
    <div>
      <nav className="Navbar">
        <ul>
          <li>
            <Link
              to="/logout"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={logoutIcon} alt="logout" />
              Log Out
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={profileIcon} alt="profile" />
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => setPostModalOpen((o) => !o)}
              type="button"
              style={{ all: 'unset', cursor: 'pointer' }}
            >
              <img src={newIcon} alt="new" />
              New Post
            </button>
          </li>
          <li>
            <Link
              to="/home"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={homeIcon} alt="home" />
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    // </Router>
  );
}

export default Navbar;
