import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you're using React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Bccpaymentsucess() {
  // Use useParams to access route parameters
  const { transactionId } = useParams();

  const navigate = useNavigate();



  const timeoutDuration = 5000; // Default timeout: 5 seconds

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/adminlogin');
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [navigate, timeoutDuration]);

  const seconds = timeoutDuration / 1000; // Convert milliseconds to seconds


// pledse check the mail for credentials email,otp     



  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-success fa-5x" />
          <h2 className="mt-3 text-success">Payment Successful</h2>
          <p>Thank you for your payment!</p>
          <p>
        Redirecting in {seconds} {seconds === 1 ? 'second' : 'seconds'}. to login page If not redirected, click  <a href="/admindashboard">here</a>.
       
      </p>

        </div>
      </div>
    </div>
  );
}

export default Bccpaymentsucess;
