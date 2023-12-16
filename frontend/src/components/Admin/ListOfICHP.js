import React from 'react'
import Box from '@mui/material/Box';
import AdminDashboard from "./AdminDashboard";

export default function ListOfICHP() {
  return (
    <div>
    <Box sx={{ display: 'flex' }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
    <div className="container-sm container-sm mt-2 mb-5">
      <div className="card">
        <div className="card-header">
          <h5 className="d-flex text-start">List of ICHP</h5>
        </div>
        <div className="card-body ">
          <div className="row">
            <div className="col-lg-4 d-flex flex-column">
              <div
                className=""
                style={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "#5bc0de",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  marginRight: "5px",
                  marginLeft: "22px",
                }}
              >
                <span
                  className="fa fa-user d-flex justify-content-center align-items-center"
                  style={{ color: "white", fontSize: "80px" }}
                ></span>
              
              </div>
              <div className="mt-2 mb-2">
              
              <dt className="text-start"> Role : ICHP User</dt>
              <dt className="text-start ">
                Joined On : 22/05/2023
              </dt>
             
              </div>

             <div className=" card mt-2">
                <div className="bg-light">
                  <h6 className="text-start"> Permision</h6>
                </div>
                <ul className="mt-2 ">
                  <li className="text-start text-muted">Personal</li>
                  <li className="text-start text-muted">Professional</li>
                  <li className="text-start text-muted">Educational</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div>
                <div className="d-flex">
                  <h6 className="  fs-12 fw-normal "> Full Name :</h6>
                  <h6 className="text-muted pl-2">Bommidi Sravana</h6>
                </div>
                <div className="d-flex">
                  <h6 className="  fs-6 fw-normal  "> Gender :</h6>
                  <h6 className="text-muted pl-2">Female</h6>
                </div>
                <div className="d-flex">
                  <h6 className="  fs-6 fw-normal "> Date of Birth :</h6>
                  <h6 className="text-muted pl-2">01-01-1999</h6>
                </div>
                <div className="d-flex">
                  <h6 className="  fs-6 fw-normal ">Marital Status :</h6>
                  <h6 className="text-muted pl-2">Married</h6>
                </div>
                <div className=" d-flex  ">
                  <h6 className="  fs-6 fw-normal ">Location :</h6>
                  <h6 className="text-muted pl-2">Hyderabad</h6>
                </div>
                <div>
                  <h6 className="  fs-6 text-start ">Education</h6>
                  <ul>
                    <li className="text-start text-muted">M-tech</li>

                    <li className="text-start text-muted">
                      Osmania university of College
                    </li>
                    <li className="text-start text-muted">2015 to 2019</li>
                  </ul>
                </div>
                <div className="d-flex">
                  <h6 className="  fs-6 fw-normal ">Industry :</h6>
                  <h6 className="text-muted pl-2">Software</h6>
                </div>
                <div className="">
                  <h6 className="  fs-6 text-start  ">Experience</h6>
                  <ul>
                    <li className="text-start text-muted">
                      Front-end Developer
                    </li>
                    <li className="text-start text-muted">Karands Company</li>
                    <li className="text-start text-muted">Hyd location</li>
                    <li className="text-start text-muted">
                      March-13th to till working
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-4">
                 <div>
                  <div className="card mt-2">
                    <div className="bg-light p-1 d-flex ">
                      <h6 className="text-start">Documents Uploaded </h6>
                    </div>
                    <div className="card-body">
                    <h6 className="text-start ">Personal Documents</h6>
                    <ul>
                      <li className="text-start text-muted">Pan Card</li>
                      <li className="text-start text-muted">Adhaar Card</li>
                    </ul>
                    <h6 className="text-start">Educational Documents</h6>
                    <ul>
                      <li className="text-start text-muted">Convocation</li>
                      <li className="text-start text-muted">
                        Consolidated Marksheet
                      </li>
                      <li className="text-start text-muted">
                        Individual Marksheet
                      </li>
                    </ul>
                    <h6 className="text-start">Professional Documents</h6>
                    <ul>
                      <li className="text-start text-muted">Offer Letter</li>
                      <li className="text-start text-muted">
                        Appointment Letter
                      </li>
                      <li className="text-start text-muted">
                        Appraisal-Letter
                      </li>
                    </ul>
                    </div>
                  </div>
                 </div>
               
            </div>
          </div>
        </div>
      </div>
    </div>
    </Box>
    </Box>
    </div>
  )
}
