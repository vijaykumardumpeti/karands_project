import React, { useEffect, useState, Fragment } from "react";
import "./objsurvey.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Details from "../Dashboard/Details";
import Sidebar from "../Dashboard/Sidebar";

function ObjSurvey() {

  const navigate = useNavigate();
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
          if (val.reason !== "") {
            setPriority((priority) => [...priority, "reason"]);
          }
          if (val.connection !== "") {
            setPriority((priority) => [...priority, "connection"]);
          }
          if (val.relation !== "") {
            setPriority((priority) => [...priority, "relation"]);
          }
          if (val.savings !== "") {
            setPriority((priority) => [...priority, "savings"]);
          }
          if (val.marketing !== "") {
            setPriority((priority) => [...priority, "marketing"]);
          }
          setDetails((details) => ({
            ...details,
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
  
  const [priority, setPriority] = useState([]);
  
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");


  const setterFunction={
    headers: {
      token: token,
      id: id,
    }
  }


  function refresh(){
  setDetails(
    {
      reason: "",
      connection: "",
      relation: "",
      savings: "",
      marketing: "",
    }
  )
  }



  
 async function submitForm() {

const data= {
  email: localStorage.getItem("email"),
  reason: details.reason,
  connection: details.connection,
  relation: details.relation,
  savings: details.savings,
  marketing: details.marketing,
  id:localStorage.getItem("id")
}

console.log(data)


   await axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/karands/survey`,data)
      .then((res) => {
        console.log(res);
        const sendStateVal = {};
        let newPriority=Array.from(new Set([...priority]));
        console.log("----------");
        console.log(newPriority);
        sendStateVal.priority = newPriority;
        sendStateVal.currentPage = 1;
        sendStateVal.length = newPriority.length - 1;
        if (details.reason !== "") {
          sendStateVal.reason = {};

          sendStateVal.reason.value = details.reason;
        }
        if (details.connection !== "") {
          sendStateVal.connection = {};
          sendStateVal.connection.value = details.connection;
        }
        if (details.relation !== "") {
          sendStateVal.relation = {};
          sendStateVal.relation.value = details.relation;
        }
        if (details.savings !== "") {
          sendStateVal.savings = {};
          sendStateVal.savings.value = details.savings;
        }
        if (details.marketing !== "") {
          sendStateVal.marketing = {};
          sendStateVal.marketing.value = details.marketing;
        }
        console.log(sendStateVal.priority);

        navigate("/survey", { state: sendStateVal });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="" >
    <div className="row flex-nowrap" style={{width:"100%"}}>
      <Sidebar />
      <div className="col container" style={{ maxWidth: "80%" }}>
    <Details/>
        <hr />
        <Fragment>
    
    <div>
      <h3 className="mt-4" style={{color:"white"}}>You are here for ?</h3>
      <p style={{color:"white"}}>If you click wrong and you want to change the selection ,Please click here  <span className="btn" onClick={()=>refresh()} style={{color:"rgb(3, 104, 104)", textDecoration:"underline"}}> Refresh</span></p>
      <div
        style={{
          width: "100%",
          height: "48vh",
          margin: "10px 0px",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
          }}
        >
          <div className="reason">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Looking for job"
              value="Looking for job"
              checked={details.reason === "Looking for job"}
              onChange={(e) => {
                setDetails({ ...details, reason: e.target.value });
                if (!priority.includes("reason")) {
                  setPriority([...priority, "reason"]);
                }
              }}
            />
            <label for="Looking for job" style={{color:"white"}}>Looking for job</label>
          </div>
          <div className="reason">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Looking to hire"
              value="Looking to hire"
              checked={details.reason === "Looking to hire"}
              onChange={(e) => {
                setDetails({ ...details, reason: e.target.value });
                if (!priority.includes("reason")) {
                  setPriority([...priority, "reason"]);
                }
              }}
            />
            <label for="Looking to hire" style={{color:"white"}}>Looking to hire</label>
          </div>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="connection">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Looking to build network"
              value="Looking to build network"
              checked={details.connection === "Looking to build network"}
              onChange={(e) => {
                setDetails({ ...details, connection: e.target.value });
                if (!priority.includes("connection")) {
                  setPriority([...priority, "connection"]);
                }
              }}
            />
            <label for="Looking to build network" style={{color:"white"}}>
              Looking to build network
            </label>
          </div>
          <div className="connection">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Looking to collabrate"
              value="Looking to collabrate"
              checked={details.connection === "Looking to collabrate"}
              onChange={(e) => {
                setDetails({ ...details, connection: e.target.value });
                if (!priority.includes("connection")) {
                  setPriority([...priority, "connection"]);
                }
              }}
            />
            <label for="Looking to collabrate" style={{color:"white"}}>Looking to collabrate</label>
          </div>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="relation">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Mentoring others"
              value="Mentoring others"
              checked={details.relation === "Mentoring others"}
              onChange={(e) => {
                setDetails({ ...details, relation: e.target.value });
                if (!priority.includes("relation")) {
                  setPriority([...priority, "relation"]);
                }
              }}
            />
            <label for="Mentoring others" style={{color:"white"}}>Mentoring others</label>
          </div>
          <div className="relation">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Seeking Mentorship"
              value="Seeking Mentorship"
              checked={details.relation === "Seeking Mentorship"}
              onChange={(e) => {
                setDetails({ ...details, relation: e.target.value });
                if (!priority.includes("relation")) {
                  setPriority([...priority, "relation"]);
                }
              }}
            />
            <label for="Seeking Mentorship" style={{color:"white"}}>Seeking Mentorship</label>
          </div>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="savings">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Looking for investments"
              value="Looking for investments"
              checked={details.savings === "Looking for investments"}
              onChange={(e) => {
                setDetails({ ...details, savings: e.target.value });

                if (!priority.includes("savings")) {
                  setPriority([...priority, "savings"]);
                }
              }}
            />
            <label for="Looking for investments" style={{color:"white"}}>Looking for investments</label>
          </div>
          <div className="savings">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Looking to invest"
              value="Looking to invest"
              checked={details.savings === "Looking to invest"}
              onChange={(e) => {
                setDetails({ ...details, savings: e.target.value });
                if (!priority.includes("savings")) {
                  setPriority([...priority, "savings"]);
                }
              }}
            />
            <label for="Looking to invest" style={{color:"white"}}>Looking to invest</label>
          </div>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="marketing">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Advertise"
              value="Advertise"
              checked={details.marketing === "Advertise"}
              onChange={(e) => {
                setDetails({ ...details, marketing: e.target.value });
                if (!priority.includes("marketing")) {
                  setPriority([...priority, "marketing"]);
                }
              }}
            />
            <label for="Advertise" style={{color:"white"}}>Advertise</label>
          </div>
          <div className="marketing">
            <input
              style={{
                marginRight: "10px",
              }}
              type="radio"
              id="Affiliate"
              value="Affiliate"
              checked={details.marketing === "Affiliate"}
              onChange={(e) => {
                setDetails({ ...details, marketing: e.target.value });
                if (!priority.includes("marketing")) {
                  setPriority([...priority, "marketing"]);
                }
              }}
            />
            <label for="Affiliate" style={{color:"white"}}>Affiliate</label>
          </div>
        </div>
      </div>
      {details.reason !== "" ||
      details.connection !== "" ||
      details.relation !== "" ||
      details.savings !== "" ||
      details.marketing !== "" ? (
        <Fragment>
          <div>
            {" "}
            You are selected
            {details.reason !== "" && (
              <span className="selection"> {details.reason}</span>
            )}
            {details.connection !== "" && (
              <span className="selection">, {details.connection}</span>
            )}
            {details.relation !== "" && (
              <span className="selection"> , {details.relation}</span>
            )}
            {details.savings !== "" && (
              <span className="selection">, {details.savings}</span>
            )}
            {details.marketing !== "" && (
              <span className="selection">, {details.marketing}</span>
            )}{" "}
            .
          </div>
        </Fragment>
      ) : (
        <Fragment>Select any one to continue</Fragment>
      )}
      <div>
        <button
        style={{backgroundColor:"rgb(3, 104, 104)",color:"white" }}
          disabled={priority.length === 0}
          onClick={() => submitForm()}
          className="btn  mt-4"
        >
          Submit
        </button>
      </div>
    </div>
    </Fragment>
        
      </div>
    </div>
  </div>
  );
}

export default ObjSurvey;
