import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container flex flex-col gap-2">
      <div className="loader"></div>
      <div>Generating Email...</div>
    </div>
  );
};

export default Loader;
