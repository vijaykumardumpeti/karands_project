import React from 'react';
import './PaymentFailure.css'; // Create a corresponding CSS file for styling

const PaymentFailure = ({ error }) => {



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
      <p>Feel free to <a href="/myAccount">return to the myAccount</a> and try again.</p>
    </div>
  );
};

export default PaymentFailure;
