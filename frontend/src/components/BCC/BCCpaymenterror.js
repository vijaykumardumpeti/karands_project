import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../authentication/PaymentFailure.css'; // Create a corresponding CSS file for styling

const CompanyPaymentFailure = () => {
  const navigate = useNavigate();
  const timeoutDuration = 5000; // Default timeout: 5 seconds

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [navigate, timeoutDuration]);

  const seconds = timeoutDuration / 1000; // Convert milliseconds to seconds

  return (
    <div className="payment-failure-container">
      <h1>Payment Failure</h1>
      <p>Unfortunately, your payment was not successful.</p>
      {/* <p>Error: {error}</p> */}
      <p>Please check the following:</p>
      <ul>
        <li>Ensure your payment information is correct.</li>
        <li>Check your internet connection.</li>
        <li>Contact your bank or card issuer for assistance.</li>
      </ul>
      <p>
        Redirecting in {seconds} {seconds === 1 ? 'second' : 'seconds'}. If not redirected, click{' '}
        <a href="/">here</a>.
      </p>
    </div>
  );
};

export default CompanyPaymentFailure;
