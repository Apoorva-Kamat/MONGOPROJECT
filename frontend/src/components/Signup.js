import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [signupSuccess, setSignupSuccess] = useState(false); // State for success message
  const navigate = useNavigate(); // Correct way to use useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setSignupSuccess(true); // Set signup success state to true
      setTimeout(() => {
        navigate('/login'); // Use navigate function to redirect
      }, 2000); // Redirect to login after 2 seconds
    } catch (error) {
      console.error('Error registering user');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {signupSuccess && <p>Signup successful! Redirecting to login page...</p>}
    </div>
  );
};

export default Signup;
