import React, { useEffect, useState, Fragment } from 'react';
import ICHPDashboard from './ICHPDashboard';
import myImage from '../../assets/employee1.jpg'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { set, useForm } from "react-hook-form";
import { Range, getTrackBackground } from "react-range";
import Sidebar from '../Dashboard/Sidebar';
import Details from '../Dashboard/Details';
import 'bootstrap/dist/css/bootstrap.min.css';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './company.css'


// import Modal from 'react-modal';

import { Modal, Button } from 'react-bootstrap';
import { green } from '@mui/material/colors';

// import DatePicker from "react-multi-date-picker"

import DatePanel from "react-multi-date-picker/plugins/date_panel"


// import Datepicker from 'react-datepicker';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';




export default function Company() {
  const {
    register,
    handleSubmit,

    formState: { errors },

  } = useForm();

  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState([])



  const [showdeletecofirm, setshowdeletecofirm] = useState(false)


  const [deleteconfirminput, setdeleteconfirminput] = useState("")





  const handleSelectDesignation = (selected) => {
    if (selected && selected.length > 3) {

      alert('Selected any three')
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options

    }

    setSelecteddesignation(selected);
  };


  const handleInputChange = (inputValue) => {

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/skills/${inputValue}`)
        .then((res) => {
          const newSkills = [];
          const val = res.data;

          val.map((e) => {
            newSkills.push({
              value: e.allSklls,
              label: e.allSklls,
            });
            return null
          });


          setSkills(newSkills);
        })
    }
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,

      // Adjust the font size values to your preference
      borderColor: state.isFocused ? '#17a2b8' : provided.borderColor,
      boxShadow: 'none', // Remove the default box-shadow
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#17a2b8', // Set the desired color for the dropdown icon
    }),

    placeholder: (provided) => ({
      ...provided,
      fontSize: '14px',
      textAlign: 'left',
      marginLeft: '15px'

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#17a2b8' : "white"
    })
  };



  const handleDesignationChange = (inputValue) => {

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/designation/${inputValue}`)
        .then((res) => {
          setDesignation(res.data);
        })
    }
  };


  const handleCityChange = (inputValue) => {

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
        .then((res) => {

          setCity(res.data);
        })
    }
  };
  const [modalData, setModalData] = useState({})
  const [city, setCity] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [functionalArea, setFunctionalArea] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedRequiredSkills, setSelectedRequiredSkills] = useState([])
  const [selecteddesignation, setSelecteddesignation] = useState([])

  const navigate = useNavigate();

  const [hr, setHr] = useState([]);



  useEffect(() => {


    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city`)
      .then((res) => {

        setCity(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/designation`)
      .then((res) => {

        setDesignation(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/functionalArea`)
      .then((res) => {


        setFunctionalArea(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/industry`)
      .then((res) => {
        setIndustry(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/hr`)
      .then((res) => {
        setHr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/skills`)
      .then((res) => {
        const newSkills = [];
        const val = res.data;
        val.map((e) => {
          newSkills.push({
            value: e.allSklls,
            label: e.allSklls,
          });
          return null
        });


        setSkills(newSkills);
      })
      .catch((err) => {
        // console.log(err);
      });

  }, []);


  const handleHrChange = (inputValue) => {
    console.log(inputValue);

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/hr/${inputValue}`)
        .then((res) => {
          setHr(res.data);
        });
    }
  };






  const [addJob, setAddJob] = useState(
    {
      title: "",
      companyName: "",
      companyId: "",
      industry: "",
      functionalArea: "",
      location: "",
      designation: [],
      skills: [],
      employmentType: "",
      RolesAndResponsibilities: "",
      candidateProfile: "",
      jobType: "",
      numberOfVacancies: "",
      educationalQualification: "",
      nameOfRecuriter: "",
      emailOfRecuriter: "",
      contactDetailsOfRecuriter: "",
      userId: "",
      createdBy: "",
      comapnyName: "",
      whomToShow: false
    }

  )


  const [Errors, setErrors] = useState("")

  const [email, setEmail] = useState('');


  const [details, setDetails] = useState([])



  const [deleteId, setdeleteId] = useState("")





  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/getcompany/${localStorage.getItem("id")}`)
      .then((res) => setDetails(res.data))
      .catch(err => console.log(err))
  }, [])






  const validateSkills = () => {
    return (selectedSkills && selectedSkills.length >= 5) || "Please select at least Five options";
  };
  const handleSelectSkills = (selected) => {
    if (selected && selected.length > 20) {
      alert('Select only 20  Fields')
      selected = selected.slice(0, 20); // Limit the selection to the first 3 options
    }

    setSelectedSkills(selected);
  };

  const handleRequiredSkills = (selected) => {
    if (selected && selected.length > 5) {
      alert('Select any 5 mandatory Fields')
      selected = selected.slice(0, 5); // Limit the selection to the first 3 options
    }

    setSelectedRequiredSkills(selected);
  };


  const handleWhomToShowChange = (event) => {
    const { name, checked } = event.target;

    setAddJob((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };



  // deleting compnay....................................................................................................
  let inputStyles

  function deleteFunction() {




    const emailpattern = localStorage.getItem("email")

    if (emailpattern === email) {

      inputStyles = {
        borderColor: "green"
      }






      axios.delete(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/deletecompany/${deleteId}`)
        .then((res) => {




          setshowdeletecofirm(false)


        }
        ).catch(err => console.log(err));


    }
    if (emailpattern != email) {

      inputStyles = {
        borderColor: "red"
      }

      setErrors("invalid email....")

    }





  }





  function confirmdeletefunction(id) {


    setshowdeletecofirm(true)

    setdeleteId(id)


  }





  const [values, setValues] = useState([1, 1]);
  const [works, setWorks] = useState([0, 0]);

  // Function to update the handle values
  const handleOnChange = (newValues) => {
    setValues(newValues);
  };

  const handleOnChangeYears = (newValues) => {
    setWorks(newValues);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    checkDomain();
  };

  function checkDomain() {
    axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/addjobs`, {
        title: addJob.title,
        companyName: modalData.nameOfCompany,
        companyId: modalData._id,
        industry: addJob.industry.value,
        functionalArea: addJob.functionalArea.value,
        location: addJob.location.value,
        designation: selecteddesignation.map((e) => e.value),
        skills: selectedSkills.map((e) => e.value),
        requiredSkills: selectedRequiredSkills.map((e) => e.value),
        employmentType: addJob.employmentType,
        RolesAndResponsibilities: addJob.RolesAndResponsibilities,
        candidateProfile: addJob.candidateProfile,
        jobType: addJob.jobType,
        numberOfVacancies: addJob.numberOfVacancies,
        salaryStartFrom: values[0],
        salaryEndTo: values[1],
        experienceStartFrom: works[0],
        experienceEndTo: works[1],
        educationalQualification: addJob.educationalQualification,
        nameOfRecuriter: addJob.nameOfRecuriter,
        emailOfRecuriter: addJob.emailOfRecuriter,
        contactDetailsOfRecuriter: addJob.contactDetailsOfRecuriter,
        userId: localStorage.getItem('id'),
        createdBy: localStorage.getItem('email'),
        whomToShow: addJob.whomToShow ? 'Looking for job' : 'Public',
      })
      .then((res) => {
        alert('Job has been posted.');
      
        // Ensure `navigate` is defined and functional in your code
        navigate('/mypostedjobs');
      
        // Reload the page
        window.location.reload();
      })
      
      .catch((err) => {
        console.log(err);
        // Handle errors here, such as displaying an error message to the user.
      });
  }


  const [showModal, setShowModal] = useState(false);

  const handleRecruitmentModalShow = () => {
    setShowModal(true);
  };

  const handleRecruitmenModalClose = () => {
    setShowModal(false);
  };


  const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDates([...selectedDates, date]);
      setCurrentDate(date);
    } else {
      setSelectedDates(selectedDates.filter(d => d.getTime() !== currentDate.getTime()));
      setCurrentDate(null);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };



  console.log("selectedDates", selectedDates)


  const [moneyRange, setMoneyRange] = useState(500); // Initial value set to the minimum (500 Rs)

  const handleRangeChange = (e) => {
    setMoneyRange(parseInt(e.target.value, 10));
  };







  // function to handle recrutmnt drive.........

  const [recruitmentForm, setRecruitmentForm] = useState({


    title: "",
    companyName: "",
    venue: "",
    No_of_Support_HRs: "",
    HRtitle: [],
    Hourlypay: "",
    totalpositions: "",
    hiringtitles: [],
    totalhours: "",

    RecruiterId: "",
    Recruitername: "",
    Recruiteremail: "",
    RecruiterContactDetails: "",

    selecteddates: []



  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecruitmentForm({
      ...recruitmentForm,
      [name]: value
    });
  };

  async function handleRecruitmentPost() {
    try {

      if (selectedDates) {
        const updatedForm = { ...recruitmentForm, selecteddates: selectedDates, Hourlypay: moneyRange };



        console.log("updatedform", updatedForm)

        const response = await axios.post('http://backend.karandszone.com/karands/jobs/postrecruitmentdrive', updatedForm);
        console.log(response.data);

        if (response.data) {

          alert("posted sucessfully")
          
          handleRecruitmenModalClose()
         

        }




      }
      if (!selectedDates) {
        alert("selected date....")
      }



    } catch (error) {
      console.error("Error:", error);
    }
  }



  const [isReferralChecked, setIsReferralChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("fixed"); // Default selected option is 'fixed'

  const handleReferralCheckboxChange = () => {
    setIsReferralChecked(!isReferralChecked);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [fixedpayoutRange, setFixedpayoutRange] = useState(1000); // Initial value set to the minimum (500 Rs)

  const handleFixedpayoutChange = (e) => {
    setFixedpayoutRange(parseInt(e.target.value, 10));
  };




















  // const [dates, setDates] = useState([]);

  // const handleSelect = (dates) => {
  //   setDates(dates);
  // };




  return (

    <div>

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' style={{ height: "100%" }} />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />

          <hr />






          <div style={{ marginLeft: "10px" }} >



            <Box sx={{ display: 'flex' }}>
              {/* <ICHPDashboard /> */}




              <Box component="main" sx={{ marginTop: 2, width: '80vw' }}>
                <button type="button" className='d-flex flex-end' style={{ marginBottom: "10px", marginLeft: "10px", backgroundColor: "rgb(3, 104, 104)", color: "whitesmoke" }} onClick={() => navigate("/companypage/add")}>
                  Add Company
                </button>
                <div>
                  <div className="container-lg container-xl "  >
                    <div className="card ">
                      <div className="card-header">

                        <h5 className="d-flex text-start">List of Companies : {details.length}</h5>
                      </div>

                      <div
                        class="modal fade"
                        id="exampleModalPostJob"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg modal-dialog-scrollable">
                          <div style={{ zIndex: "1" }} class="modal-content">
                            <div class="modal-header">

                              <h1
                                class="modal-title text-primary fs-5"
                                id="exampleModalLabel"
                              >
                                Post the Job
                              </h1>

                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>


                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} class="modal-body p-3" >
                            <div></div>
                              <div class="mb-3 row ">
                                <label
                                  for="companyDetails"
                                  class="col-sm-3 col-form-label text-start text-start text-dark"
                                >
                                  Company Name
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="companyDetails"
                                    placeholder="Type company name"
                                    value={modalData.nameOfCompany}
                                  />
                                </div>

                              </div>

                              <div class="mb-3 row">
                                <label
                                  for="educationalQualification"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Title Description
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    minLength={10}
                                    maxLength={50}
                                    class="form-control"
                                    id="educationalQualification"
                                    value={addJob.title}
                                    required
                                    onChange={(e) => setAddJob({ ...addJob, title: e.target.value })}
                                  />
                                  <p className='text-mute text-start' style={{fontSize:"12px",marginTop:"0px"}}>*50 chars only</p>
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="staticIndustry"
                                  class="col-md-3 col-form-label text-start text-dark"
                                >
                                  Industry
                                </label>
                                <div class="col-sm-9">
                                  <Select
                                    styles={customStyles}
                                    required
                                    options={industry}
                                    isSearchable={true}
                                    placeholder="Select Industry"
                                    value={addJob.industry}
                                    onChange={(e) => setAddJob({ ...addJob, industry: e })}
                                  />
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="functionalArea"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Functional Area
                                </label>
                                <div class="col-sm-9">
                                  <Select
                                    styles={customStyles}
                                    options={functionalArea}
                                    value={addJob.functionalArea}
                                    onChange={(e) => setAddJob({ ...addJob, functionalArea: e })}

                                    isSearchable={true}

                                    placeholder="Select Functional Area"

                                  />
                                </div>
                              </div>
                              <div class="mb-3 row" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                <label
                                  for="functionalArea"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Select Objective Survey
                                </label>
                                <div class="col-sm-9">
                                  <input checked={addJob.whomToShow} name='whomToShow' id='whomToShow' onChange={handleWhomToShowChange} type="checkbox"></input>
                                  <label style={{ marginLeft: "10px" }}>If you select, It is visible only for looking for job</label>
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="functionalArea"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Designation
                                </label>
                                <div class="col-sm-9">
                                  <Select
                                    styles={customStyles}
                                    options={designation}
                                    value={selecteddesignation}
                                    onChange={handleSelectDesignation}
                                    isSearchable={true}
                                    isMulti
                                    placeholder="Select Designation"

                                  />
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="inputLocation"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Location
                                </label>
                                <div class="col-sm-9">
                                  <Select
                                    styles={customStyles}
                                    onInputChange={handleCityChange}

                                    rules={{ required: 'This field is required' }}
                                    value={addJob.location}
                                    options={city}
                                    placeholder="Select Location"
                                    onChange={(e) => { setAddJob({ ...addJob, location: e }) }}
                                  />
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="inputSkills"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Required Skills
                                </label>
                                <div class="col-sm-9">
                                  <Select
                                    styles={customStyles}
                                    onInputChange={handleInputChange}

                                    options={skills}
                                    isSearchable={true}
                                    isMulti
                                    placeholder="Select skills"
                                    value={selectedRequiredSkills}
                                    {...register('industry', { validate: validateSkills })}

                                    onChange={handleRequiredSkills}
                                  />
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="inputSkills"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Skills
                                </label>
                                <div class="col-sm-9">
                                  <Select
                                    styles={customStyles}
                                    onInputChange={handleInputChange}

                                    options={skills}
                                    isSearchable={true}
                                    isMulti
                                    placeholder="Select skills"
                                    value={selectedSkills}
                                    {...register('industry', { validate: validateSkills })}

                                    onChange={handleSelectSkills}
                                  />

                                  <p style={{fontSize:"17px"}}>select at least five skills...</p>
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="employmentType"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Employment Type
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="employmentType"
                                    value={addJob.employmentType}
                                    onChange={(e) => setAddJob({ ...addJob, employmentType: e.target.value })}
                                  />
                                </div>
                              </div>
                              <hr />
                              <h5 className="text-dark text-start">Job Description & Requirements</h5>

                              <div class="mb-3 row">
                                <div class="col-sm ">
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    minLength={500}
                                    maxLength={2000}
                                    placeholder="Enter Roles and Responsibilities"
                                    value={addJob.RolesAndResponsibilities}
                                    onChange={(e) => setAddJob({ ...addJob, RolesAndResponsibilities: e.target.value })}
                                  ></textarea>
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <div class="col-sm ">
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    minLength={100}
                                    maxLength={1000}
                                    placeholder=" Enter Desired Candidate Profile"
                                    value={addJob.candidateProfile}
                                    onChange={(e) => setAddJob({ ...addJob, candidateProfile: e.target.value })}
                                  ></textarea>
                                </div>
                              </div>

                              <h6 style={{
                                marginTop: "10px"
                              }}>
                                Working Type
                              </h6>
                              <div
                                style={{
                                  marginTop: "10px",
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div className="jobType">
                                  <input
                                    style={{
                                      marginRight: "5px",
                                    }}
                                    type="radio"
                                    id="Work from Home"
                                    value="Work from Home"
                                    checked={addJob.jobType === "Work from Home"}
                                    onChange={(e) => {
                                      setAddJob({ ...addJob, jobType: e.target.value });
                                    }}
                                  />
                                  <label for="Work from Home">Work from Home</label>
                                </div>
                                <div className="jobType">
                                  <input
                                    style={{
                                      marginRight: "5px",
                                    }}
                                    type="radio"
                                    id="Work from office"
                                    value="Work from office"
                                    checked={addJob.jobType === "Work from office"}
                                    onChange={(e) => {
                                      setAddJob({ ...addJob, jobType: e.target.value });
                                    }}
                                  />
                                  <label for="Work from office">Work from office</label>
                                </div>
                                <div className="jobType">
                                  <input
                                    style={{
                                      marginRight: "5px",
                                    }}
                                    type="radio"
                                    id="Remote"
                                    value="Remote"
                                    checked={addJob.jobType === "Remote"}
                                    onChange={(e) => {
                                      setAddJob({ ...addJob, jobType: e.target.value });
                                    }}
                                  />
                                  <label for="Remote">Remote</label>
                                </div>
                              </div>

                              <div class="mb-3 row">
                                <label
                                  for="numberOfvacancy"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Number of Vacancies
                                </label>
                                <div class="col-sm-9 text-dark">
                                  <input
                                    type="number"
                                    class="form-control  text-dark"
                                    id="numberofvacancy"
                                    value={addJob.numberOfVacancies}
                                    onChange={(e) => setAddJob({ ...addJob, numberOfVacancies: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="inputSalary"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Salary
                                </label>
                                <div class="col-sm-9">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexWrap: "wrap",
                                      margin: "20px 20px 0 20px"
                                    }}
                                  >
                                    <Range
                                      values={values}
                                      step={1}
                                      min={1}
                                      max={50} // Update the max value to 100
                                      onChange={handleOnChange}
                                      renderTrack={({ props, children }) => (
                                        <div
                                          onMouseDown={props.onMouseDown}
                                          onTouchStart={props.onTouchStart}
                                          style={{
                                            ...props.style,
                                            height: "36px",
                                            display: "flex",
                                            width: "100%"
                                          }}
                                        >
                                          <div
                                            ref={props.ref}
                                            style={{
                                              height: "5px",
                                              width: "100%",
                                              borderRadius: "4px",
                                              background: getTrackBackground({
                                                values,
                                                colors: ["#ccc", "#548BF4", "#ccc"],
                                                min: 0,
                                                max: 50
                                              }),
                                              alignSelf: "center"
                                            }}
                                          >
                                            {children}
                                          </div>
                                        </div>
                                      )}
                                      renderThumb={({ props }) => (
                                        <div
                                          {...props}
                                          style={{
                                            ...props.style,
                                            height: "16px",
                                            width: "16px",
                                            borderRadius: "4px",
                                            backgroundColor: "#FFF",
                                            boxShadow: "0px 2px 6px #AAA"
                                          }}
                                        />
                                      )}
                                    />
                                    {`${values[0].toFixed(0)}  LPA - ${values[1].toFixed(0)} LPA`}

                                  </div>

                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="workExperience"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Work Experience
                                </label>
                                <div class="col-sm-9">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexWrap: "wrap",
                                      margin: "20px"
                                    }}
                                  >
                                    <Range
                                      values={works}
                                      step={1}
                                      min={0}
                                      max={20} // Update the max value to 100
                                      onChange={handleOnChangeYears}
                                      renderTrack={({ props, children }) => (
                                        <div
                                          onMouseDown={props.onMouseDown}
                                          onTouchStart={props.onTouchStart}
                                          style={{
                                            ...props.style,
                                            height: "36px",
                                            display: "flex",
                                            width: "100%"
                                          }}
                                        >
                                          <div
                                            ref={props.ref}
                                            style={{
                                              height: "5px",
                                              width: "100%",
                                              borderRadius: "4px",
                                              background: getTrackBackground({
                                                values: works,
                                                colors: ["#ccc", "#548BF4", "#ccc"],
                                                min: 0,
                                                max: 20
                                              }),
                                              alignSelf: "center"
                                            }}
                                          >
                                            {children}
                                          </div>
                                        </div>
                                      )}
                                      renderThumb={({ props }) => (
                                        <div
                                          {...props}
                                          style={{
                                            ...props.style,
                                            height: "16px",
                                            width: "16px",
                                            borderRadius: "4px",
                                            backgroundColor: "#FFF",
                                            boxShadow: "0px 2px 6px #AAA"
                                          }}
                                        />
                                      )}
                                    />
                                    {`${works[0].toFixed(0)}  Years - ${works[1].toFixed(0)} Years`}


                                  </div>

                                </div>
                              </div>
                              <div class="mb-3 row">
                                <label
                                  for="educationalQualification"
                                  class="col-sm-3 col-form-label text-start text-dark"
                                >
                                  Educational Qualifications
                                </label>
                                <div class="col-sm-9">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="educationalQualification"
                                    value={addJob.educationalQualification}
                                    onChange={(e) => setAddJob({ ...addJob, educationalQualification: e.target.value })}
                                  />
                                </div>
                              </div>

                             
                              <hr />
                              <h5 className="text-dark">Recruiter Details</h5>
                              <div className="text-dark">
                                <div class="mb-3 row">
                                  <label for="inputName" class="col-sm-3 col-form-label text-start">
                                    Name
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="text"
                                      class="form-control"
                                      id="inputName"
                                      value={addJob.nameOfRecuriter}
                                      onChange={(e) => setAddJob({ ...addJob, nameOfRecuriter: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div class="mb-3 row">
                                  <label for="inputEmail" class="col-sm-3 col-form-label text-start">
                                    Email
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="email"
                                      class="form-control"
                                      id="inputEmail"
                                      value={addJob.emailOfRecuriter}
                                      onChange={(e) => setAddJob({ ...addJob, emailOfRecuriter: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div class="mb-3 row">
                                  <label
                                    for="contactDetails"
                                    class="col-sm-3 col-form-label text-start"
                                  >
                                    Contact Details
                                  </label>
                                  <div class="col-sm-9">
                                    <input
                                      type="text"
                                      class="form-control"

                                      id="contactDetails"
                                      value={addJob.contactDetailsOfRecuriter}
                                      onChange={(e) => setAddJob({ ...addJob, contactDetailsOfRecuriter: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="modal-footer">


                                <button type="submit"
                                  class="btn btn-primary">
                                  Post Job

                                </button>




                              </div>
                            </form>
                          </div>
                        </div>
                      </div>



                      {/* list of companies....................................................................................................... */}

                      {
                        details.map((data, index) => {
                          return <Fragment>
                            <div className="card-body">
                              <div className="d-flex flex-column flex-lg-row align-items-center" >
                                <span className="    mb-2" >
                                  <div className="flex-shrink-0">
                                    <img className=" rounded-3" alt='rounded-3' style={{ width: '70px', height: '70px', backgroundColor: 'red' }} src={myImage} />
                                  </div>
                                </span>
                                <div className="row flex-fill p-4 " >
                                  <div style={{ width: "100%", textAlign: "end" }}>
                                    <button type="button" class="btn btn-success mr-5" data-bs-toggle="modal" onClick={() => setModalData(data)} data-bs-target="#exampleModalPostJob" >Post Job</button>
                                    <Dropdown >
                                      <Dropdown.Toggle id="dropdown-basic" className='btn btn-success' >
                                        <BsThreeDotsVertical />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate("/pricingall", { state: data._id })}>Renew</Dropdown.Item>

                                        <Dropdown.Item onClick={() => confirmdeletefunction(data._id)}>Delete</Dropdown.Item>

                                        <Dropdown.Item onClick={() => navigate("/company/edit", { state: data._id })}>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={handleRecruitmentModalShow}>Recruitment Drive job post</Dropdown.Item>

                                        <Modal show={showModal} onHide={handleRecruitmenModalClose} size="lg">
                                          <Modal.Header closeButton>
                                            <Modal.Title>Recruitment Drive Job Post</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            <form onSubmit={handleSubmit(onSubmit)} class="modal-body">
                                              <div class="mb-2 row">
                                                <lable
                                                  for="companyDetails"
                                                  class="col-sm-4 col-form-label text-dark" >
                                                  Title of the Post :
                                                </lable>
                                                <div class="col-sm-8">
                                                  <input type='text' class="form-control" name='title' onChange={(e) => { handleChange(e) }} />
                                                  <span class="form-text text-muted">Ex: Job fair, job mela, Campus hiring ect</span>
                                                </div>



                                              </div>
                                              <div class="mb-3 row">
                                                <label
                                                  for="companyDetails"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  Company Name
                                                </label>
                                                <div class="col-sm-8">
                                                  <input
                                                    type="text"
                                                    class="form-control"
                                                    id="companyDetails"
                                                    placeholder="Type company name"
                                                    name='companyName'

                                                    onChange={(e) => { handleChange(e) }}
                                                  />
                                                </div>

                                              </div>
                                              <div className='mb-3 row'>
                                                <label
                                                  for="companyDetails"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  Venue:
                                                </label>
                                                <div class="col-sm-8">
                                                  <input
                                                    type="text"
                                                    class="form-control"
                                                    name='venue'

                                                    onChange={(e) => { handleChange(e) }} />
                                                  <span className='text-muted form-text'>Full Address Ex: Street, Door no, Road no</span>
                                                </div>
                                              </div>

                                              <div className="mb-3 row">
                                                <label className="col-sm-4 col-form-label text-dark" />
                                                <div className="mt-3">
                                                  <strong>Selected Dates: </strong>
                                                  <ul>
                                                    {selectedDates?.map((date, index) => (
                                                      <li key={index}>{date ? date.toDateString() : 'No date selected'}</li>
                                                    ))}
                                                  </ul>

                                                </div>
                                                <div className="col-sm-8">
                                                  <div className="mb-3 row">
                                                    <div className="mb-3 row">
                                                      <div className="col-sm-8">
                                                        <div >

                                                          <DatePicker
                                                            selected={currentDate}
                                                            onChange={handleDateChange}
                                                            dateFormat="dd/MM/yyyy"
                                                            isClearable
                                                            customInput={
                                                              <div className="date-picker-container" style={{ cursor: "pointer" }}>
                                                                <input
                                                                  type="text"
                                                                  placeholder="Select Date"
                                                                  className="date-picker-input ms-2"
                                                                />
                                                                <CalendarMonthIcon className="calendar-icon" />
                                                              </div>
                                                            }
                                                          />


                                                        </div>

                                                      </div>

                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div class="mb-3 row">
                                                <label
                                                  for="staticIndustry"
                                                  class="col-md-4 col-form-label text-dark"
                                                >
                                                  Time:
                                                </label>
                                                <div class="col-sm-8">

                                                </div>
                                              </div>
                                              <div class="mb-3 row">
                                                <label
                                                  for="functionalArea"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  No of Support HRs:
                                                </label>
                                                <div class="col-sm-8">
                                                  <input type='number' minLength={1} class="form-control"

                                                    name='No_of_Support_HRs'

                                                    onChange={(e) => { handleChange(e) }} />
                                                </div>
                                              </div>

                                              <div class="mb-3 row">
                                                <label
                                                  for="functionalArea"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  HRs Titles:
                                                </label>
                                                <div class="col-sm-8">
                                                  <Select
                                                    onInputChange={handleHrChange}
                                                    rules={{ required: "This field is required" }}

                                                    options={hr}
                                                    placeholder="Select Hr position"
                                                    onChange={(selectedOptions) => {
                                                      setRecruitmentForm({
                                                        ...recruitmentForm,
                                                        HRtitle: selectedOptions.map(option => option.value)
                                                      });
                                                    }}
                                                    isMulti
                                                    required
                                                  />

                                                </div>
                                              </div>

                                              <div class="mb-3 row">
                                                <label
                                                  for="functionalArea"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  No of total positions you are hiring:
                                                </label>
                                                <div class="col-sm-8">
                                                  <input type='number' minLength={10} class="form-control"

                                                    name='totalpositions'

                                                    onChange={(e) => { handleChange(e) }} />


                                                </div>
                                              </div>


                                              <div class="mb-3 row">
                                                <label
                                                  for="functionalArea"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  What are the titles you are hiring:
                                                </label>
                                                <div class="col-sm-8">
                                                  <Select
                                                    styles={customStyles}
                                                    options={designation}
                                                    isSearchable={true}
                                                    isMulti
                                                    onInputChange={handleDesignationChange}
                                                    placeholder="Select Preferred Designation"
                                                    onChange={(selectedOptions) => {
                                                      setRecruitmentForm({
                                                        ...recruitmentForm,
                                                        hiringtitles: selectedOptions.map(option => option.value)
                                                      });
                                                    }}
                                                  />

                                                </div>
                                              </div>

                                              <div class="mb-3 row">
                                                <label
                                                  for="amountperhour"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  Hourly pay
                                                </label>
                                                <div class="col-sm-8">

                                                  <span className='me-3'> <b>{moneyRange} Rs</b></span>

                                                  <input
                                                    type="range"
                                                    id="moneyRange"
                                                    name="moneyRange"
                                                    min={500}
                                                    max={4000}
                                                    step={100} // You can adjust the step as needed
                                                    value={moneyRange}
                                                    onChange={handleRangeChange}
                                                  />

                                                </div>
                                              </div>
                                              <div class="mb-3 row">
                                                <label
                                                  for="functionalArea"
                                                  class="col-sm-4 col-form-label text-dark"
                                                >
                                                  Total no of Hours:
                                                </label>
                                                <div class="col-sm-8">
                                                  <input type='number' class="form-control" min="0"

                                                    name='totalhours'

                                                    onChange={(e) => { handleChange(e) }}

                                                  />
                                                </div>
                                              </div>

                                              <hr />
                                              <h5 className="text-dark">Recruiter Details</h5>
                                              <div className="text-dark">
                                                <div class="mb-3 row">
                                                  <label for="inputName" class="col-sm-3 col-form-label">
                                                    Name
                                                  </label>
                                                  <div class="col-sm-9">
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      id="inputName"
                                                      name='Recruitername'

                                                      onChange={(e) => { handleChange(e) }}
                                                    />
                                                  </div>
                                                </div>
                                                <div class="mb-3 row">
                                                  <label for="inputEmail" class="col-sm-3 col-form-label">
                                                    Email:
                                                  </label>
                                                  <div class="col-sm-9">
                                                    <input
                                                      type="email"
                                                      class="form-control"
                                                      id="inputEmail"
                                                      name='Recruiteremail'

                                                      onChange={(e) => { handleChange(e) }}

                                                    />
                                                  </div>
                                                </div>
                                                <div class="mb-3 row">
                                                  <label
                                                    for="contactDetails"
                                                    class="col-sm-3 col-form-label"
                                                  >
                                                    Contact Details:
                                                  </label>
                                                  <div class="col-sm-9">
                                                    <input
                                                      type="text"
                                                      class="form-control"

                                                      id="contactDetails"
                                                      name='RecruiterContactDetails'

                                                      onChange={(e) => { handleChange(e) }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>


                                            </form>
                                          </Modal.Body>

                                          <Modal.Footer>

                                            <Button variant='primary' onClick={() => { handleRecruitmentPost() }}>Save</Button>
                                            <Button variant="secondary" onClick={handleRecruitmenModalClose}>

                                              Close
                                            </Button>

                                          </Modal.Footer>
                                        </Modal>

                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                  <div className="col-sm-10 col-md-10 text-start ">

                                    <h4 className="lead text-primary" onClick={() => navigate("/companypage/about", { state: data })}><Link >{data.nameOfCompany}</Link></h4>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                      <div style={{ width: "46%" }} >
                                        <div style={{ width: "100%" }}>
                                          <strong>Location :</strong> <span >{data.city}</span>
                                        </div>
                                        <div style={{ width: "100%" }}>
                                          <strong>employees :</strong> <span >{data.noOfEmployee}</span>
                                        </div>
                                        <div style={{ width: "100%" }}>
                                          <strong>pagecreated on:</strong> <span >{data.SubscriptionsDate}</span>
                                        </div>
                                        <div onClick={() => navigate("/viewprofile", { state: data._id })} style={{ width: "100%" }}>
                                          <strong>Page created by:</strong> <Link >{data.registeredUserName}</Link>
                                        </div>
                                      </div>
                                      <div style={{ width: "46%" }} >
                                        <div style={{ width: "100%" }}>
                                          <strong>Industry :</strong> <span >{data.industry}</span>
                                        </div>
                                        <div style={{ width: "100%" }}>
                                          <strong>Posted jobs :</strong> <span>{data.postedJob}</span>

                                        </div>
                                        <div style={{ width: "100%" }}>
                                          <strong>pagevalid : </strong> <span >{data.expiryDate}</span>

                                        </div>
                                        <div style={{ width: "100%" }}>
                                          <strong>Add user:</strong> <span >None</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>



                                </div>


                              </div>



                            </div>
                            <hr className="border border-2 opacity-50" />
                          </Fragment>
                        })
                      }
                    </div>
                  </div>
                </div>
              </Box>
            </Box>

          </div>



        </div>

      </div>





      <Modal style={{ marginTop: "100px" }} show={showdeletecofirm} onHide={() => setshowdeletecofirm(false)}>

        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>


        <Modal.Body>
          {/* ... Modal content here ... */}

          <p>you are deleting your company please confirm your email to delete your company...</p>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your email..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
          />

          {
            Errors.length > 0 ? <p style={{ color: 'red' }}>{Errors}</p> : ""
          }



        </Modal.Body>
        <Modal.Footer>

          <Button variant="danger" onClick={() => deleteFunction()}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>

















    </div>



  )
}
