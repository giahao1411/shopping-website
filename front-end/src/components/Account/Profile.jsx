import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/Account/Profile.css"; 

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        ...storedUser,
        password: '', // Don't show password
      });
    } else {
      navigate('/account/login');
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data to send to the backend
      const updatedUser = { ...user };
      if (updatedUser.newPassword) {
        updatedUser.password = updatedUser.newPassword;
      }

      // Send update request to the server
      const response = await axios.put('/api/users/update', updatedUser);

      // Success message
      setSuccessMessage('Your profile has been updated successfully!');
      setError('');
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      setError('An error occurred while updating your profile.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
