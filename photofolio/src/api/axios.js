import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080'
});

const baseURL = 'http://localhost:8080';
export const fetchFeeds = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}/feed`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const fetchPhotos = async (userId) => {
  let urlTail = '/photos';
  if (userId) {
    urlTail = `/user/${userId}/photos`;
  }
  try {
    const response = await axios.get(`${baseURL}${urlTail}`);
    return response.data.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchUsers = async (userId) => {
  let URL = `${baseURL}/users/`;
  if (userId) {
    URL = `${baseURL}/users/${userId}`;
  }
  try {
    const response = await axios.get(URL);
    return response.data.data;
    // the data is stored in the mockData
    // field of the response
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchUserPost = async (userId) => {
  let URL = `${baseURL}/users/`;
  if (userId) {
    URL = `${baseURL}/users/${userId}/posts`;
  }
  try {
    const response = await axios.get(URL);
    return response.data.data;
  } catch (err) {
    return err;
  }
};

export const getAComment = async (commentId) => {
  try {
    const comment = await axios.get(`${baseURL}/comments/${commentId}`);
    return comment.data.data;
  } catch (err) {
    return err;
  }
};

export const fetchComments = async (postId) => {
  // const commentList = [];
  try {
    const commentList = await axios.get(`${baseURL}/posts/${postId}/comments`);
    return commentList.data.data;
  } catch (err) {
    return err;
  }
};

export const likePosts = async (postId) => {
  const userId = '63899e8d4bd2e0bd159d0e10';
  try {
    const response = await axios.post(`${baseURL}/posts/${postId}/like`, {
      userId
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const likeStatus = async (postId) => {
  const userId = '63899e8d4bd2e0bd159d0e10';
  try {
    const response = await axios.post(`${baseURL}/posts/${postId}/liked`, {
      userId
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const createComment = async (userId, postId, text) => {
  try {
    const response = await axios.post(`${baseURL}/comments/`, {
      userId,
      postId,
      text
    });
    return response.data.data;
  } catch (err) {
    return err;
  }
};

export const addCommentToPost = async (userId, postId, text) => {
  try {
    const response = await axios.post(`${baseURL}/comments`, {
      id: 0,
      userId,
      postId,
      text
    });
    return response.data.data;
  } catch (err) {
    return err;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${baseURL}/comments/${commentId}`);
    return response.status;
  } catch (err) {
    return err;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${baseURL}/posts/${postId}`);
    return response.status;
  } catch (err) {
    return err;
  }
};

export const editComment = async (commentId, commentEdit) => {
  try {
    const currentData = await axios.get(`${baseURL}/comments/${commentId}`);
    const response = await axios.put(`${baseURL}/comments/${commentId}`, {
      ...currentData.data,
      text: commentEdit
    });
    return response.status;
  } catch (err) {
    return err;
  }
};

export const register = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}/users`, newUser);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
