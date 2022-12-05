import './App.css';
import React, { useState } from 'react';
import { Alert } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [postModalIsOpen, setPostModalOpen] = useState(false);
  const closePostModal = () => setPostModalOpen(false);
  const [alert, setAlert] = useState('');
  const alertTypes = {
    'created-post': {
      svt: 'success',
      content: 'Your post has been successfully created!'
    },
    'updated-post': {
      svt: 'success',
      content: 'Your post has been successfully updated!'
    },
    'submitting-post': { svt: 'info', content: 'Submitting post…' },
    error: {
      svt: 'error',
      content: 'An error occurred. Please try again later'
    }
  };
  return (
    <Router>
      <div>
        {alert in alertTypes && (
          <Alert
            severity={alertTypes[alert].svt}
            sx={{
              position: 'absolute',
              top: '10%',
              left: '40%',
              zIndex: 1000,
              margin: 'auto'
            }}
          >
            {alertTypes[alert].content}
          </Alert>
        )}
        <Navbar setPostModalOpen={setPostModalOpen} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <HomePage
              postModalIsOpen={postModalIsOpen}
              setPostModalOpen={setPostModalOpen}
              closePostModal={closePostModal}
              setAlert={setAlert}
            />
          </Route>
          <Route path="/profile/:userId?">
            <ProfilePage
              postModalIsOpen={postModalIsOpen}
              setPostModalOpen={setPostModalOpen}
              closePostModal={closePostModal}
              setAlert={setAlert}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
