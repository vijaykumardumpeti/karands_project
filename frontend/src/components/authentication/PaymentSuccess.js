import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you're using React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function SuccessPage() {
  // Use useParams to access route parameters
  const { transactionId } = useParams();

  const navigate = useNavigate();


  
  






  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-success fa-5x" />
          <h2 className="mt-3 text-success">Payment Successful</h2>
          <p>Thank you for your payment!</p>
          <p>Transaction ID: {transactionId?transactionId:""}</p>
          {/* You can add more details or customize the success page as needed */}

          <button className="btn btn-secondary"


                 onClick={()=>{navigate("/myAccount")}}
                                        >
                                          Go to My Accocunt
                                        </button>


        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
