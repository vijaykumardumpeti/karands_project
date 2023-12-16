import React,{ Fragment } from "react";
// import myImage from "../../../assets/logo2.png";
import myImage from "../../assets/logo2.png"

import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";
import Details from "../Dashboard/Details";

function Companypreview() {


  const location = useLocation()



  const state = location.state


  console.log("companydetails",state)

  return (
    <div>

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />

          <hr />

          <div>

            <Box sx={{ display: "flex" }}>

              <Box component="main" sx={{ marginTop: 1 }}>
                <hr />
                <div class="container-xl container-lg mb-7">
                  <div class="card">
                    <div class="card-header">
                      {" "}
                      <h5 class="d-flex text-start">Company Profile</h5>
                    </div>

                    <div class="card-body">
                      <div class="row">
                        <div class="col-lg-4 col-xl-4">
                          <div class="card-box text-center">


                            {
                              state && state.compnaylogo ?


                                <Fragment>


                                  {state.compnaylogo.endsWith('.jpg') || state.compnaylogo.endsWith('.png') ? (<img src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${state.compnaylogo}`} alt="Post Image" class=" rounded-3  "
                                    style={{ width: "100px", height: "100px" }} />) : <img
                                    class=" rounded-3  "
                                    style={{ width: "100px", height: "100px" }}
                                    src={myImage}
                                  />}
                                </Fragment>


                                :
                                <Fragment>

                                  <img
                                    class=" rounded-3  "
                                    style={{ width: "100px", height: "100px" }}
                                    src={myImage}
                                  />
                                </Fragment>


                            }



                            <div class="text-left mt-3">
                              <h4 class="font-13 text-uppercase m-2 ">
                                About Company :
                              </h4>
                              <p class="text-muted font-13 mb-3 m-2" style={{height:"200px",overflow:"scroll",}}>
                                {state.aboutCompany}
                              </p>
                              <p class="text-muted mb-2 font-13 m-2">
                                <strong>Company Name :</strong>{" "}
                                <span class="ml-2">{state.nameOfCompany}</span>
                              </p>

                              <p class="text-muted mb-2 font-13 m-2">
                                <strong>Establilshed Year :</strong>
                                <span class="ml-2">Since 2000</span>
                              </p>

                              <p class="text-muted mb-1 font-13 m-2">
                                <strong>Company Location :</strong>{" "}
                                <span class="ml-2">{state.city}</span>
                              </p>
                            </div>
                            <div class="d-flex ms-2">
                              <ul class="list-inline mt-3 mb-0">
                                <li class="list-inline-item ">
                                  <i
                                    class="fa fa-star  "
                                    style={{ color: "gold" }}
                                  ></i>
                                </li>
                                <li class="list-inline-item">
                                  <i class="fa fa-star" style={{ color: "gold" }}></i>
                                </li>
                                <li class="list-inline-item">
                                  <i class="fa fa-star" style={{ color: "gold" }}></i>
                                </li>
                                <li class="list-inline-item">
                                  <i class="fa fa-star" style={{ color: "gold" }}></i>
                                </li>
                                <li class="list-inline-item">
                                  <i class="fa fa-star" style={{ color: "gold" }}></i>
                                </li>
                              </ul>
                            </div>
                            <ul class="social-list list-inline mt-3 mb-0 d-flex justify-content-start">
                              <li class="list-inline-item">
                                <a
                                  href="javascript: void(0);"
                                  class="social-list-item border-purple text-purple"
                                >
                                  <i class="fab fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  href="javascript: void(0);"
                                  class="social-list-item border-danger text-danger"
                                >
                                  <i class="fab fa-google"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  href="javascript: void(0);"
                                  class="social-list-item border-info text-info"
                                >
                                  <i class="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a
                                  href="javascript: void(0);"
                                  class="social-list-item border-secondary text-secondary"
                                >
                                  <i class="fab fa-github"></i>
                                </a>
                              </li>
                            </ul>{" "}
                          </div>

                          <hr />

                          <div class="card mt-4 border-0">
                            <h4 class="header-title  mdi mdi-account-multiple-outline d-flex justify-content-start ">
                              Activities
                            </h4>
                            <ul class="list-group list-group-flush d-flex justify-content-start">
                              <li class="list-group-item">
                                <h6 class="d-flex text-start">
                                  <i class="mdi mdi-star-circle "></i>Somehas given
                                  you as a Surprise
                                </h6>
                                <p class="text-muted mt-2 mb-0  d-flex text-start">
                                  {" "}
                                  ~ 12 minutes ago.
                                </p>
                              </li>
                              <li class="list-group-item">
                                <h6 class="d-flex text-start">
                                  {" "}
                                  <i class="mdi mdi-star-circle"></i>Change your
                                  profile User details
                                </h6>
                                <p class="text-muted mt-2 mb-0 d-flex text-start">
                                  {" "}
                                  ~ 1 Hour 20 minutes ago.
                                </p>
                              </li>
                              <li class="list-group-item">
                                <h6 class="d-flex text-start">
                                  <i class="mdi mdi-star-circle"></i> Your Settings
                                  has Updated
                                </h6>
                                <p class="text-muted mt-2 mb-0 d-flex text-start">
                                  {" "}
                                  ~ One day ago.
                                </p>
                              </li>
                              <li class="list-group-item">
                                <h6 class="d-flex text-start">
                                  <i class="mdi mdi-star-circle"></i>Change your
                                  profile User details
                                </h6>
                                <p class="text-muted mt-2 mb-0 d-flex text-start">
                                  {" "}
                                  ~ 1 Hour 20 minutes ago.
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div class="col-lg-8 col-xl-8 ">
                          <div class="row">
                            <div class="card">
                              <div class="card-header ">
                                <div class="col-lg-12">
                                  <nav>
                                    <div
                                      class="nav nav-tabs"
                                      id="nav-tab"
                                      role="tablist"
                                    >
                                      <button
                                        class="nav-link active"
                                        id="nav-companyprofile-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-companyprofile"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-companyprofile"
                                        aria-selected="true"
                                      >
                                        Company Profile
                                      </button>
                                      <button
                                        class="nav-link position-relative"
                                        id="nav-jobposts-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-jobposts"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-jobposts"
                                        aria-selected="false"
                                      >
                                        Job Posts(10)
                                      </button>
                                      <button
                                        class="nav-link"
                                        id="nav-postfeed-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-postfeed"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-postfeed"
                                        aria-selected="false"
                                      >
                                        Post Feed
                                      </button>

                                      <button
                                        class="nav-link position-relative"
                                        id="nav-employees-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-employees"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-employees"
                                        aria-selected="false"
                                      >
                                        Employees(10){" "}
                                      </button>

                                      <button
                                        class="nav-link"
                                        id="nav-documents-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-documents"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-documents"
                                        aria-selected="false"
                                      >
                                        Documents
                                      </button>
                                    </div>
                                  </nav>{" "}
                                </div>
                              </div>

                              <div class="card-body">
                                <div class="tab-content " id="nav-tabContent">
                                  <div
                                    class="tab-pane fade show active "
                                    id="nav-companyprofile"
                                    role="tabpanel"
                                    aria-labelledby="nav-companyprofile-tab"
                                  >
                                    <div class="row  ">
                                      <h5 class="mb-4 text-uppercase d-flex justify-content-start">
                                        <i class="mdi mdi-account"></i>
                                        About
                                      </h5>
                                      <div class="col-6 ">
                                        <h6 class=" d-flex text-start ">
                                          Name of Concern Person
                                        </h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.concernPerson}
                                        </p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start  ">
                                          Date of in-corporation
                                        </h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.dateOfRegistration}
                                        </p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start  ">
                                          Name of the Company
                                        </h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.nameOfCompany}
                                        </p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start ">
                                          No of Employees:
                                        </h6>
                                        <p class="text-muted flex text-start  ">{state.noOfEmployee}</p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start">Location:</h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.state}
                                        </p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start ">
                                          Industry:
                                        </h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.industry}
                                        </p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start ">Skills:</h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.skills.map((e, index) => {
                                            return e
                                          })}
                                        </p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start ">
                                          Mobile Number:
                                        </h6>
                                        <p class="text-muted flex text-start  ">{state.mobileNumber}</p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class=" d-flex text-start  ">
                                          Email-Id:
                                        </h6>
                                        <p class="text-muted flex text-start  ">{state.domainEmail}</p>
                                      </div>
                                      <div class="col-6 ">
                                        <h6 class="  d-flex text-start  ">GST No:</h6>
                                        <p class="text-muted flex text-start  ">
                                          {state.gstNo}
                                        </p>{" "}
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="tab-pane fade"
                                    id="nav-jobposts"
                                    role="tabpanel"
                                    aria-labelledby="nav-jobposts-tab"
                                  >
                                    <div class="row">
                                      <div class="col-lg-12 col-md-12 col-12 mt-4 pt-2">
                                        <div class="card border-0 bg-light rounded shadow">
                                          <div class="card-body p-4">
                                            <span class="badge rounded-pill bg-success float-md-end mb-3 mb-sm-0">
                                              Full time
                                            </span>
                                            <h5 class="d-flex justify-content-start">
                                              Web Designer
                                            </h5>
                                            <div class="mt-3">
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-home"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                <a
                                                  href="#"
                                                  target="_blank"
                                                  class="text-muted"
                                                >
                                                  Bootdey.com LLC.
                                                </a>
                                              </span>
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-map-marker"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                USA
                                              </span>
                                            </div>

                                            <div class="mt-3 d-flex justify-content-between">
                                              <a
                                                href="page-job-detail.html"
                                                class="btn btn-success d-flex justify-content-center "
                                                style={{ width: "150px" }}
                                              >
                                                View Details
                                              </a>

                                              <ul class="list-unstyled mb-0 d-flex justify-content-end gap-2 ">
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="badge rounded-pill bg-success"
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    Active
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="text-success "
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    ~Posted 1 days ago
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-lg-12 col-md-12 col-12 mt-4 pt-2">
                                        <div class="card border-0 bg-light rounded shadow">
                                          <div class="card-body p-4">
                                            <span class="badge rounded-pill bg-success float-md-end mb-3 mb-sm-0">
                                              Part time
                                            </span>
                                            <h5 class="d-flex justify-content-start">
                                              Web Designer
                                            </h5>
                                            <div class="mt-3">
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-home"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                <a
                                                  href="#"
                                                  target="_blank"
                                                  class="text-muted"
                                                >
                                                  Bootdey.com LLC.
                                                </a>
                                              </span>
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-map-marker"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                USA
                                              </span>
                                            </div>

                                            <div class=" mt-4 d-flex justify-content-between">
                                              <a
                                                href="page-job-detail.html"
                                                class="btn btn-success d-flex justify-content-center "
                                                style={{ width: "150px" }}
                                              >
                                                View Details
                                              </a>
                                              <ul class="list-unstyled mb-0 d-flex justify-content-end gap-2 ">
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="badge rounded-pill bg-danger float-md-end mb-3 mb-sm-0"
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    Expired
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="text-success "
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    ~Posted 4 day Ago
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-lg-12 col-md-12 col-12 mt-4 pt-2">
                                        <div class="card border-0 bg-light rounded shadow">
                                          <div class="card-body p-4">
                                            <span class="badge rounded-pill bg-success float-md-end mb-3 mb-sm-0">
                                              Part time
                                            </span>
                                            <h5 class="d-flex justify-content-start">
                                              Web Designer
                                            </h5>
                                            <div class="mt-3">
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-home"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                <a
                                                  href="#"
                                                  target="_blank"
                                                  class="text-muted"
                                                >
                                                  Bootdey.com LLC.
                                                </a>
                                              </span>
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-map-marker"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                USA
                                              </span>
                                            </div>

                                            <div class=" mt-4 d-flex justify-content-between">
                                              <a
                                                href="page-job-detail.html"
                                                class="btn btn-success d-flex justify-content-center "
                                                style={{ width: "150px" }}
                                              >
                                                View Details
                                              </a>
                                              <ul class="list-unstyled mb-0 d-flex justify-content-end gap-2 ">
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="badge rounded-pill bg-success float-md-end mb-3 mb-sm-0"
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    Active
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="text-success "
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    ~Posted 1 day Ago
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-lg-12 col-md-12 col-12 mt-4 pt-2">
                                        <div class="card border-0 bg-light rounded shadow">
                                          <div class="card-body p-4">
                                            <span class="badge rounded-pill bg-success float-md-end mb-3 mb-sm-0">
                                              Part time
                                            </span>
                                            <h5 class="d-flex justify-content-start">
                                              Web Designer
                                            </h5>
                                            <div class="mt-3">
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-home"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                <a
                                                  href="#"
                                                  target="_blank"
                                                  class="text-muted"
                                                >
                                                  Bootdey.com LLC.
                                                </a>
                                              </span>
                                              <span class="text-muted d-flex justify-content-start">
                                                <i
                                                  class="fa fa-map-marker"
                                                  aria-hidden="true"
                                                ></i>{" "}
                                                USA
                                              </span>
                                            </div>

                                            <div class=" mt-4 d-flex justify-content-between">
                                              <a
                                                href="page-job-detail.html"
                                                class="btn btn-success d-flex justify-content-center "
                                                style={{ width: "150px" }}
                                              >
                                                View Details
                                              </a>
                                              <ul class="list-unstyled mb-0 d-flex justify-content-end gap-2 ">
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="badge rounded-pill bg-danger float-md-end mb-3 mb-sm-0"
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    Expired
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    href="#"
                                                    class="text-success "
                                                    data-toggle="tooltip"
                                                    title=""
                                                    data-original-title=""
                                                  >
                                                    ~Posted 1 day Ago
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="tab-pane fade"
                                    id="nav-postfeed"
                                    role="tabpanel"
                                    aria-labelledby="nav-postfeed-tab"
                                  >
                                    <div class="row">
                                      <div class="col-xl-12 col-lg-12 col-md-12  mb-3">
                                        <div class="card">
                                          <div class="card-body">
                                            <div class="d-flex align-items-center position-relative pb-3">
                                              <div class="flex-shrink-0">
                                                <img
                                                  class="img-md rounded-circle"
                                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                  alt="Profile Picture"
                                                  loading="lazy"
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                />
                                              </div>

                                              <div class="flex-grow-1 ms-3">
                                                <span>
                                                  {" "}
                                                  <i class="bi bi-three-dots-vertical d-flex justify-content-end"></i>
                                                </span>
                                                <a
                                                  href="#"
                                                  class="h5 stretched-link btn-link d-flex justify-content-start"
                                                >
                                                  David{" "}
                                                </a>
                                                <p class="text-muted m-0 d-flex justify-content-start">
                                                  Senior WordPress Developer
                                                </p>
                                                <p class="text-muted m-0 d-flex justify-content-start">
                                                  3 min Ago{" "}
                                                  <span class="ms-2">
                                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                                    location
                                                  </span>
                                                </p>
                                              </div>
                                            </div>

                                            <p class="d-flex text-start">
                                              Lorem ipsum dolor sit amet consec tetur
                                              adipisicing elit.Lorem ipsum dolor sit
                                              amet consec tetur adipisicing elit
                                            </p>
                                            <div class="mt-3 pt-2 text-center  d-flex justify-content-start">
                                              <div class="d-flex justify-content-center gap-3">
                                                <i class="bi bi-hand-thumbs-up"></i>{" "}
                                                <input
                                                  class="form-control me-2"
                                                  type="text"
                                                  placeholder="Comment"
                                                />
                                                <h4>
                                                  <span className="bi bi-share-fill"></span>
                                                </h4>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-xl-12 col-lg-12 col-md-12  mb-3">
                                        <div class="card">
                                          <div class="card-body">
                                            <div class="d-flex align-items-center position-relative pb-3">
                                              <div class="flex-shrink-0">
                                                <img
                                                  class="img-md rounded-circle"
                                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                  alt="Profile Picture"
                                                  loading="lazy"
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                />
                                              </div>

                                              <div class="flex-grow-1 ms-3">
                                                <span>
                                                  {" "}
                                                  <i class="bi bi-three-dots-vertical d-flex justify-content-end"></i>
                                                </span>
                                                <a
                                                  href="#"
                                                  class="h5 stretched-link btn-link d-flex justify-content-start"
                                                >
                                                  David{" "}
                                                </a>
                                                <p class="text-muted m-0 d-flex justify-content-start">
                                                  Senior WordPress Developer
                                                </p>
                                                <p class="text-muted m-0 d-flex justify-content-start">
                                                  3 min Ago{" "}
                                                  <span class="ms-2">
                                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                                    location
                                                  </span>
                                                </p>
                                              </div>
                                            </div>

                                            <p class="d-flex text-start">
                                              Lorem ipsum dolor sit amet consec tetur
                                              adipisicing elit.Lorem ipsum dolor sit
                                              amet consec tetur adipisicing elit
                                            </p>
                                            <div class="mt-3 pt-2 text-center  d-flex justify-content-start">
                                              <div class="d-flex justify-content-center gap-3">
                                                <i class="bi bi-hand-thumbs-up"></i>{" "}
                                                <input
                                                  class="form-control me-2"
                                                  type="text"
                                                  placeholder="Comment"
                                                />
                                                <h4>
                                                  <span className="bi bi-share-fill"></span>
                                                </h4>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-xl-12 col-lg-12 col-md-12  mb-3">
                                        <div class="card">
                                          <div class="card-body">
                                            <div class="d-flex align-items-center position-relative pb-3">
                                              <div class="flex-shrink-0">
                                                <img
                                                  class="img-md rounded-circle"
                                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                  alt="Profile Picture"
                                                  loading="lazy"
                                                  style={{
                                                    width: "80px",
                                                    height: "80px",
                                                  }}
                                                />
                                              </div>

                                              <div class="flex-grow-1 ms-3">
                                                <span>
                                                  {" "}
                                                  <i class="bi bi-three-dots-vertical d-flex justify-content-end"></i>
                                                </span>
                                                <a
                                                  href="#"
                                                  class="h5 stretched-link btn-link d-flex justify-content-start"
                                                >
                                                  David{" "}
                                                </a>
                                                <p class="text-muted m-0 d-flex justify-content-start">
                                                  Senior WordPress Developer
                                                </p>
                                                <p class="text-muted m-0 d-flex justify-content-start">
                                                  3 min Ago{" "}
                                                  <span class="ms-2">
                                                    <i class="fas fa-map-marker-alt pr-1"></i>
                                                    location
                                                  </span>
                                                </p>
                                              </div>
                                            </div>

                                            <p class="d-flex text-start">
                                              Lorem ipsum dolor sit amet consec tetur
                                              adipisicing elit.Lorem ipsum dolor sit
                                              amet consec tetur adipisicing elit
                                            </p>
                                            <div class="mt-3 pt-2 text-center  d-flex justify-content-start">
                                              <div class="d-flex justify-content-center gap-3">
                                                <i class="bi bi-hand-thumbs-up"></i>{" "}
                                                <input
                                                  class="form-control me-2"
                                                  type="text"
                                                  placeholder="Comment"
                                                />
                                                <h4>
                                                  <span className="bi bi-share-fill"></span>
                                                </h4>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="tab-pane fade"
                                    id="nav-employees"
                                    role="tabpanel"
                                    aria-labelledby="nav-employees-tab"
                                  >
                                    <div class="row">
                                      <div class="col-xl-4 col-lg-4 col-md-4">
                                        <div class="card">
                                          <div class="card-body text-center">
                                            <img
                                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                              alt="avatar"
                                              class="rounded-circle img-fluid"
                                              style={{ width: "150px" }}
                                            />

                                            <h5 class="my-3">John Smith</h5>
                                            <p class="text-muted ">
                                              Full Stack Developer
                                            </p>
                                            <p class="text-muted ">
                                              Bay Area, San Francisco, CA
                                            </p>
                                            <div class="d-flex justify-content-center ">
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                              >
                                                View Profile
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-xl-4 col-lg-4 col-md-4">
                                        <div class="card">
                                          <div class="card-body text-center">
                                            <img
                                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                              alt="avatar"
                                              class="rounded-circle img-fluid"
                                              style={{ width: "150px" }}
                                            />

                                            <h5 class="my-3">John Smith</h5>
                                            <p class="text-muted ">
                                              Full Stack Developer
                                            </p>
                                            <p class="text-muted ">
                                              Bay Area, San Francisco, CA
                                            </p>
                                            <div class="d-flex justify-content-center ">
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                              >
                                                View Profile
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-xl-4 col-lg-4 col-md-4">
                                        <div class="card">
                                          <div class="card-body text-center">
                                            <img
                                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                              alt="avatar"
                                              class="rounded-circle img-fluid"
                                              style={{ width: "150px" }}
                                            />

                                            <h5 class="my-3">John Smith</h5>
                                            <p class="text-muted ">
                                              Full Stack Developer
                                            </p>
                                            <p class="text-muted ">
                                              Bay Area, San Francisco, CA
                                            </p>
                                            <div class="d-flex justify-content-center ">
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                              >
                                                View Profile
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="tab-pane fade"
                                    id="nav-documents"
                                    role="tabpanel"
                                    aria-labelledby="nav-documents-tab"
                                  >
                                    <ul
                                      class="nav nav-pills mb-3"
                                      id="pills-tab"
                                      role="tablist"
                                    >
                                      <li class="nav-item" role="presentation">
                                        <button
                                          class="nav-link active"
                                          id="pills-personal-tab"
                                          data-bs-toggle="pill"
                                          data-bs-target="#pills-personal"
                                          type="button"
                                          role="tab"
                                          aria-controls="pills-personal"
                                          aria-selected="true"
                                        >
                                          Professional
                                        </button>
                                      </li>
                                      <li class="nav-item" role="presentation">
                                        <button
                                          class="nav-link"
                                          id="pills-educational-tab"
                                          data-bs-toggle="pill"
                                          data-bs-target="#pills-educational"
                                          type="button"
                                          role="tab"
                                          aria-controls="pills-Educational"
                                          aria-selected="false"
                                        >
                                          Others
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </Box>
            </Box>

          </div>

        </div>

      </div>
    </div>
  );
}
export default Companypreview;
