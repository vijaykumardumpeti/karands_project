import React, { useEffect, useRef } from 'react';

function SessionTimeout() {
  const sessionTimeout = useRef(null);





//   const resetSessionTimeout = () => {
//     clearTimeout(sessionTimeout.current); // Clear the existing timer
//     sessionTimeout.current = setTimeout(logout, 15 * 60 * 1000); // 15 minutes (adjust as needed)
//   };

//   const logout = () => {
//     clearTimeout(sessionTimeout.current); // Clear the session timeout
//     // Clear user session (e.g., remove tokens, clear local storage)
//     // Redirect to the login page
//     window.location.href = '/'; // Replace with your actual login route



//   };





  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeout.current); // Clear the existing timer
    sessionTimeout.current = setTimeout(logout, 1 * 60 * 1000); // 1 minute (adjust as needed)
  };
  
  const logout = () => {
    clearTimeout(sessionTimeout.current); // Clear the session timeout
    // Clear user session (e.g., remove tokens, clear local storage)



alert("session timeout.......")

    localStorage.clear(); // Clear all items in local storage
    // Redirect to the login page
    window.location.href = '/'; // Replace with your actual login route
  };
  










  useEffect(() => {
    // Set up session timeout when the component mounts
    resetSessionTimeout();

    // Attach event listeners to reset the session timeout
    document.addEventListener('mousemove', resetSessionTimeout);
    document.addEventListener('keydown', resetSessionTimeout);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousemove', resetSessionTimeout);
      document.removeEventListener('keydown', resetSessionTimeout);

      // Clear the session timeout when the component unmounts
      clearTimeout(sessionTimeout.current);
    };
  }, []);

  return (
    <div>
      {/* Your app content goes here */}
    </div>
  );
}

export default SessionTimeout;
