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

export const fetchComments = async (postId) => {
  try {
    // const response = await axios.get(`${baseURL}/posts/${postId}/comments`);
    const response = await axios.get(`${baseURL}/posts/${postId}`);
    const commentIds = response.data.data[0].comments;
    // console.log(response);
    // console.log(commentIds);
    const comments = [];
    // return response;
    await Promise.all(
      commentIds.map(async (id) => {
        await axios
          .get(`${baseURL}/comments/${id}`)
          .then((data) => comments.push(data.data.data[0]));
      })
    );
    // const comments = await commentIds.map(async (id) =>
    //   axios.get(`${baseURL}/comments/${id}`).then((data) => data)
    // );
    // console.log(comments);
    return comments;
    // return response.data.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const likePosts = async (postId, likeUpdate) => {
  try {
    const currentData = await axios.get(`${baseURL}/posts/${postId}`);
    const response = await axios.put(`${baseURL}/posts/${postId}`, {
      ...currentData.data,
      likes: likeUpdate
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const createComment = async (userId, postID, text) => {
  try {
    const response = await axios.post(`${baseURL}/comments/`, {
      userId,
      postID,
      text
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
  console.log(newUser);
  try {
    const response = await axios.post(`${baseURL}/users`, newUser);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
