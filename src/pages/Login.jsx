import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { loginUser } from '../tools/actions/userActions';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      const storedUserData = localStorage.getItem('userData');
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await dispatch(loginUser({ email, password }));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(user));
      setUserData(user); 
      navigate('/');
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(error.message);
      alert("This user doesn't registered");
    }
  };

  return (
    <div className='loginSection'>
      <div className="sec">

        <div className="container">
          <div className="title">
            <h1>Sign In</h1>
          </div>
          <div className="formSection">
            <form>
              <div className="inpSec">
                <label>Email</label>
                <input type="email" placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="inpSec">
                <label>Password</label>
                <div className="pass">
                  <input type="password" placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button><FaEye /></button>
                </div>
              </div>
              <div className="inpSec">
                <div className="links">
                  <Link>Forgot Password?</Link>
                  <Link to='/register'>Sign Up</Link>
                </div>
              </div>
              <div className="inpSec">
                <button id='loginBtn' onClick={handleLogin}>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login