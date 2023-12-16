import React, { useEffect, useState } from "react";
import "./Documents.css";
import { Box } from "@mui/material";
//import AdminCard from "./AdminCard";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";

import TextField from "@mui/material/TextField";

export default function Adminuserlist() {
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
    title: true,
    contactno: false,
    email: true,
    location: true,
    workexperience: false,
    annualsalary: false,
    preferredlocation: true,
    designation: false,
    age: true,
    role: true,
    resume: false,
    state: false,
    language: false,
    dateofbirth: false,
    activesince: false,
    personaldocuments: false,
    industry: false,
    skills: false,
    professionaldocuments: false,
    educationaldocuments: false,
    certificationdocuments: false,
    projectdocuments: false,
  });

  const [searchinput, setsearchinput] = useState("");

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

  // const currentData = data.slice(startIndex, endIndex);

  // const handleSelectAllChange = (e) => {
  //   if (e.target.checked) {
  //     setSelectedRows(data.map((row) => row.id));
  //   } else {
  //     setSelectedRows([]);
  //   }
  //   setSelectAll(e.target.checked);
  // };

  // useeffect to featch all users...........

  const [currentData, setcurrentData] = useState([]);

  console.log(
    "startIndex,endIndex",
    startIndex,
    endIndex,
    "per",
    itemsPerPage,
    "selectedids",
    selectedUsers
  );

  async function fetch() {
    await axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/getusers/${startIndex}/${itemsPerPage}`,
        { name: searchinput }
      )
      .then((res) => {
        if (res.data) {
          console.log("res from fetch users useeffe", res.data);

          setcurrentData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch();
  }, [endIndex, searchinput]);

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
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/deleteusers`,
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

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <div>
            <div component="main" sx={{ marginTop: 10 }}>
              <div className="container">
                <div style={{ height: 500, width: "100%" }}>
                  <div className="card">
                    <div className=" ms-3">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <h5 className="m-3">User list</h5>

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
                                  overflowY: "scroll",
                                  height: "380px",
                                }}
                              >
                                <p className="text-success">
                                  select which you want to see
                                </p>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>Work Experience</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.workexperience}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              workexperience:
                                                !hide.workexperience,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Annual Salary</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.annualsalary}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              annualsalary: !hide.annualsalary,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Designation</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.designation}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              designation: !hide.designation,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Date of Birth</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.dateofbirth}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              dateofbirth: !hide.dateofbirth,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Active since</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.activesince}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              activesince: !hide.activesince,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Personal Documents</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.personaldocuments}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              personaldocuments:
                                                !hide.personaldocuments,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Professional Documents</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.professionaldocuments}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              professionaldocuments:
                                                !hide.professionaldocuments,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Educational Documents</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.educationaldocuments}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              educationaldocuments:
                                                !hide.educationaldocuments,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Certification Documents</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.certificationdocuments}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              certificationdocuments:
                                                !hide.certificationdocuments,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Project Documents</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.age}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              projectdocuments:
                                                !hide.projectdocuments,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Role</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.role}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              role: !hide.role,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Resume</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.resume}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              resume: !hide.resume,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>State</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.age}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              state: !hide.state,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Language</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.language}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              language: !hide.language,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Industry</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.industry}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              industry: !hide.industry,
                                            })
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Skills</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          value={hide.skills}
                                          onChange={() =>
                                            setHide({
                                              ...hide,
                                              skills: !hide.skills,
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
                            deleteusers();
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
                          style={{ borderTop: "none !important" }}
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
                            {hide.name && (
                              <th style={{ whiteSpace: "nowrap" }}>
                                Candidate Name
                              </th>
                            )}
                            {/* {hide.title && (
                    <th style={{ whiteSpace: "nowrap" }}>Title</th>
                  )} */}
                            {hide.contactno && (
                              <th style={{ whiteSpace: "nowrap" }}>
                                Contact No
                              </th>
                            )}
                            {hide.email && (
                              <th style={{ whiteSpace: "nowrap" }}>Email</th>
                            )}

                            {/* {hide.workexperience && (
                    <th style={{ whiteSpace: "nowrap" }}>
                      Work Experience
                    </th>
                  )} */}

                            {/* {hide.annualsalary && (
                    <th style={{ whiteSpace: "nowrap" }}>Annual Salary</th>
                  )} */}

                            {hide.location && (
                              <th style={{ whiteSpace: "nowrap" }}>Location</th>
                            )}

                            {/* {hide.preferredlocation && (
                    // <th style={{ whiteSpace: "nowrap" }}>
                    //   Preferred Location
                    // </th>
                  )} */}

                            {hide.designation && (
                              <th style={{ whiteSpace: "nowrap" }}>
                                Designation
                              </th>
                            )}

                            {/* {hide.age && (
                    <th style={{ whiteSpace: "nowrap" }}>Age</th>
                  )} */}
                            {hide.dateofbirth && (
                              <th style={{ whiteSpace: "nowrap" }}>
                                Date of Birth
                              </th>
                            )}
                            {hide.activesince && (
                              <th style={{ whiteSpace: "nowrap" }}>
                                Active Since
                              </th>
                            )}

                            {/* {hide.personaldocuments && (
                    <th style={{ whiteSpace: "nowrap" }}>
                      Personal Documents
                    </th>
                  )}
                  {hide.professionaldocuments && (
                    <th style={{ whiteSpace: "nowrap" }}>
                      Professional Documents
                    </th>
                  )}
                  {hide.educationaldocuments && (
                    <th style={{ whiteSpace: "nowrap" }}>
                      Educational Documents
                    </th>
                  )}
                  {hide.certificationdocuments && (
                    <th style={{ whiteSpace: "nowrap" }}>
                      Certification Documents
                    </th>
                  )}

                  {hide.projectdocuments && (
                    <th style={{ whiteSpace: "nowrap" }}>
                      Project Documents
                    </th>
                  )} */}

                            {hide.role && (
                              <th style={{ whiteSpace: "nowrap" }}>Role</th>
                            )}
                            {/* {hide.resume && (
                    <th style={{ whiteSpace: "nowrap" }}>Resume</th>
                  )} */}

                            {hide.state && (
                              <th style={{ whiteSpace: "nowrap" }}>State</th>
                            )}

                            {/* {hide.language && (
                    <th style={{ whiteSpace: "nowrap" }}>Language</th>
                  )} */}

                            {hide.industry && (
                              <th style={{ whiteSpace: "nowrap" }}>Industry</th>
                            )}

                            {/* {hide.skills && (
                    <th style={{ whiteSpace: "nowrap" }}>Skills</th>
                  )} */}
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.length > 0
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

                                  {hide.name && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {row.name}
                                    </td>
                                  )}

                                  {/* {hide.title && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.title}
                      </td>
                    )} */}

                                  {hide.contactno && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {row.mobilenumber}
                                    </td>
                                  )}

                                  {hide.email && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      {row.email}
                                    </td>
                                  )}

                                  {/* {hide.workexperience && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.workexperience}
                      </td>
                    )} */}

                                  {/* {hide.annualsalary && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.annualsalary}
                      </td>
                    )} */}

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

                                  {/* {hide.preferredlocation && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.preferredlocation}
                      </td>
                    )} */}

                                  {hide.designation && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      {row.designation}
                                    </td>
                                  )}

                                  {/* 
                    {hide.age && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {row.age}
                      </td>
                    )} */}

                                  {hide.dateofbirth && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      {row.DOB ? row.DOB : ""}
                                    </td>
                                  )}

                                  {hide.activesince && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      {row.RegistrationDate
                                        ? row.RegistrationDate
                                        : ""}
                                    </td>
                                  )}

                                  {/* 
                    {hide.personaldocuments && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.personaldocuments}
                        </a>
                      </td>
                    )}


                    {hide.professionaldocuments && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {" "}
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.professionaldocuments}
                        </a>
                      </td>
                    )}
                    {hide.educationaldocuments && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {" "}
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.educationaldocuments}
                        </a>
                      </td>
                    )}
                    {hide.certificationdocuments && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {" "}
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.certificationdocuments}
                        </a>
                      </td>
                    )}
                    {hide.projectdocuments && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {" "}
                        <a
                          className="h6 btn-link  "
                          style={{ textDecoration: "none" }}
                        >
                          {row.projectdocuments}
                        </a>
                      </td>
                    )} */}

                                  {hide.role && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        className="h6 btn-link"
                                        style={{ textDecoration: "none" }}
                                      >
                                        {row.role}
                                      </a>
                                    </td>
                                  )}

                                  {/* {hide.resume && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.resume}
                        </a>
                      </td>
                    )} */}

                                  {hide.state && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        className="h6 btn-link"
                                        style={{ textDecoration: "none" }}
                                      >
                                        {row.state ? row.state : ""}
                                        {!row.state && row.State
                                          ? row.State
                                          : ""}
                                      </a>
                                    </td>
                                  )}

                                  {/* 

                    {hide.language && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.language}
                        </a>
                      </td>
                    )} */}

                                  {hide.industry && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        className="h6 btn-link"
                                        style={{ textDecoration: "none" }}
                                      >
                                        {row.industry}
                                      </a>
                                    </td>
                                  )}

                                  {/* 

                    {hide.skills && (
                      <td
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <a
                          className="h6 btn-link"
                          style={{ textDecoration: "none" }}
                        >
                          {row.skills}
                        </a>
                      </td>
                    )} */}
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
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
