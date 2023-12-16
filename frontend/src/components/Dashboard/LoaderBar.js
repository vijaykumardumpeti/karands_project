import React from 'react';
import './Loader.css';

const LoaderBar = ({ value }) => {
  return (
    <div className="loader-container">

      <div
        className="loader-bar"
        style={{ width: `${value}0%` }}
        data-value={value}
      >
        {value}
      </div>
    </div>
  );
};

export default LoaderBar;
