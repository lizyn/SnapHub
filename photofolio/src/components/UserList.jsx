/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserRow from './UserRow';
import defaultAvatar from '../images/defaultAvatar.png';
import { rootUrl } from './Config';

function UserList() {
  const currentUserId = '63899e8d4bd2e0bd159d0e10';
  const numUser = 6;
  const [users, setUsers] = useState([]);

  const genDummyUsers = (num) => {
    const dummyUsers = [];
    for (let index = 0; index < num; index += 1) {
      dummyUsers.push({
        avatar: defaultAvatar,
        firstName: '',
        lastName: '',
        _id: `${10000 + index}`,
        showFollow: false
      });
    }
    return dummyUsers;
  };

  const getUsers = async (num) => {
    try {
      const response = await axios.get(
        `${rootUrl}/follower-suggestions/${currentUserId}?limit=${numUser}`
      );
      const usersData = response.data;
      const dummyUsers = genDummyUsers(num - usersData.length);
      setUsers([...usersData, ...dummyUsers]);
      return users;
    } catch (err) {
      setUsers(genDummyUsers(num));
      return err;
    }
  };

  useEffect(() => setUsers(genDummyUsers(numUser)), []);
  useEffect(() => {
    getUsers(6);
    return () => {
      setUsers([genDummyUsers(numUser)]);
    };
  }, []);
  return users.map((user) => (
    // eslint-disable-next-line no-underscore-dangle
    <div className="user-row-card" key={user._id}>
      <UserRow
        avatar={user.avatar}
        name={`${user.firstName || user.username || ''} ${user.lastName || ''}`}
        // eslint-disable-next-line no-underscore-dangle
        userId={user._id}
        showFollow={user.showFollow !== false}
      />
    </div>
  ));
}

export default UserList;
