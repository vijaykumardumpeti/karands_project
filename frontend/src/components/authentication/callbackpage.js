import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you're using React Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function CallbackPage() {
  const location = useLocation();

  useEffect(() => {
    // This useEffect hook will run when the component mounts
    // You can access query parameters or data from the callback URL here
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionId'); // Replace with your actual parameter name

    // Process the transaction data as needed
    // You can make API calls, update state, or trigger actions here

    // Example: Log the transaction ID
    console.log('Transaction ID:', transactionId);

    // Replace this with your desired logic
    // For example, you can update the UI to display the transaction status
  }, [location.search]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2>Callback Page</h2>
          <p>This page handles the callback from the payment gateway.</p>
          {/* You can add more content or UI elements as needed */}
        </div>
      </div>
    </div>
  );
}

export default CallbackPage;
