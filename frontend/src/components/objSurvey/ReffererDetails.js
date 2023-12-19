import React, { useState } from "react";
import ReferalCode from "./ReferalCode";
import "./ReffererDetails.css";
import logo from "../../../images/logo2.png";
import Header from "./Header";
import { useLocation } from "react-router-dom";

export default function ReffererDetails() {
  const location=useLocation()
  const [state, setState]=useState(location.state)
  return (
    <div>

      <ReferalCode />
      <div className="container mt-4">
        <div className=" mt-5">
          <div className="form p-4 mt-4">
            <div>
              <img src={logo} alt="img"/>
            </div>
            <div>
              <dl>
                <dt className="mb-2">
                  <h6>{state.name}</h6>
                </dt>
                <dt className="mb-2">
                  <h6>{state.email}</h6>
                </dt>
                <dt className="mb-2">
                  <h6>{state.mobilenumber}</h6>
                </dt>
              </dl>
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="check mt-3">
        Confirm   <input className="ms-2" type="checkbox" />
      <button className="btn btn-primary ms-4">Submit</button>
      </div>
    </div>
  );
}
