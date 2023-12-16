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
import { MdOutgoingMail } from 'react-icons/md';
// import Box from '@mui/material/Box';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import { Info } from "@mui/icons-material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { AiOutlineArrowUp } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
// this is usrselections modal from mui material.............

import Dropdown from 'react-bootstrap/Dropdown';

import Select from 'react-select';
import UserSelection from "./UserSelection";


import Avatar from '@mui/material/Avatar';

import socketIOClient from 'socket.io-client';






const steps = [
  'mail has been sent',
  'form viewed',
  'form submited',
];



export default function OngoingTask() {




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

    const [userslist, setUsersList] = useState([])


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



    const navigate = useNavigate()


    const { profiledata } = useContext(MyContext)






     
    const [switchtask,setswitchtask]=useState("education")


  const [conversations,setconversations]=useState([])
     


const[flag,setflag]=useState(false)




    // console.log(profiledata)



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




    const [showcompanies, setshowcompanies] = useState(false)


    


    async function fetchData() {
      try {
        setLoading(true);
    
        let apiUrl;
        let response;
    
        if (switchtask === "education") {
          apiUrl = `karands/listusers/getacceptededucationaltasks/${localStorage.getItem("id")}`;
        } else if (switchtask === "jobexperience") {
          apiUrl = `karands/listusers/getacceptedjobtasks/${localStorage.getItem("id")}`;
        }
    
        if (apiUrl) {
          response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/${apiUrl}`, {
            name: inputValue
          });
        }
    
        console.log("response:", response);
    
        if (response?.data?.result) {
          const data = response.data.result;
          setUsersList(data);
        }
      } catch (error) {
        // Handle the error, e.g., show an error message
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
    




  async function fetchData_subadmin() {

    try {

      setLoading(true)

      if (switchtask == "education") {

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getacceptededucationaltasks/${localStorage.getItem("id")}`,
          { name: inputValue }
        );

        console.log("response edu", response)

        if (response.data) {

          const data = response.data.result



          setUsersList(data);

        }

      }

      if (switchtask == "jobexperience") {

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getacceptedjobtasks/${localStorage.getItem("id")}`,
          { name: inputValue }
        );
        console.log("response job", response)


        if (response.data.result) {

          const data = response.data.result



          setUsersList(data);

        }






      }







    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }




  }






  async function fetchData_Teammember() {


    try {

      setLoading(true)

      if (switchtask == "education") {

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getacceptededucationaltasks/${localStorage.getItem("id")}`,
          { name: inputValue }
        );

        console.log("response edu", response)

        if (response.data) {

          const data = response.data.result



          setUsersList(data);

        }

      }

      if (switchtask == "jobexperience") {

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getacceptedjobtasks/${localStorage.getItem("id")}`,
          { name: inputValue }
        );
        console.log("response job", response)


        if (response.data.result) {

          const data = response.data.result



          setUsersList(data);

        }






      }







    } catch (error) {
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
  
  
    }, [inputValue, showcompanies,switchtask,flag]);




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




// function to add notes in user data 


async function noteconversation(iuid, note,assigneduser) {


  const data = {
      iuid: iuid,
      assigneduser,
      note: note
  }




  const res = axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/sendalert`, data)

  if (res) {

      alert("This message has been sent to user")


  }




}






    // set image..................................

    let pathParts
    function setimageurlfunction(imagepath) {


        if (imagepath) {



            setviewimageurl(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${imagepath}`)





            openModal()


        }







    }






    //   send email...........................


const [companymaildata,setcompanymaildata]=useState("")


    async function sendMail(userData,companydata) {



        setsendmaildata(userData)

        setcompanymaildata(companydata)

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







    useEffect(() => {





        const backendStatus = 0; // Replace with the actual backend data
        setActiveStep(backendStatus);
    }, []);


// handle switch JOB,EDUCATION AND COMPANY



function handleswitch(title){

    
    setswitchtask(title)



}


// education document sstatus change..................................................................................................................................................




const handleEducationStatusChange = async (iuid, collegename, qualification, status) => {
  try {
    // Create a data object with the common request parameters
    const data = {
      iuid,
      
      acceptedadminId: profiledata._id,
      collegename,
      qualification,
      status
    };

    let url;


    console.log("handleEducationStatusChange",data)


    // Determine the URL based on the user's role
    if (profiledata.AdditionalPortalAccess === "Admin") {
      url = `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/changeedustatus_admin`;
    } else {
      url = `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/changeedustatus`;
    }

    // Send the POST request to change the education status
    const response = await axios.post(url, data);

    // Check if the request was successful
    if (response.status === 200) {
      console.log("Education status changed successfully");
      alert("Education status changed successfully");
      setflag(!flag);
    } else {
      console.log("Education status change failed");
    }
  } catch (error) {
    console.error("An error occurred while changing education status:", error);
  }
};






// job documents status change...............................................................................................................................



const handleJobStatusChange = async (iuid, companyname, experienceStart, status) => {
  try {
    const data = {
      iuid,
      acceptedadminId: profiledata._id,
      companyname,
      experienceStart,
      status
    };

    let url;


    
    console.log("handleJobStatusChange",data)


    // Determine the URL based on the user's role
    if (profiledata.AdditionalPortalAccess === "Admin") {
      url = `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/changejobstatus_admin`;
    } else {
      url = `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/changejobstatus`;
    }

    // Send the POST request to change the job status
    const response = await axios.post(url, data);

    // Check if the request was successful
    if (response.status === 200) {
      console.log("Job status changed successfully");
      setflag(!flag);
    } else {
      console.log("Job status change failed");
    }
  } catch (error) {
    console.error("An error occurred while changing job status:", error);
  }
};














console.log("swith",switchtask)


console.log("userlist",userslist)

const [updates, setUpdates] = useState([]);

const ENDPOINT = `${process.env.REACT_APP_IP_ADDRESS}/noteschannelforadmin`;

const USER_ID = localStorage.getItem("id");

useEffect(() => {
  const socket = socketIOClient(ENDPOINT);

  // Subscribe to updates for the specific user
  socket.emit('subscribeToUpdates', USER_ID);

  socket.on('connect', () => {
    console.log('Connected to the socket server for updates');
  });

  socket.on('noteUpdated', (data) => {
    if (data) {
      // Handle the real-time updates
      // You can append the new data to your existing updates array
      setUpdates((prevUpdates) => [...prevUpdates, data.updateddata]);
    }
  });

  // Unsubscribe and disconnect when the component is unmounted
  return () => {
    socket.emit('unsubscribeFromUpdates', USER_ID);
    socket.disconnect();
  };
}, [])


// Log updates
console.log("updates..........", updates);







// function for sending education note.......................................


const [educationnote, setEducationNote] = useState(""); // Variable name and case corrected










async function sendEducationNote(iuid, collegename, qualification) {



if(profiledata._id){


  const data = {
    iuid: iuid,
    collegename: collegename,
    qualification: qualification,
    senderid: profiledata._id,
    note: educationnote,
  };

  console.log("res from senedunote",data)


  try {
    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/addnotetoeducation`, data); // Provide the data object
    // Handle the response if needed

console.log("res from education note function",res)


  } catch (error) {
    console.error("Error sending education note:", error);
    // Handle the error
  }


}else{


  window.location.reload()
}








}

// function for sending job note......................................................


const [jobnote, setjobnote] = useState(""); // Variable name and case corrected

async function sendjobnote(iuid, companyname,experienceStart) {
  const data = {
    iuid: iuid,
    companyname: companyname,
    experienceStart: experienceStart,
    senderid: profiledata._id,
    note: jobnote,
  };


  console.log("res from senjobnote",data)

  try {
    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/addnotetojob`, data); // Provide the data object
    // Handle the response if needed

console.log("res from job note function",res)


  } catch (error) {
    console.error("Error sending job note:", error);
    // Handle the error
  }
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

                                <Button onClick={() => handleswitch("education")}>EDUCATION</Button>

                                <Button onClick={() => handleswitch("jobexperience")}>JobExperience</Button>

                                <Button onClick={() => handleswitch("companies")}>Companies</Button>

                            </div>
                        </div>
                    </div>



                    {isLoading ? (
                        // <div>Loading...</div> 

                        <Loader />) :

                        <>
                            <h3>Accepted task</h3>




                            {userslist.length > 0 ? userslist.map((data) => {

                                let Data


                                let Accepted_date

                                if (data.userdetails && !data.companydetails) {
                                    Data = data.userdetails

                                }
                                if (data.companydetails && data.companydetails.nameOfCompany) {

                                    Data = data.companydetails

                                    Accepted_date = data.date
                                }


                                return (





                                    <Fragment>


                                        <div className="container-xl container-lg mt-4 mb-4"
                                            style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden", padding: "10px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}
                                        >

                                            {
                                                Data.nameOfCompany && switchtask == "company"?
                                                    <div className='card'>
                                                        <div className="card-header">

                                                            <span> <h5 className="d-flex text-start">Company Verification</h5></span>

                                                            <span> <h5>Accepted Date:- {Accepted_date ? Accepted_date : ""}</h5></span>
                                                        </div>
                                                        <div className="card-body " >

                                                            {/* name and location,state............................................................. */}

                                                            <div className='row'>
                                                                <i className="bi bi-three-dots-vertical d-flex justify-content-end" title="Customize and Control"></i>
                                                                <div className='col-xl-2  col-lg-2' style={{ width: '150px', height: '150px', paddingTop: '20px', paddingBottom: '20px', marginRight: '5px', marginLeft: '22px' }}>
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

                                                                <div className='col-xl-9 col-lg-9 '  >
                                                                    <div className="row"  >

                                                                        <div className="col-lg-6 d-flex  flex-lg-row   " >
                                                                            <h6 className="  fs-12 fw-normal d-flex justify-content-start text-start "> Name of Company:</h6>
                                                                            <h6 className="text-muted pl-2 text-start">{Data.nameOfCompany ? Data.nameOfCompany : "No information"}</h6>
                                                                        </div>

                                                                        <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                            <h6 className="  fs-12 fw-normal d-flex justify-content-start ">Date Of Registration:</h6>
                                                                            <h6 className="text-muted pl-1 text-start">{Data.dateOfRegistration ? Data.dateOfRegistration : "No information"}</h6>
                                                                        </div>

                                                                        <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                            <h6 className="  fs-12 fw-normal d-flex justify-content-start "> Email:</h6>
                                                                            <h6 className="text-muted pl-1 text-start">{Data.domainEmail ? Data.domainEmail : "No information"}</h6>
                                                                        </div>


                                                                        <div className="col-lg-6 d-flex  flex-lg-row   " >
                                                                            <h6 className="   fs-12 fw-normal d-flex justify-content-start ">Website:</h6>
                                                                            <h6 className="text-muted pl-1 text-start" >{Data.website ? Data.website : "No information"}</h6>
                                                                        </div>


                                                                        <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                            <h6 className="   fs-12 fw-normal d-flex justify-content-start">Gst No:</h6>

                                                                            <h6 className="text-muted pl-1 text-start">{Data.gstNo ? Data.gstNo : "No information"}</h6>
                                                                        </div>
                                                                        <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                            <h6 className="   fs-12 fw-normal d-flex justify-content-start ">City:</h6>
                                                                            <h6 className="text-muted pl-1 text-start">{Data.city ? Data.city : ""}</h6>
                                                                        </div>

                                                                        <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                            <h6 className="  fs-6 fw-normal ">Industry:</h6>
                                                                            <h6 className="text-muted pl-1 d-flex">{Data.industry ? Data.industry : ""}</h6>
                                                                        </div>
                                                                        <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                                            <h6 className="  fs-6 fw-normal ">state:</h6>
                                                                            <h6 className="text-muted pl-1 d-flex">{Data.state ? Data.state : ""}</h6>
                                                                        </div>



                                                                    </div>



                                                                </div>




                                                            </div>


                                                            <div style={{ marginTop: "20px" }} className="row  justify-content-around ">
                                                                
{/* 
                                                                {
                                                                    <div className="card bg-light col-3">
                                                                        <div className="card-header d-flex flex-lg-row align-items-center">
                                                                            <h5 className="text-start">Company Documents</h5>
                                                                            <Link title="View Personal Documents" style={{ cursor: "pointer" }}>View</Link>

                                                                        </div>
                                                                        <div className="card-body">
                                                                            <ul style={{ marginTop: "15px" }}>
                                                                                {Data.gstdoc && (
                                                                                    <li className="text-start">
                                                                                        GST DOC{' '}
                                                                                        <span
                                                                                            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                                                                            onClick={() => setimageurlfunction(Data.gstdoc)}
                                                                                        >
                                                                                            View
                                                                                        </span>
                                                                                    </li>
                                                                                )}
                                                                                {Data.registerdoc && (
                                                                                    <li className="text-start">
                                                                                        registerdoc{' '}
                                                                                        <span
                                                                                            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                                                                            onClick={() => setimageurlfunction(Data.registerdoc)}
                                                                                        >
                                                                                            View
                                                                                        </span>
                                                                                    </li>
                                                                                )}

                                                                            </ul>

                                                                        </div>
                                                                        <div className="card-footer d-flex justify-content-between">
                                                                            <Link
                                                                                type="button"
                                                                                style={{ cursor: "pointer" }}

                                                                                
                                                                            >
                                                                                Verify
                                                                            </Link>
                                                                            <Link
                                                                                type="button"
                                                                                style={{ cursor: "pointer" }}
                                                                                className="bi bi-arrow-right"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#assignModal"

                                                                                onClick={() => { setcompanyName(Data.nameOfCompany) }}

                                                                            >
                                                                                Assign
                                                                            </Link>
                                                                        </div>
                                                                    </div>

                                                                } */}




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



                                                                                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", fontSize: "2.1rem", color: "#83a4d4" }}>
                                                                                        <div style={{ width: "80%", fontWeight: "bold" }}>Grand Total</div>
                                                                                        <b>₹ {amount.total}</b></div>
                                                                                </div>

                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button type="button" style={{ color: "white", backgroundColor: "#3498DB" }}></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    {/* <button type="button" className="me-3" data-bs-toggle="modal" data-bs-target="#notesModal" style={{ color: "white", backgroundColor: "#3498DB" }} >Notes</button> */}




                                                                    {/* modal for notes........................conversation......................................................... */}

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


                                                    :
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
                          
                                                            { /* <div className="col-lg-6 d-flex  flex-lg-row  " >
                                                              <h6 className="fs-6 fw-normal  ">Education:</h6>
                                                              {
                                                                Data.education && Data.education.length <= 0 ?
                                                                  <h6 className="text-muted pl-1 d-flex">No Education</h6>
                          
                                                                  : <Fragment>
                                                                    <h6 className="text-muted pl-1 text-start">
                                                                      <ul>
                                                                        {
                                                                          Data.education && Data.education.map((edu, index) => {
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
                                                            </div>*/}
                          
                                                            {/* <div className="col-lg-6   d-flex  flex-lg-row  " >
                                                              <h6 className="  fs-6 fw-normal ">Experience:</h6>
                                                              {
                                                                Data.JobExperience && Data.JobExperience.length === 0 ?
                                                                  <h6 className="text-muted pl-1 d-flex">No Experience</h6>
                          
                                                                  :
                                                                  <Fragment>
                                                                    {
                                                                      Data.JobExperience && Data.JobExperience.map((exp, index) => {
                          
                          
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
                                                            </div> */}
                          
                          
                          
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

                                                              
                            
                                                                      {
                                                                        Data.education && Data.education.length <= 0 ?
                                                                          <h6 className="text-muted pl-1 d-flex">No Education</h6>
                          
                                                                          : <Fragment>
                                                                      
                                                                            {
                                                                              Data.education && Data.education.map((edu, index) => {
                          
                                                                                return (
                                                                                  <>
                                                                             
                                                                                  {data.tasks&&data.tasks.length>0?
                                                                                    
                                                                                    data.tasks.map((task)=>{

                                                                                      return(
                                                                                        <>
                                                                                        {task.collegename==edu.college&&task.qualification==edu.qualification&& <div>
                                                                                    <div className="card-body row">
                                                                                    <div className="card-header">
                                                                        <div style={{position:"relative"}}>


                                                                          
                                                                          <h5 className="text-start">Educational Documents </h5>

                                                                                                  {edu.status === "Verified" && (
                                                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                                                      <p style={{ fontWeight: "bold", color: "green" }}>Status: {edu.status || ""}</p>
                                                                                                      <img style={{ width: "50px", marginLeft: "10px" }} src="http://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="img" />
                                                                                                    </div>
                                                                                                  )}

                                                                                                  {edu.status === "Wrong Credentials" && (
                                                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                                                      <p style={{ fontWeight: "bold", color: "red" }}>Status: {edu.status || ""}</p>
                                                                                                      <img style={{ width: "50px", marginLeft: "10px" }} src="http://cdn-icons-png.flaticon.com/512/2521/2521995.png" alt="img" />
                                                                                                    </div>
                                                                                                  )}



                                                                          <p style={{fontWeight:"bold",color:"green",position:"absolute",right:"0px",top:"0px"}}>Accepted Date:- {task.date?task.date:""}</p>

                                                                        </div>




                                                                      </div>
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
                              <button
  type="button"
  className="me-3"
  data-bs-toggle="modal"
  data-bs-target="#notesModal"
  style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}
  onClick={() => setconversations(edu.note)}
>
  Notes
</button>




<Dropdown>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        // style={{ backgroundColor: getButtonColor(edu.status?edu.status:"") }}
        style={{ backgroundColor: "lightgrey", color: "black" }}

      >
        {edu.status?edu.status:"change status"}
      </Dropdown.Toggle>



      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleEducationStatusChange(Data._id,edu.college,edu.qualification,'Verified')}>Verified</Dropdown.Item>
        <Dropdown.Item onClick={() => handleEducationStatusChange(Data._id,edu.college,edu.qualification,'Wrong Credentials')}>Wrong Credentials</Dropdown.Item>
        <Dropdown.Item onClick={() => handleEducationStatusChange(Data._id,edu.college,edu.qualification,'Ongoing')}>Ongoing</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>          
                                                                                            {/* modal for notes.............................................adding not for educational documents.................................... */}

                                                                                            <div className="modal fade" id="notesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                              <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                                                                                                <div className="modal-content">
                                                                                                  <div className="modal-header">
                                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Write a note</h1>
                                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                                          </div>


                                                                                                          <div className="modal-body" style={{ overflow: "scroll" }}>
                                                                                                            <div className="form-group">
                                                                                 

                                                                                                              {conversations.length>0?conversations.map((conversation, index) => (
                                                                                                                <div key={index} className={conversation.senderdetails.email === profiledata.email ? 'right-message' : 'left-message'}>
                                                                                                                  {conversation.senderdetails.email !== profiledata.email && (
                                                                                                                    <div className="left-message-avatar">
                                                                                                                      {/* Add your avatar component here */}
                                                                                                                      <Avatar>{conversation.senderdetails.name ? conversation.senderdetails.name[0] : 'N'}</Avatar>
                                                                                                                    </div>
                                                                                                                  )}

                                                                                                                  <div className="message-content">
                                                                                                                    <p className="message-sender">
                                                                                                                      {conversation.senderdetails.name ? conversation.senderdetails.name : "No Name"}
                                                                                                                      {conversation.senderdetails.role ? ` - ${conversation.senderdetails.role}` : ""}
                                                                                                                    </p>
                                                                                                                    <p className="message-text">{conversation.note ? conversation.note : ""}</p>
                                                                                                                    <p className="message-date">{conversation.date ? conversation.date : ""}</p>
                                                                                                                  </div>


                                                                                                                </div>
                                                                                                              )):"no past notes..."}

                                                                                                             

                                                                                                            </div>
                                                                                                          </div>


                                                                                                  <div className="modal-footer">
                                                                                                  <textarea
                                                                                                                className="form-control"
                                                                                                                id="exampleFormControlTextarea1"
                                                                                                                rows="3"
                                                                                                                onChange={(e) => setEducationNote(e.target.value)}
                                                                                                                placeholder="write a note"
                                                                                                              ></textarea>
                                                                             <Button onClick={()=>{sendEducationNote(Data._id,edu.college,edu.qualification)}}>Send</Button>

                                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                                                                                    {/* <button type="button" style={{ color: "white", backgroundColor: "#3498DB" }} onClick={() => sendalert(Data._id, Data.location)}>Save changes</button> */}
                                                                                                  </div>
                                                                                                </div>
                                                                                              </div>
                                                                                            </div>
                                                                                          </div>
                                                                                          <div>
                                                                                                   
                          
{/*                           
                          
                                                                                            <div>
                                                                                              {edu.whoaccepted && edu.whoaccepted.status && edu.whoaccepted.accepteduseremail ? (
                                                                                                <p>{edu.whoaccepted.status}</p>
                                                                                              ) : (
                                                                                                ""
                                                                                              )}
                          
                                                                                            </div> */}
                          
                                                                                         
                          
                          
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

                                                                                        {/* <button className="btn btn-danger">Decline</button> */}


                                                                                        {/* <Link to="/userselection" style={{ cursor: "pointer" }} className="bi bi-arrow-right"> Assign </Link> */}

                                                                                        {/* <button className="btn btn-success">Accept</button> */}

                                                                                      </div>
                                                                                    )}
                          
                          
                                                                                    <hr></hr>
                          
                                                                                  </div>}
                                                                                        </>
                                                                                      )

                                                                                    })
                                                                                        
                                                                                    
                                                                                    
                                                                                    :<></>}
                                                                          
                                                                            
                                                                                  
                                                                          </> )
                                                                              })
                                                                            }
                                                                          </Fragment>
                                                                      }
                          
                          
                          
                          
                          
                                                                    </div>
                          
                          
                          
                          
                                                                  </div>
                                                                  <div className='row mt-3'>
                                                                    {/* <div className='card col-12' style={{display:"flex"}}> */}
                          
                                                                    <div className="card col-12">

                                                                   
                                                                 
                                                                      
                                                                      
                                                                      {
                                                                        Data.JobExperience && Data.JobExperience.length <= 0 ?
                                                                        <></>
                          
                                                                          : <Fragment>
                                                                       
                          
                                                                            {
                                                                              Data.JobExperience && Data.JobExperience.map((job, index) => {
                                                                                return (
                          
                                                                                  <>
                                                                                  
                                                                                {data.tasks&&data.tasks.length>0?

                                                                              data.tasks.map((task)=>{

                                                                                 
                                                                                return(
                                                                                  <>
                                                                                  {task.companyname==job.companyName&&task.experienceStart==job.experienceStart&& <div className="card-body row">
                                                                                            <div className="card-header">
                                                                        <div style={{position:'relative'}}>
                                                                          <h5 className="text-start">Professional Documents </h5>





                                                                                          {job.status === "Verified" && (
                                                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                                              <p style={{ fontWeight: "bold", color: "green" }}>Status: {job.status || ""}</p>
                                                                                              <img style={{ width: "50px", marginLeft: "10px" }} src="http://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="img" />
                                                                                            </div>
                                                                                          )}

                                                                                         {job.status === "Wrong Credentials" && (
                                                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                                              <p style={{ fontWeight: "bold", color: "red" }}>Status: {job.status || ""}</p>
                                                                                              <img style={{ width: "50px", marginLeft: "10px" }} src="http://cdn-icons-png.flaticon.com/512/2521/2521995.png" alt="img" />
                                                                                            </div>
                                                                                          )}

<Box sx={{ width: '100%' }}>
  <Stepper activeStep={job.mailsended ? 0 : job.formviewed ? 1 : job.hrform ? 2 : -1} alternativeLabel>
    {steps.map((label) => (
      <Step key={label}>

     <StepLabel>{label}</StepLabel>

      </Step>
    ))}
  </Stepper>
</Box>






                                                                          <p style={{fontWeight:"bold",color:"green",position:"absolute",right:"0px",top:"0px"}}>Accepted Date:- {task.date?task.date:""}</p>
                                                                        </div>
                            
                                                                      </div>
                          
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
                                                                                                  {/* <b>₹ {amount.total}</b> */}

                                                                                                  <b>60</b>
                                                                                                  
                                                                                                  
                                                                                                  </div>
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
                          

                                                                                      <button
  type="button"
  className="me-3"
  data-bs-toggle="modal"
  data-bs-target="#jobnotesModal"
  style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}
  onClick={() => setconversations(job.note)}
>
  Notes
</button>


<button
  type="button"
  className="me-3"
  onClick={() => { sendMail(Data,job) }}
  style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", width: "120px" }}
  
>
 Send Mail
</button>




<Dropdown>
       <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        // style={{ backgroundColor: getButtonColor(job.status?job.status:"") }}

        style={{ backgroundColor: "lightgrey", color: "black" }}

      >
        {job.status?job.status:"change status"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleJobStatusChange(Data._id,job.companyName,job.experienceStart,'Verified')}>Verified</Dropdown.Item>
        <Dropdown.Item onClick={() => handleJobStatusChange(Data._id,job.companyName,job.experienceStart,'Wrong Credentials')}>Wrong Credentials</Dropdown.Item>
        <Dropdown.Item onClick={() => handleJobStatusChange(Data._id,job.companyName,job.experienceStart,'Ongoing')}>Ongoing</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>  
                                                                                        {/* modal for notes................................................................................. */}
                          
                                                                                        <div className="modal fade" id="jobnotesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                                                                                            <div className="modal-content">
                                                                                              <div className="modal-header">
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Write a note</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                              </div>

                                                                                                 <div className="modal-body" style={{ overflow: "scroll" }}>
                                                                                                            <div className="form-group">
                                                                                 

                                                                                                              {conversations.length>0?conversations.map((conversation, index) => (
                                                                                                                <div key={index} className={conversation.senderdetails.email === profiledata.email ? 'right-message' : 'left-message'}>
                                                                                                                  {conversation.senderdetails.email !== profiledata.email && (
                                                                                                                    <div className="left-message-avatar">
                                                                                                                      {/* Add your avatar component here */}
                                                                                                                      <Avatar>{conversation.senderdetails.name ? conversation.senderdetails.name[0] : 'N'}</Avatar>
                                                                                                                    </div>
                                                                                                                  )}

                                                                                                                  <div className="message-content">
                                                                                                                    <p className="message-sender">
                                                                                                                      {conversation.senderdetails.name ? conversation.senderdetails.name : "No Name"}
                                                                                                                      {conversation.senderdetails.role ? ` - ${conversation.senderdetails.role}` : ""}
                                                                                                                    </p>
                                                                                                                    <p className="message-text">{conversation.note ? conversation.note : ""}</p>
                                                                                                                    <p className="message-date">{conversation.date ? conversation.date : ""}</p>
                                                                                                                  </div>


                                                                                                                </div>
                                                                                                              )):"no past notes..."}

                                                                                                             

                                                                                                            </div>
                                                                                                          </div>

                                                                                              <div className="modal-footer">

                                                                                              <textarea
                                                                                                                className="form-control"
                                                                                                                id="exampleFormControlTextarea1"
                                                                                                                rows="3"
                                                                                                                onChange={(e) => setjobnote(e.target.value)}
                                                                                                                placeholder="write a note"
                                                                                                              ></textarea>
                                                                                                 
                                                                                                 <Button onClick={()=>{sendjobnote(Data._id,job.companyName,job.experienceStart)}}>Send</Button>

                                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                                                                                {/* <button type="button" style={{ color: "white", backgroundColor: "#3498DB" }} onClick={() => sendalert(Data._id, Data.location)}>Save changes</button> */}
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
                                                                                      {/* <button className="btn btn-danger">Decline</button> */}

                                                                                     

                                                                                      {/* <button className="btn btn-success">Accept</button> */}
                                                                                    </div>
                                                                                    <hr></hr>
                                                                                  </div>
                          }
                                                                                  </>
                                                                                )


                                                                              })
                                                                                
                                                                               
                                                                                :""}
                                                                                  
                          
                          
                          
                          
                          
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
                                                    
                                                    
                                                    
                                                    }








                                        </div>













                                    </Fragment>







                                )
                            })

                                : "no data"
                            }
                        </>




                    }

                    {/* modal for assigning task..................... */}

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


                            <Sendingmailform onRequestClose={closemodalforsendingmail} sendmaildata={sendmaildata} companymaildata={companymaildata}/>


                        </Modal>





                    )}
                    {/* modal for mail form..................................... */}





                    {/* <UserSelection show={modalShow} onHide={() => setModalShow(false)} onSave={handleSaveUsers} selectrole={selectrole} iuid={iuid} clearselectedrole={clearselectedrole} /> */}





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
        </div>
    )
}
