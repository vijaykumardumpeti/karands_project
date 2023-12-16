import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Sidebar from './Sidebar';
import Details from './Details';
import ObjSurveyBox from '../objSurvey/ObjSurveyBox';
import { useNavigate, Link } from 'react-router-dom';
import { Fragment } from 'react';
// import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MyContext from '../../mycontext';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-bootstrap';
import Loader from './Loader'
import 'bootstrap/dist/css/bootstrap.min.css';
import './viewprofile.css'
import { AiOutlineArrowUp } from "react-icons/ai";

import ShareIcon from '@mui/icons-material/Share';
import LoaderBar from './LoaderBar';








export default function Sharedprofile() {


    const params = useParams();

    const { handleclickdiv, profilepicfunction } = useContext(MyContext)
  
  
  
    const colorsVerification = {
      verified: 'green',
      underVerification: 'rgb(255, 193, 7)',
      notVerified: 'red',
      complete: 'black',
      incomplete: 'blue',
  
    }
  
  
    const [verificationDetails, setVerification] = useState({})
    const [details, setDetails] = useState({});
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([])
    const [certificates, setCertificates] = useState([]);
    const [socialLinksDetail, setSocialLinkDetails] = useState({
    })
  
  
  
  
    const [userrating,setuserrating]=useState("")
  
  
    const [userId, setuserId] = useState("")
  
    const [connected, setconnected] = useState("")
  
    const [isFollowing, setIsFollowing] = useState(false)
    const navigate = useNavigate()
  
  
    const [isLoading, setLoading] = useState(true);
  
  
    useEffect(() => {
  

  
  
        setuserId(params.userId)

        if(localStorage.getItem('id')){
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/checkconnection/${localStorage.getItem('id')}/${params.userId}`)
            .then(res => {
              setconnected(res.data.isFriend)
            }).catch(err => console.log(err));
        }

    
  
        
  
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${params.userId}`)
  
          .then(res => {
            const roles = res.data.details;
  
          
            setDetails(roles)
            setEducation(roles.education);
            setSkills(roles.skills);
            setExperience(roles.JobExperience);
            setProjects(roles.projectInfo);
            setCertificates(roles.certificationINfo);
  
            setSocialLinkDetails({
              faceBookLink: roles.faceBookLink,
              twitterLinks: roles.twitterLinks,
              linkedInLink: roles.linkedInLink,
              instagramLink: roles.instagramLink,
              gitHubLink: roles.gitHubLink,
              otherLinks: roles.otherLinks,
  
            })
  
            CalculateRating(roles)
          })
  
          .catch(err => console.log(err)).finally(() => {
            setLoading(false); // Mark loading as false regardless of success or error
          });
  
  
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/verification/${params.userId}`)
          .then(res => setVerification(res.data))
          .catch(error => console.log(error))
      
  

    }, [])
  
  
  
   
  
  
    // ..............................
  
  
    function decline(id) {


        if(!localStorage.getItem("id")){

            navigate("/")
        return
        }



      axios.patch(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/deleteRequest`, {
        senderid: id,
        receiverid: localStorage.getItem("id")
      })
        .then(res => {
  
  
          setIsFollowing(false);
  
          toast.info('connection is withdrawed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
  
        })
        .catch(err => console.log(err)).finally(() => {
          setLoading(false); // Mark loading as false regardless of success or error
        });
    }
  
  
  
  
    const tooltip = (text) => (
      <Tooltip id="verification-tooltip" >
        <div >
          <span className="text-success">
            <i className="bi bi-check-circle"></i> Verified
          </span>
          <br />
          <span className="text-danger">
            <i className="bi bi-x-circle"></i> Not Verified
          </span>
          <br />
          <span className="text-primary">
            <i className="bi bi-circle"></i> Under Verification
          </span>
          <br />
          <span className="text-primary">
            <i className="bi bi-circle"></i> <u>Verification optional</u>
          </span>
          <br />
          <span className="text-info">
            <i className="bi bi-file-check"></i> Complete Documents
          </span>
          <br />
          <span className="text-warning">
            <i className="bi bi-file-exclamation"></i> Incomplete Documents
          </span>
        </div>
      </Tooltip>
    );
  
  
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling animation
      });
    };
  
  
  
  
  
  
  
  
  
  // function to calculate rating ..................
  
  
  
  function CalculateRating(details) {
    let totalValue = 0;
  
    if (details.aadharCard && details.panCard) {
      totalValue += 10;
    }
  
    if (details.education) {
      let educationScore = 0;
  
      // Calculate education score
      details.education.forEach((data) => {
        if (data.qualification === "Bachelor's Degree") {
          educationScore += 10;
        } else if (data.qualification === "Master's Degree") {
          educationScore += 10;
        } else if (data.qualification === "High School Diploma or Equivalent") {
          educationScore += 10;
        }
      });
  
      // The maximum value of this section is 20
      const finalEducationScore = Math.min(educationScore, 20);
      totalValue += finalEducationScore;
    }
  
    // Add values based on the number of skills
    if (details.skills && details.skills.length > 0) {
      if (details.skills.length >= 5) {
        totalValue += 10;
      }
      if (details.skills.length >= 10) {
        totalValue += 10;
      }
    }
  
  
    if(details.JobExperience){
  
  
      
  
    }
  
    console.log("totalValue",totalValue)
  
    setuserrating(totalValue);
  }
  
  
  
  
  
  

  
  
  
  








    return (
        <div>
          {isLoading ? (
    
    
            <Fragment>
              <Loader />
            </Fragment>
            // Show a loader while loading
          ) : (
            <div className="row flex-nowrap" style={{ width: "100%", height: "100%" }}>
            
              <div className="col container" style={{ maxWidth: "80%" }}>
             
    
                <Fragment>
    
                  <div className="container-lg container-xl "
                    style={{ backgroundColor: "#F0F0F0", height: "95%", overflow: "scroll", marginTop: "20px", overflowX: "hidden", marginLeft: "30px" }}
                  >
    
                    <div className="card ">
    
    
                      <div className="card-header">
    
                        {/* <h5 className="d-flex text-start">User Profile</h5> */}
    
    
        <ShareIcon style={{position:"absolute",right:"10px",top:"2px",cursor:"pointer"}}/>
                        
                      </div>
    
    
    
                      <div className="card-body"  >
                        <div className="row">
                          <div className="col-lg-4 col-xl-4">
    
                            <div className="card-box text-center">
    
                              <div className="d-inline-flex position-relative" >
    
                                {
                                  details.profilepicture ?
    
                                    <img src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${details.profilepicture}`} className=" avatar-xl img-thumbnai " alt="profileImage" style={{ borderRadius: '50%', width: '120px', height: '120px' }} />
                                    :
    
                                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className=" avatar-xl img-thumbnai " alt="profileImage" style={{ borderRadius: '50%', width: '120px', height: '120px' }} />
                                }
    
                              </div>
    
    
                              <h4 className="mb-0">{details.fullName ? details.fullName : details.name}</h4>
                              <p className="text-muted">{details.designation}</p>
    
                              <p className="text-muted">{experience[0]?.["companyName"]}</p>
    
                              <h6>Role:{details.role ? details.role : ""}</h6>
    
                              <p className="text-muted">{experience[0]?.["locationOfCompany"]}</p>


                              {/* in future we need to dothis */}
    
                   {/* <LoaderBar value={userrating}/> */}
                     

                          {/* in future we need to dothis */}
    
                              {
                                // params.userId != localStorage.getItem("id") && params.userId && connected == false ?
                                //   <Fragment>
    
                                //     {!isFollowing && (
                                //       <button
                                //         type="button"
                                //         className="btn btn-success btn-xs waves-effect mb-2 waves-light"
                                //         onClick={() => {
                                //           addFriend(params.userId);
                                //         }}
                                //       >
                                //         connect
                                //       </button>
                                //     )}
    
    
                                //     {isFollowing && (
                                //       <button
                                //         type="button"
                                //         className="btn btn-danger btn-xs waves-effect mb-2 waves-light"
                                //         onClick={(e) => {
                                //           decline(params.userId);
                                //         }}
                                //       >
                                //         Withdraw
                                //       </button>
                                //     )}
    
                                //     {/* {
                                //       connected == true ? */}
    
                                //     {/* <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light" onClick={(e) => { handleclickdiv(e, { "_id": params.userId, "name": details.fullName ? details.fullName : details.name }) }}>Message</button> */}
                                //     {/* // : ""} */}
                                //   </Fragment>
                                //   : ""
                              }
    
                              {
    
    localStorage.getItem('id')&&params.userId && params.userId != localStorage.getItem('id') ? (

<>
 {/* <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light" onClick={(e) => { handleclickdiv(e, { "_id": params.userId, "name": details.fullName ? details.fullName : details.name }) }}>Message</button> */}

</>
    
                         
                               
                                  ) : ""
                              }
    
    
    
                              <div className="text-left mt-3">
                                <h4 className="font-13 text-uppercase m-2 ">About:</h4>
                                <p className="text-muted font-13 mb-3 m-2">
                                  {details.about}
                                </p>
                                <p className="text-muted mb-1 font-13 m-2"><strong>Company Location :</strong>
                                  <span className="ml-2">{experience[0]?.["locationOfCompany"]}</span></p>
                              </div>
    
    
                              <ul className="list-group" style={{ textAlign: "left" }}>
                                <li className="list-group-item" style={{ zIndex: "0", backgroundColor: "rgb(3, 104, 104)", color: "whitesmoke" }}>Documents Upload Status <IconButton onClick={handleClick}
                                  size="small"
                                  sx={{ ml: 2 }}
                                  aria-controls={open ? 'account-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined} style={{ backgroundColor: "rgb(3, 104, 104)", color: "whitesmoke" }} > <FaInfoCircle /> </IconButton>
                                  <Menu
    
    
                                    // Custom CSS class for the Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                  >
    
                                    <MenuItem style={{ color: "#2ECC71" }}>
                                      Verified
                                    </MenuItem>
    
                                    <MenuItem style={{ color: "red" }}>
    
                                      Not Verified
                                    </MenuItem>
                                    <MenuItem style={{ color: "orange" }}>
    
                                      Under Verification
                                    </MenuItem>
                                    <MenuItem style={{ color: "blue" }}>
    
                                      Complete Documents
                                    </MenuItem>
                                    <MenuItem style={{ color: "magenta" }}>
    
                                      Verification optional
                                    </MenuItem>
    
                                    <MenuItem style={{ color: "yellow" }}>
    
                                      Incomplete Documents
                                    </MenuItem>
                                  </Menu>
    
                                </li>
    
    
    
                                {
                                  <li className="list-group-item">
                                    <h6>Personal Documents : <span style={{ color: details.personalDetails ? 'black' : 'blue' }}>{details.personalDetails ? details.personalDetails : 'Not uploaded'}</span></h6>
                                    {details.aadharCard && <span style={{ color: colorsVerification[verificationDetails.aadharCard] }}>Aadhar card</span>}
    
                                    {details.panCard &&
    
    
                                      <span style={{ color: colorsVerification[verificationDetails.panCard] }}>, Pan card</span>
    
    
    
                                    }
    
                                    {details.passport && <span style={{ color: colorsVerification[verificationDetails.passport] }}>, Passport</span>}
                                    {details.voterId && <span style={{ color: colorsVerification[verificationDetails.voterId] }}>, Voter Id</span>}
                                    {details.license && <span style={{ color: colorsVerification[verificationDetails.license] }}>, Driving License</span>}
                                    {details.othersPersonal && <span style={{ color: colorsVerification[verificationDetails.otherPersonal] }}>Others.</span>}
                                  </li>
                                }
                                <li className="list-group-item">
    
                                  <h6>Educational Documents : <span style={{ color: details.educationalDetails ? 'black' : 'blue' }}>
    
                                    {details.educationalDetails ? details.educationalDetails : details.education ? 'Not uploaded' : 'No Information'}</span>
    
    
                                  </h6>
    
    
                                  {details.Convocation && <span style={{ color: colorsVerification[verificationDetails.Convocation] }}>Convocation Certificate</span>}
    
                                  {details.ConsolidatedMarksheets && <span style={{ color: colorsVerification[verificationDetails.ConsolidatedMarksheets] }}>, Consolidated Marksheets</span>}
    
                                  {details.IndividualMarksheet && <span style={{ color: colorsVerification[verificationDetails.IndividualMarksheet] }}>, Individual Marksheet</span>}
    
                                  {details.othersEducation && <span style={{ color: colorsVerification[verificationDetails.otherEducation] }}>, Others.</span>}
                                </li>
                                <li className="list-group-item">
                                  <h6>Professional Documents : <span style={{ color: details.professionalDetails ? 'black' : 'blue' }}>{details.professionalDetails ? details.professionalDetails : details.JobExperience ? 'Not uploaded' : 'No Information'}</span></h6>
                                  {details.OfferLetter && <span style={{ color: colorsVerification[verificationDetails.OfferLetter] }}>Offer Letter</span>}
                                  {details.AppointmentLetter && <span style={{ color: colorsVerification[verificationDetails.AppointmentLetter] }}>Appointment Letter</span>}
                                  {details.AppraisalLetter && <span style={{ color: colorsVerification[verificationDetails.AppraisalLetter] }}>Appraisal Letter</span>}
                                  {details.SalarySlips && <span style={{ color: colorsVerification[verificationDetails.SalarySlips] }}>Salary Slips</span>}
                                  {details.Rewards && <span style={{ color: colorsVerification[verificationDetails.Rewards] }}>Rewards Awards certificate</span>}
                                  {details.othersProfessional && <span style={{ color: colorsVerification[verificationDetails.otherProfessional] }}>Others.</span>}
    
                                </li>
                                <li className="list-group-item">
                                  <h6>Projects Documents :  <span style={{ color: details.projectDetails ? 'black' : 'blue' }}>{details.projectDetails ? details.projectDetails : projects.length === 0 ? 'No Information' : 'Not uploaded '}</span></h6>
                                  {
                                    details.projectDetails && <span style={{ color: "orange", textDecoration: "underline" }}>Project File</span>
                                  }
    
                                </li>
                                <li className="list-group-item">
    
                                  <h6>Certificate Documents :  <span style={{ color: details.certificationDetails ? 'black' : 'blue' }}>{details.certificationDetails ? details.certificationDetails : certificates.length === 0 ? 'No Information' : 'Not uploaded'}</span></h6>
    
                                  {
                                    details.certificationDetails && <span style={{ color: "orange", textDecoration: "underline" }}>Certificate Documents File</span>
                                  }
                                </li>
                              </ul>
                              <ul className="social-list list-inline mt-3 mb-0" style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                <li className="list-inline-item ">
                                  <a target='_blank' rel="noreferrer" href={socialLinksDetail.linkedInLink} className="social-list-item border-purple text-purple"><i className="fab fa-linkedin"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a target='_blank' rel="noreferrer" href={socialLinksDetail.faceBookLink} className="social-list-item border-purple text-purple"><i className="fab fa-facebook"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a target='_blank' rel="noreferrer" href={socialLinksDetail.instagramLink} className="social-list-item border-danger text-danger"><i className="fab fa-instagram"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a target='_blank' rel="noreferrer" href={socialLinksDetail.twitterLinks} className="social-list-item border-info text-info"><i className="fab fa-twitter"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a target='_blank' rel="noreferrer" href={socialLinksDetail.gitHubLink} className="social-list-item border-secondary text-secondary"><i className="fab fa-github"></i></a>
                                </li>
                                <li className="list-inline-item">
                                  <a target='_blank' rel="noreferrer" href={socialLinksDetail.otherLinks} className="social-list-item border-secondary text-secondary"><i style={{ color: "skyblue" }} className="fa fa-globe"></i></a>
                                </li>
                              </ul>
                            </div>
                            <ObjSurveyBox boxType="viewprofile" />
    
    
    
    
    
                          </div>
    
                          <div className="col-lg-8 col-xl-8 " >
                            <div className="row">
                              <div className="card">
                                <div className="card-header ">
                                  <div className="col-lg-12" >
                                    <nav>
                                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button className="nav-link active viewprofiletabs" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">Profile</button>
                                        <button className="nav-link" id="nav-projects-tab" data-bs-toggle="tab" data-bs-target="#nav-projects" type="button" role="tab" aria-controls="nav-projects" aria-selected="false">Projects</button>
                                        <button className="nav-link" id="nav-certification-tab" data-bs-toggle="tab" data-bs-target="#nav-certification" type="button" role="tab" aria-controls="nav-certification" aria-selected="false">Certifications</button>
                                        <button className="nav-link" id="nav-sociallinks-tab" data-bs-toggle="tab" data-bs-target="#nav-sociallinks" type="button" role="tab" aria-controls="nav-sociallinks" aria-selected="false">Social Links</button>
                                        <button className="nav-link" id="nav-others-tab" data-bs-toggle="tab" data-bs-target="#nav-others" type="button" role="tab" aria-controls="nav-documents" aria-selected="false">Others</button>
                                      </div>
                                    </nav>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="tab-content " id="nav-tabContent">
                                    <div className="tab-pane fade show active " id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                      <div className="row  ">
                                        <h5 className="mb-4 text-uppercase d-flex justify-content-start"><i className="mdi mdi-account"></i>
                                          About</h5>
                                        <div className="col-6 " >
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>Full Name : <span style={{ color: "gray", marginLeft: "3px" }}> {details.fullName}</span></h6>
                                        </div>
    
                                        <div className="col-6  ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>User Name :<span style={{ color: "gray", marginLeft: "3px" }}> {details.name}</span></h6>
                                        </div>
                                        <div className="col-6 ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>Email :<span style={{ color: "gray", marginLeft: "3px" }}>  {details.email}</span></h6>
                                        </div>
                                        <div className="col-6 ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>State :<span style={{ color: "gray", marginLeft: "3px" }}> {details.State ? details.State : ""}{details.state ? details.state : ""}</span></h6>
                                        </div>
                                        <div className="col-6 ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>Birthday :<span style={{ color: "gray", marginLeft: "3px" }}> {details.DOB}</span></h6>
                                        </div>
                                        <div className="col-6 ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>Gender : <span style={{ color: "gray", marginLeft: "3px" }}>{details.gender}</span></h6>
                                        </div>
                                        <div className="col-6 ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>Location :<span style={{ color: "gray", marginLeft: "3px" }}>{details.location}</span></h6>
                                        </div>
                                        <div className="col-6 ">
                                          <h6 className=" d-flex text-start fs-13 fw-normal " style={{
                                            marginTop: "15px"
                                          }}>Mobile Number : <span style={{ color: "gray", marginLeft: "3px" }}>{details.mobilenumber}</span></h6>
                                        </div>
                                      </div>
                                      <hr className="border border-success border-2 opacity-50" />
    
                                      <div className="row " >
                                        <h5 className="mb-4 text-uppercase d-flex text-start" ><i className="mdi mdi-briefcase mr-1"></i>
                                          Experience</h5>
                                        <div className="d-flex flex-column col-lg-12 ">
                                          <ul >
                                            {
    
                                              experience.map((exp, index) => {
                                                return <Fragment>
                                                  <li >
                                                    <h6 className="mt-0 mb-1 fs-5 d-flex text-start">{exp.designation}</h6>
                                                    <p className="d-flex text-start">{exp.companyName}</p>
                                                    <p className="text-muted mt-1 d-flex text-start ">{exp.experienceStart} ~ {exp.experienceEnd}.</p>
    
                                                    <h6 className="d-flex text-start">skills:</h6>
                                                    <p >
                                                      {exp.skills.map((each, index) => {
                                                        return <Fragment>
                                                          <div className="d-flex">
                                                            <span className='badge bg-secondary ms-1 mt-1'>{each.value}</span>
                                                          </div>
                                                        </Fragment>
                                                      })}
                                                    </p>
                                                  </li>
                                                </Fragment>
                                              })
                                            }
                                          </ul>
                                        </div>
    
                                      </div>
                                      <hr className="border border-success border-2 opacity-50" />
                                      <div className="row">
    
                                        <div className="col-lg">
                                          <h5 className="mb-4 text-uppercase d-flex text-start  "><i className="mdi mdi-book-open me-1"></i>
                                            Education</h5>
                                          <ul className="list-unstyled mb-1-9">
    
                                            {education.map((detail, index) => {
                                              return <li >
    
                                                <h5 className="mt-0 mb-1 d-flex text-start">{detail.qualification} {detail.course} at {detail.college}</h5>
    
                                                <p className="text-muted mt-2 d-flex text-start ">Passed out Year: {detail.passingYear}</p>
    
                                              </li>
                                            })}
    
    
                                          </ul>
    
    
    
    
                                        </div></div>
                                      <hr className="border border-success border-2 opacity-50" />
    
                                      <div className="row " >
                                        <div className="col-lg-6" >
                                          <h5 className="mb-4 text-uppercase d-flex text-start "><i className="mdi mdi-desktop-mac me-1"></i>
                                            Activity</h5><ul className="list-group list-group-flush d-flex justify-content-start">
                                            <li className="list-group-item">
                                              <h6 className="d-flex text-start"><i className="mdi mdi-star-circle "></i>Somehas given you as a Surprise</h6>
                                              <p className="text-muted mt-2 mb-0  d-flex text-start"> ~ 12 minutes ago.</p>
                                            </li>
                                            <li className="list-group-item">
                                              <h6 className="d-flex text-start"> <i className="mdi mdi-star-circle"></i>Change your profile User details</h6>
                                              <p className="text-muted mt-2 mb-0 d-flex text-start"> ~ 1 Hour 20 minutes ago.</p>
                                            </li>
                                            <li className="list-group-item">
                                              <h6 className="d-flex text-start"><i className="mdi mdi-star-circle"></i> Your Settings has Updated</h6>
                                              <p className="text-muted mt-2 mb-0 d-flex text-start"> ~ One day ago.</p>
                                            </li>
                                            <li className="list-group-item">
                                              <h6 className="d-flex text-start"><i className="mdi mdi-star-circle"></i>Change your profile User details</h6>
                                              <p className="text-muted mt-2 mb-0 d-flex text-start"> ~ 1 Hour 20 minutes ago.</p>
                                            </li>
    
                                          </ul>
    
    
    
                                        </div>
                                        <div className="col-lg-6" >
                                          <h4 className="header-title d-flex text-start">Skills</h4>
                                          <ul style={{ listStyle: "none"}}>
                                            {
                                              skills.map((skill, index) => {
                                                return <div className="pt-1 d-flex text-start" >
                                                  <span className="badge bg-secondary text-uppercase mt-0 ">{skill} </span>
    
                                                </div>
                                              })
                                            }
                                          </ul>
    
                                        </div>
    
    
    
    
                                      </div>
    
    
                                    </div>
    
                                    <div className="tab-pane fade" id="nav-projects" role="tabpanel" aria-labelledby="nav-projects-tab">
                                      <h5 className="mb-3  text-uppercase"><i className="mdi mdi-cards-variant mr-1"></i>
                                        Projects</h5>
                                      {
                                        projects.map((project, index) => {
                                          return <Fragment>
                                            <div className="card text-center" style={{ marginBottom: "15px" }}>
                                              <div className="card-header">
                                                {project.project}
                                              </div>
                                              <div className="card-body">
                                                <h6 style={{ width: "100%", textAlign: "left" }} className="card-title">Year: {project.year}</h6>
                                                <h6 style={{ width: "100%", textAlign: "left" }} className="card-title">Client  Name: {project.client}</h6>
                                                <p style={{ textAlign: "left" }} className="card-text">{project.description}</p>
                                              </div>
                                            </div>
                                          </Fragment>
                                        })
                                      }
                                    </div>
    
                                    <div className="tab-pane fade" id="nav-documents" role="tabpanel" aria-labelledby="nav-documents-tab">
    
                                      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                          <button className="nav-link active" id="pills-personal-tab" data-bs-toggle="pill" data-bs-target="#pills-personal" type="button" role="tab" aria-controls="pills-personal" aria-selected="true">Personal</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                          <button className="nav-link" id="pills-educational-tab" data-bs-toggle="pill" data-bs-target="#pills-educational" type="button" role="tab" aria-controls="pills-Educational" aria-selected="false">Educational</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                          <button className="nav-link" id="pills-professional-tab" data-bs-toggle="pill" data-bs-target="#pills-professional" type="button" role="tab" aria-controls="pills-professional" aria-selected="false">Professional</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                          <button className="nav-link" id="pills-projects-tab" data-bs-toggle="pill" data-bs-target="#pills-projects" type="button" role="tab" aria-controls="pills-projects" aria-selected="false">Projects</button>
                                        </li>
    
                                        <li className="nav-item" role="presentation">
                                          <button className="nav-link" id="pills-others-tab" data-bs-toggle="pill" data-bs-target="#pills-others" type="button" role="tab" aria-controls="pills-others" aria-selected="false" >Others</button>
                                        </li>
                                      </ul>
                                      <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-personal" role="tabpanel" aria-labelledby="pills-personal-tab" tabindex="0">...</div>
                                        <div className="tab-pane fade" id="pills-professional" role="tabpanel" aria-labelledby="pills-professional-tab" tabindex="0">...</div>
                                        <div className="tab-pane fade" id="pills-educational" role="tabpanel" aria-labelledby="pills-educational-tab" tabindex="0">...</div>
                                        <div className="tab-pane fade" id="pills-projects" role="tabpanel" aria-labelledby="pills-projects-tab" tabindex="0">...</div>
                                        <div className="tab-pane fade" id="pills-others" role="tabpanel" aria-labelledby="pills-others-tab" tabindex="0">...</div>
                                      </div>
                                    </div>
    
                                    <div className="tab-pane fade" id="nav-certification" role="tabpanel" aria-labelledby="nav-certification-tab">
                                      {
                                        certificates.map((certificate, index) => {
                                          return <Fragment>
                                            <div className="card text-center" style={{ marginBottom: "15px" }}>
                                              <div className="card-header">
                                                {certificate.nameOfCertification}
                                              </div>
                                              <div className="card-body">
                                                <h6 style={{ width: "100%", textAlign: "left" }} className="card-title">Year: {certificate.from} ~ {certificate.lifeTime ? 'Life Time' : certificate.to}</h6>
                                                <h6 style={{ width: "100%", textAlign: "left" }} className="card-title">Institute  Name: {certificate.nameOfInstitute}</h6>
                                                <p style={{ textAlign: "left" }} className="card-text">{certificate.description}</p>
                                              </div>
                                            </div>
                                          </Fragment>
                                        })
                                      }
                                    </div>
    
                                    <div className="tab-pane fade" id="nav-sociallinks" role="tabpanel" area-aria-labelledby='nav-sociallinks-tab'>
                                      <div className="card mt-3">
                                        <div className='row ms-2'>
                                          <div className="col-md-12 d-flex  align-items-center mt-3 " >
                                            <h5 className=" fs-5 display-6 ">Social Media links:</h5>
    
                                          </div>
                                          <div className="col-md-12 d-flex  align-items-center mt-3 " >
                                            <h6 className="  fs-6 fw-normal ">Linkedin:</h6>
                                            <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2">https://www.linkedin.com/login </a>
    
                                          </div>
                                          <div className="col-md-12 d-flex align-items-center mt-3 " >
                                            <h6 className="  fs-6 fw-normal ">Twitter:</h6>
                                            <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2">https://www.twitter.com/login </a>
    
                                          </div>
                                          <div className="col-md-12 d-flex align-items-center mt-3 " >
                                            <h6 className="  fs-6 fw-normal ">Facebook:</h6>
                                            <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2">https://www.facebook.com/login </a>
    
                                          </div>
                                          <div className="col-md-12 d-flex align-items-center mt-3 " >
                                            <h6 className="  fs-6 fw-normal ">Instagram:</h6>
                                            <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2">https://www.facebook.com/login </a>
    
                                          </div>
                                        </div>
    
                                      </div>
                                    </div>
    
                                    <div className="tab-pane fade" id="nav-others" role="tabpanel" aria-labelledby="nav-others-tab">others</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
    
              </div>
            </div>
    
          )}
          <div className="scroll-to-top" onClick={scrollToTop}>
            <AiOutlineArrowUp /> {/* Replace with your icon */}
          </div>
        </div>
    
      )
}


