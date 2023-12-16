import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./objsurvey.css";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"





function ObjSurveyBox({ boxType }) {
  const navigate = useNavigate()
  const [details, setDetails] = useState({
    reason: "",
    connection: "",
    relation: "",
    savings: "",
    marketing: "",
  });


  useEffect(() => {
    console.log(localStorage.getItem("email"));
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/survey/${localStorage.getItem("email")}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.details !== null) {
          let val = res.data.details;

          setDetails((prevDetails) => ({
            ...prevDetails,
            reason: val.reason || "",
            connection: val.connection || "",
            relation: val.relation || "",
            savings: val.savings || "",
            marketing: val.marketing || "",
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);



  return (

    <div className="card " style={{ marginTop: "10px" }}>
      <div
        style={{ backgroundColor: "rgb(3, 104, 104)", color: "white", border: "none" }}
        className="card-header objSurveyBoxHeaderInCard">
        <b>Selected Object</b>
        {
          boxType !== 'viewprofile' && <span onClick={() => navigate("/objectSurvey")} style={{
            backgroundColor: "whitesmoke", color: "rgb(3, 104, 104)", fontSize: "100%"
          }} class="badge  rounded-pill"><MdModeEditOutline /></span>
        }
      </div>
      <div className="card-body" style={{ textAlign: 'start' }}>

        <div style={{

          paddingLeft: "10px"
        }}>

          {
            details.reason && <div className="mt-3 ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {details.reason}
              </label>
            </div>
          }
          {
            details.connection && <div className="mt-3 ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {details.connection}
              </label>
            </div>
          }

          {
            details.relation && <div className="mt-3 ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {details.relation}
              </label>
            </div>
          }
          {
            details.savings && <div className="mt-3 ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {details.savings}
              </label>
            </div>
          }
          {
            details.marketing && <div className="mt-3 ">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {details.marketing}
              </label>
            </div>
          }
        </div>
      </div>
    </div>

  )
}

export default ObjSurveyBox;
