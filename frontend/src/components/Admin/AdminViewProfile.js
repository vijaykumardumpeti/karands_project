import React from 'react'
import './adminviewprofile.css';

export default function AdminViewProfile() {
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="profile-card-4 z-depth-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="user-box">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar" />
                                </div>
                                <h5 className="mb-1">Jhon Doe</h5>
                                <h6 className="">UI/UX Engineer</h6>
                            </div>
                            <div className="card-body">
                                <ul className="list-group shadow-none">
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-phone-square"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>9910XXXXXX</span>
                                            <small>Mobile Number</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>info@example.com</span>
                                            <small>Email Address</small>
                                        </div>
                                    </li>

                                </ul>
                                <div className="row text-center mt-4">
                                    {/* <div className="col p-2">
                                            <h4 className="mb-1 line-height-5">154</h4>
                                            <small className="mb-0 font-weight-bold">Projects</small>
                                           </div>*/}
                                    <div className="col p-2">
                                        <h4 className="mb-1 line-height-5">2.2k</h4>
                                        <small className="mb-0 font-weight-bold">Followers</small>
                                    </div>
                                    <div className="col p-2">
                                        <h4 className="mb-1 line-height-5">9.1k</h4>
                                        <small className="mb-0 font-weight-bold">Views</small>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <a href="" className="btn-social btn-facebook waves-effect waves-light m-1"><i className="fa fa-facebook"></i></a>
                                <a href="" className="btn-social btn-google-plus waves-effect waves-light m-1"><i className="fa fa-google-plus"></i></a>
                                <a href="" className="list-inline-item btn-social btn-behance waves-effect waves-light"><i className="fa fa-behance"></i></a>
                                <a href="" className="list-inline-item btn-social btn-dribbble waves-effect waves-light"><i className="fa fa-dribbble"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="card z-depth-3">
                        <div className="card-body">
                            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-edit-tab" data-bs-toggle="pill" data-bs-target="#pills-edit" type="button" role="tab" aria-controls="pills-edit" aria-selected="false">Edit Your Profile</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                            <div className="row  ">
                                                <h5 className="mb-4 text-uppercase d-flex justify-content-start"><i className="mdi mdi-account"></i>
                                                    About</h5>
                                                <div className="col-6 " >
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>Full Name : <span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>

                                                <div className="col-6  ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>User Name :<span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>
                                                <div className="col-6 ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>Email :<span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>
                                                <div className="col-6 ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>State :<span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>
                                                <div className="col-6 ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>Birthday :<span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>

                                                <div className="col-6 ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>Location :<span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>
                                                <div className="col-6 ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>Mobile Number : <span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>
                                                <div className="col-6 ">
                                                    <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                                        marginTop: "15px"
                                                    }}>Address : <span style={{ color: "gray", marginLeft: "3px" }}></span></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="pills-edit" role="tabpanel" aria-labelledby="pills-edit-tab">
                                    <form>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Full Name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Username</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Mobile Number</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="tel"  />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="email"  />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Change profile</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="file" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Date of Birth</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="date" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Location</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value="" placeholder="Location" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                            <div className="col-lg-3">
                                                <input className="form-control" type="text" value="" />
                                            </div>
                                            <div className="col-lg-3">
                                                <input className="form-control" type="text" value=""  />
                                            </div>
                                            <div className="col-lg-3">
                                                <input className="form-control" type="text" value=""  />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div>
                                                <button type="button" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
