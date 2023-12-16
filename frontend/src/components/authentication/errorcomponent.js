// ErrorComponent.js
import React from 'react';
import './ErrorComponent.css'; // Import the CSS file for styling

const ErrorComponent = ({ message }) => {
  return (
    <div className="error-container">
      <img src="/error.png" alt="Error Icon" className="error-icon" />
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorComponent;
