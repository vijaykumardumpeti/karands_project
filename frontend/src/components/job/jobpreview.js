import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Dashboard/Sidebar";
import Details from "../Dashboard/Details";
import { AiOutlineArrowUp } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Jobpreview() {


    const navigate = useNavigate()

    
    const [about, setAbout] = useState('');

    const [jobDetails, setJobDetails] = useState([]);
  
    const params = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const jobResponse = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/getjobbyid/${params.query}`);
          if (jobResponse.data.details) {
            setJobDetails(jobResponse.data.details[0]);
            const aboutCompanyResponse = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/aboutcompany/${jobResponse.data.details[0].companyId}`);
            if (aboutCompanyResponse.data.aboutCompany) {
              setAbout(aboutCompanyResponse.data);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [params.query]);
  







console.log("jobDetails",jobDetails)



console.log("about",about)







  
    // function to handle apply
  
  
  
  
  
  
    async function applyfunction(id) {
  


if(!localStorage.getItem("id")){
    navigate("/")

return
}





  
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
        
            <div className="col container" style={{ maxWidth: "100%" }}>
           
    
              <ToastContainer />
    {
        jobDetails?
        
        <div>
    
    
    
        <div class="container-lg container-xl ">
          <div class="card ">
            <div class="card-header">
              <h5 class="d-flex text-start">Job Preview</h5>

              <h6>Company Name:- {about.nameOfCompany?about.nameOfCompany:""}</h6>
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
                        {jobDetails.title}
                      </p>
                    </div>
                    <div class="col-6">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">Location</h6>
                      <p class="text-muted flex text-start  ">{jobDetails.location}</p>
                    </div>
                    <div class="col-6  ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">
                        Experience
                      </h6>
                      <p class="text-muted flex text-start  ">{jobDetails.experienceStartFrom} years - {jobDetails.experienceEndTo} years</p>
                    </div>
                    <div class="col-6 ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">
                        No of Vacancies
                      </h6>
                      <p class="text-muted flex text-start  ">{jobDetails.numberOfVacancies}</p>
                    </div>
                    <div class="col-6 ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">Industry</h6>
                      <p class="text-muted flex text-start  ">{jobDetails.industry}</p>
                    </div>
                    <div class="col-6 ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">
                        Employment Type
                      </h6>
                      <p class="text-muted flex text-start  ">{jobDetails.employmentType}</p>
                    </div>
                    <div class="col-6 ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">
                        Functional Area
                      </h6>
                      <p class="text-muted flex text-start  ">{jobDetails.functionalArea}</p>
                    </div>
                    <div class="col-6 ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">Skills</h6>
                      <p class="text-muted flex text-start  ">
                        {jobDetails.skills&&jobDetails.skills.map(e => {
                          return <span class="badge  bg-secondary p-1 mr-1">{e}</span>

                        })}
                      </p>
                    </div>
                    <div class="col-6 ">
                      <h6 class=" d-flex text-start fs-5 fw-normal ">
                        Work Type
                      </h6>
                      <p class="text-muted flex text-start  ">{jobDetails.jobType}</p>
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
                            {jobDetails.RolesAndResponsibilities}
                          </p>
                          <hr />
                          <h6 class=" d-flex text-start fs-5 fw-normal ">
                            Desired Profile
                          </h6>
                          <p class="text-muted flex text-start  ">
                            {jobDetails.candidateProfile}
                          </p>
                          <hr />
                          <div class="row pt-1 ">
                            <div class="col-6 ">
                              <h6 class=" d-flex text-start fs-5 fw-normal ">
                                Salary
                              </h6>
                              <p class="text-muted flex text-start  ">{jobDetails.salaryStartFrom} LPA - {jobDetails.salaryEndTo} LPA</p>
                            </div>

                            <div class="col-6 ">
                              <h6 class=" d-flex text-start fs-5 fw-normal ">
                                Educational Qualification
                              </h6>
                              <p class="text-muted flex text-start  ">{jobDetails.educationalQualification}</p>
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
                        <p class="text-muted flex text-start  ">{jobDetails.nameOfRecuriter}</p>
                      </div>
                      <div class="col-lg-6">
                        <h6 class=" d-flex text-start fs-5 fw-normal ">Email</h6>
                        <p class="text-muted flex text-start  ">
                          {jobDetails.emailOfRecuriter}
                        </p>
                      </div>
                      <div class="col-lg-6">
                        <h6 class=" d-flex text-start fs-5 fw-normal ">
                          Contact Details
                        </h6>
                        <p class="text-muted flex text-start  ">{jobDetails.contactDetailsOfRecuriter}</p>
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
                              {about.aboutCompany}
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
                  jobDetails.userId != localStorage.getItem("id") ?

                    <button class="btn btn-primary stretched-link" onClick={() => { applyfunction(jobDetails._id) }}>
                      Apply Now
                    </button>

                    : ""

                }
              </div>

            </div>
          </div>

        </div>

      </div>
        :""
    }
             
    
            </div>
    
          </div>
    
          <div className="scroll-to-top" onClick={scrollToTop}>
          <AiOutlineArrowUp /> {/* Replace with your icon */}
        </div>
    
        </div>
      );
}
