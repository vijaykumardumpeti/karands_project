import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import "react-tooltip/dist/react-tooltip.css";
import { useNavigate } from "react-router-dom";

function Ichptopbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");  // Navigate to the desired route ("/")

    // // Close the current tab
    // window.close();
  }

  return (
    <div
      className="container-fluid"
      style={{
        fontSize: "larger",
        fontWeight: "bolder",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px"
      }}
    >
      <div>
        <span>{localStorage.getItem("fullName") ? localStorage.getItem("fullName") : ""} </span>
      </div>
      <div style={{ display: "flex" }}>
        <IoNotificationsSharp
          style={{
            color: "#83a4d4",
            border: "none",
            fontSize: "2rem",
            marginRight: "10px",
            fontWeight: "bold"
          }}
        />

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "#83a4d4", color: "white", border: "none" }}>
            <span data-tooltip-id="my-tooltip" className="ms-3" data-tooltip-content={`${localStorage.getItem("fullName") ? localStorage.getItem("fullName") : ""}`}>
              <FaUserAlt />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/viewprofile">View Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Tooltip style={{ zIndex: "5" }} id="my-tooltip" />
      </div>
    </div>
  );
}

export default Ichptopbar;
