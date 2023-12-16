import React, { useContext, useEffect, useState } from "react";
import MyTaskSideBar from "./MyTaskSideBar";
import MyTaskDetails from "./MyTaskDetails";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import UserSelection from "./UserSelection";
import Modal from 'react-modal';
import { Fragment } from "react";
import './admindashboard.css'
import Sendingmailform from "./sendingmailform";
import MyContext from "../../mycontext";
import Loader from "../Dashboard/Loader";
import { MdOutgoingMail } from 'react-icons/md';
// import Box from '@mui/material/Box';
import { Stepper, Step, StepLabel, Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import Ichpmytasksidebar from "./ichpmytasksidebar";
import Ichptopbar from "./ichptopbar";
const steps = ["Step1", "Step2", "Step3", "Step4", "step"];

function Ichpmytask() {

    const [hoveredStep, setHoveredStep] = useState(null);

    const handleStepHover = (stepIndex) => {
        setHoveredStep(stepIndex);
    };

    const handleStepBlur = () => {
        setHoveredStep(null);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [details, setDetails] = useState({});
    const [Education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);




    const [isOpen, setIsOpen] = useState(false);

    const [userslist, setuserslist] = useState()


    const [iuid, setiuid] = useState()


    const [selectrole, setselectrole] = useState("")

    const [viewimageurl, setviewimageurl] = useState("")


    const [isModalOpen, setIsModalOpen] = useState(false);


    const [viewimagename, setviewimagename] = useState([])


    const [opennoteModal, setopennoteModal] = useState(false)


    const [opensendmailform, setopensendmailform] = useState(false)


    const [sendmaildata, setsendmaildata] = useState("")


    const [note, setnote] = useState("")




    const [isExpanding, setIsExpanding] = useState(false); // New state for expanding animation



    const [inputValue, setInputValue] = useState('');

    const [activeStep, setActiveStep] = useState(0);



    const [isLoading, setLoading] = useState(true);


    // handle ....send mail .........


    const [showModal, setShowModal] = useState(false);

    const openmodalforsendingmail = () => {

        setopensendmailform(true)
    };

    const closemodalforsendingmail = () => {



        setopensendmailform(false)
    };



    // handle ....send mail .........






    const { profiledata } = useContext(MyContext)



    console.log(profiledata)



    function clearselectedrole(data) {


        setselectrole(data)


    }

    // handle images..........................................................................

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };








    const renderContentBasedOnFileType = () => {
        const extension = viewimageurl ? viewimageurl.split('.').pop().toLowerCase() : '';
        if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
            // Render image for png, jpg, jpeg
            return <img src={viewimageurl} alt="No file" />;
        } else if (extension === 'pdf') {
            // Render PDF using <embed> tag
            return <embed src={viewimageurl} type="application/pdf" width="100%" height="500px" />;
        } else {
            // For other file types, you can display a message or handle it as per your requirement
            return <p>Unsupported file type.</p>;
        }
    };





    // handle images..........................................................................

    const [modalShow, setModalShow] = useState(false);


    const handleSaveUsers = (selectedUsers) => {
        // Handle the selected users here, e.g., pass selectedUsers to backend API

    };




    const [amount, setAmount] = useState({
        education: 0,
        experience: 0,
        personal: 0,
        total: 0
    });




    const navigate = useNavigate()




    useEffect(() => {


        async function main() {




            await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getusers/${localStorage.getItem("id")}`, { name: inputValue })

                .then((res) => {



                    setuserslist(res.data.result)

                    setDetails(res.data.result[0])
                    setEducation(res.data.result[0].education)
                    setExperience(res.data.result[0].JobExperience);

                })
                .catch(err => console.log(err)).finally(() => {
                    setLoading(false); // Mark loading as false regardless of success or error
                });

        }

        main()





    }, [inputValue])



    function ReadTask() {
        let val = {
            personal: 0,
            education: 0,
            experience: 0
        }
        if (details.aadharCard) {
            val.personal = val.personal + 10
        }
        if (details.panCard) {
            val.personal = val.personal + 10
        }
        if (details.passport) {
            val.personal = val.personal + 10
        }
        if (details.othersPersonal) {
            val.personal = val.personal + 10
        }
        if (details.license) {
            val.personal = val.personal + 10
        }
        if (details.voterId) {
            val.personal = val.personal + 10
        }
        if (experience) {
            let JobExperienceLength = experience.length;
            let valToBeUpdated = 100 * JobExperienceLength
            val.experience = valToBeUpdated
        }
        if (Education) {
            let JobExperienceLength = Education.length;
            let valToBeUpdated = 150 * JobExperienceLength
            val.education = valToBeUpdated
        }
        let fullVal = val.personal + val.education + val.experience
        setAmount({
            ...amount,
            education: val.education,
            experience: val.experience,
            personal: val.personal,
            total: fullVal

        })
    }



    // function to send alert.........................................................................






    // sending the alert to user..............




    async function sendalert(iuid, location) {


        const data = {
            iuid: iuid,
            note: {
                iuid: iuid,
                message: note
            },
            location: location
        }




        const res = axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/sendalert`, data)

        if (res) {

            alert("This message has been sent to user")


        }




    }




    // set image..................................

    let pathParts
    function setimageurlfunction(email, filename) {


        if (filename.split("\\") != null) {

            pathParts = filename.split("\\")


            const fileName = pathParts[pathParts.length - 1];



            const key = `useFolder/${email}/personalDetails/${fileName}`


            setviewimageurl(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${key}`)





            openModal()


        }







    }






    //   send email...........................





    async function sendMail(Data) {



        setsendmaildata(Data)


        openmodalforsendingmail()




    }


    const [isFocused, setIsFocused] = useState(false); // New state for focus







    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    };





    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
        setIsExpanding(false);


        // setShowSuggestions(false)
    };


    // stepper ................................................................




    const stepsData = [
        { label: 'Task Accepted' },
        { label: 'mail sended to hr' },
        { label: 'viewed' },
        { label: 'Hr replyed' },
        { label: 'Status Updated' },
    ];







    useEffect(() => {





        const backendStatus = 0; // Replace with the actual backend data
        setActiveStep(backendStatus);
    }, []);













    return (
        <div className="" style={{ overflow: "scroll" }}>



           
                  


                    {isLoading ? (
                        // <div>Loading...</div> 

                        <Loader />) : (

                        userslist ? userslist.map((Data) => {
                            return (

                                <Fragment>

                                    <div className="container-xl container-lg mt-4 mb-4"
                                        style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden", padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}
                                    >

                                        <div className='card'>
                                            <div className="card-header"> <h5 className="d-flex text-start">Background Verification</h5>
                                            </div>
                                            <div className="card-body " >



                                                <div className='row'>
                                                    <i className="bi bi-three-dots-vertical d-flex justify-content-end"></i>
                                                    <div className='col-xl-2  col-lg-2' style={{ width: '150px', height: '150px', backgroundColor: '#5bc0de', paddingTop: '20px', paddingBottom: '20px', marginRight: '5px', marginLeft: '22px' }}>
                                                        <span className="fa fa-user d-flex justify-content-center align-items-center" style={{ color: 'white', fontSize: '80px' }}></span>
                                                    </div>

                                                    <div className='col-xl-9 col-lg-9 '  >
                                                        <div className="row"  >

                                                            <div className="col-lg-6 d-flex  flex-lg-row   " >
                                                                <h6 className="  fs-12 fw-normal d-flex justify-content-start text-start "> Full Name:</h6>
                                                                <h6 className="text-muted pl-2 text-start">{Data.fullName ? Data.fullName : "No information"}</h6>
                                                            </div>

                                                            <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                <h6 className="  fs-12 fw-normal d-flex justify-content-start "> Gender:</h6>
                                                                <h6 className="text-muted pl-1 text-start">{Data.gender ? Data.gender : "No information"}</h6>
                                                            </div>


                                                            <div className="col-lg-6 d-flex  flex-lg-row   " >
                                                                <h6 className="   fs-12 fw-normal d-flex justify-content-start "> Date of Birth:</h6>
                                                                <h6 className="text-muted pl-1 text-start" >{Data.DOB ? Data.DOB : "No information"}</h6>
                                                            </div>


                                                            <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                <h6 className="   fs-12 fw-normal d-flex justify-content-start">Marital Status:</h6>

                                                                <h6 className="text-muted pl-1 text-start">{Data.MartialStatus ? Data.MartialStatus : "No information"}</h6>
                                                            </div>
                                                            <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                <h6 className="   fs-12 fw-normal d-flex justify-content-start ">Location:</h6>
                                                                <h6 className="text-muted pl-1 text-start">{Data.location}</h6>
                                                            </div>
                                                            <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                <h6 className="  fs-6 fw-normal ">Industry:</h6>
                                                                <h6 className="text-muted pl-1 d-flex">{Data.industry}</h6>
                                                            </div>
                                                            <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                <h6 className="  fs-6 fw-normal ">state:</h6>
                                                                <h6 className="text-muted pl-1 d-flex">{Data.state}</h6>
                                                            </div>


                                                            <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                <h6 className="fs-6 fw-normal  ">Education:</h6>
                                                                {
                                                                    Data.education.length <= 0 ?
                                                                        <h6 className="text-muted pl-1 d-flex">No Education</h6>

                                                                        : <Fragment>
                                                                            <h6 className="text-muted pl-1 text-start">
                                                                                <ul>
                                                                                    {
                                                                                        Data.education.map((edu, index) => {
                                                                                            return (
                                                                                                <Fragment>

                                                                                                    <h8 className="  text-start text-muted">{edu.college}</h8>
                                                                                                    <li className="  text-start text-muted">{edu.qualification}</li>


                                                                                                </Fragment>)
                                                                                        })
                                                                                    }


                                                                                </ul>
                                                                            </h6>
                                                                        </Fragment>
                                                                }
                                                            </div>
                                                            <div className="col-lg-6   d-flex  flex-lg-row  " >
                                                                <h6 className="  fs-6 fw-normal ">Experience:</h6>
                                                                {
                                                                    Data.JobExperience.length === 0 ?
                                                                        <h6 className="text-muted pl-1 d-flex">No Experience</h6>

                                                                        :
                                                                        <Fragment>
                                                                            {
                                                                                Data.JobExperience.map((exp, index) => {
                                                                                    return <ul>
                                                                                        <li className="text-start text-muted" >{exp.designation}</li>
                                                                                        <li className="text-start text-muted">{exp.companyName}</li>
                                                                                        <li className="text-start text-muted">{exp.locationOfCompany}</li>
                                                                                        <li className="text-start text-muted">{exp.experienceStart} - {exp.experienceEnd}</li>


                                                                                    </ul>
                                                                                })
                                                                            }
                                                                        </Fragment>
                                                                }
                                                            </div>



                                                        </div>



                                                    </div>




                                                </div>
                                                <div style={{ marginTop: "20px" }} className="row  justify-content-around ">


                                                    <div
                                                        className="card bg-light col-3 non-clickable"
                                                        onClick={() => {
                                                            alert("You can't access this!!!");
                                                        }}
                                                    >
                                                        <div className="card-header d-flex flex-lg-row align-items-center " >
                                                            <h5 className="text-start">Personal Documents</h5>
                                                        </div>


                                                        <div className="card-body">


                                                            <ul style={{ marginTop: "15px" }}  >
                                                                {Data.aadharCard && <li className="text-start">Adhaar Card <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setimageurlfunction(Data.email, Data.aadharCard)}>View</span></li>}
                                                                {Data.passport && <li className="text-start">Passport<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setimageurlfunction(Data.email, Data.passport)}>View</span></li>}
                                                                {Data.panCard && <li className="text-start">Pan Card<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setimageurlfunction(Data.email, Data.panCard)}>View</span></li>}
                                                                {Data.license && <li className="text-start">License<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setimageurlfunction(Data.email, Data.license)}>View</span></li>}
                                                                {Data.voterId && <li className="text-start">Voter Id<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setimageurlfunction(Data.email, Data.voterId)}>View</span></li>}
                                                                {Data.othersPersonal && <li className="text-start">Others Personal<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setimageurlfunction(Data.email, Data.othersPersonal)}>View</span></li>}
                                                            </ul>
                                                            <div>
                                                                <Stepper activeStep={activeStep} alternativeLabel>
                                                                    {steps.map((label, index) => (
                                                                        <Step key={label}>
                                                                            <div
                                                                                onMouseEnter={() => handleStepHover(index)}
                                                                                onMouseLeave={handleStepBlur}
                                                                            >
                                                                                <StepLabel>
                                                                                    {hoveredStep === index ? (
                                                                                        <Tooltip title={label} arrow>
                                                                                            <div style={{}}>
                                                                                                {label}

                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                </StepLabel>
                                                                            </div>
                                                                        </Step>
                                                                    ))}
                                                                </Stepper>
                                                                {/*<div>
                                                              {activeStep === steps.length ? (
                                                                <div>
                                                                  <p>All steps completed</p>
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  <div>
                                                                    <a disabled={activeStep === 0} onClick={handleBack}>
                                                                      Back
                                                                    </a>
                                                                    <a onClick={handleNext}>
                                                                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                                    </a>
                                                                  </div>
                                                                </div>
                                                              )}
                                                              </div>*/}
                                                            </div>
                                                        </div>

                                                        <div className="card-footer d-flex justify-content-between" >
                                                            <Link type="button" style={{ cursor: "pointer" }}> Accept</Link>

                                                            <Link type="button" style={{ cursor: "pointer" }} class="bi bi-arrow-right"

                                                                data-bs-toggle="modal"
                                                                data-bs-target="#assignModal"

                                                                onClick={() => setiuid(Data._id)}

                                                            > Assign</Link>

                                                        </div>

                                                    </div>



                                                    <div className="card col-3">
                                                        <div className=" card-header d-flex  flex-lg-row align-items-around" style={{ marginBottom: "20px" }}>
                                                            <h5 className="text-start">Educational Documents </h5>
                                                        </div>
                                                        <div className="card-body">


                                                            {
                                                                (Data.Convocation || Data.ConsolidatedMarksheets || Data.IndividualMarksheet || Data.othersEducation) ?
                                                                    <ul>
                                                                        {Data.Convocation && <li className="text-start text-muted">Convocation</li>}
                                                                        {Data.ConsolidatedMarksheets && <li className="text-start text-muted">Consolidated Marksheets</li>}
                                                                        {Data.IndividualMarksheet && <li className="text-start text-muted">Individual Marksheet</li>}
                                                                        {Data.othersEducation && <li className="text-start text-muted">Others Education</li>}

                                                                    </ul> :
                                                                    <p>No Information</p>
                                                            }
                                                            <div>
                                                                <Stepper activeStep={activeStep} alternativeLabel>
                                                                    {steps.map((label, index) => (
                                                                        <Step key={label}>
                                                                            <div
                                                                                onMouseEnter={() => handleStepHover(index)}
                                                                                onMouseLeave={handleStepBlur}
                                                                            >
                                                                                <StepLabel>
                                                                                    {hoveredStep === index ? (
                                                                                        <Tooltip title={label} arrow>
                                                                                            <div style={{}}>
                                                                                                {label}

                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                </StepLabel>
                                                                            </div>
                                                                        </Step>
                                                                    ))}
                                                                </Stepper>
                                                                {/*<div>
                                                              {activeStep === steps.length ? (
                                                                <div>
                                                                  <p>All steps completed</p>
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  <div>
                                                                    <a disabled={activeStep === 0} onClick={handleBack}>
                                                                      Back
                                                                    </a>
                                                                    <a onClick={handleNext}>
                                                                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                                    </a>
                                                                  </div>
                                                                </div>
                                                              )}
                                                              </div>*/}
                                                            </div>

                                                        </div>


                                                        <div className="card-footer d-flex justify-content-between" >
                                                            <Link type="button" style={{ cursor: "pointer" }}> Accept</Link>

                                                            <Link type="button" style={{ cursor: "pointer" }} class="bi bi-arrow-right"

                                                                data-bs-toggle="modal"
                                                                data-bs-target="#assignModal"
                                                            > Assign</Link>
                                                        </div>


                                                    </div>


                                                    <div className="card col-3">
                                                        <div style={{ marginBottom: "20px" }} className=" card-header d-flex  flex-lg-row align-items-around">
                                                            <h5 className="text-start">Professional Documents</h5>
                                                        </div>

                                                        <div className="card-body">

                                                            {
                                                                (Data.OfferLetter ||

                                                                    Data.AppointmentLetter ||
                                                                    Data.AppraisalLetter ||
                                                                    Data.Rewards ||
                                                                    Data.othersProfessional ||
                                                                    Data.SalarySlips) ?
                                                                    <ul >
                                                                        {Data.OfferLetter && <li className="text-start text-muted">Offer Letter<Link style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => setimageurlfunction(Data.email, Data.OfferLetter)}>View</Link>   </li>}
                                                                        {Data.AppointmentLetter && <li className="text-start text-muted">Appointment Letter</li>}
                                                                        {Data.AppraisalLetter && <li className="text-start text-muted">Appraisal Letter</li>}
                                                                        {Data.SalarySlips && <li className="text-start text-muted">Salary Slips</li>}
                                                                        {Data.Rewards && <li className="text-start text-muted">Rewards</li>}
                                                                        {Data.othersProfessional && <li className="text-start text-muted">Others Professional</li>}

                                                                    </ul> : <p>No Information</p>
                                                            }
                                                            <div>
                                                                <Stepper activeStep={activeStep} alternativeLabel>
                                                                    {steps.map((label, index) => (
                                                                        <Step key={label}>
                                                                            <div
                                                                                onMouseEnter={() => handleStepHover(index)}
                                                                                onMouseLeave={handleStepBlur}
                                                                            >
                                                                                <StepLabel>
                                                                                    {hoveredStep === index ? (
                                                                                        <Tooltip title={label} arrow>
                                                                                            <div style={{}}>
                                                                                                {label}

                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                </StepLabel>
                                                                            </div>
                                                                        </Step>
                                                                    ))}
                                                                </Stepper>
                                                                {/*<div>
                                                              {activeStep === steps.length ? (
                                                                <div>
                                                                  <p>All steps completed</p>
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  <div>
                                                                    <a disabled={activeStep === 0} onClick={handleBack}>
                                                                      Back
                                                                    </a>
                                                                    <a onClick={handleNext}>
                                                                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                                    </a>
                                                                  </div>
                                                                </div>
                                                              )}
                                                              </div>*/}
                                                            </div>
                                                        </div>


                                                        <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }} >
                                                            <Link style={{ cursor: "pointer" }}> Accept</Link>
                                                            <Link style={{ cursor: "pointer" }} onClick={() => { sendMail(Data) }}><MdOutgoingMail />Mail</Link>

                                                            <Link style={{ cursor: "pointer" }} class="bi bi-arrow-right"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#assignModal"
                                                            > Assign</Link>


                                                        </div>

                                                    </div>



                                                </div>

                                                <div className="mt-4 pt-2  ms-3 text-center  d-flex justify-content-between align-items-center">
                                                    <div className="d-flex justify-content-center gap-3">
                                                        <button onClick={() => ReadTask()} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "white", backgroundColor: "#3498DB" }}  >Read Task</button>

                                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Task Information</h1>

                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <h6 className="text-start mt-3 ">Personal Documents</h6>
                                                                        <ul>
                                                                            {Data.aadharCard && <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%" }}>Aadhar Card</div>
                                                                                <span>₹ 10</span></li>}
                                                                            {Data.passport && <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%" }}>Passport</div>
                                                                                <span>₹ 10</span></li>}
                                                                            {Data.panCard && <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%" }}>Pan Card</div>
                                                                                <span>₹ 10</span></li>}
                                                                            {Data.license && <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%" }}>License</div>
                                                                                <span>₹ 10</span></li>}
                                                                            {Data.voterId && <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%" }}>Voter Id </div>
                                                                                <span>₹ 10</span></li>}
                                                                            {Data.othersPersonal && <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%" }}>Others Personal</div>
                                                                                <span>₹ 10</span></li>}
                                                                            <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                <div style={{ width: "80%", fontWeight: "bold" }}>Total</div>
                                                                                <b>₹ {amount.personal}</b></li>
                                                                        </ul>





                                                                    </div>
                                                                    <div>

                                                                        <h6 className="text-start mt-3 ">Educational Documents</h6>

                                                                        {
                                                                            Data.education.length !== 0 ? <Fragment>
                                                                                <ul>

                                                                                    {
                                                                                        Data.education.map((edu, index) => {

                                                                                            return <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                                <div style={{ width: "80%" }}>{edu.qualification}</div>
                                                                                                <span>₹ 150</span></li>
                                                                                        })
                                                                                    }
                                                                                    <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                        <div style={{ width: "80%", fontWeight: "bold" }}>Total</div>
                                                                                        <b>₹ {amount.education}</b></li>
                                                                                </ul>
                                                                            </Fragment> :
                                                                                <p>No Documents</p>
                                                                        }

                                                                        <h6 className="text-start mt-3 ">Experience Documents</h6>
                                                                        {
                                                                            experience.length !== 0 ?
                                                                                <ul>

                                                                                    {
                                                                                        experience.map((exp, index) => {

                                                                                            return <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                                <div style={{ width: "80%" }}>{exp.designation}</div>
                                                                                                <span>₹ 100</span></li>
                                                                                        })
                                                                                    }
                                                                                    <li className="text-start text-muted" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                                                                        <div style={{ width: "80%", fontWeight: "bold" }}>Total</div>
                                                                                        <b>₹ {amount.experience}</b></li>
                                                                                </ul>
                                                                                : <p>No Documents</p>
                                                                        }

                                                                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", fontSize: "2.1rem", color: "#83a4d4" }}>
                                                                            <div style={{ width: "80%", fontWeight: "bold" }}>Grand Total</div>
                                                                            <b>₹ {amount.total}</b></div>
                                                                    </div>

                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" style={{ color: "white", backgroundColor: "#3498DB" }}>Save changes</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <button type="button" className="me-3" data-bs-toggle="modal" data-bs-target="#notesModal" style={{ color: "white", backgroundColor: "#3498DB" }} >Notes</button>

                                                        <div className="modal fade" id="notesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Write a note</h1>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">

                                                                        <div class="form-group">
                                                                            <label for="exampleFormControlTextarea1">note</label>
                                                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setnote(e.target.value)}></textarea>
                                                                        </div>





                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>


                                                                        <button type="button" style={{ color: "white", backgroundColor: "#3498DB" }} onClick={() => sendalert(Data._id, Data.location)}>Save changes</button>



                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {/* note feild................ */}










                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>

                                            </div>



                                        </div>


                                    </div>







                                </Fragment>
                            )
                        }) : "no data"

                    )}


                    <div
                        className="modal fade"
                        id="assignModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div
                            className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
                            style={{ display: "flex", top: "5%", bottom: "30%" }}
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1
                                        className="modal-title fs-5"
                                        id="exampleModalLabel"
                                    >
                                        Select Role
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>

                                </div>
                                <div className="modal-body">
                                    <div className="" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="btn btn-outline-danger"
                                            onClick={() => setModalShow(true)}

                                            onMouseUp={() => setselectrole("Admin")}

                                        >ADMIN</button>

                                        <button className="btn btn-outline-success"



                                            onClick={() => setModalShow(true)}

                                            onMouseUp={() => setselectrole("Sub-Admin")}


                                        >SUB-ADMIN</button>




                                        <button className="btn btn-outline-warning"

                                            onMouseUp={() => setselectrole("ichp")}
                                            onClick={() => setModalShow(true)}
                                        >ICHP</button>

                                    </div>


                                </div>
                                <div className="modal-footer">



                                </div>
                            </div>
                        </div>
                    </div>




                    {opensendmailform && (

                        <Modal isOpen={openmodalforsendingmail} onRequestClose={closemodalforsendingmail}

                            style={{
                                content: {
                                    width: '50%',
                                    margin: 'auto',
                                },
                            }}


                        >


                            <Sendingmailform onRequestClose={closemodalforsendingmail} sendmaildata={sendmaildata} />


                        </Modal>





                    )}






                    <UserSelection show={modalShow} onHide={() => setModalShow(false)} onSave={handleSaveUsers} selectrole={selectrole} iuid={iuid} clearselectedrole={clearselectedrole} />

                    {/* 

 {/* Your code to trigger openModal with the appropriate viewimageurl */}


                    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ alignItems: "center", marginTop: "10%" }}>
                        {/* Close button with custom styles */}
                        <button className="close-button" onClick={closeModal} aria-label="Close" >
                            &times;
                        </button>
                        {renderContentBasedOnFileType()}

                    </Modal>


                </div>
          
    )
}

export default Ichpmytask
