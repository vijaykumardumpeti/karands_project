import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

import '../Pricing/PricingPage.css'






function PhonePayIntegration() {
  useEffect(() => {
    // Generate a unique transaction ID when the component mounts
  }, []);

  const handlePhonePe = async () => {
    try {
      // Make a request to your backend server


      const response = await axios.post(`http://${process.env.REACT_APP_IP_ADDRESS}/phonepe`,{userId:localStorage.getItem("id")});



      console.log("responce............",response)



      // Check if the response is successful
      if (response.status === 200) {
        // Extract the redirect URL from the JSON response
        const redirectURL = response.data;

        // Redirect the user to PhonePe's payment page
        window.location.href = redirectURL;
      } else {
        // Handle the error, e.g., show an error message to the user
        console.error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  return (
    <div className="container-fluid" style={{backgroundColor:"transparent"}}>
      <section className="section">

    <div className="pricing-container">
          <div className="pt-2 pricing-item">
            <h2 className="title-heading mb-3" style={{color: "rgb(3, 104, 104)"}}>Pricing Plan </h2>
            <h4 className="f-20">Annual Package</h4>
            <p className="mb-2">
              <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
              <b className="me-2">Unlimited</b>
              Job Posts
            </p>
            <p className="mb-2">
              <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
              <b>1&nbsp;</b>
              Year access
            </p>
            <p className="mb-2">
              <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
              Referal Earning
            </p>
            <p className="mb-2">
              <i className="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"></i>
              Access to Affiliating and Addvertising
            </p>
            <div className="pricing-plan mt-4 pt-2">
              <h4 className="text-muted">
                <span className="plan text-dark">&#8377; 1000</span>
              </h4>
              <i className="text-muted mb-0">Per Year</i>
            </div>
          </div>

          <div className="mt-2 pt-2">
            <button
              href="/"
              className="btn-rounded pricingbtn  w-75"

              onClick={()=>{handlePhonePe()}}

            >
              Purchase Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


export default PhonePayIntegration;
