
import * as React from "react";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";

import './admindashboard.css'

function Ichpmytasksidebar({userPage}) {
  
    return (
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebarContainer"
          style={{
            justifyContent: "center",
          
            height:"100%",
            
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
                width:"100%",
                padding: "0 10px",
                
              }}
            >
             <h6 style={{color:"whitesmoke", marginBottom:"20px"}}>My Task Dashboard</h6>
                <ul
                style={{paddingLeft:"10px"}}
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                     <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                    <a
                      href="/mytask"
                      style={{color:userPage==='mytask'?"orange":"whitesmoke"}}
                      className="nav-link align-middle px-0 sidebarText"
                    >
                     <DomainVerificationIcon  style={{fontSize:"large"}}/>
                      <span   className="ms-1 d-none d-sm-inline">BG Verification</span>
                    </a>
                  </li>
                
    
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                    <a 
                      style={{color:userPage==='recruitment'?"orange":"whitesmoke"}}
                    
                    href="/recruitment" className="nav-link sidebarText align-middle px-0">
                      <WorkIcon style={{fontSize:"large"}}/>
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Recruitment Drive
                      </span>
                    </a>
                  </li>
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                      
                    <a 
                     style={{color:userPage==='refferalbonus'?"orange":"whitesmoke"}}
                    
                     href="/refferalbonus" className="nav-link sidebarText align-middle px-0">
                      <i >
                      <CurrencyRupeeIcon style={{fontSize:"large"}}/>
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                      Refferal Bonus
                      </span>
                    </a>
                  </li>
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                    <a 
                     style={{color:userPage==='affiliateads'?"orange":"whitesmoke"}}
                    
                    href="/affiliateads" className="nav-link sidebarText align-middle px-0">
                      <i >
                      <FeaturedVideoIcon style={{fontSize:"large"}} />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Affiliate ads
                      </span>
                    </a>
                  </li>
                 
                </ul>
                <hr style={{border:"1px solid gray"}}/>
                <ul
                style={{paddingLeft:"10px"}}
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
    
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                    <a 
                      style={{color:userPage==='ongoingtask'?"orange":"whitesmoke"}}
                    
                    href="/ongoingtask" className="nav-link sidebarText align-middle px-0">
                      <AddTaskIcon style={{fontSize:"large"}}/>
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Ongoing Task
                      </span>
                    </a>
                  </li>
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                      
                    <a 
                     style={{color:userPage==='completedtask'?"orange":"whitesmoke"}}
                    
                     href="/completedtask" className="nav-link sidebarText align-middle px-0">
                      <i >
                      <DomainVerificationIcon style={{fontSize:"large"}}/>
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                      Completed Tasks
                      </span>
                    </a>
                  </li>
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                    <a 
                     style={{color:userPage==='declinetask'?"orange":"whitesmoke"}}
                    
                    href="/declinetask" className="nav-link sidebarText align-middle px-0">
                      <i >
                      <AssignmentReturnedIcon style={{fontSize:"large"}} />
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Declined Tasks
                      </span>
                    </a>
                  </li>
                 
                </ul>
                <hr style={{border:"1px solid gray"}}/>
                <ul
                style={{paddingLeft:"10px"}}
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
    
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                    <a 
                      style={{color:userPage==='earning'?"orange":"whitesmoke"}}
                    
                    href="/earning" className="nav-link sidebarText align-middle px-0">
                      <AttachMoneyIcon style={{fontSize:"large"}}/>
                      <span className="ms-1 d-none d-sm-inline">
                        {" "}
                        Earnings
                      </span>
                    </a>
                  </li>
                  <li style={{ fontSize:"15px",fontWeight:"bold"}} className="nav-item custom-hover">
                      
                    <a 
                     style={{color:userPage==='dashboard'?"orange":"whitesmoke"}}
                    
                     href="/dashboard" className="nav-link sidebarText align-middle px-0">
                      <i >
                      <DashboardIcon style={{fontSize:"large"}}/>
                      </i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                      Go to Dashboard
                      </span>
                    </a>
                  </li>
                  
                 
                </ul>
            </div>
            <hr />
          </div>
        </div>
      );
}

export default Ichpmytasksidebar
