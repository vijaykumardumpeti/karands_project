import React from "react";
import { Fragment } from "react";


const Card = ({ title, buttonText, buttonOnClick, role, text }) => {




  return (
    <div
      style={{
        border: "1px solid rgb(3, 104, 104)",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "20px",
        color: "gray",
        width: "350px",
        alignItems: "stretch"
      }}
      className="card"
    >
      <div
        style={{
          marginTop: "10px",
        }}
        className="card-content"
      >
        <h2
          style={{
            fontSize: "18px",
            marginBottom: "10px",
            
            fontWeight:"bold",
            color:"#333",
          }}
        >
          {title}
        </h2>

        {role == "ichp" ? <Fragment >

          <ul className="mt-3" style={{ textAlign: "start", listStyleType:"circle" }} >
            <li className="mt-3">Become INDIVIDUAL CONTRIBUTOR HUMAN POTENTIAL with Karandszone</li>
            <li className="mt-3"> Proffessionals Only With Human Resource Background</li>
            <li className="mt-3"> Placement Consultants And Recruiters</li>
            <li className="mt-3"> All Featers Of Individual Users (IU)</li>
            <li className="mt-3"> Earn By Verifying Documents (BGV)</li>
            <li className="mt-3"> Earn By Supporting Drive-in Jobs</li>
            <li className="mt-3"> Earn Passive Income Without Disturbing Active Income</li>

          </ul>
        </Fragment> :
          <ul className="mt-3" style={{ listStyleType:"circle", textAlign: "start" }}>
            <li className="mt-3"> Build Your Web Profile</li>
            <li className="mt-3"> Get Verified</li>
            <li className="mt-3"> Search Job</li>
            <li className="mt-3"> Earn Via Referral</li>
            <li className="mt-3"> Earn by Referring Jobs</li>
            <li className="mt-3"> Build Network</li>
            <li className="mt-3"> Become Affiliate</li>
            <li className="mt-3"> Interacting With Other Users And Build Professional Network</li>
          </ul>

        }

        <button
          style={{
            backgroundColor: "rgb(3, 104, 104)", color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 12px",
            fontSize: "14px",
            width: "60%",
            cursor: "pointer",
          }}
          onClick={() => buttonOnClick(role)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
