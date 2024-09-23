import React, { useState } from 'react';
import { changePassword } from '../Services/authService';

const ChangePassword = ({ token }) => {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(formData, token);
      alert('Password changed successfully!');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" name="oldPassword" onChange={handleChange} placeholder="Old Password" required />
      <input type="password" name="newPassword" onChange={handleChange} placeholder="New Password" required />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
