import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import axios from "axios";
import { Button, Placeholder } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";

import Modal from "react-modal";
import { Await, useNavigate } from "react-router-dom";

// function for date formate

function formatDate(inputDate) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format (AM/PM)
    timeZoneName: "short", // Display time zone name, if needed
    timeZone: "Asia/Kolkata", // Set the time zone to IST
  };

  const date = new Date(inputDate);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

const customforreport = {
  content: {
    width: "400px", // Adjust the width as needed
    height: "300px", // Adjust the height as needed
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Center the modal on the screen

    zIndex: 2,
  },
};

export default function ComplaintAdmin() {
  const navigate = useNavigate();

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [hide, setHide] = useState({
    id: true,
    name: true,
    contactno: true,
    email: true,
    reportabout: true,
    reportie: false,
    preferences: false,
    designation: false,
    dataofreport: false,
    causeofreport: false,
    activesince: false,
    status: false,
  });

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // const totalItems = data.length;

  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [checkedItems, setCheckedItems] = useState({});

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);

    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlereportChange = (e) => {
    setselectedoption(e.target.value);

    console.log("handlereportChange", e.target.value);
  };
  // const currentData = data.slice(startIndex, endIndex);

  // const handleSelectAllChange = (e) => {
  //   if (e.target.checked) {
  //     setSelectedRows(data.map((row) => row.id));
  //   } else {
  //     setSelectedRows([]);
  //   }
  //   setSelectAll(e.target.checked);
  // };

  // useeffect to featch all reports...........

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const Actionclick = () => {
    setIsOpen(true);

    handleClose();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleActionChange = (e) => {
    setActionTaken(e.target.value === "actionTaken");

    if (!actionTaken) {
      setactionstatus("Action Taken");
    }

    if (actionTaken) {
      setactionstatus("Action is pending");
    }
  };

  const [actionTaken, setActionTaken] = useState(false);

  const [actionstatus, setactionstatus] = useState("");

  const [reportReason, setReportReason] = useState("");

  const [currentData, setcurrentData] = useState([]);

  const [selectedoption, setselectedoption] = useState("");

  const [flag, setflag] = useState(false);

  async function fetch() {
    await axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/report/getallreports/${selectedoption}/${startIndex}/${itemsPerPage}`
      )
      .then((res) => {
        if (res.data) {
          console.log("res from fetch users useeffe", res.data);

          setcurrentData(res.data.allreports);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch();
  }, [endIndex, selectedoption, flag]);

  // function to handle action status change....

  async function changeActionStatus(reportId) {
    const data = {
      reportId: reportId,
      actiontaken: reportReason,
      status: actionstatus,
    };

    console.log("report data ", data);

    try {
      const actionResponse = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/report/actionstatuschange`,
        data
      );

      if (actionResponse.data) {
        alert("Changes have been saved");
        setflag(!flag);
      }
    } catch (error) {
      // Handle any errors here, e.g., display an error message
      console.error("Error changing action status:", error);
    }

    closeModal();
  }

  // function to handle userselect.........................

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // function to handle select all

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      if (currentData) {
        const allUserIds = currentData.map((user) => user._id);

        setSelectedUsers(allUserIds);
      }
    }
    setSelectAll(!selectAll);
  };

  // functuion to delete array of users..............

  async function deleteusers() {
    try {
      const response = await axios.delete(
        "http://backend.karandszone.com/karands/users/deleteusers",
        {
          data: { deletearr: selectedUsers },
        }
      );

      if (response.data) {
        console.log("Delete response:", response.data);
        fetch();
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  }

  // unction yo navigate ti reported pages

  function navigatetoreportedpage(name, type) {
    if (type === "user") {
      window.open(`/admin/userlist/${name}`, "_blank"); // Open user list in a new tab
    }

    if (type == "postfeeds") {
      window.open("/istofpostfeed", "_blank"); // Open list of post jobs in a new tab
    }
    if (type == "job") {
      window.open("/listofpostjobs", "_blank"); // Open list of post jobs in a new tab
    }

    if (type == "company") {
      window.open("/admin/companylist", "_blank"); // Open admin company list in a new tab
    }
  }

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <div className="container">
            <div style={{ height: 500, width: "100%", marginRight: "20px" }}>
              <div className="card">
                <div className="ms-3">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <h5 className="text-start m-3"> Report List</h5>
                  </div>

                  <div
                    className="mb-3"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <span className="me-2">Show</span>
                      <select
                        value={itemsPerPage}
                        className="me-2"
                        onChange={handleItemsPerPageChange}
                      >
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                      </select>
                      <span>rows</span>
                    </div>
                    <div className="form-group">
                      <label className="ms-3">Filter the complaints</label>
                      <select
                        className="form-select"
                        onChange={(e) => setselectedoption(e.target.value)}
                      >
                        <option value="jobpost">Job post</option>
                        <option value="postfeed">Post feed</option>
                        <option value="company">Company</option>
                        <option value="message">Message</option>
                        <option value="user">User</option>
                        <option value="comment">PostFeed Comment</option>
                      </select>
                    </div>

                    <div>
                      {/* <button className="btn btn-outline-danger ms-3" onClick={() => { deleteusers() }}>
                        Delete
                      </button> */}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    overflowX: "auto",
                    overflowX: "scroll",
                    padding: "10px",
                  }}
                >
                  <table className="table">
                    <thead
                      className="text-uppercase bg-body"
                      style={{ borderTop: "none !important" }}
                    >
                      <tr>
                        {/*                         
                        <th style={{ whiteSpace: "nowrap" }}>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          Select all
                        </th> */}

                        <th style={{ whiteSpace: "nowrap" }}>report type</th>

                        <th style={{ whiteSpace: "nowrap" }}>Reported by</th>

                        <th style={{ whiteSpace: "nowrap" }}>Reported Date</th>

                        <th style={{ whiteSpace: "nowrap" }}>Reporte Reason</th>

                        <th style={{ whiteSpace: "nowrap" }}>Action</th>

                        <th style={{ whiteSpace: "nowrap" }}>Action Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length > 0
                        ? currentData.map((row) => (
                            <tr key={row.id}>
                              {/* <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <input
                                type="checkbox"
                                name={row.id}
                                checked={selectedUsers.includes(row._id)}
                                onChange={() => handleUserSelect(row._id)}
                              />
                            </td>

                   */}

                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                  color: "lightblue",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigatetoreportedpage(
                                    row ? row.reporttype : "",
                                    "postfeeds"
                                  );
                                }}
                              >
                                {row ? row.reporttype : "no data"}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                  color: "lightblue",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigatetoreportedpage(
                                    row && row.reportedby && row.reportedby.name
                                      ? row.reportedby.name
                                      : "",
                                    "user"
                                  );
                                }}
                              >
                                {row && row.reportedby && row.reportedby.name
                                  ? row.reportedby.name
                                  : "no data"}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {console.log(
                                  "formatDate(row.reportedby.email.date)",
                                  formatDate(row.reportedby.date)
                                )}
                                {row && row.reportedby.date
                                  ? formatDate(row.reportedby.date)
                                  : "no data"}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row && row.reportreason
                                  ? row.reportreason
                                  : "no data"}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                <button
                                  onClick={() => {
                                    Actionclick();
                                  }}
                                >
                                  {row && row.action && row.action.status
                                    ? row.action.status
                                    : "No Action Taken"}
                                </button>

                                <Modal
                                  isOpen={modalIsOpen}
                                  onRequestClose={closeModal}
                                  style={customforreport}
                                  contentLabel="Example Modal"
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      marginBottom: "20px",
                                    }}
                                  >
                                    <button
                                      onClick={closeModal}
                                      style={{
                                        border: "none",
                                        background: "transparent",
                                      }}
                                    >
                                      Close
                                    </button>
                                  </div>
                                  <div>
                                    <div>
                                      <label>Choose an action:</label>
                                      <div>
                                        <input
                                          type="radio"
                                          id="actionPending"
                                          name="action"
                                          value="actionPending"
                                          checked={!actionTaken}
                                          onChange={handleActionChange}
                                        />
                                        <label htmlFor="actionPending">
                                          Action Pending
                                        </label>
                                      </div>
                                      <div>
                                        <input
                                          type="radio"
                                          id="actionTaken"
                                          name="action"
                                          value="actionTaken"
                                          checked={actionTaken}
                                          onChange={handleActionChange}
                                        />
                                        <label htmlFor="actionTaken">
                                          Action Taken
                                        </label>
                                      </div>
                                    </div>
                                    {actionTaken && (
                                      <div>
                                        <label htmlFor="reason">
                                          Action Taken Reason:
                                        </label>
                                        <textarea
                                          id="reason"
                                          style={{
                                            width: "100%",
                                            height: "100px",
                                            padding: "10px",
                                            marginBottom: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                          }}
                                          placeholder="Type your reason here..."
                                          value={reportReason}
                                          onChange={(e) => {
                                            setReportReason(e.target.value);
                                          }}
                                        />
                                      </div>
                                    )}
                                    <Button
                                      style={{
                                        background: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => {
                                        changeActionStatus(row._id);
                                      }}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                </Modal>
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row && row.action && row.action.actiontaken
                                  ? row.action.actiontaken
                                  : "no data"}
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>

                <div className="card-footer">
                  <h6 className="text-success d-flex justify-content-start">
                    Showing &nbsp;
                    {`${startIndex + 1}-${endIndex} `} Rows
                  </h6>
                  <div>
                    <button
                      type="button"
                      className=" btn btn-primary ms-2 me-2"
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                      Prev
                    </button>
                    {currentPage}
                    <button
                      type="button"
                      className=" btn btn-primary ms-2"
                      // disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>

                <ul>
                  {selectedOptions.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
