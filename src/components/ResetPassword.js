import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

export default function ResetPassword({ match }) {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const changePassword = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/auth/resetpassword/${
          match.params.resetToken
        }`,
        {
          password
        },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <>
      <form className="reset-parent" onSubmit={changePassword}>
        <div className="card reset-card">
          {error && <div className="error">{error}</div>}
          {success && (
            <div className="success">
              {success}
              <Link to="/login">LOGIN</Link>
            </div>
          )}
          <div className="card-body">
            <h4 className="card-title">
              <b>Enter New Password</b>
            </h4>
            <p>New Password : </p>
            <input
              type="text"
              class="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />

            {/* CONFIRM PASSWORD */}
            <p>Confirm New Password : </p>
            <input
              type="text"
              class="form-control"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <br />

            <div className="text-center">
              <button type="submit" className="btn btn-dark text-white">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
