import React, { useContext, useEffect, useState } from "react";
import MyTaskSideBar from "./MyTaskSideBar";
import MyTaskDetails from "./MyTaskDetails";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
// import UserSelectionModal from "./UserSelection";
import Modal from 'react-modal';
import { Fragment } from "react";
import './admindashboard.css'
import Sendingmailform from "./sendingmailform";
import MyContext from "../../mycontext";
import Loader from "../Dashboard/Loader";


// import { Info } from "@mui/icons-material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import { AiOutlineArrowUp } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
// this is usrselections modal from mui material.............

// this is for Status selection dropdown


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


// const steps = ["Step1", "Step2", "Step3", "Step4", "step"];

function MyTaskDashBoard() {

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


  const [showcompanies, setshowcompanies] = useState(false)






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




  useEffect(() => {





    const backendStatus = 0; // Replace with the actual backend data
    setActiveStep(backendStatus);
  }, []);





  // get user data.............



  
  // fetch data.............................admin........

  async function fetchData() {
    setLoading(true);
  
    try {
      const userId = localStorage.getItem("id");
      const endpoint = showcompanies
        ? `karands/listusers/getcompanies/${userId}`
        : `karands/listusers/getusers/${userId}`;
  
      const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/${endpoint}`, {
        name: inputValue
      });
  
      if (response.data) {
        const data = response.data.result;
        setuserslist(data);
        console.log("Data:", data);
      }
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  }
  



async function fetchData_subadmin(){

  setLoading(true)

  try {

    if (showcompanies == false) {


      const response = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getusers/${localStorage.getItem("id")}`,
        { name: inputValue }
      );


      if (response.data) {

        const data = response.data.result



        setuserslist(data);

        console.log("data....", data)
      }


    }

    if (showcompanies == true) {

      const response = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getcompanies/${localStorage.getItem("id")}`,
        { name: inputValue }
      );


      if (response.data) {

        const data = response.data


        setuserslist(data);

      }



    }





  }

  catch (error) {
    // Handle the error, e.g., show an error message
    console.error("An error occurred:", error);
  } finally {
    setLoading(false);
  }


}






async function fetchData_Teammember(){

  setLoading(true)

  try {

    if (showcompanies == false) {


      const response = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getusers/${localStorage.getItem("id")}`,
        { name: inputValue }
      );


      if (response.data) {

        const data = response.data.result



        setuserslist(data);

        console.log("data....", data)
      }


    }

    if (showcompanies == true) {

      const response = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getcompanies/${localStorage.getItem("id")}`,
        { name: inputValue }
      );


      if (response.data) {

        const data = response.data


        setuserslist(data);

      }



    }





  }

  catch (error) {
    // Handle the error, e.g., show an error message
    console.error("An error occurred:", error);
  } finally {
    setLoading(false);
  }


}







  
  useEffect(() => {




    if (profiledata.AdditionalPortalAccess == "Admin") {


      fetchData()



    }


    if (profiledata.AdditionalPortalAccess == "Sub-Admin") {


      fetchData_subadmin()



    }

    if (profiledata.AdditionalPortalAccess == "Team Member") {


      fetchData_Teammember()



    }








  }, [inputValue, showcompanies, profiledata]);












  // accpet educational verification task function......................

  async function handleaccepteducationtask(iuid, collegename, qualification) {




    if (profiledata.AdditionalPortalAccess == "Admin") {


      const data = {
        iuid: iuid,
        collegename: collegename,
        qualification: qualification,
        acceptedUserId: localStorage.getItem("id")


      }


      await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Accepteducationtask_admin`, data)

        .then((res) => {

          console.log("acceptesres", res)

          fetchData()

        })
        .catch(err => console.log(err))





    }

    if (profiledata.AdditionalPortalAccess == "Sub-Admin") {





      const data = {
        iuid: iuid,
        collegename: collegename,
        qualification: qualification,
        acceptedUserId: localStorage.getItem("id")


      }


      await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Accepteducationtask`, data)

        .then((res) => {

          console.log("acceptesres", res)

          fetchData()

        })
        .catch(err => console.log(err))



    }

    if (profiledata.AdditionalPortalAccess == "Team Member") {

      const data = {
        iuid: iuid,
        collegename: collegename,
        qualification: qualification,
        acceptedUserId: localStorage.getItem("id")


      }


      await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Accepteducationtask`, data)

        .then((res) => {

          console.log("acceptesres", res)

          fetchData()

        })
        .catch(err => console.log(err))



    }










  }




// acept job task.............





  async function handleacceptjobtask(iuid, companyname, experienceStart) {



    if (profiledata.AdditionalPortalAccess == "Admin") {


    const data = {
      iuid: iuid,
      companyname: companyname,
      experienceStart: experienceStart,
      acceptedUserId: localStorage.getItem("id")


    }


    await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Acceptjobtask_admin`, data)

      .then((res) => {

        console.log("acceptesres", res)

        fetchData()

      })
      .catch(err => console.log(err))

    }


    if (profiledata.AdditionalPortalAccess == "Sub-Admin") {


      const data = {
        iuid: iuid,
        companyname: companyname,
        experienceStart: experienceStart,
        acceptedUserId: localStorage.getItem("id")
  
  
      }
  
  
      await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Acceptjobtask`, data)
  
        .then((res) => {
  
          console.log("acceptesres fetchData_subadmin", res)
  
          fetchData_subadmin()
  
        })
        .catch(err => console.log(err))
  
      }
  


      if (profiledata.AdditionalPortalAccess == "Team Member") {


        const data = {
          iuid: iuid,
          companyname: companyname,
          experienceStart: experienceStart,
          acceptedUserId: localStorage.getItem("id")
    
    
        }
    
    
        await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Acceptjobtask`, data)
    
          .then((res) => {
    
            console.log("acceptesres ", res)
    
            fetchData_Teammember()
    
          })
          .catch(err => console.log(err))
    
        }















  }

















  // accept company verification task..........function........................................


  async function handleacceptcompanytask(companyName) {


    if (profiledata._id) {


      let acceptedUserId = profiledata._id

      const data = {

        companyname: companyName,

        acceptedUserId: acceptedUserId
      }


      await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/Acceptcompanyverification`, data)

        .then((res) => {

          console.log("acceptesres", res)

          fetchData()

        })
        .catch(err => console.log(err))

    }

  }




  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };




  // handle assign  functiomn 




  function handleassign(taskname, data, iuid) {

    data = {
      taskname: taskname,
      data: data,
      iuid: iuid
    }


    navigate("/userselection", { state: data })


  }













  return (
    <div className="" style={{ overflow: "scroll" }}>



      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="mytask" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />

          <div className={`search-bar-container ${isFocused ? 'focused' : ''}`}>
            <div className="search-icon" style={{ display: 'flex' }}>
              <div className="InputContainer">
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={handleInputFocus}
                  onKeyUp={(e) => handleInputChange(e)}
                  onBlur={handleInputBlur}
                  className={`form-control ${isExpanding ? 'expanding' : ''}`}
                  id="Searchbar-Input"
                />
              </div>

              <div style={{ marginLeft: '10px' }}>

                <Button onClick={() => setshowcompanies(false)}>Users</Button>
                <Button onClick={() => setshowcompanies(true)}>Companies</Button>

              </div>
            </div>
          </div>


          {isLoading ? (
            // <div>Loading...</div> 

            <Loader />) : (

            userslist ? userslist.map((data) => {

              let Data
              if (!data.nameOfCompany) {
                Data = data

              }
              if (data.nameOfCompany) {

                Data = data
              }


              return (

                <Fragment>
               


                    {
                      Data && Data.nameOfCompany && showcompanies == true ?
              Data.gstdoc||Data.registerdoc&&<>

<div className="container-xl container-lg mt-4 mb-4"
                    style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden", padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}
                  >
                
                   <div className='card'>
                          <div className="card-header"> <h5 className="d-flex text-start">Company Verification</h5>
                          </div>
                          <div className="card-body " >

                            {/* name and location,state............................................................. */}

                            <div className='row'>
                              <i className="bi bi-three-dots-vertical d-flex justify-content-end" title="Customize and Control"></i>
                              <div className='col-md-2  col-lg-2' style={{ width: '150px', height: '150px', paddingTop: '20px', paddingBottom: '20px' }}>
                                {
                                  Data.compnaylogo ?
                                    <span className="d-flex justify-content-center align-items-center" style={{ color: 'white', fontSize: '80px' }}>
                                      <img src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${Data.compnaylogo}`} alt="img" style={{ width: "100%", height: "100%" }} />

                                    </span>
                                    :
                                    <span className="d-flex justify-content-center align-items-center">
                                      {/* <BusinessIcon style={{ color: 'black', fontSize: '80px' }} /> */}
                                    </span>
                                }
                              </div>

                              <div className='col-8'  >
                                <div className="row">
                                  <div className="col-6">
                                    <p className="text-start">Date Of Registration:<b>{Data.dateOfRegistration ? Data.dateOfRegistration : "No information"}</b></p>
                                    <p className="text-start"> Email:<b>{Data.domainEmail ? Data.domainEmail : "No information"}</b></p>
                                    <p className="text-start">Website:<b>{Data.website ? Data.website : "No information"}</b></p>
                                    <p className="text-start">Gst No:<b>{Data.gstNo ? Data.gstNo : "No information"}</b></p>
                                  </div>
                                  <div className="col-6">
                                    <p className="text-start">City:<b>{Data.city ? Data.city : ""}</b></p>
                                    <p className="text-start">Industry:<b>{Data.industry ? Data.industry : ""}</b></p>
                                    <p className="text-start">state:<b>{Data.state ? Data.state : ""}</b></p>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div style={{ marginTop: "20px" }} className="row  justify-content-around ">


                              {
                                <div className="card col-12">
                                  <div className="card-header d-flex flex-lg-row align-items-center">
                                    <h5 className="text-start">Company Documents</h5>
                                    {/* <Link title="View Personal Documents" style={{ cursor: "pointer" }}>View</Link>*/}

                                  </div>
                                  <div className="card-body">
                                    <div className="row">

                                      <div className="col-8">
                                        <ul className="text-start"  style={{ textDecoration: "underline"}}>

                                          {Data&&Data.gstdoc && <li>
                                            <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${Data.gstdoc}`}>
                                              GST Documents
                                            </Link>
                                          </li>
                                          }

                                          {Data&&Data.registerdoc
                                            && <li>
                                              <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${Data.registerdoc
                                                }`}>
                                             Registration Documents
                                              </Link>
                                            </li>
                                          }


                                         

                                        </ul>
                                      </div>


                                      <div className="text-start col-2 ">
                                        <button onClick={() => ReadTask()} type="button" data-bs-toggle="modal" data-bs-target="#readtaskModal" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}  >Read Task</button>


                                        <div className="modal fade" id="readtaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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



                                                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", fontSize: "2.1rem", color: "#83a4d4" }}>
                                                  <div style={{ width: "80%", fontWeight: "bold" }}>Grand Total</div>
                                                  {/* <b>₹ {amount.total}</b> */}
                                                  
                                                  <b>60</b>
                                                  
                                                  </div>
                                              </div>

                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)" }}>Save changes</button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <button type="button" className="me-3" data-bs-toggle="modal" data-bs-target="#notesModal" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}  >Notes</button>


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
                                        <button type="button" data-toggle="modal" data-target="#ModalCenter" style={{ color: "white", width: "120px", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}>
                                          Status
                                        </button>
                                      </div>
                                    </div>

                                  </div>

                                  
                                  <div className="card-footer d-flex justify-content-between">
                                    <button
                                      type="button"
                                      style={{ cursor: "pointer", color: "white", backgroundColor: "rgb(3, 104, 104)" }}
                                    


                                    >
                                      Accepts
                                    </button>


                                    <button
                                      type="button"
                                      style={{ cursor: "pointer", color: "white", backgroundColor: "rgb(3, 104, 104)" }}
                                      className="bi bi-arrow-right"
                                      data-bs-toggle="modal"
                                      data-bs-target="#assignModal"


                                    >
                                      Assign
                                    </button>

                                    
                                  </div>


                                </div>

                              }




                            </div>

                            <div className="mt-4 pt-2  ms-3 text-center  d-flex justify-content-between align-items-center">
                              <div className="d-flex justify-content-center gap-3">





                              </div>
                              <div>

                              </div>
                            </div>

                          </div>



                        </div>

                
</div>
                </>
                       
                        :

                      <div className="container-xl container-lg mt-4 mb-4"
                        style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden", padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}
                      >

                        <div className='card'>
                          <div className="card-header"> <h5 className="d-flex text-start">Background Verification</h5>
                          </div>
                          <div className="card-body " >

                            {/* name and location,state............................................................. */}

                            <div className='row'>
                              <i className="bi bi-three-dots-vertical d-flex justify-content-end" title="Customize and Control"></i>

                              <div className='col-md-3  col-lg-3' style={{ width: '150px', height: '150px', paddingBottom: '20px', marginRight: '5px', marginLeft: '22px' }}>

                                {
                                  Data.profilepicture ?
                                    <span className="d-flex justify-content-center align-items-center" style={{ color: 'white', fontSize: '80px' }}>
                                      <img src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${Data.profilepicture}`} alt="img" style={{ width: "100%", height: "100%" }} />

                                    </span>
                                    :

                                    <span className="fa fa-user d-flex justify-content-center align-items-center" style={{ color: 'black', fontSize: '80px' }}></span>


                                }

                              </div>

                              <div className='col-md-9 col-lg-9 '  >
                                <div className="row"  >

                                  <div className="col-lg-6 d-flex  flex-lg-row   " >
                                    <h6 className="  fs-12 fw-normal d-flex justify-content-start text-start "> Full Name:</h6>
                                    <h6 className="text-muted pl-2 text-start">{Data.fullName ? Data.fullName : "No information"}</h6>
                                  </div>

                                  <div className="col-lg-6 d-flex  flex-lg-row   " >
                                    <h6 className="  fs-12 fw-normal d-flex justify-content-start text-start "> Role:</h6>
                                    <h6 className="text-muted pl-2 text-start">{Data.role ? Data.role : "No information"}</h6>
                                  </div>

                                  <div className="col-lg-6 d-flex  flex-lg-row  " >
                                    <h6 className="  fs-12 fw-normal d-flex justify-content-start "> Gender:</h6>
                                    <h6 className="text-muted pl-1 text-start">{Data.gender ? Data.gender : "No information"}</h6>
                                  </div>

                                  <div className="col-lg-6 d-flex  flex-lg-row  " >
                                    <h6 className="  fs-12 fw-normal d-flex justify-content-start "> Email:</h6>
                                    <h6 className="text-muted pl-1 text-start">{Data.email ? Data.email : "No information"}</h6>
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
                                    <h6 className="  fs-6 fw-normal ">Personal state:</h6>
                                    <h6 className="text-muted pl-1 d-flex">{Data.state ? Data.state : ""}{Data.State ? Data.State : ""}</h6>
                                  </div>
                                  <div className="col-lg-6 d-flex  flex-lg-row  " >
                                    <h6 className="  fs-6 fw-normal ">professional state:</h6>
                                    <h6 className="text-muted pl-1 d-flex">{Data.
                                      Professionalstate
                                      ? Data.
                                        Professionalstate
                                      : ""}</h6>
                                  </div>




                                </div>



                              </div>
                            </div>

                            <div className="row">
                              <div className="col-12">
                                <div className='card mt-3 mb-3'>
                                  <div className='card-header'>
                                    <div className=" card-header d-flex  flex-lg-row align-items-around">
                                      <h4 className="text-start">Documents Uploaded </h4>

                                    </div>
                                  </div>
                                  <div className='card-body'>
                                    <div className='row'>
                                      <div className='col-12'>
                                        <div className='row mt-3'>
                                          <div className='card col-12'>
                                            <div className="card-header">
                                              <div>
                                                <h5 className="text-start mt-3 ">Personal Documents </h5>
                                              </div>

                                            </div>

                                            {/*<a href="#" className="h6 stretched-link btn-link d-flex justify-content-start ms-2" style={{ textDecoration: 'none' }} > View</a>*/}
                                            <div className="card-body">
                                              <div>
                                                <ul className="text-start" style={{ textDecoration: "underline" }}>

                                                  {Data.aadharCard && <li>
                                                    <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${Data.aadharCard}`}>
                                                      Adhar Card
                                                    </Link><span className="fs-4 text-success" ><GiCheckMark /></span><span className="fs-4 text-danger" ><RxCross1 /></span>
                                                  </li>
                                                  }



                                                  {Data.panCard && <li>
                                                    <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${Data.panCard}`}>
                                                      panCard
                                                    </Link><span className="fs-4 text-success" ><GiCheckMark /></span><span className="fs-4 text-danger" ><RxCross1 /></span>
                                                  </li>
                                                  }
                                                </ul>
                                              </div>



                                            </div>
                                          </div>
                                        </div>

                                        <div className='row mt-3'>
                                          <div className='card  col-12'>
                                            <div className="card-header">
                                              <div>
                                                <h5 className="text-start">Educational Documents </h5>
                                              </div>
                                            </div>

                                            {
                                              Data.education && Data.education.length <= 0 ?
                                                <h6 className="text-muted pl-1 d-flex">No Education</h6>

                                                : <Fragment>
                                                  {/* <h6 className="text-muted pl-1 text-start"></h6> */}

                                                  {
                                                    Data.education && Data.education.map((edu, index) => {

                                                      return (
                                                        <>

                                                          {!(edu.whoaccepted && edu.whoaccepted.accepteduseremail) ?

                                                            <div>
                                                                                                     
                                                              <div className="card-body row">
                                                                <div className="col-5 mt-2">
                                                                  <p className="text-start">Level of Education: <b>{edu.qualification}</b></p>
                                                                  <p className="text-start">Institute / University Name : <b>{edu.college}</b></p>
                                                                  <p className="text-start">Course : <b>{edu.course}</b> </p>
                                                                </div>
                                                                <div className="col-5 mt-2">
                                                                  <p className="text-start">CourseType :<b> {edu.courseType}</b></p>
                                                                  <p className="text-start"> Passing year : <b>{edu.passingYear}</b></p>
                                                                  <p className="text-start"><Link >View Documents</Link></p>
                                                                </div>
                                                                <div className="col-2">
                                                                  <div className="text-start col-2">

                                                                    <div>
                                                                      <button type="button" onClick={() => ReadTask()} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}  >Read Task</button>
                                                                      {/* modal for read task.........................modal for read task.............................. */}

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
                                                                    </div>
                                                                    <div>
                                                                      <button type="button" className="me-3" data-bs-toggle="modal" data-bs-target="#notesModal" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }} >Notes</button>

                                                                      {/* modal for notes................................................................................. */}
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
                                                                    </div>
                                                                    <div>




                                                                      <div>
                                                                        {edu.whoaccepted && edu.whoaccepted.status && edu.whoaccepted.accepteduseremail ? (
                                                                          <p>{edu.whoaccepted.status}</p>
                                                                        ) : (
                                                                          ""
                                                                        )}

                                                                      </div>




                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="row">
                                                                  <div className="col-12">
                                                                    <ul className="text-start" style={{ textDecoration: "underline" }}>


                                                                      {edu.Convocation && <li>
                                                                        <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${edu.Convocation}`}>
                                                                          Convocation
                                                                        </Link>
                                                                      </li>
                                                                      }


                                                                      {
                                                                        edu.ConsolidatedMarksheets && <li><Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${edu.ConsolidatedMarksheets}`}>Consolidated Marksheets</Link></li>

                                                                      }
                                                                      {edu.IndividualMarksheet && <li><Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${edu.IndividualMarksheet}`}>IndividualMarksheet</Link></li>

                                                                      }
                                                                      {
                                                                        edu.othersEducation && <li><Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${edu.othersEducation}`}>othersEducation</Link></li>

                                                                      }




                                                                    </ul>
                                                                  </div>

                                                                </div>

                                                              </div>


                                                              {edu.whoaccepted && edu.whoaccepted.status && edu.whoaccepted.accepteduseremail ? (
                                                                <>
                                                                </>
                                                              ) : (
                                                                <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>

                                                                  {
                                                                    profiledata.role == "Admin" ? <>

                                                                      <Button onClick={() => { handleassign("education", edu, Data._id) }}>Assign</Button>

                                                                    </>


                                                                      : ""

                                                                  }





                                                                  <button className="btn btn-success" onClick={() => handleaccepteducationtask(Data._id, edu.college, edu.qualification)}>Accept</button>
                                                                </div>
                                                              )}


                                                              <hr></hr>

                                                            </div>


                                                            : <></>}



                                                        </>)
                                                    })
                                                  }
                                                </Fragment>
                                            }






                                          </div>




                                        </div>


                                        <div className='row mt-3'>
                                          {/* <div className='card col-12' style={{display:"flex"}}> */}

                                          <div className="card col-12">
                                            <div className="card-header">
                                              <div>
                                                <h5 className="text-start">Professional Documents </h5>
                                              </div>

                                            </div>
                                            {
                                              Data.JobExperience && Data.JobExperience.length <= 0 ?
                                                <h6 className="text-muted pl-1 d-flex">No data</h6>

                                                : <Fragment>
                                                  {/* <h6 className="text-muted pl-1 text-start"></h6> */}

                                                  {
                                                    Data.JobExperience && Data.JobExperience.map((job, index) => {
                                                      return (

                                                        <>

                                                          {!(job.whoaccepted && job.whoaccepted.accepteduseremail) ?

                                                            <div className="card-body row">

                                                              <div className="col-5 mt-2">
                                                                <p className="text-start">Company Name: <b>{job.companyName}</b></p>
                                                                <p className="text-start">Current Designation : <b>{job.designation}</b></p>
                                                                <p className="text-start">Location : <b>{job.locationOfCompany}</b> </p>
                                                              </div>
                                                              <div className="col-5 mt-2">
                                                                <p className="text-start">Experience :<b> {job.experienceStart} to {job.experienceEnd}</b></p>
                                                                <p className="text-start"> Industry : <b>{job.industry}</b></p>

                                                              </div>
                                                              <div className="text-start col-2">

                                                                <div>
                                                                  <button type="button" onClick={() => ReadTask()} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}  >Read Task</button>
                                                                  {/* modal for read task.........................modal for read task.............................. */}

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
                                                                </div>
                                                                <div>

                                                                  {/* modal for notes................................................................................. */}

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
                                                                </div>
                                                                <div>
                                                                  {/* <button type="button" style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }} >Status </button> */}
                                                                </div>
                                                              </div>
                                                              <ul className="text-start" style={{ textDecoration: "underline" }}>


                                                                {job.OfferLetter && <li>
                                                                  <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${job.OfferLetter}`}>
                                                                    OfferLetter
                                                                  </Link>
                                                                </li>
                                                                }



                                                                {job.AppointmentLetter && <li>
                                                                  <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${job.AppointmentLetter}`}>
                                                                    Appointment Letter
                                                                  </Link>
                                                                </li>
                                                                }

                                                                {job.AppraisalLetter && <li>
                                                                  <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${job.AppraisalLetter}`}>
                                                                    Appraisal Letter
                                                                  </Link>
                                                                </li>
                                                                }

                                                                {job.SalarySlips && <li>
                                                                  <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${job.SalarySlips}`}>
                                                                    SalarySlips
                                                                  </Link>
                                                                </li>
                                                                }
                                                                {job.Rewards && <li>
                                                                  <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${job.Rewards}`}>
                                                                    Rewards
                                                                  </Link>
                                                                </li>
                                                                }
                                                                {job.othersProfessional && <li>
                                                                  <Link target="_blank" to={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${job.othersProfessional}`}>
                                                                    othersProfessional
                                                                  </Link>
                                                                </li>
                                                                }
                                                              </ul>


                                                              <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>

                                                                <button className="btn btn-danger" onClick={() => { handleassign("job", job, Data._id) }}>Assign</button>

                                                                <button className="btn btn-success" onClick={() => { handleacceptjobtask(Data._id, job.companyName, job.experienceStart) }}>Accept</button>
                                                              </div>
                                                              <hr></hr>
                                                            </div>

                                                            : ""}






                                                        </>


                                                      )
                                                    })
                                                  }
                                                </Fragment>
                                            }


                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div className="mt-4 pt-2  ms-3 text-center  d-flex justify-content-between align-items-center">
                              <div className="d-flex justify-content-center gap-3">
                                <button onClick={() => ReadTask()} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "white", backgroundColor: "#3498DB" }}  >Read Task</button>
                                {/* modal for read task.........................modal for read task.............................. */}

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
                                        <h5 className="text-start mt-3 ">Educational Documents</h5>
                                        {/* {
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
                                    } */}

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


                                {/* modal for notes................................................................................. */}
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

                    }




              







                </Fragment>
              )
            }) : "no data"

          )}




          {/* modal for assigning task this functionality needs to give to the mui modal..................... */}
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

                      data-toggle="modal" data-target=".bd-example-modal-lg"

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




          {/* modal for assigning task..................... */}




          {/* modal for mail form..................................... */}


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
          {/* modal for user seletoion................................................ */}





          {/*          <UserSelectionModal show={modalShow} onHide={() => setModalShow(false)} onSave={handleSaveUsers} selectrole={selectrole} iuid={iuid} clearselectedrole={clearselectedrole} taskname={taskname} fetchData={fetchData} />
            */}




          {/* modal for showing image..................................................... */}


          <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ alignItems: "center", marginTop: "10%" }}>
            {/* Close button with custom styles */}
            <button className="close-button" onClick={closeModal} aria-label="Close" >
              &times;
            </button>
            {renderContentBasedOnFileType()}

          </Modal>


        </div>
      </div>
      <div className="scroll-to-top" onClick={scrollToTop}>
        <AiOutlineArrowUp title="Click to scroll up" /> {/* Replace with your icon */}
      </div>
    </div>

  )
}

export default MyTaskDashBoard
