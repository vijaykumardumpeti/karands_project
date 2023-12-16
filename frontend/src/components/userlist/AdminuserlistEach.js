import React, { useEffect, useState } from "react";
import AdminDashboard from "../Admin/AdminDashboard";
import { Box } from "@mui/material";
import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
export default function AdminuserlistEach() {
  const [data, setData] = useState([])



  const [hide, setHide] = useState({
    id: true,
    name: true,
    title: true,
    contactno: true,
    email: true,
    location: true,
    workexperience: false,
    annualsalary: false,
    preferredlocation: true,
    currentemployer: false,
    age: false,
    role: false,
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
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);



  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };



  
  // const handleItemsPerPageChange = (event) => {
  //   const newItemsPerPage = parseInt(event.target.value);
  //   setItemsPerPage(newItemsPerPage);
  //   setCurrentPage(1);
  // };
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
    setSelectAll(e.target.checked);
  };
  const location = useLocation();
  const state = location.state;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);


  useEffect(() => {

if(state.data){



  setData(state.data)
}



  }, [state.data])



  console.log("statedata",state.data)


  
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <div className="container-lg">
            <div className="card">
              <div className=" ms-3">
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h5 className="m-3">{state.role.toUpperCase()} {state.status} Users</h5>

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
                          <p>select which you want to see</p>
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
                                        workexperience: !hide.workexperience,
                                      })
                                    }
                                  />
                                </td>
                              </tr>
                              {/* <tr>
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
                                <td>currentemployer</td>
                                <td>
                                  <input
                                    type="checkbox"
                                    value={hide.currentemployer}
                                    onChange={() =>
                                      setHide({
                                        ...hide,
                                        currentemployer: !hide.currentemployer,
                                      })
                                    }
                                  />
                                </td>
                              </tr> */}

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
                              {/* <tr>
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
                              </tr> */}
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

                  <span>rows</span>
                  <div style={{ paddingLeft: "5px" }}>
                    <input type="text" placeholder="search hear for Title" />
                  </div>
                  <div style={{ paddingLeft: "5px" }}>
                    <input type="text" placeholder="search hear for Location" />
                  </div>
                  <div style={{ paddingLeft: "5px" }}>
                    <input type="text" placeholder="search hear for Industry" />
                  </div>
                  <button className="btn btn-outline-primary ms-3">
                    Advance Filter
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
                          onChange={handleSelectAllChange}
                        />
                        Select all
                      </th>
                      {hide.name && (
                        <th style={{ whiteSpace: "nowrap" }}>Candidate Name</th>
                      )}

                      {hide.contactno && (
                        <th style={{ whiteSpace: "nowrap" }}>Contact No</th>
                      )}
                      {hide.email && (
                        <th style={{ whiteSpace: "nowrap" }}>Email</th>
                      )}
                      


                     
                        {hide.location && (
                        <th style={{ whiteSpace: "nowrap" }}>Location</th>
                      )}
                      {hide.workexperience && (
                        <th style={{ whiteSpace: "nowrap" }}>
                          Work Experience
                        </th>
                      )}
                    
                    {hide.annualsalary && (
                        <th style={{ whiteSpace: "nowrap" }}>Annual Salary</th>
                      )}
                      {hide.currentemployer && (
                        <th style={{ whiteSpace: "nowrap" }}>
                          Current Employer
                        </th>
                      )}
                      {hide.dateofbirth && (
                        <th style={{ whiteSpace: "nowrap" }}>Date of Birth</th>
                      )}
                      {hide.activesince && (
                        <th style={{ whiteSpace: "nowrap" }}>Active Since</th>
                      )}
                      {hide.personaldocuments && (
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
                      )}
                      {hide.role && (
                        <th style={{ whiteSpace: "nowrap" }}>Role</th>
                      )}
                      {hide.resume && (
                        <th style={{ whiteSpace: "nowrap" }}>Resume</th>
                      )}
                      {hide.state && (
                        <th style={{ whiteSpace: "nowrap" }}>State</th>
                      )}
                    
                      {hide.industry && (
                        <th style={{ whiteSpace: "nowrap" }}>Industry</th>
                      )}
                      {hide.skills && (
                        <th style={{ whiteSpace: "nowrap" }}>Skills</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row) => {
                      const job=row.JobExperience[0];

                     return <tr key={row.id}>
                     <td
                       style={{
                         textAlign: "center",
                         verticalAlign: "middle",
                       }}
                     >
                       <input
                         type="checkbox"
                         name={row.id}
                         checked={selectedRows.includes(row.id)}
                         onChange={(e) => handleCheckboxChange(e, row.id)}
                       // checked={selectedRows.includes(row.id)}
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
                         <Link to={`/viewprofile/${row._id}`}>
                         {row.name}
                         </Link>
                       </td>
                     )}

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
                     {hide.workexperience &&
                     <td
                     style={{
                       textAlign: "center",
                       verticalAlign: "middle",
                     }}
                   >
                     {
                       (row.WorkExperienceYear !== undefined|| row.WorkExperienceMonth !== undefined) ?
                       <Fragment>
                       {row.WorkExperienceYear && `${row.WorkExperienceYear} Years`}
                       {row.WorkExperienceMonth && ` ${row.WorkExperienceMonth} Months`}
                       </Fragment>

                       :

                       <>No Experience</>
                     }
                   </td>
                     }
                      {console.log((job))}
                     {hide.annualsalary && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         {job? `${job.annualSalaryInLakhs} LPA`:"No Info"} 
                       </td>
                     )}

                     {hide.currentemployer && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         {job? `${job.companyName} LPA`:"No Info"} 

                        
                       </td>
                     )}
                    

                     {hide.dateofbirth && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         {row.DOB}
                       </td>
                     )}

                     {hide.activesince && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         {row.activesince}
                       </td>
                     )}
                     {hide.personaldocuments && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.personaldocuments}
                         </Link>
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
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.professionaldocuments}
                         </Link>
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
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.educationaldocuments}
                         </Link>
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
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.certificationdocuments}
                         </Link>
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
                         <Link
                           className="h6 btn-link  "
                           style={{ textDecoration: "none" }}
                         >
                           {row.projectdocuments}
                         </Link>
                       </td>
                     )}
                     {hide.role && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.role}
                         </Link>
                       </td>
                     )}
                     {hide.resume && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.resume}
                         </Link>
                       </td>
                     )}
                     {hide.state && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {console.log(row)}
                           {row.State ? row.State :"None"}
                         </Link>
                       </td>
                     )}
                    
                     {hide.industry && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.industry}
                         </Link>
                       </td>
                     )}
                     {hide.skills && (
                       <td
                         style={{
                           textAlign: "center",
                           verticalAlign: "middle",
                         }}
                       >
                         <Link
                           className="h6 btn-link"
                           style={{ textDecoration: "none" }}
                         >
                           {row.skills}
                         </Link>
                       </td>
                     )}
                   </tr>
                    })}

                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <h6 className="text-success d-flex justify-content-start">
                  Showing &nbsp;
                  {`${startIndex + 1}-${endIndex}  Rows out of ${totalItems}`}{" "}
                  Rows
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
                    disabled={currentPage === totalPages}
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
        </Box>
      </Box>
    </div>
  );
}
