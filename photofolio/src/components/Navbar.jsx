/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import homeIcon from '../icons/Home.svg';
import newIcon from '../icons/New.svg';
import profileIcon from '../icons/Person.svg';
import logoutIcon from '../icons/Arrow_Export.svg';

function Navbar(props) {
  Navbar.propTypes = {
    setPostModalOpen: PropTypes.func.isRequired
  };

  const handleLogout = () => {
    // eslint-disable-next-line no-undef
    sessionStorage.removeItem('app-token');

    // eslint-disable-next-line no-undef
    window.location.replace('/login');
  };

  const { setPostModalOpen } = props;

  return (
    <div>
      <nav className="Navbar">
        <ul>
          <li>
            <button
              type="submit"
              to="/logout"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="logout" />
              Log Out
            </button>
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
  );
}

export default Navbar;
