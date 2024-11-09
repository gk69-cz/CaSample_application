import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Hide splash screen after 3 seconds
  }, []);

  return isLoading ? (
    <div className="splash-screen">
      <h1>Blog Application</h1><br/>
      <p>Loading...</p>
    </div>
  ) : null;
};

export default SplashScreen;
