import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-text">Welcome to Quiz App</h2>
      <p className="description-text">
        This is a quiz application where you can test your knowledge in various programming languages.
      </p>
      <div className="button-container">
        <Link to="/login" className="button-link">
          <button className="action-button">Login</button>
        </Link>
        <Link to="/signup" className="button-link">
          <button className="action-button">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
