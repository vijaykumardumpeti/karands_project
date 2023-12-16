import React from 'react';
import './group.css';
import companyLogo from '../../assets/maleploceholder.jpg'

export default function Group() {



  return (
    <div>
      <div className="container-fluid" style={{ backgroundColor: '#eee', width: '100%' }}>
        <div className="d-flex flex-start">
         <h6 className='mt-2'>No of Groups : 10 </h6>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="people-nearby">
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src={companyLogo}
                      alt="user"
                      className="profile-photo-md"
                      style={{height: "200px",width: "200px"}}
                    />
                  </div>
                  <div
                    className="col-md-8 col-sm-8"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        ABC company Group
                      </a>
                    </h5>
                    {/*<p>Software Engineer</p>*/}
                    <p className="text-muted"> 60 members</p>
                  </div>
                  <div
                    className="col-md-2 col-sm-2"
                    style={{ justifyContent: "start" }}
                  >
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>
                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        XYZ Company Group
                      </a>
                    </h5>
                    {/* <p>Model at Fashion</p>*/}
                    <p className="text-muted">150 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>
                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar5.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        Another MNC Group
                      </a>
                    </h5>
                    {/*<p>Writer at Newspaper</p>*/}
                    <p className="text-muted">75 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>
                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        One more company Group
                      </a>
                    </h5>
                    {/* <p>Student</p>*/}
                    <p className="text-muted"> 60 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>
                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        HCL mnc Group
                      </a>
                    </h5>
                    {/* <p>Barber at Fashion</p>*/}
                    <p className="text-muted">200 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>
                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        TCS company Group
                      </a>
                    </h5>
                    {/*<p>Fashion Designer</p>*/}
                    <p className="text-muted">500 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>
                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        Tech Mahindra group
                      </a>
                    </h5>
                    {/*<p>Creative Director</p>*/}
                    <p className="text-muted">460 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>

                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        Cognizent Group
                      </a>
                    </h5>
                    {/* <p>Executive Officer</p>*/}
                    <p className="text-muted">350 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>

                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        IVY Comptech Sol. Group
                      </a>
                    </h5>
                    {/* <p>Designer at Designer</p>*/}
                    <p className="text-muted">250 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>

                  </div>
                </div>
              </div>
              <div
                className="nearby-user"
                style={{
                  border: "1px solid white",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-7"
                    style={{ textAlign: "start" }}
                  >
                    <h5>
                      <a
                        href="#"
                        className="profile-link"
                        style={{ textDecoration: "none" }}
                      >
                        Infosys Group
                      </a>
                    </h5>
                    {/* <p>General Manager at Manager</p>*/}
                    <p className="text-muted">380 members</p>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className=" mt-4"><span className="bi bi-three-dots"></span></div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}
