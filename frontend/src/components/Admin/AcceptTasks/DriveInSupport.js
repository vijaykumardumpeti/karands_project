import React from "react";
import myImage from "../../../../src/logo.svg";

export default function DriveInSupport() {
  return (
    <div className="container-xl container-lg mt-2">
      <div className="card">
        <div className="card-header">
          <h5 className="d-flex text-start">Drive-in-Support</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <span>
              <i className="bi bi-three-dots-vertical d-flex justify-content-end"></i>
            </span>
            <div
              className="col-xl-2  col-lg-2 d-flex justify-content-center"
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "white",
                marginRight: "22px",
                marginLeft: "22px",
              }}
            >
              <img src={myImage}></img>
            </div>
            <div className=" col-xl-8 col-lg-8">
              <div className="row">
                <div className="col-lg-12 d-flex  flex-lg-row   ">
                  <h4 className="  fs-12 fw-normal ">
                    {" "}
                    Karands Business Solutions
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 d-flex  flex-lg-row mt-2 ">
                  <h6>Recruiter:</h6>
                  <h6 className="text-muted pl-2">Dev Singh</h6>
                </div>
                <div className="col-lg-6 d-flex  flex-lg-row mt-2 ">
                  <h6>Required Support HR:</h6>
                  <h6 className="text-muted pl-2">3</h6>
                </div>
                <div className="col-lg-6 d-flex  flex-lg-row mt-2  ">
                  <h6 className="  fs-12 fw-normal "> No of Positions:</h6>
                  <h6 className="text-muted pl-2">10</h6>
                  <a
                    href="#"
                    class="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    View Job Details
                  </a>
                </div>
                <div className="col-lg-6 d-flex  flex-lg-row mt-2 ">
                  <h6 className="  fs-12 fw-normal "> Industry:</h6>
                  <h6 className="text-muted pl-2">
                    Automobiles, FMCG, Software
                  </h6>
                </div>
                <div className="col-lg-6 d-flex  flex-lg-row  mt-2 ">
                  <h6 className="  fs-12 fw-normal "> Location:</h6>
                  <h6 className="text-muted pl-2">Hyderabad</h6>
                </div>
                <div className="col-lg-6 d-flex  flex-lg-row  mt-2 ">
                  <h6 className="  fs-12 fw-normal ">Date:</h6>
                  <h6 className="text-muted pl-2">
                    10th May-2023, 11th May-2023, 12th May-2023
                  </h6>
                </div>
                <div className="col-lg-6 d-flex  flex-lg-row  mt-2 ">
                  <h6 className="  fs-12 fw-normal ">Venue:</h6>
                  <div className="d-flex flex-column">
                    <h6 className="text-muted  text-start pl-2">Madhapur</h6>
                    <h6 className="text-muted text-start pl-2">
                      Near Kavuri hills
                    </h6>
                    <h6 className="text-muted text-start pl-2">Co-Work Zone</h6>
                    <h6 className="text-muted text-start pl-2">Hyderabad</h6>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="mt-4 pt-2  ms-3 text-center  d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#companydetailsModal"
              >
                Read Task
              </button>

              <div
                class="modal fade"
                id="companydetailsModal"
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
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>

                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
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
                data-bs-target="#companynotesModal"
              >
                Notes
              </button>
              <div
                class="modal fade"
                id="companynotesModal"
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
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>

                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
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
              <button type="button" className="btn btn-success me-3">
                Accept
              </button>
              <button type="button" className="btn btn-danger me-3">
                Decline
              </button>
            </div>
          </div>
          <hr className="mt-3" />
        </div>
      </div>
    </div>
  );
}
