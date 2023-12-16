import React from "react";
import { Link } from "react-router-dom";

export default function Bagver() {
  return (
    <div>
      
        <div className="container-xl container-lg mt-2 mb-7">
          <div className="card">
            <div className="card-header">
              <h5 className="d-flex text-start">Background Verification</h5>
            </div>
            <div className="card-body ">
              <div className="row">
                <i className="bi bi-three-dots-vertical d-flex justify-content-end"></i>
                <div
                  className="col-xl-2  col-lg-2"
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

                <div className="col-xl-6 col-lg-6 ">
                  <div className="row">
                    <div className="col-lg-6 d-flex  flex-lg-row   ">
                      <h6 className="  fs-12 fw-normal "> Full Name:</h6>
                      <h6 className="text-muted pl-2">Bommidi Sravana</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row  ">
                      <h6 className="  fs-6 fw-normal  "> Gender:</h6>
                      <h6 className="text-muted pl-2">Female</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row   ">
                      <h6 className="  fs-6 fw-normal "> Date of Birth:</h6>
                      <h6 className="text-muted pl-2">01-01-1999</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row  ">
                      <h6 className="  fs-6 fw-normal ">Marital Status:</h6>
                      <h6 className="text-muted pl-2">Married</h6>
                    </div>
                    <div className="col-lg-6 d-flex  flex-lg-row  ">
                      <h6 className="  fs-6 fw-normal ">Location:</h6>
                      <h6 className="text-muted pl-2">Hyderabad</h6>
                    </div>
                    <div className="col-lg-6 d-flex  flex-lg-row  ">
                      <h6 className="  fs-6 fw-normal ">Industry:</h6>
                      <h6 className="text-muted pl-2">Software</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row  ">
                      <h6 className="  fs-6 fw-normal ">Education:</h6>
                      <ul>
                        <li className="text-start text-muted">M-tech</li>

                        <li className="text-start text-muted">
                          Osmania university of College
                        </li>
                        <li className="text-start text-muted">2015 to 2019</li>
                      </ul>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row   ">
                      <h6 className="  fs-6 fw-normal ">Experience:</h6>
                      <ul>
                        <li className="text-start text-muted">
                          Front-end Developer
                        </li>
                        <li className="text-start text-muted">
                          Karands Company
                        </li>
                        <li className="text-start text-muted">Hyd location</li>
                        <li className="text-start text-muted">
                          March-13th to till working
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className=" d-flex col-xl-3 col-lg-3">
                  <div className="row">
                    <div className="card mt-2">
                      <div className=" card-header d-flex  flex-lg-row align-items-around">
                        <h5 className="text-start">Documents Uploaded </h5>
                        <a
                          href="#"
                          className="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                          style={{ textDecoration: "none" }}
                        >
                          View
                        </a>
                      </div>
                      <h6 className="text-start mt-3 ">Personal Documents</h6>
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

                <div className="mt-4 pt-2  ms-3 text-center  d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Read Task
                    </button>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
                        style={{ display: "flex", top: "5%", bottom: "30%" }}
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Modal title
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>

                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-danger me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#notesModal"
                    >
                      Notes
                    </button>
                    <div
                      class="modal fade"
                      id="notesModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
                        style={{ display: "flex", top: "5%", bottom: "30%" }}
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Modal title
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>

                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                   <p>Assigned to <Link>Some User Name</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
