import React, { useEffect, useState } from "react";
import ICHPDashboard from "./ICHPDashboard";
import { Box } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import Details from "../Dashboard/Details";
import Sidebar from "../Dashboard/Sidebar";

function Editcompanydetails() {
  const [flag, setFlag] = useState(false)


  
  const location=useLocation();

  const state=location.state;



  function handlePhoneNumber(e) {
    let val = e.target.value;
    if (val.length === 1 && /^[6-9]/.test(val)) {

      setDetails({ ...details, mobileNumber: e.target.value });
    } else if (val.length !== 1 && val.length !== 11) {
      setDetails({ ...details, mobileNumber: e.target.value });
    }
  }
  const statesAndUTsInIndia = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Puducherry',
    'Jammu and Kashmir',
    'Ladakh'
  ];


  const navigate = useNavigate()
  const [domainErr, setDomainErr] = useState('');
  const [companyId, setCompanyId] = useState('')
  const [industry, setIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [details, setDetails] = useState({
    nameOfCompany: "",
    concernPerson: "",
    dateOfRegistration: "",
    logo: "",
    noOfEmployee: 0,
    primaryAddress: "",
    secondaryAddress: "",
    city: "",
    state: "",
    industry: "",
    skills: [],
    mobileNumber: "",
    domainEmail: "",
    website: "",
    gstNo: "",
    aboutCompany: "",
    user: localStorage.getItem('id'),
  });


  const [city, setCity] = useState([]);


  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();



  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city`)
      .then((res) => {


        setCity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/industry`)
      .then((res) => {

        setIndustry(res.data);
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
        // console.log(newSkills);

        setSkills(newSkills);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);


  function validateEmailDomain() {
    var emailInput = details.domainEmail;
    var domain = emailInput.split('@')[1];

    var allowedDomains = ["yahoo.com", "gmail.com", 'gmail.co', 'yahoo.co', 'rediff.com', 'rediff.co', 'outlook.com', 'outlook.co', 'orkut.com', 'orkut.co', 'msm.co', 'msm.com'];

    if (!allowedDomains.includes(domain)) {
      return true
    } else {
      return 'Please give professional email id'
    }
  }




  function validateWebsite() {
    let emailInput = details.domainEmail;
    let domainName = emailInput.split('@')[1];
    let website = details.website;

    if (website.includes(domainName)) {
      return true
    } else {
      setDomainErr('Domain name and email not matched in website')
      return false
    }

  }



  const validateSkills = () => {
    return (
      (selectedSkills && selectedSkills.length >= 5) ||
      "Please select at least Five options"
    );
  };

  const handleSelectSkills = (selected) => {
    if (selected && selected.length > 5) {
      selected = selected.slice(0, 5); // Limit the selection to the first 3 options
    }

    setSelectedSkills(selected);
  };


  const handleInputChange = (inputValue) => {

    setDetails({ ...details, skills: inputValue });
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
        });
    }
  };


  const handleCityChange = (inputValue) => {


    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
        .then((res) => {

          setCity(res.data);
        });
    }
  };




  function handleeditcompany() {


    setDomainErr('')


    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/editcompany/${state}`, {
      nameOfCompany: details.nameOfCompany,
      concernPerson: details.concernPerson,
      dateOfRegistration: details.dateOfRegistration,
      noOfEmployee: details.noOfEmployee,
      primaryAddress: details.primaryAddress,
      secondaryAddress: details.secondaryAddress,
      city: details.city.value,
      state: details.state.value,
      industry: details.industry.value,
      skills: selectedSkills.map(e => e.value),
      mobileNumber: details.mobileNumber,
      domainEmail: details.domainEmail,
      website: details.website,
      gstNo: details.gstNo,
      aboutCompany: details.aboutCompany,
      user: details.user,
      registeredUserName: localStorage.getItem('name')

    })
      .then(res => {

        alert('edited... sucessfully')


        navigate('/companypage')

        setCompanyId(res.data.details);

      })
      .catch(err => {
        // console.log(err); 
      });


      
  }



  function checkDomain() {
    let val = validateWebsite();
    if (val) {



      handleeditcompany();

    }

  }



  const [uploaded, setUploaded] = useState(false)


  const handleFileChangeAndSubmit = (foldersNameCreation) => async (event) => {
    event.preventDefault();
    if (companyId !== "") {
      const selectedFile = event.target.files[0];

      if (selectedFile !== undefined) {
        const fileName = event.target.id;
        const fileExtension = selectedFile.name.split('.').pop();
        // console.log(`File selected for ${event.target.id}: ${fileName}`);
        // console.log(`File extension: ${fileExtension}`);
        // console.log(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/upload/${localStorage.getItem('email')}/${fileName}.${fileExtension}/${foldersNameCreation}/${details.nameOfCompany}/${companyId}`)

        const formData = new FormData();
        formData.append('pdfFile', selectedFile);
        try {
          const response = await fetch(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/upload/${localStorage.getItem('email')}/${fileName}.${fileExtension}/${foldersNameCreation}/${details.nameOfCompany}/${companyId}`, {
            method: 'PUT',
            body: formData,
          });

          if (response.ok) {
            alert('File uploaded successfully');
            setFlag(!flag)
            setUploaded(true)
          } else {
            alert('Failed to upload  file');
          }
        } catch (error) {

          alert('Error Occur')
        }
      }
    }
    else {
      alert('Fill company details')

    }
  };






  
  const onSubmit = (data, event) => {

    event.preventDefault();
    checkDomain()
  };





//   fetch edit company details..........


useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/getcompanybyid/${state}`)
      .then((res) => setDetails(res.data[0]))
      .catch(err => console.log(err))
  }, [])







console.log("details..........",details)















  
  return (

    <div>


      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />

          <hr />

          <div>


            <Box sx={{ display: "flex" }}>
              {/* <ICHPDashboard /> */}
              <Box component="main" sx={{ marginTop: 3, width: '80vw' }}>

                <form onSubmit={handleSubmit(onSubmit)} className="container-xl container-lg mt-6 mb-7">

                  <div className="row d-flex justify-content-center">

                    <div className="card col-lg-10 col-md-10">
                      <div className="card-header">
                        <h4 className="d-flex text-start ms-2">
                          Edit Company Details
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="row justify-content-center">
                          <div className="col-xl-9 col-lg-9">

                            <div className="mb-3 row">
                              <label
                                for="nameOfCompany"
                                className="col-sm-4 col-form-label d-flex justify-content-start lead  "
                              >
                                Name of Company:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  value={details.nameOfCompany}
                                  onChange={(e) => setDetails({ ...details, nameOfCompany: e.target.value })}
                                  readonly
                                  className="form-control"
                                  id="nameOfCompany"
                                  required
                                  disabled={true}
                                />
                              </div>
                            </div>

                            <div className="mb-3 row">
                              <label
                                for="nameOfConcernPerson"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Name of Concern Person:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  required
                                  className="form-control"
                                  id="nameOfConcernPerson"
                                  value={details.concernPerson}
                                  onChange={(e) => setDetails({ ...details, concernPerson: e.target.value })}
                                disabled={true}
                                />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <label
                                for="inputdate"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Date of in-corporation:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  required
                                  className="form-control"
                                  id="inputdate"
                                  value={details.dateOfRegistration}
                                  onChange={(e) => setDetails({ ...details, dateOfRegistration: e.target.value })}
                                  disabled={true}
                                />
                              </div>
                            </div>


                            <div className="mb-3 row">
                              <label
                                for="inputNumberOfEmployees"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                No of Employees:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="inputNumberOfEmployees"
                                  required
                                  value={details.noOfEmployee}
                                  onChange={(e) => setDetails({ ...details, noOfEmployee: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="mb-3 row ">
                              <div className="col-lg-6 ">
                                <label
                                  className="form-label mt-3 d-flex text-start "
                                  for="primaryLocation "
                                >
                                  Primary Address
                                </label>
                                <textarea
                                  className="form-control"
                                  id="primaryLocation"
                                  required
                                  placeholder="primary address"
                                  rows="3"
                                  value={details.primaryAddress}
                                  onChange={(e) => setDetails({ ...details, primaryAddress: e.target.value })}
                                  disabled={true}
                                ></textarea>
                              </div>
                              <div className="col-lg-6">
                                <label
                                  className="form-label mt-3 d-flex text-start "
                                  for="secondaryLocation "
                                >
                                  Secondary Address (If Any)
                                </label>
                                <textarea
                                  className="form-control"
                                  id="secondaryLocation"
                                  placeholder="secondary address"
                                  rows="3"
                                  value={details.secondaryAddress}
                                  onChange={(e) => setDetails({ ...details, secondaryAddress: e.target.value })}
                                ></textarea>{" "}
                              </div>

                              <div className="col-lg-6"></div>
                            </div>

                            <div className="mb-3 row">
                              <label
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                                for="city "
                              >
                                city
                              </label>
                              <div className="col-sm-8">
                                {" "}
                                <Select
                                  required
                                  onInputChange={handleCityChange}
                                  rules={{ required: "This field is required" }}
                                  value={details.city}
                                  options={city}
                                  placeholder={details.city?details.city:"Select City"}
                                  onChange={(e) => {
                                    setDetails({ ...details, city: e });
                                  }}
                                  isDisabled={true}
                                />
                              </div>

                            </div>
                            <div className="mb-3 row">
                              <label
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                                for="state "
                              >
                                state
                              </label>
                              <div className="col-sm-8">
                                <Select
                                  required
                                  rules={{ required: "This field is required" }}
                                  value={details.state}
                                  options={statesAndUTsInIndia.map(e => {
                                    return {
                                      label: e,
                                      value: e
                                    }
                                  })}
                                  placeholder={details.state?details.state:"Select State"}
                                  onChange={(e) => {
                                    setDetails({ ...details, state: e });
                                  }}
                                  isDisabled={true}
                                />
                              </div>
                            </div>

                            <div className="mb-3 row">
                              <label
                                for="inputIndustry"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Industry:
                              </label>
                              <div className="col-sm-8">
                                <Select
                                  options={industry}

                                  required
                                  placeholder={details.industry?details.industry:""}
                                  value={details.industry}
                                  onChange={(e) => setDetails({ ...details, industry: e })}
                                  isDisabled={true}
                                />
                              </div>

                            </div>


                            <div className="mb-3 row">
                              <label
                                for="inputSkills"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Skills to Hire:
                              </label>
                              <div className="col-sm-8">
                                <Select
                                  onInputChange={handleInputChange}
                                  options={skills}
                                  isSearchable={true}
                                  isMulti
                                  placeholder="Select skills"
                                  value={selectedSkills}
                                  {...register("skills", {
                                    validate: validateSkills,
                                  })}
                                  onChange={handleSelectSkills}
                                />
                              </div>

                            </div>

                            {errors.skills && <span className="errorsInreg">{errors.skills.message} </span>}

                            <div className="mb-3 row">
                              <label
                                for="mobileNumber"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Mobile Number:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="mobileNumber"
                                  placeholder="your mobile number"
                                  value={details.mobileNumber}
                                  onChange={(e) => handlePhoneNumber(e)}
                                  disabled={true}
                                />
                              </div>
                            </div>

                            <div className="mb-3 row">
                              <label
                                for="inputEmail"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Email-Id:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputEmail"
                                  {...register('email', {
                                    required: "Enter email Number",
                                    validate: validateEmailDomain
                                  })}
                                  onChange={(e) => setDetails({ ...details, domainEmail: e.target.value })}
                                  value={details.domainEmail}
                                  placeholder="your company Domain email address"

                                  disabled={true}
                                />
                              </div>
                            </div>
                            {errors.email && <span className="errorsInreg">{errors.email.message}</span>}

                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <h4 className="text-start ms-2">
                          About Company
                        </h4>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-xl-9 lg-9">
                          <form>
                            <div className="mb-3 row mt-4">
                              <label
                                for="inputWebsite"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                Website:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="url"
                                  className="form-control"
                                  id="inputWebsite"
                                  {
                                  ...register('website', {
                                    required: "Please give me the company websites",

                                  })
                                  }
                                  placeholder="add your website"
                                  onChange={(e) => setDetails({ ...details, website: e.target.value })}
                                  value={details.website}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            {domainErr && <span className="errorsInreg">{domainErr}</span>}

                            <div className="mb-3 row mt-4">
                              <label
                                for="inputGstno"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                GST No:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputGstno"
                                  placeholder="GST no"
                                  onChange={(e) => setDetails({ ...details, gstNo: e.target.value })}
                                  value={details.gstNo}
                                  disabled={true}
                                />
                              </div>
                            </div>

                            <div className="mb-3 row">
                              <label
                                for="aboutCompany"
                                className="col-sm-4 col-form-label d-flex justify-content-start "
                              >
                                About Company:
                              </label>
                              <div className="col-sm-8">
                                <textarea
                                  className="form-control"
                                  id="aboutCompany"
                                  rows="3"
                                  placeholder="add your company"
                                  onChange={(e) => setDetails({ ...details, aboutCompany: e.target.value })}
                                  value={details.aboutCompany}
                                ></textarea>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-md-5">
                          <button type="submit" style={{ backgroundColor: "rgb(3, 104, 104)", color: "whitesmoke" }}>
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>
                <div className="row d-flex justify-content-center" style={{ marginTop: "20px" }}>
                  <div class="card col-lg-10 col-md-10" >
                    <div class="card-header text-start" style={{ width: "100%" }}>
                      Upload Documents
                    </div>
                    <div class="card-body">
                      <div className="mb-3 row">
                        <label
                          for="inputlogo"
                          className="col-sm-4 col-form-label d-flex justify-content-start "
                        >
                          Add Logo:
                        </label>
                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control  "
                            id="companyDocument"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={handleFileChangeAndSubmit('companyDetails')}

                          />
                          {/* <button className="btn btn-outline-secondary col-sm-3 " type="button" id="inputGroupFileAddon04">Button</button> */}{" "}
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          for="inputlogo"
                          className="col-sm-4 col-form-label d-flex justify-content-start "
                        >
                          Add Logo:
                        </label>
                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control  "
                            id="logo"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={handleFileChangeAndSubmit('companyDetails')}
                          />
                          {/* <button className="btn btn-outline-secondary col-sm-3 " type="button" id="inputGroupFileAddon04">Button</button> */}{" "}
                        </div>
                      </div>
                      <div className="col-md-5">
                        <button onClick={() => {
                          if (uploaded) {
                            navigate("/pricingall", { state: companyId })
                          } else {
                            alert("Upload a document")
                          }
                        }} style={{ backgroundColor: "rgb(3, 104, 104)", color: "whitesmoke" }}>
                          Go to Pricing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </Box>
            </Box>

          </div>

        </div>

      </div>
    </div>
  );
}
export default Editcompanydetails;
