import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleReset = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/forgotpassword',
        {
          email
        },
        config
      );
      console.log(data);
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
      <form className="forgot-parent" onSubmit={handleReset}>
        <div className="card forgot-card">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="card-body">
            <h4 className="card-title">
              <b>Forgot Password</b>
            </h4>

            <p className="card-text">
              Please enter the email address you register your account with. We
              will send you reset password confirmation to this email
            </p>
            <p>Email : </p>
            <input
              type="email"
              class="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-dark text-white">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
