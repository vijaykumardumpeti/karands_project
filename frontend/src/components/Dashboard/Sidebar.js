import React, { useEffect, useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { BiStreetView } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { BiSolidDashboard } from 'react-icons/bi';
import { BsFillPostcardFill } from 'react-icons/bs';

import Dropdown from 'react-bootstrap/Dropdown';
import { PiSuitcaseRollingFill } from "react-icons/pi"
import './sidebar.css';
import { FaUserFriends } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Fragment } from "react";



function Sidebar({ userPage }) {


  const [isLoading, setLoading] = useState(true);


  const navigate = useNavigate();



  const [profiledata, setprofiledata] = useState("")

  const [open, setOpen] = React.useState(false);



  // if not authentication navigate to login..........................

  useEffect(() => {

    if (!localStorage.getItem("id")) {

      navigate("/")

    }

  }, [])








  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
      .then((res) => {
        if (res.data.details) {
          setprofiledata(res.data.details);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false); // Mark loading as false regardless of success or error
      });
  }, []);







  return (
    <div
      className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebarContainer"
      style={{
        justifyContent: "center",
        backgroundColor: "white",


      }}
    >
      <div
        className="d-flex flex-column align-items-center   "
        style={{
          color: "#AAAAAA",
          paddingTop: "25px",
        }}
      >
        <div
          style={{

            padding: "0 10px",
          }}
        >



          {isLoading ? (
            <div >Loading...</div> // Show a loader while loading
          ) : (
            <Fragment>




              {
                !profiledata.profilepicture ?

                  <img
                    className="logoImage"
                    alt="logo"
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",

                    }}
                    src="https://cdn5.vectorstock.com/i/1000x1000/45/29/house-gold-leaf-logo-vector-14984529.jpg"
                  />

                  :
                  <img
                    className="logoImage"
                    alt="logo"
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",

                    }}
                    src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${profiledata.profilepicture}`}
                  />
              }
              {
                profiledata ? <h6 style={{ color: "whitesmoke" }}>

                  {profiledata.fullName ? profiledata.fullName : profiledata.name}

                </h6> : ""
              }



            </Fragment>)
          }
          <div>
            <ul
              style={{ paddingLeft: "10px" }}
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  href="/dashboard"
                  style={{ color: userPage === 'dashboard' ? "orange" : "whitesmoke" }}
                  className="nav-link align-middle px-0 sidebarText"
                >
                  <BiSolidDashboard />
                  <span className="ms-1 d-none d-sm-inline" >Dashboard</span>
                </a>
              </li>


              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  style={{ color: userPage === 'viewprofile' ? "orange" : "whitesmoke" }}

                  href="/viewprofile" className="nav-link sidebarText align-middle px-0">
                  <i >
                    <BiStreetView />
                  </i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    {" "}
                    View Profile
                  </span>
                </a>
              </li>

              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">

                <a
                  style={{ color: userPage === 'editprofile' ? "orange" : "whitesmoke" }}

                  href="/editprofile" className="nav-link sidebarText align-middle px-0">
                  <i >
                    <FaUserEdit />
                  </i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Edit Profile
                  </span>
                </a>
              </li>
              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  style={{ color: userPage === 'upload' ? "orange" : "whitesmoke" }}

                  href="/upload" className="nav-link sidebarText align-middle px-0">
                  <i >
                    <AiFillFileAdd />
                  </i>
                  <span className="ms-1 d-none d-sm-inline">
                    Documents
                  </span>
                </a>
              </li>
              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  href="/myAccount"

                  style={{ color: userPage === 'myaccount' ? 'orange' : 'whitesmoke' }}


                  className="nav-link align-middle px-0 sidebarText"
                >
                  <RiAccountPinCircleFill />
                  <span className="ms-1 d-none d-sm-inline">My Account</span>
                </a>
              </li>
              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  style={{ color: userPage === 'mynetwork' ? "orange" : "whitesmoke" }}

                  href="/mynetwork" className="nav-link sidebarText align-middle px-0">
                  <i >
                    <FaUserFriends />
                  </i>
                  <span className="ms-1 d-none d-sm-inline">
                    Network
                  </span>
                </a>
              </li>


              <li style={{ marginTop: "6px" }} className="nav-item">
                <a
                  style={{}}

                  className="nav-link sidebarText align-middle px-0">
                  <Dropdown style={{ width: "100%"}}>
                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "transparent", color: userPage === 'myjobs' ? 'orange' : 'whitesmoke', fontSize: "15px", fontWeight: "bold" }}>
                      <i >
                        <PiSuitcaseRollingFill />
                      </i>
                      <span className="ms-1 d-none d-sm-inline">
                        My Jobs
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      <Dropdown.Item href="/mypostedjobs">Posted Job</Dropdown.Item>

                      <Dropdown.Item href="/recruitmentdrivejobs">RecruitmentDriveJob</Dropdown.Item>

                      <Dropdown.Item href="/appliedjobs">Applied Jobs</Dropdown.Item>

                      <Dropdown.Item href="/companypage">My Companies</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </a>
              </li>
              <li style={{ marginTop: "-10px" }} className="nav-item">
                <a
                  style={{}}

                  className="nav-link sidebarText align-middle px-0">
                  <Dropdown style={{ width: "100%" }}>
                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "transparent", color: userPage === 'myjobs' ? 'orange' : 'whitesmoke', fontSize: "15px", fontWeight: "bold" }}>
                      <i >
                        <BsFillPostcardFill />
                      </i>
                      <span className="ms-1 d-none d-sm-inline">
                        Activities
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/allactivity">My Posts</Dropdown.Item>


                      <Dropdown.Item href="/favouritepage" >Favourite Posts</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </a>
              </li>
              <li style={{ fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  style={{ color: userPage === 'settings' ? "orange" : "whitesmoke" }}

                  href="" className="nav-link sidebarText align-middle px-0">
                  <i >
                    <IoMdNotifications />
                  </i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    {" "}
                    Notifications
                  </span>
                </a>
              </li>
              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
                <a
                  style={{ color: userPage === 'settings' ? "orange" : "whitesmoke" }}

                  href="/settings" className="nav-link sidebarText align-middle px-0">
                  <i >
                    <AiFillSetting />
                  </i>
                  <span className="ms-1 d-none d-sm-inline"> Settings</span>
                </a>
              </li>




              <li style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }} className="nav-item custom-hover">
  <a
    style={{ color: userPage === 'settings' ? "orange" : "whitesmoke" }}
    href="/AssignedNewtask"
    target="_blank" // Add this attribute to open the link in a new tab
    className="nav-link sidebarText align-middle px-0"
  >
    <i>
      <AiFillSetting />
    </i>
    <span className="ms-1 d-none d-sm-inline"> Mytask</span>
  </a>
</li>



            </ul>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
