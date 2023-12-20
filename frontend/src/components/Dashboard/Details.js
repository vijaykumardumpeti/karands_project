import React, { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { BiPlusCircle } from "react-icons/bi";
import Postfeed2 from "./Posterfeed2";
import Tooltip from "@mui/material/Tooltip";
import "./Posterfeed2.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import axios from "axios";
import { Avatar } from "@mui/material";
import { Fragment } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { BiSolidBell } from "react-icons/bi";
import { SlMagnifier } from "react-icons/sl";

import Notificationcomponent from "./notifications";
import MyContext from "../../mycontext";

import Badge from "@mui/material/Badge";

import audiofile from "../../assets/alert1.mp3"; // Adjust the file path accordingly

import socketIOClient from "socket.io-client";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#83a4d4" : provided.borderColor,
    boxShadow: "none", // Remove the default box-shadow
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#83a4d4", // Set the desired color for the dropdown icon
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
    textAlign: "left",
    marginLeft: "15px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#83a4d4" : "white",
  }),
};

function Details() {
  const { profiledata } = useContext(MyContext);

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleMenuItemClick = (item) => {
    console.log(`Selected item: ${item}`);
    setAnchorEl();
  };

  const navigate = useNavigate();

  // const id = localStorage.getItem("email").split('@')[0].toUpperCase();

  const [Show, setshow] = useState(false);

  const [companiesdata, setcompaniesdata] = useState([]);

  const [companies, setcompanies] = useState([]);

  function postclick(status) {
    setshow(!Show);

    if (status == true) {
      toast.success("posted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function logout() {
    localStorage.clear();

    navigate("/");
  }

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_IP_ADDRESS
        }/karands/company/getcompany/${localStorage.getItem("id")}`
      )
      .then((res) => {
        // setCity(res.data);

        // console.log("iam from detail compo",res.data)

        setcompaniesdata(res.data);

        console.log("companies", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // this function can find on select i can get selected company name and id.............

  const handleCompanySelect = (selectedOption) => {
    const selectedCompanyId = selectedOption.value;
    const selectedCompanyName = selectedOption.label;

    console.log(selectedCompanyId, selectedCompanyName);
  };

  let options;

  if (companiesdata.length > 0) {
    options = companiesdata.map((company) => ({
      label: company.nameOfCompany,
      value: company._id,
    }));
  }

  // functions for search...............................................................

  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [isFocused, setIsFocused] = useState(false); // New state for focus

  const [isExpanding, setIsExpanding] = useState(false); // New state for expanding animation
  // Simulate fetching suggestions based on input value
//=================================================================================================================================================
  const fetchSuggestions = async () => {
    if (inputValue.length > 1) {
      // Simulate fetching suggestions from the backend (replace with actual API call)
      const response = await fetch(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/searchbarsuggestions/${inputValue}`
      );
      const data = await response.json();

      setSuggestions(data.data);

      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
//=======================================================================================================================================================
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
//=====================================================================================================================================
  const handleSuggestionClick = (suggestion) => {
    console.log("clicked form handleSuggestionClick");

    //   return

    if (suggestion.name) {
      navigate(`/viewprofile/${suggestion._id}`);
    }
    if (suggestion.nameOfCompany) {
      navigate("/companypage/about", { state: suggestion });
    }
    if (suggestion.title) {
      navigate("/jobpreview", { state: suggestion });
    }

    // setShowSuggestions(false);
  };
//===========================================================================================================================================
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (inputValue.length < 1) {
      setShowSuggestions(false);
    }

    if (inputValue.length > 1) {
      fetchSuggestions();
    }
  }, [inputValue]);

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsExpanding(false);

    // setShowSuggestions(false)
  };

  // play sound for notifications.............

  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    setHasInteracted(true);
    // You can also call playAudio() here if you want to play audio on interaction
  };

  const [messagereadcount, setmessagereadcount] = useState("");

  const [unreadmessagescount, setunreadmessagescount] = useState("");

  // function to update message count  from the notification component

  function handlemessagecount(messagecount) {
    setmessagereadcount(messagecount);
  }

  // Function to handle audio play

  if (hasInteracted) {
    const audio = new Audio(audiofile);

    // Set volume to 0.1 (you can adjust this value as needed)
    audio.volume = 0.1;

    audio.play();

    setHasInteracted(false);
  }

  const [updates, setUpdates] = useState([]);

  // calculate and update unreadmessages  .. in database a

  async function calculateUnreadMessages(messagecount) {
    const res = await axios.post(
      `${process.env.REACT_APP_IP_ADDRESS}/karands/users/updateunreadmessagecount`,
      { userId: localStorage.getItem("id") }
    );

    if (res.data.data) {
      setunreadmessagescount(res.data.data);
    }
  }

  useEffect(() => {
    if (profiledata && profiledata.messagecount) {
      calculateUnreadMessages(profiledata.messagecount);
    }
  }, [profiledata, updates, messagereadcount]);

  // real time updates..............

  useEffect(() => {
    const ENDPOINT = `${process.env.REACT_APP_IP_ADDRESS}`;

    const socket = socketIOClient(ENDPOINT);

    // Replace 'USER_ID' with the actual user's ID
    const USER_ID = localStorage.getItem("id");

    // Subscribe to updates for the specific user
    socket.emit("subscribeToUpdates", USER_ID);

    socket.on("connect", () => {
      console.log("Connected to socket server for updates");
    });

    socket.on("dataUpdated", (data) => {
      if (data) {
        // to play sounds disabled by sai

        // handleInteraction()

        // Handle real-time updates
        setUpdates(data);
      }
    });

    return () => {
      // Unsubscribe when the component is unmounted
      socket.emit("unsubscribeFromUpdates", USER_ID);
      socket.disconnect();
    };
  }, []);





  return (
    <div>
      <ToastContainer />
      <div
        className="container-fluid"
        style={{
          fontSize: "larger",
          fontWeight: "bolder",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div className={`search-bar-container ${isFocused ? "focused" : ""}`}>
          <div className="search-icon" style={{ display: "flex" }}>
            <div className="InputContainer">
              <input
                type="text"
                placeholder="Search..."
                value={
                  inputValue.name ? inputValue.name : inputValue.nameOfCompany
                }
                onFocus={handleInputFocus}
                onKeyUp={(e) => handleInputChange(e)}
                onBlur={handleInputBlur}
                className={`form-control ${isExpanding ? "expanding" : ""}`}
                id="Searchbar-Input"
              />
            </div>

            <span style={{ width: "20", maxWidth: "40px", marginLeft: "9px" }}>
              <SlMagnifier />
            </span>
          </div>

          {showSuggestions && (
            <Fragment>
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="Suggestions">
                    {suggestion.name && (
                      <div
                        className="d-flex align-items-center mb-3"
                        style={{
                          fontFamily: "Helvetica Neue, sans-serif",
                          textAlign: "start",
                          zIndex: "1",
                        }}
                        onClick={() => {
                          handleSuggestionClick(suggestion);
                        }}
                      >
                        <div className="mr-3">
                          <Avatar />{" "}
                          {/* Assuming this is a component to display an avatar */}
                        </div>
                        <div>
                          <h4 style={{ fontSize: "18px", color: "#333" }}>
                            {suggestion.name ? suggestion.name : ""}
                          </h4>

                          <p style={{ fontSize: "12px", color: "#777" }}>
                            {suggestion.designation
                              ? suggestion.designation
                              : ""}
                          </p>
                          <p style={{ fontSize: "12px", color: "#999" }}>
                            {suggestion.location
                              ? `${suggestion.location}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    )}

                    {suggestion.nameOfCompany && (
                      <div
                        className="d-flex align-items-start"
                        style={{
                          fontFamily: "Helvetica Neue, sans-serif",
                          textAlign: "start",
                        }}
                      >
                        <div onClick={() => handleSuggestionClick(suggestion)}>
                          <h4
                            className="mb-1"
                            style={{ fontSize: "18px", color: "#333" }}
                          >
                            {suggestion.nameOfCompany
                              ? `Company name-${suggestion.nameOfCompany}`
                              : ""}
                          </h4>

                          <p
                            className="mb-1"
                            style={{ fontSize: "14px", color: "#777" }}
                          >
                            {suggestion.industry ? suggestion.industry : ""}
                          </p>
                          <p style={{ fontSize: "12px", color: "#999" }}>
                            {suggestion.state ? suggestion.designation : ""}
                            {suggestion.city ? suggestion.city : ""}
                          </p>

                          <p style={{ fontSize: "10px", color: "#999" }}>
                            {suggestion.state ? suggestion.state : ""}
                          </p>
                        </div>
                      </div>
                    )}

                    {suggestion.title && (
                      <div
                        className="d-flex align-items-start"
                        style={{
                          fontFamily: "Helvetica Neue, sans-serif",
                          textAlign: "start",
                        }}
                      >
                        <div onClick={() => handleSuggestionClick(suggestion)}>
                          <h4
                            className="mb-1"
                            style={{ fontSize: "18px", color: "#333" }}
                          >
                            {suggestion.title
                              ? `Job title - ${suggestion.title}`
                              : ""}
                          </h4>
                          <p
                            className="mb-1"
                            style={{ fontSize: "14px", color: "#777" }}
                          >
                            {suggestion.industry ? suggestion.industry : ""}
                          </p>
                          <p style={{ fontSize: "12px", color: "#999" }}>
                            {suggestion.location
                              ? `${suggestion.location}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <Link to={"/searchpage"}>
                  <p
                    style={{
                      fontFamily: "Helvetica Neue, sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    See More results....
                  </p>
                </Link>
              </div>
            </Fragment>
          )}
        </div>

        <div style={{ display: "flex" }}>

          
          {/* <div className="mr-2">
        <Dropdown >
           <Dropdown.Toggle style={{ backgroundColor: "rgb(3, 104, 104)", color: "white", border: "none" }}>
            Post Job
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item href="">Normal Job Post</Dropdown.Item>
             <Dropdown.Item href="/">Recruitment Drive</Dropdown.Item>
             <Dropdown.Item href="">Refferal Jobs</Dropdown.Item>
            
           </Dropdown.Menu>
         </Dropdown>
        </div>*/}

          <div>
            <IconButton
              title="Post Feed"
              onClick={() => postclick()}
              style={{
                marginRight: "10px",
                backgroundColor: "rgb(3, 104, 104)",
                color: "white",
              }}
            >
              <BiPlusCircle />
            </IconButton>
          </div>
          <div>
            <IconButton
              title="Notification"
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{
                backgroundColor: "rgb(3, 104, 104)",
                color: "white",
                marginRight: "10px",
              }}
            >
              {unreadmessagescount > 0 ? (
                <Badge badgeContent={unreadmessagescount} color="error">
                  <BiSolidBell />
                </Badge>
              ) : (
                <BiSolidBell />
              )}
            </IconButton>

            {profiledata._id ? (
              <Notificationcomponent
                handleClose={handleClose}
                anchorEl={anchorEl}
                profiledata={profiledata}
                handlemessagecount={handlemessagecount}
              />
            ) : (
              ""
            )}
          </div>

          <Dropdown>
            <Dropdown.Toggle
              id="dropdown"
              style={{
                backgroundColor: "rgb(3, 104, 104)",
                color: "white",
                border: "none",
              }}
            >
              <FaUserAlt title="Profile" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/viewprofile">View Profile</Dropdown.Item>
              <Dropdown.Item>Help</Dropdown.Item>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {Show && <Postfeed2 Show={Show} postclick={postclick} />}
      </div>

      {/* post job */}
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">
                Post the Job
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 row">
                <label
                  for="companyDetails"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Company Name
                </label>
                <div class="col-sm-9">
                  <Select
                    styles={customStyles}
                    rules={{ required: "This field is required" }}
                    options={options}
                    placeholder="Select company"
                    onChange={handleCompanySelect}
                  />
                </div>
              </div>
              <h5 className="text-dark">Title/Description</h5>
              <div class="mb-3 row">
                <label
                  for="staticIndustry"
                  class="col-md-3 col-form-label text-dark"
                >
                  Industry
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    readonly
                    class="form-control"
                    id="staticIndustry"
                    value=""
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="functionalArea"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Functional Area
                </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="functionalArea" />
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="inputLocation"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Location
                </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="inputLocation" />
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="inputSkills"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Skills
                </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="inputSkills" />
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="employmentType"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Employemnt Type
                </label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="employmentType" />
                </div>
              </div>
              <hr />
              <h5 className="text-dark">Job Description & Requirements</h5>

              <div class="mb-3 row">
                <div class="col-sm ">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter Roles and Responsibilities"
                  ></textarea>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm ">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder=" Enter Desired Candidate Profile"
                  ></textarea>
                </div>
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label class="form-check-label text-dark" for="inlineCheckbox1">
                  WFH
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <label class="form-check-label text-dark" for="inlineCheckbox2">
                  WFO
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox3"
                  value="option3"
                />
                <label class="form-check-label text-dark" for="inlineCheckbox3">
                  Remote
                </label>
              </div>
              <div class="mb-3 row">
                <label
                  for="numberOfvacancy"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Number of Vacancies
                </label>
                <div class="col-sm-9 text-dark">
                  <input
                    type="text"
                    class="form-control  text-dark"
                    id="numberofvacancy"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="inputSalary"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Salary
                </label>
                <div class="col-sm-9">
                  <div class="row">
                    <div class="col-md-2">
                      <div class="ui-select">
                        <select id="symbol" class="form-control text-dark">
                          <option value=""></option>
                          <option value="">Rupee</option>
                          <option value="">Dollar</option>
                          <option value="">Euro</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="ui-select">
                        <select id="lakhs" class="form-control text-dark">
                          <option value="">Lakhs</option>
                          <option value="">1+</option>
                          <option value="">2+</option>
                          <option value="">3+</option>
                          <option value="">4+</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="ui-select">
                        <select id="thousands" class="form-control text-dark">
                          <option value="">Thousands</option>
                          <option value="">1+</option>
                          <option value="">2+</option>
                          <option value="">3+</option>
                          <option value="">4+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="workExperience"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Work Experience
                </label>
                <div class="col-sm-9">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="ui-select">
                        <select id="years" class="form-control">
                          <option value="">Years</option>
                          <option value="">1+</option>
                          <option value="">2+</option>
                          <option value="">3+</option>
                          <option value="">4+</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="ui-select">
                        <select id="months" class="form-control text-dark">
                          <option value="">Months</option>
                          <option value="">1+</option>
                          <option value="">2+</option>
                          <option value="">3+</option>
                          <option value="">4+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label
                  for="educationalQualification"
                  class="col-sm-3 col-form-label text-dark"
                >
                  Educational Qualifications
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="educationalQualification"
                  />
                </div>
              </div>

              <div class="collapse" id="collapseExample">
                <div class="card card-body text-dark ">
                  Some placeholder content for the collapse component. This
                  panel is hidden by default but revealed when the user
                  activates the relevant trigger.
                </div>
              </div>
              <hr />
              <h5 className="text-dark">Recruiter Details</h5>
              <div className="text-dark">
                <div class="mb-3 row">
                  <label for="inputName" class="col-sm-3 col-form-label">
                    Name
                  </label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="inputName" />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="inputEmail" class="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="inputEmail" />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="contactDetails" class="col-sm-3 col-form-label">
                    Contact Details
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="contactDetails"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
