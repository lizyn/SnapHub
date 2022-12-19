import axios from 'axios';

// Add the token to all HTTP request
const setHeaders =() =>{
  axios.defaults.headers.common['Authorization'] = (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null;
}

export default axios.create({
  baseURL: 'http://localhost:8080'
});

const baseURL = 'http://localhost:8080';
export const fetchFeeds = async (userId) => {
  try {
    setHeaders();
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
    setHeaders();
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
    setHeaders();
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
    setHeaders();
    const response = await axios.get(URL);
    return response.data.data;
  } catch (err) {
    return err;
  }
};

export const getAComment = async (commentId) => {
  try {
    setHeaders();
    const comment = await axios.get(`${baseURL}/comments/${commentId}`);
    return comment.data.data;
  } catch (err) {
    return err;
  }
};

export const fetchComments = async (postId) => {
  const commentList = [];
  try {
    setHeaders();
    const post = await axios.get(`${baseURL}/posts/${postId}`);
    const commentIds = post.data.data[0].comments;
    await commentIds.reduce(async (prev, id) => {
      await prev;
      const comment = await getAComment(id);
      commentList.push(comment[0]);
    }, Promise.resolve());
    return commentList;
  } catch (err) {
    return err;
  }
};

export const likePosts = async (postId, likeUpdate) => {
  try {
    setHeaders();
    const currentData = await axios.get(`${baseURL}/posts/${postId}`);
    // console.log({
    //   ...currentData.data.data[0],
    //   likes: likeUpdate
    // });
    const response = await axios.put(`${baseURL}/posts/${postId}`, {
      ...currentData.data.data[0],
      likes: likeUpdate
    });
    // console.log(response);
    return response;
  } catch (err) {
    // console.error(err);
    return err;
  }
};

export const createComment = async (userId, postId, text) => {
  try {
    setHeaders();
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
    setHeaders();
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
    setHeaders();
    const response = await axios.delete(`${baseURL}/comments/${commentId}`);
    return response.status;
  } catch (err) {
    return err;
  }
};

export const deletePost = async (postId) => {
  try {
    setHeaders();
    const response = await axios.delete(`${baseURL}/posts/${postId}`);
    return response.status;
  } catch (err) {
    return err;
  }
};

export const editComment = async (commentId, commentEdit) => {
  try {
    setHeaders();
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
