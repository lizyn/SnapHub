import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { rootUrl } from './Config';
import axios from '../api/axios';

function UserRow(props) {
  UserRow.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    ring: PropTypes.bool,
    showFollow: PropTypes.bool,
    userId: PropTypes.string.isRequired
  };

  UserRow.defaultProps = {
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1185.jpg',
    ring: false,
    showFollow: false
  };
  const { avatar, name, ring, showFollow, userId } = props;
  const [followBtn, setFollowBtn] = useState('outlined');
  const [followed, setFollowed] = useState(false);

  const currentUserId = '638682d7b47712e0d260ce8b';
  const toggleFollow = async (userIdToFollow, isFollow) => {
    const params = {
      follower: currentUserId,
      following: userIdToFollow
    };
    try {
      let response;
      if (isFollow) {
        response = await axios.post(`${rootUrl}/follows`, params);
        // console.log(response);
      } else {
        response = await axios.delete(`${rootUrl}/follows`, {
          data: params
        });
      }
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
  const handleFollowBtnClick = () => {
    if (followed) {
      toggleFollow(userId, false);
      setFollowBtn('outlined');
    } else {
      toggleFollow(userId, true);
      setFollowBtn('contained');
    }
    setFollowed((o) => !o);
  };

  return (
    <div className="user-row">
      <div className="container">
        {ring && (
          <Link to={`/profile/${userId}`}>
            <img
              className="profile-pic profile-pic-ring"
              src={avatar}
              alt={name}
            />
          </Link>
        )}
        {!ring && (
          <Link to={`/profile/${userId}`}>
            <img className="profile-pic" src={avatar} alt={name} />
          </Link>
        )}
        <div className="username">{name}</div>
        {showFollow && (
          <Button
            variant={followBtn}
            size="small"
            sx={{ marginLeft: 'auto' }}
            onClick={handleFollowBtnClick}
          >
            {followed && 'followed'} {!followed && 'follow'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserRow;
