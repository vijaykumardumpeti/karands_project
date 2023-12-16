import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ListOfPostjobs.css";
import Box from "@mui/material/Box";
import AdminDashboard from "./AdminDashboard";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import axios from "axios";

import TextField from "@mui/material/TextField";

export default function ListOfPostJobs() {
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [selectAll, setSelectAll] = useState(false);

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);

    setCurrentPage(1);
  };

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const [searchinput, setsearchinput] = useState("");

  const location = useLocation();

  const state = location.state;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // function to handle select all
  const [currentData, setcurrentData] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);

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

  const [flag, setflag] = useState(false);

  const [hide, setHide] = useState({
    id: true,
    companyName: true,

    nameOfRecuriter: true,

    title: true,

    location: true,
    industry: true,
    functionalArea: false,
    emailOfRecuriter: false,
    email: false,
    numberOfVacancies: false,

    expirejob: false,

    jobType: false,
  });

  const endIndex = startIndex + itemsPerPage;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function fetch() {
    const jobdata = await axios.post(
      `${
        process.env.REACT_APP_IP_ADDRESS
      }/karands/jobs/getjobslists/${startIndex}/${itemsPerPage}/${localStorage.getItem(
        "id"
      )}`,
      { name: searchinput }
    );

    setcurrentData(jobdata.data.data);
  }

  useEffect(() => {
    fetch();
  }, [endIndex, searchinput, flag]);

  // delete job details.........................with job id

  async function handleDeleteJob() {
    try {
      const jobRes = await axios.delete(
        `${
          process.env.REACT_APP_IP_ADDRESS
        }/karands/jobs/deletejob/${localStorage.getItem("id")}`,
        {
          data: { deletearr: selectedUsers },
        }
      );

      if (jobRes.data) {
        alert("Job deleted");

        setflag(!flag);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  }

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <div className="container">
            <div style={{ height: 500, width: "100%" }}>
              <div className="card me-4">
                <div className="ms-3">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <h5 className="m-3">List of Job Posts</h5>

                    <div>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        style={{ position: "absolute", zIndex: "1" }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography style={{ color: "blue" }}>
                            Prefferences
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            style={{
                              overflowY: "auto",
                            }}
                          >
                            <p className="text-success">
                              select which you want to see
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <td>functionalArea</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={hide.functionalArea}
                                      onChange={() =>
                                        setHide({
                                          ...hide,
                                          functionalArea: !hide.functionalArea,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>emailOfRecuriter</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={hide.emailOfRecuriter}
                                      onChange={() =>
                                        setHide({
                                          ...hide,
                                          emailOfRecuriter:
                                            !hide.emailOfRecuriter,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>numberOfVacancies</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={hide.numberOfVacancies}
                                      onChange={() =>
                                        setHide({
                                          ...hide,
                                          numberOfVacancies:
                                            !hide.numberOfVacancies,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>expirejob</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={hide.expirejob}
                                      onChange={() =>
                                        setHide({
                                          ...hide,
                                          expirejob: !hide.expirejob,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>

                                <tr>
                                  <td>jobType</td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      value={hide.jobType}
                                      onChange={() =>
                                        setHide({
                                          ...hide,
                                          jobType: !hide.jobType,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>

                  <div className="d-flex mb-3">
                    <div className="d-flex justify-content-start mb-3">
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

                    <TextField
                      id="filled-search"
                      label="Search field"
                      type="search"
                      variant="filled"
                      onChange={(e) => {
                        setsearchinput(e.target.value);
                      }}
                    />

                    <button
                      className="btn btn-outline-danger ms-3"
                      onClick={() => {
                        handleDeleteJob();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    overflowX: "auto",
                    overflowX: "scroll",
                    padding: "10px",
                  }}
                >
                  <table>
                    <thead
                      className="text-uppercase bg-body"
                      style={{ borderTop: "none !important", margin: "10px" }}
                    >
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          Select all
                        </th>
                        {hide.title && (
                          <th style={{ whiteSpace: "nowrap" }}>title </th>
                        )}

                        {hide.companyName && (
                          <th style={{ whiteSpace: "nowrap" }}>companyName</th>
                        )}

                        {hide.nameOfRecuriter && (
                          <th style={{ whiteSpace: "nowrap" }}>
                            nameOfRecuriter
                          </th>
                        )}

                        {hide.location && (
                          <th style={{ whiteSpace: "nowrap" }}>Location</th>
                        )}

                        {hide.industry && (
                          <th style={{ whiteSpace: "nowrap" }}>Industry</th>
                        )}

                        {hide.functionalArea && (
                          <th style={{ whiteSpace: "nowrap" }}>
                            functionalArea
                          </th>
                        )}

                        {hide.emailOfRecuriter && (
                          <th style={{ whiteSpace: "nowrap" }}>
                            emailOfRecuriter
                          </th>
                        )}

                        {hide.numberOfVacancies && (
                          <th style={{ whiteSpace: "nowrap" }}>
                            numberOfVacancies
                          </th>
                        )}

                        {hide.expirejob && (
                          <th style={{ whiteSpace: "nowrap" }}>expirejob</th>
                        )}

                        {hide.jobType && (
                          <th style={{ whiteSpace: "nowrap" }}>jobType</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {currentData?.length > 0
                        ? currentData.map((row) => (
                            <tr key={row.id}>
                              <td
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

                              {hide.title && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {row.title}
                                </td>
                              )}

                              {hide.companyName && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {row.companyName}
                                </td>
                              )}

                              {hide.nameOfRecuriter && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.nameOfRecuriter}
                                </td>
                              )}

                              {hide.location && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.location}
                                </td>
                              )}

                              {hide.industry && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.industry}
                                </td>
                              )}

                              {hide.functionalArea && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.functionalArea}
                                </td>
                              )}

                              {hide.emailOfRecuriter && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.emailOfRecuriter}
                                </td>
                              )}

                              {hide.numberOfVacancies && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.numberOfVacancies}
                                </td>
                              )}

                              {hide.expirejob && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.expirejob && row.expirejob.status
                                    ? row.expirejob.status
                                    : "no data"}
                                </td>
                              )}

                              {hide.jobType && (
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {row.jobType}
                                </td>
                              )}
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
