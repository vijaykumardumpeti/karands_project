
import React, { useContext, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { BiTaskX } from 'react-icons/bi';
// import { BiTask } from 'react-icons/bi';
import { MdOutlinePendingActions } from 'react-icons/md';
import { VscReferences } from 'react-icons/vsc';





import './admindashboard.css'
import MyContext from "../../mycontext";

function MyTaskSideBar({ userPage }) {




  const { profiledata } = React.useContext(MyContext)









  return (
    <div
      className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebarContainer"
      style={{
        justifyContent: "center",
        height: "100%",

      }}
    >
      <div
        className="d-flex flex-column align-items-center   min-vh-100"
        style={{
          color: "#AAAAAA",
          paddingTop: "25px",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 10px",

          }}
        >
          {/* <h6 style={{ color: "whitesmoke", marginBottom: "20px" }}>My Task Dashboard</h6> */}
          {/* <hr style={{ border: "1px solid gray" }} /> */}
          <ul
            style={{ paddingLeft: "10px" }}
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >



{

profiledata&&(profiledata.role=="ichp"||profiledata.role=="Sub-Admin"||profiledata.AdditionalPortalAccess=="Sub-Admin")?

<h6 style={{ color: "whitesmoke", marginLeft: "10px" }}>Assigned New Tasks</h6>



:<>

<h6 style={{ color: "whitesmoke", marginLeft: "10px" }}> New Tasks from your location</h6>


</>


}

          

{/* my task navi links will according to ichp admin or ichp */}



{

profiledata&&(profiledata.role=="ichp"||profiledata.role=="Sub-Admin"||profiledata.AdditionalPortalAccess=="Sub-Admin")?

            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">

              <a
                href="/AssignedNewtask"
                style={{ color: userPage === 'mytask' ? "orange" : "whitesmoke" }}
                className="nav-link align-middle px-0 sidebarText"
              >
                <DomainVerificationIcon style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">Assigned BG Verification</span>
              </a>
            </li>
:   <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">

<a
  href="/mytask"
  style={{ color: userPage === 'mytask' ? "orange" : "whitesmoke" }}
  className="nav-link align-middle px-0 sidebarText"
>
  <DomainVerificationIcon style={{ fontSize: "large" }} />
  <span className="ms-1 d-none d-sm-inline">BG Verification</span>
</a>
</li>}








            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'recruitment' ? "orange" : "whitesmoke" }}

                href="/recruitment" className="nav-link sidebarText align-middle px-0">
                <WorkIcon style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  Recruitment Drive
                </span>
              </a>
            </li>
            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">

              <a
                style={{ color: userPage === 'refferalbonus' ? "orange" : "whitesmoke" }}

                href="/refferalbonus" className="nav-link sidebarText align-middle px-0">
                <i >
                  <VscReferences style={{ fontSize: "large" }} />
                </i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  Refferal Bonus
                </span>
              </a>
            </li>


          </ul>
          <hr style={{ border: "1px solid gray" }} />

          <ul
            style={{ paddingLeft: "10px" }}
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <h6 style={{ color: "whitesmoke", marginLeft: "10px" }}>Ongoing Task</h6>
            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                href="/ongoingtask" className="nav-link sidebarText align-middle px-0"
              >
                <DomainVerificationIcon style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  BG Verification
                </span>
              </a>
            </li>
            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                href="" className="nav-link sidebarText align-middle px-0"
              >
                <WorkIcon style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  Recruitment Drive
                </span>
              </a>
            </li>
            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                href="" className="nav-link sidebarText align-middle px-0"
              >
                <VscReferences style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  Refferal Bonus
                </span>
              </a>
            </li>
          </ul>
          <hr style={{ border: "1px solid gray" }} />


          {console.log("profiledata.role",profiledata.role == "ichp" && profiledata.AdditionalPortalAccess != "Admin" && profiledata.AdditionalPortalAccess != "Sub-Admin")}


          {profiledata.role == "ichp" && profiledata.AdditionalPortalAccess != "Admin" && profiledata.AdditionalPortalAccess != "Sub-Admin" ?


         
       <>
       
       
       
       </>




            : <>


              <ul
                style={{ paddingLeft: "10px" }}
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <h6 style={{ color: "whitesmoke", marginLeft: "10px" }}>Assigned Task</h6>
                <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                  <a
                    style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                    href="/Assignedtasks" className="nav-link sidebarText align-middle px-0"
                  >
                    <DomainVerificationIcon style={{ fontSize: "large" }} />
                    <span className="ms-1 d-none d-sm-inline">
                      {" "}
                      BG Verification
                    </span>
                  </a>
                </li>
                <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                  <a
                    style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                    href="" className="nav-link sidebarText align-middle px-0"
                  >
                    <WorkIcon style={{ fontSize: "large" }} />
                    <span className="ms-1 d-none d-sm-inline">
                      {" "}
                      Recruitment Drive
                    </span>
                  </a>
                </li>
                <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                  <a
                    style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                    href="" className="nav-link sidebarText align-middle px-0"
                  >
                    <VscReferences style={{ fontSize: "large" }} />
                    <span className="ms-1 d-none d-sm-inline">
                      {" "}
                      Refferal Bonus
                    </span>
                  </a>
                </li>
              </ul>



            </>}




       








        <hr style={{ border: "1px solid gray" }} />

          <ul
            style={{ paddingLeft: "10px" }}
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >

     



            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">

              <a
                style={{ color: userPage === 'completedtask' ? "orange" : "whitesmoke" }}

                href="/completedtask" className="nav-link sidebarText align-middle px-0">
                <i >
                  <DomainVerificationIcon style={{ fontSize: "large" }} />
                </i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  Completed Tasks
                </span>
              </a>
            </li>

            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'ongoingtask' ? "orange" : "whitesmoke" }}
                href="/assignedtask"
                className="nav-link sidebarText align-middle px-0"
              >

                <MdOutlinePendingActions style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  Pending Tasks
                </span>
              </a>
            </li>

            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'declinetask' ? "orange" : "whitesmoke" }}

                href="/declinetask" className="nav-link sidebarText align-middle px-0">
                <i >
                  <BiTaskX style={{ fontSize: "large" }} />
                </i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  Declined Tasks
                </span>
              </a>
            </li>
            <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
              <a
                style={{ color: userPage === 'earning' ? "orange" : "whitesmoke" }}

                href="/earning" className="nav-link sidebarText align-middle px-0">
                <CurrencyRupeeIcon style={{ fontSize: "large" }} />
                <span className="ms-1 d-none d-sm-inline">
                  {" "}
                  Earnings
                </span>
              </a>
            </li>

          </ul>
          <hr style={{ border: "1px solid gray" }} />
          <ul
            style={{ paddingLeft: "10px" }}
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >


         

          </ul>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default MyTaskSideBar
