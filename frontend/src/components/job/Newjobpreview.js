import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Dashboard/Sidebar";
import Details from "../Dashboard/Details";
import { AiOutlineArrowUp } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Newjobpreview() {


  const location = useLocation();

  const state = location.state;

  const [about, setAbout] = useState('');



  useEffect(() => {
    // console.log(state.companyId)
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/aboutcompany/${state.companyId}`)
      .then(res => setAbout(res.data.aboutCompany))
      .catch(err => console.log(err))
  }, [])



  // function to handle apply.................................






  async function applyfunction(id) {


    const data = {

      jobId: id,
      userId: localStorage.getItem("id"),
      name: localStorage.getItem("fullName"),
      email: localStorage.getItem("email")


    }

    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/applyjob`, data)
      .then((res) => {


        console.log(res)


        if (!res.data.message) {
          toast.success('applied successful', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });



        }

        if (res.data.message == "already applied") {

          toast.info('already applied to this job', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });



        }



        // setTimeout(() => {

        //     navigate('/dashboard')
        // }, 2000);


      })
      .catch(err => alert(err))





  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };








  return (
    <div>

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />

          <hr />

          <ToastContainer />

          <div>



            <div class="container-lg container-xl ">
              <div class="card ">
                <div class="card-header">
                  <h5 class="d-flex text-start">Job Preview</h5>
                </div>

                <div class="card-body">
                  <div class="row d-flex ">
                    <div class="col col-lg-9 mb-4 mb-lg-0">
                      <h3 class="lead  fw-bold d-flex text-start">Job Details</h3>
                      <hr class="mt-0 mb-4" />

                      <div class="row pt-1 ">
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">Title</h6>
                          <p class="text-muted flex text-start  ">
                            {state.title}
                          </p>
                        </div>
                        <div class="col-6">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">Location</h6>
                          <p class="text-muted flex text-start  ">{state.location}</p>
                        </div>
                        <div class="col-6  ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">
                            Experience
                          </h6>
                          <p class="text-muted flex text-start  ">{state.experienceStartFrom} years - {state.experienceEndTo} years</p>
                        </div>
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">
                            No of Vacancies
                          </h6>
                          <p class="text-muted flex text-start  ">{state.numberOfVacancies}</p>
                        </div>
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">Industry</h6>
                          <p class="text-muted flex text-start  ">{state.industry}</p>
                        </div>
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">
                            Employment Type
                          </h6>
                          <p class="text-muted flex text-start  ">{state.employmentType}</p>
                        </div>
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">
                            Functional Area
                          </h6>
                          <p class="text-muted flex text-start  ">{state.functionalArea}</p>
                        </div>
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">Skills</h6>
                          <p class="text-muted flex text-start  ">
                            {state.skills.map(e => {
                              return <span class="badge  bg-secondary p-1 mr-1">{e}</span>

                            })}
                          </p>
                        </div>
                        <div class="col-6 ">
                          <h6 class=" d-flex text-start fs-5 fw-normal ">
                            Work Type
                          </h6>
                          <p class="text-muted flex text-start  ">{state.jobType}</p>
                        </div>

                      </div>
                      <hr class="mt-0 mb-4" />
                      <div class="row">
                        <h3 class="lead fw-bold d-flex text-start mb-4">
                          <strong>Job Description</strong>
                        </h3>
                        <div class="col-lg-12 mb-4">
                          <div class="card">
                            <div class="card-body">
                              <h6 class=" d-flex text-start fs-5 fw-normal ">
                                Roles and Responsibilites
                              </h6>
                              <p class="text-muted flex text-start  ">
                                {state.RolesAndResponsibilities}
                              </p>
                              <hr />
                              <h6 class=" d-flex text-start fs-5 fw-normal ">
                                Desired Profile
                              </h6>
                              <p class="text-muted flex text-start  ">
                                {state.candidateProfile}
                              </p>
                              <hr />
                              <div class="row pt-1 ">
                                <div class="col-6 ">
                                  <h6 class=" d-flex text-start fs-5 fw-normal ">
                                    Salary
                                  </h6>
                                  <p class="text-muted flex text-start  ">{state.salaryStartFrom} LPA - {state.salaryEndTo} LPA</p>
                                </div>

                                <div class="col-6 ">
                                  <h6 class=" d-flex text-start fs-5 fw-normal ">
                                    Educational Qualification
                                  </h6>
                                  <p class="text-muted flex text-start  ">{state.educationalQualification}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row mb-4">
                          <h3 class="lead fw-bold d-flex text-start` mb-4">
                            <strong>Recruiter Details</strong>
                          </h3>
                          <div class="col-lg-6">
                            <h6 class=" d-flex text-start fs-5 fw-normal ">Name</h6>
                            <p class="text-muted flex text-start  ">{state.nameOfRecuriter}</p>
                          </div>
                          <div class="col-lg-6">
                            <h6 class=" d-flex text-start fs-5 fw-normal ">Email</h6>
                            <p class="text-muted flex text-start  ">
                              {state.emailOfRecuriter}
                            </p>
                          </div>
                          <div class="col-lg-6">
                            <h6 class=" d-flex text-start fs-5 fw-normal ">
                              Contact Details
                            </h6>
                            <p class="text-muted flex text-start  ">{state.contactDetailsOfRecuriter}</p>
                          </div>
                        </div>
                        
                        <div class="row">
                          <h3 class="lead fw-bold  d-flex text-start mb-2">
                            <strong>Company Details</strong>
                          </h3>
                          <div class="col-lg-12">
                            <div class="card">
                              <div class="card-body">
                                <h6 class=" d-flex text-start fs-5 fw-normal ">
                                  About Us
                                </h6>
                                <p class="text-muted flex text-start  ">
                                  {about}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col col-lg-3 mb-4 mb-lg-0">
                      <div class="card">
                        <div class="card-body">
                          <h3 class="lead  d-flex text-start">
                            <strong>Similar Job Pages</strong>
                          </h3>
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-start fas fa-angle-right">
                              Full time Jobs
                            </li>
                            <li class="list-group-item d-flex justify-content-start fas fa-angle-right">
                              Part time Jobs
                            </li>
                            <li class="list-group-item d-flex justify-content-start fas fa-angle-right">
                              Part time Jobs
                            </li>
                            <li class="list-group-item d-flex justify-content-start fas fa-angle-right">
                              Developer jobs
                            </li>
                            <li class="list-group-item d-flex justify-content-start fas fa-angle-right">
                              Sales field jobs
                            </li>
                            <li class="list-group-item d-flex justify-content-start fas fa-angle-right">
                              All Jobs in Hyd
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer" class="row d-flex justify-content-end">
                  <div class="col-lg-align-self-end offset-md-4 mt-4">
                    {
                      state.userId != localStorage.getItem("id") ?

                        <button class="btn btn-primary stretched-link" onClick={() => { applyfunction(state._id) }}>
                          Apply Now
                        </button>

                        : ""

                    }
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="scroll-to-top" onClick={scrollToTop}>
      <AiOutlineArrowUp /> {/* Replace with your icon */}
    </div>

    </div>
  );
}
export default Newjobpreview;
