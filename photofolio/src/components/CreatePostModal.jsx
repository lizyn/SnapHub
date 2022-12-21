import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import {
  TextField,
  Button,
  Box,
  Grid,
  Chip,
  Divider,
  CardMedia
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../api/axios';
import UserRow from './UserRow';
import { rootUrl } from './Config';
import uploadArrow from '../images/uploadArrow.png';
// import { uploadFile } from '../api/s3manips';

const theme = createTheme({
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

export default function CreatePostModal(props) {
  CreatePostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    curUserFirstName: PropTypes.string.isRequired,
    curUserAvatar: PropTypes.string.isRequired,
    curUserId: PropTypes.string.isRequired
  };

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const [fileType, setFileType] = useState('img');

  const {
    open,
    closeModal,
    setAlert,
    curUserFirstName,
    curUserAvatar,
    curUserId
  } = props;

  const user = {
    name: curUserFirstName,
    userId: curUserId,
    avatar: curUserAvatar
  };
  // console.log(user);

  useEffect(() => {}, [curUserId]);

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    // console.log(newFile);
    setFile(newFile);
    if (newFile.type.startsWith('image')) {
      setFileType('img');
      setSubmit(true);
    } else {
      setFileType('video');
      setSubmit(true);
    }
    // console.log(URL.createObjectURL(newFile));
  };

  const uploadPost = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const postParams = {
      title,
      userId: user.userId
      // photo: file
    };
    Object.keys(postParams).forEach((key) => {
      formData.append(key, postParams[key]);
    });
    try {
      // console.log(file);
      // console.log(formData);
      const newPost = await axios.post(`${rootUrl}/posts/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return newPost;
    } catch (err) {
      // console.log(err.message);
      return err;
      // console.log(err);
    }
  };

  const handleSubmit = async () => {
    setAlert('submitting-post');
    try {
      const res = await uploadPost();
      if (res instanceof Error) throw res;
      closeModal();
      setTitle('');
      setCaption('');
      setFile();
      setAlert('created-post');
    } catch (err) {
      setAlert('error');
      // console.log(err);
    } finally {
      setTimeout(() => {
        window.location.replace('/profile');
        setAlert('');
      }, 2000);
    }
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={false} sm={4} md={7}>
            <Box
              justifyContent="center"
              sx={{
                mb: 8,
                mt: 2,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                height: '90%'
              }}
            >
              <div className="modal-header">creating a post</div>
              <Box
                textAlign="center"
                alignItems="center"
                justifyContent="center"
                sx={{
                  my: 6,
                  mx: 2,
                  margin: 'auto',
                  display: 'flex',
                  maxHeight: '70%'
                }}
              >
                {
                  file && (
                    <CardMedia
                      component={fileType}
                      controls={fileType === 'video'}
                      src={URL.createObjectURL(file)}
                      style={{
                        height: '100%',
                        maxWidth: '100%',
                        borderRadius: '3px'
                      }}
                    />
                  )
                  // <img src={file} style={{ height: '100%', maxWidth: '100%', borderRadius: '3px' }} />
                }
                {!file && (
                  <Button variant="outlined" component="label">
                    <input
                      type="file"
                      name="file1"
                      id="file1"
                      accept="image/*,video/mp4,video/x-m4v,video/*"
                      hidden
                      onChange={handleFileChange}
                    />
                    <img
                      src={uploadArrow}
                      alt="upload arrow"
                      width="30px"
                      style={{ margin: 'auto', display: 'flex' }}
                    />
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex' }} justifyContent="center">
                <Button
                  variant="contained"
                  component="label"
                  sx={{ float: 'bottom' }}
                >
                  Upload A File
                  <input
                    type="file"
                    name="file2"
                    id="file2"
                    accept="image/*,video/mp4,video/x-m4v,video/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            sx={{ borderLeft: 1, borderColor: '#D2D2D2' }}
          >
            <Button
              onClick={closeModal}
              sx={{ float: 'right', fontSize: '24px' }}
            >
              &times;
            </Button>
            <Box
              sx={{
                mt: 8,
                mb: 3,
                mx: 4,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <UserRow
                name={user.name}
                userId={user.userId}
                ring
                avatar={user.avatar}
              />
              <Box sx={{ mx: 2 }}>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <TextField
                    // margin="normal"
                    fullWidth
                    id="post-title"
                    label="Title…"
                    name="title"
                    autoFocus
                    size="small"
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    minRows={8}
                    maxRows={12}
                    name="caption"
                    label="Caption…"
                    id="post-caption"
                    size="small"
                    variant="standard"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </Box>
                <Box sx={{ zoom: '80%', mt: 1, mb: 8 }}>
                  <TextField
                    id="tags"
                    label="Add Tags…"
                    size="small"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box>
                    <Chip label="#Beach" />
                    <Chip label="#EmbraceNature" />
                  </Box>
                </Box>
                <Divider sx={{ bgcolor: '#D2D2D2' }} />
              </Box>
              <Box sx={{ display: 'flex' }} justifyContent="center">
                <Button
                  id="submit"
                  type="submit"
                  variant="contained"
                  disabled={!submit}
                  onClick={handleSubmit}
                  sx={{ mt: 2, px: 5 }}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Popup>
  );
}
