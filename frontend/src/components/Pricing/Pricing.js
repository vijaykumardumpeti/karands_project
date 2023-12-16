import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PricingPage.css";
import axios  from "axios";
export default function Pricing(props) {


  const navigate = useNavigate();
  const location=useLocation();
  const state=location.state


  const opendashboard = () => {
   axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/subscription/${state}`)
   .then(res=>{
    alert('payment successfull');

    navigate('/companypage')

   })
   .catch(err=>console.log(err))
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
              onClick={()=>{props.updatePricing()}}
            >
              Purchase Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}