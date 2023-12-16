import React from "react";
import { Link } from "react-router-dom";

export default function AffAdds() {
  return (
    <div>
      <div className="container-lg mt-1">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card" style={{ borderRadius: "15px", marginTop:'5px'}}>
              <div class="card-body p-4">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="d-flex  text-black">
                      <div class="flex-shrink-0">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                          alt="Generic placeholder image"
                          class="img-fluid"
                          style={{ width: "80px", borderRadius: "10px" }}
                        />
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5 class="mb-1 d-flex justify-content-start">
                          Sravana
                        </h5>
                        <p
                          class="mb-1  d-flex justify-content-start "
                          style={{ color: "#2b2a2a" }}
                        >
                          Frontend Developer
                        </p>
                        <div class="d-flex flex-lg-row ">
                          <p
                            class="mb-2 pb-1 d-flex justify-content-start"
                            style={{ color: "#2b2a2a" }}
                          >
                            <i className="fas fa-map-marker-alt mt-1"></i>
                            Hyderabad
                          </p>
                          <p class="ms-3">~3 mints ago</p>
                        </div>
                      </div>
                      <i className="bi bi-three-dots-vertical d-flex justify-content-end"></i>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-lg-12">
                      <h6 className="d-flex justify-content-start text-start">
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
                      </h6>
                    </div>
                  </div>
                  <div class="row mt-2 ">
                    <div class="col-lg-12  d-flex justify-content-center align-items-center ">
                      <div class="card border-0  ">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/new/standard/nature/182.webp"
                          class="card-img-top"
                          alt="Sunset Over the Sea"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card border-0">
                        <div className="mt-4 pt-2  mb-3 ms-3 text-center  d-flex justify-content-between align-items-center">
                          <div className="d-flex justify-content-center gap-3">
                            <button
                              type="button"
                              className="btn btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#adsreadtaskModal"
                            >
                              Read Task
                            </button>

                            <div
                              class="modal fade"
                              id="adsreadtaskModal"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
                                style={{
                                  display: "flex",
                                  top: "5%",
                                  bottom: "30%",
                                }}
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1
                                      class="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
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
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s, when an
                                      unknown printer took a galley of type and
                                      scrambled it to make a type specimen book.
                                      It has survived not only five centuries,
                                      but also the leap into electronic
                                      typesetting, remaining essentially
                                      unchanged. It was popularised in the 1960s
                                      with the release of Letraset sheets
                                      containing Lorem Ipsum passages, and more
                                      recently with desktop publishing software
                                      like Aldus PageMaker including versions of
                                      Lorem Ipsum.
                                    </p>

                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s, when an
                                      unknown printer took a galley of type and
                                      scrambled it to make a type specimen book.
                                      It has survived not only five centuries,
                                      but also the leap into electronic
                                      typesetting, remaining essentially
                                      unchanged. It was popularised in the 1960s
                                      with the release of Letraset sheets
                                      containing Lorem Ipsum passages, and more
                                      recently with desktop publishing software
                                      like Aldus PageMaker including versions of
                                      Lorem Ipsum.
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
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                    >
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
                              data-bs-target="#adsnotesModal"
                            >
                              Notes
                            </button>
                            <div
                              class="modal fade"
                              id="adsnotesModal"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
                                style={{
                                  display: "flex",
                                  top: "5%",
                                  bottom: "30%",
                                }}
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1
                                      class="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
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
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s, when an
                                      unknown printer took a galley of type and
                                      scrambled it to make a type specimen book.
                                      It has survived not only five centuries,
                                      but also the leap into electronic
                                      typesetting, remaining essentially
                                      unchanged. It was popularised in the 1960s
                                      with the release of Letraset sheets
                                      containing Lorem Ipsum passages, and more
                                      recently with desktop publishing software
                                      like Aldus PageMaker including versions of
                                      Lorem Ipsum.
                                    </p>

                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry. Lorem
                                      Ipsum has been the industry's standard
                                      dummy text ever since the 1500s, when an
                                      unknown printer took a galley of type and
                                      scrambled it to make a type specimen book.
                                      It has survived not only five centuries,
                                      but also the leap into electronic
                                      typesetting, remaining essentially
                                      unchanged. It was popularised in the 1960s
                                      with the release of Letraset sheets
                                      containing Lorem Ipsum passages, and more
                                      recently with desktop publishing software
                                      like Aldus PageMaker including versions of
                                      Lorem Ipsum.
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
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                    >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
