import React, { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import ShortListed from "./ShortListed";
import axios from "axios"
import PostTimeDifference from "../TimeCalculation/PostTimeDifference";
import Details from "../Dashboard/Details";
import Sidebar from "../Dashboard/Sidebar";
import Appliedllst from "./appliedllst";
import Loader from "../Dashboard/Loader";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Select from 'react-select';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const options = [

  { value: 'Saved Job', label: 'Saved Job' },
  { value: 'Active Job', label: 'Active Job' },
  { value: 'Referal Job', label: 'Referal Job' },
  { value: 'Expeired Job', label: 'Expeired Job' },
  { value: 'Rcruitment Job', label: 'Rcruitment Job' },
];

export default function MyPostedJobs() {

  //.......... this is for post job card 3dots menu icon........
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ...............
  const [selectedOption, setSelectedOption] = useState(null);

  const [details, setDetails] = useState([])
  const [view, setView] = useState({})

  const [isLoading, setLoading] = useState(true);



  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/myjobs/${localStorage.getItem("id")}`)
      .then(res => {
        setDetails(res.data.details);
        // Make sure to set the view state after receiving the data
        if (res.data.details.length > 0) {
          setView(res.data.details[0]);
        }
      })
      .catch(err => console.log(err)).finally(() => {
        setLoading(false); // Mark loading as false regardless of success or error
      });
  }, []);



  // expire job.......... in the list........................



  async function expirejob(id) {

    const data = {
      expire: true,
      jobId: id
    }



    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/expirejob`, data)
      .then(res => {

        console.log(res.data)

        alert("Job got expired. Reloading the page...");
        window.location.reload();



      })
      .catch(err => console.log(err))
  }


  // renew a job......................................................



  async function renewjob(id) {

    const data = {
      expire: false,
      jobId: id
    }



    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/expirejob`, data)
      .then(res => {

        console.log(res.data)

        alert("Job got renewed and it will show to public. Reloading the page...");
        window.location.reload();



      })
      .catch(err => console.log(err))
  }







  return (

    <div className="row flex-nowrap" style={{ width: "100%" }}>
      <Sidebar userPage='dashboard' style={{ height: "100%" }} />
      <div className="col container" style={{ maxWidth: "100%" }}>
        <Details />

        <hr />


        {isLoading ? (



          <Loader />

          // Show a loader while loading
        ) : (
          <div >
            <Box sx={{ display: 'flex' }}>
              {/* <ICHPDashboard /> */}
              <Box component="main" sx={{ width: "100%" }}>


                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex flex-start">
                        <Button style={{ backgroundColor: "rgb(3, 104, 104)", color: "whitesmoke" }} startIcon={<SwapVertIcon />}>
                          Sort by
                        </Button>
                      </div>

                    </div>
                    <div className="col-6">
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Select
                          className="w-50"
                          placeholder="Select Job"
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        />
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4" style={{ height: '700px', overflow: 'auto' }}>
                      {

                        details.length > 0 ?
                          details.map((data, index) => {


                            return (

                              <div onClick={() => setView(data)} style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>

                                <div className="card p-1 mb-2">
                                  <div className="card-header" style={{ display: "flex", justifyContent: "space-between" }}>

                                    <div className="text-start">
                                      <h5>{data.title ? data.title : ""}</h5>
                                    </div>
                                    <div>




                                      <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                      >
                                        <BiDotsVerticalRounded />
                                      </IconButton>


                                      <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}

                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                      >
                                        <MenuItem onClick={handleClose}>
                                          Edit
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                          View
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                          Remove
                                        </MenuItem>




                                      </Menu>

                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <div className="row">
                                      <div className="col-12 d-flex flex-start">
                                        <PostTimeDifference postDateFromMongoDB={data.postedTime} />
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-12 mt-2">
                                        <p className="text-start" >
                                          {data.companyName ? data.companyName : ""} | {data.salaryStartFrom} LPA- {data.salaryEndTo} LPA | {data.location}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="text-start py-2">
                                          <b >Skills: </b>
                                          {data.skills.map(e => {
                                            return (<span className="badge bg-secondary p-1 mr-1">{e}</span>)

                                          })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12">
                                        <div className="text-start">
                                          <b>job role :</b><p>static job role</p>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-12">
                                        <div
                                          className="d-flex"
                                          style={{ display: "flex", textAlign: "start" }}
                                        >
                                          <p>
                                            <b>Job description :</b>{
                                              data.RolesAndResponsibilities
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex mt-3"
                                      style={{ justifyContent: "space-between" }}
                                    >

                                      {/* {data.expirejob&&
                                       data.expirejob.status==true?
  
                                       <div style={{display:"flex"}}>
                                        <button className="btn btn-outline-success">Renew Job</button>
                                          </div>
                                           :""
  
                                           } */}
                                    </div>
                                  </div>
                                </div>







                              </div>
                            )
                          })


                          : "no posted jobs"}

                    </div>
                    {console.log("view..............", view)}
                    {

                      view.title ?

                        <div className="col-8">
                          <div className="row" style={{ backgroundColor: "white", padding: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "10px", marginTop: "10px", }} >
                            <div className="col-8" >
                              <div className="d-flex mt-1">
                                <h4>{view.title ? view.title : ""}</h4>

                                {view.expirejob && view.expirejob.status === true ? (
                                  <span className="text-warning mt-3 ms-3">
                                    <strong>Expired</strong>
                                  </span>
                                ) : (
                                  <span className="text-success mt-3 ms-3">
                                    <strong>Active</strong>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-4">
                              <div>
                                {view.expirejob && view.expirejob.status === true ? (
                                  <button className="btn btn-outline-secondary me-1" onClick={() => { renewjob(view._id) }}>
                                    Renew job
                                  </button>
                                ) : (
                                  <button className="btn btn-outline-secondary me-1" onClick={() => { expirejob(view._id) }}>
                                    Expire Job
                                  </button>
                                )}

                                <button className="btn btn-outline-secondary me-1">
                                  <span className="bi bi-share"></span>
                                </button>
                                <button className="btn btn-outline-secondary">
                                  <span className="bi bi-three-dots-vertical fs-6"></span>
                                </button>
                              </div>
                            </div>
                            <div>
                              <div>
                                <div className="d-flex mt-2">
                                  {view.companyName} | {view.salaryStartFrom} LPA- {view.salaryEndTo} LPA | {view.location}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="post-job">

                            <div className="container-xl container-lg container-md">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-lg-12 mb-4">
                                      <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                          <button className="nav-link active" id="nav-applied-tab" data-bs-toggle="tab" data-bs-target="#nav-applied" type="button" role="tab" aria-controls="nav-applied" aria-selected="true">Applied</button>
                                          <button className="nav-link" id="nav-shortlisted-tab" data-bs-toggle="tab" data-bs-target="#nav-shortlisted" type="button" role="tab" aria-controls="nav-shortlisted" aria-selected="false">Shortlisted</button>
                                        </div>
                                      </nav>
                                      <div className="tab-content" id="nav-tabContent" >


                                        <div className="tab-pane fade show active bg-light" id="nav-applied" role="tabpanel" aria-labelledby="nav-applied-tab">
                                          <Appliedllst jobId={view._id} />
                                        </div>
                                        <div className="tab-pane fade bg-light " id="nav-shortlisted" role="tabpanel" aria-labelledby="nav-shortlisted-tab">
                                          <ShortListed jobId={view._id} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div> : ""

                    }




                  </div>
                </div>
              </Box>
            </Box>

          </div>

        )}



      </div>

    </div>


  );
}
