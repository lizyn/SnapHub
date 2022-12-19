import React, { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import './Register.css';
import { register } from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fstName, setFstName] = useState('');
  const [lstName, setLstName] = useState('');

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, fstName, lstName, matchPwd]);

  const toLogin = () => {
    window.location.replace("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const newUser = { username: user, password: pwd, firstname: fstName, lastname: lstName };
      const response = await register(newUser);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-main">
      <Router>
        {success ? (
          <section>
            <h1>Success!</h1>
            <div onClick={toLogin}>
              Login
            </div>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? 'hide' : 'invalid'}
                />
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="userid"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </label>
              <p
                id="userid"
                className={
                  userFocus && user && !validName ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              
              <label htmlFor="firstname">
                Firstname:
                <input
                  type="text"
                  id="firstname"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setFstName(e.target.value)}
                  value={fstName}
                  required
                  aria-describedby="userid"
                />
              </label>

              <label htmlFor="lastname">
                Lastname:
                <input
                  type="text"
                  id="lastname"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setLstName(e.target.value)}
                  value={lstName}
                  required
                  aria-describedby="userid"
                />
              </label>

              <label htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? 'hide' : 'invalid'}
                />
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </label>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{' '}
                <span aria-label="exclamation mark">!</span>{' '}
                <span aria-label="at symbol">@</span>{' '}
                <span aria-label="hashtag">#</span>{' '}
                <span aria-label="dollar sign">$</span>{' '}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                />
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </label>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                You should match the password.
              </p>

              <button
                type="submit"
                disabled={!!(!validName || !validPwd || !validMatch)}
              >
                Sign Up
              </button>
            </form>
            <p>
              Already have an account?
              <br />
              <span className="line">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </section>
        )}
      </Router>
    </div>
  );
}

export default Register;
