import React, { useState } from 'react';
import './login.css';
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='body1'>
      <div className={`bodylogin ${isLogin ? '' : 'shift-left'}`}>
        {isLogin ? (
          <div className='line'>
            <h1>Login</h1>
            <div className='textbox'>
              <label><input placeholder='username'/></label><FaUser className='icon' />
            </div>
            <div className='textbox'>
              <label><input placeholder='password' /></label><FaLock className='icon' />
            </div>
            <div className='checkbox'>  
              <label>
                <input type='checkbox' /> Remember me
              </label>
              <a href='#' className='forgot' style={{ marginLeft: 'auto' }}>Forgot Password</a>
            </div>
            <button className='buttonlogin' type='submit'>Login</button>
            <div className='register'>
              <p>Don't have an account? <a href='#' onClick={() => setIsLogin(false)}>Register</a></p>
            </div>
          </div>
        ) : (
          <div className='line'>
            <h1>Register</h1>
            <div className='textbox'>
              <label><input placeholder='username'/></label><FaUser className='icon' />
            </div>
            <div className='textbox'>
              <label><input placeholder='email' /></label><FaUser className='icon' />
            </div>
            <div className='textbox'>
              <label><input placeholder='password' /></label><FaLock className='icon' />
            </div>
            <button className='buttonlogin' type='submit'>Register</button>
            <div className='register'>
              <p>Already have an account? <a href='#' onClick={() => setIsLogin(true)}>Login</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
