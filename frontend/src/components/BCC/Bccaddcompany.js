import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function Bccaddcompany() {
  const [flag, setFlag] = useState(false);

  function handlePhoneNumber(e) {
    let val = e.target.value;
    if (val.length === 1 && /^[6-9]/.test(val)) {
      setDetails({ ...details, mobileNumber: e.target.value });
    } else if (val.length !== 1 && val.length !== 11) {
      setDetails({ ...details, mobileNumber: e.target.value });
    }
  }
  const statesAndUTsInIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const navigate = useNavigate();
  const [domainErr, setDomainErr] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [industry, setIndustry] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  if (!localStorage.getItem("id")) {
    navigate("/");
  }

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
    user: localStorage.getItem("id"),
  });

  const [city, setCity] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gstnumber, setgstnumber] = useState("");

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
          return null;
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
    var domain = emailInput.split("@")[1];

    var allowedDomains = [
      "yahoo.com",
      "gmail.com",
      "gmail.co",
      "yahoo.co",
      "rediff.com",
      "rediff.co",
      "outlook.com",
      "outlook.co",
      "orkut.com",
      "orkut.co",
      "msm.co",
      "msm.com",
    ];

    if (!allowedDomains.includes(domain)) {
      return true;
    } else {
      return "Please give professional email id";
    }
  }

  function validateWebsite() {
    let emailInput = details.domainEmail;
    let domainName = emailInput.split("@")[1];
    let website = details.website;

    if (website.includes(domainName)) {
      return true;
    } else {
      setDomainErr("Domain name and email not matched in website");
      return false;
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
      selected = selected.slice(0, 20); // Limit the selection to the first 3 options
    }

    setSelectedSkills(selected);
  };

  const handleInputChange = (inputValue) => {
    setDetails({ ...details, skills: inputValue });
    if (inputValue.length >= 2) {
      axios
        .get(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/skills/${inputValue}`
        )
        .then((res) => {
          const newSkills = [];
          const val = res.data;

          val.map((e) => {
            newSkills.push({
              value: e.allSklls,
              label: e.allSklls,
            });
            return null;
          });

          setSkills(newSkills);
        });
    }
  };
  const handleCityChange = (inputValue) => {
    if (inputValue.length >= 2) {
      axios
        .get(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`
        )
        .then((res) => {
          setCity(res.data);
        });
    }
  };

  //  function to add company.............................................................................

  const [gstdoc, setgstdoc] = useState("");

  const [registerdoc, setregisterdoc] = useState("");

  const [compnaylogo, setcompanylogo] = useState("");

  async function addCompany() {
    setDomainErr("");

    // Validate if all required fields are present in details
    const requiredFields = [
      "nameOfCompany",
      "concernPerson",
      "dateOfRegistration",
      "noOfEmployee",
      "primaryAddress",
      "city",
      "state",
      "industry",
      "mobileNumber",
      "domainEmail",
    ];
    const missingFields = requiredFields.filter((field) => !details[field]);

    if (missingFields.length > 0) {
      alert(
        `Please provide values for the following fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    try {
      const companyData = {
        nameOfCompany: details.nameOfCompany,
        concernPerson: details.concernPerson,
        dateOfRegistration: details.dateOfRegistration,
        noOfEmployee: details.noOfEmployee,
        primaryAddress: details.primaryAddress,
        secondaryAddress: details.secondaryAddress,
        city: details.city.value,
        state: details.state.value,
        industry: details.industry.value,
        skills: selectedSkills.map((e) => e.value),
        mobileNumber: details.mobileNumber,
        domainEmail: details.domainEmail,
        website: details.website,
        gstNo: details.gstNo,
        aboutCompany: details.aboutCompany,
        user: details.user,
        registeredUserName: localStorage.getItem("name")
          ? localStorage.getItem("name")
          : "",
      };

      const response = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/company/addcompany`,
        companyData
      );

      console.log("response", response);

      const companyId = response.data.details;

      if (gstdoc?.name) {
        await uploadFile(gstdoc, "gstdoc", companyId);
      }

      if (registerdoc?.name) {
        await uploadFile(registerdoc, "registerdoc", companyId);
      }

      if (compnaylogo?.name) {
        await uploadFile(compnaylogo, "compnaylogo", companyId);
      }

      setCompanyId(companyId);
    } catch (error) {
      console.error("Error adding company:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  }

  async function uploadFile(file, fileName, companyId) {
    const fileExtension = file.name.split(".").pop();
    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await axios.post(
        `${
          process.env.REACT_APP_IP_ADDRESS
        }/karands/users/uploadcompanydetails/${localStorage.getItem(
          "email"
        )}/${fileName}.${fileExtension}/companydetails/${
          details.nameOfCompany
        }`,
        formData
      );

      if (response.data.nameOfCompany) {
        let data = response.data;

        alert("Company added");

        navigate("/bccform", { state: response.data });

        console.log("File upload response", response);
      }

      // Handle the response if needed
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle the error if needed
    }
  }

  function checkDomain() {
    let val = validateWebsite();
    if (val) {
      addCompany();
    }
  }

  function validateFormClick(){
    
  }
  const [uploaded, setUploaded] = useState(false);

  // const handleFileChangeAndSubmit = (foldersNameCreation) => async (event) => {

  //   event.preventDefault();

  //   if (companyId !== "") {
  //     const selectedFile = event.target.files[0];

  //     if (selectedFile !== undefined) {
  //       const fileName = event.target.id;
  //       const fileExtension = selectedFile.name.split('.').pop();
  //       // console.log(`File selected for ${event.target.id}: ${fileName}`);
  //       // console.log(`File extension: ${fileExtension}`);
  //       // console.log(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/upload/${localStorage.getItem('email')}/${fileName}.${fileExtension}/${foldersNameCreation}/${details.nameOfCompany}/${companyId}`)

  //       const formData = new FormData();
  //       formData.append('pdfFile', selectedFile);
  //       try {
  //         const response = await fetch(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/upload/${localStorage.getItem('email')}/${fileName}.${fileExtension}/${foldersNameCreation}/${details.nameOfCompany}/${companyId}`, {
  //           method: 'PUT',
  //           body: formData,
  //         });

  //         if (response.ok) {
  //           alert('File uploaded successfully');
  //           setFlag(!flag)
  //           setUploaded(true)
  //         } else {
  //           alert('Failed to upload  file');
  //         }
  //       } catch (error) {

  //         alert('Error Occur')
  //       }
  //     }
  //   }
  //   else {
  //     alert('Fill company details')

  //   }
  // };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {/* <ICHPDashboard /> */}
        <Box component="main" sx={{ marginTop: 3, width: "80vw" }}>
          <form
            onSubmit={handleSubmit()}
            className="container-xl container-lg mt-6 mb-7"
          >
            <div className="row d-flex justify-content-center">
              <div className="card col-lg-10 col-md-10">
                <div className="card-header">
                  <h4 className="d-flex text-start ms-2">
                    Add Company Details
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
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                nameOfCompany: e.target.value,
                              })
                            }
                            readonly
                            className="form-control"
                            id="nameOfCompany"
                            required
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
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                concernPerson: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                dateOfRegistration: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                noOfEmployee: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-3 row ">
                        <div className="col-lg-6 ">
                          <label
                            className="form-label mt-3 d-flex text-start "
                            for="primaryLocation "
                          >
                            Registered Address
                          </label>
                          <textarea
                            className="form-control"
                            id="primaryLocation"
                            required
                            placeholder="primary address"
                            rows="3"
                            value={details.primaryAddress}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                primaryAddress: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                secondaryAddress: e.target.value,
                              })
                            }
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
                            placeholder="Select City"
                            onChange={(e) => {
                              setDetails({ ...details, city: e });
                            }}
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
                            options={statesAndUTsInIndia.map((e) => {
                              return {
                                label: e,
                                value: e,
                              };
                            })}
                            placeholder="Select State"
                            onChange={(e) => {
                              setDetails({ ...details, state: e });
                            }}
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
                            placeholder="Select Industry"
                            value={details.industry}
                            onChange={(e) =>
                              setDetails({ ...details, industry: e })
                            }
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

                      {errors.skills && (
                        <span className="errorsInreg">
                          {errors.skills.message}{" "}
                        </span>
                      )}

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
                            {...register("email", {
                              required: "Enter email Number",
                              validate: validateEmailDomain,
                            })}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                domainEmail: e.target.value,
                              })
                            }
                            value={details.domainEmail}
                            placeholder="your company Domain email address"
                          />
                        </div>
                      </div>
                      {errors.email && (
                        <span className="errorsInreg">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <h4 className="text-start ms-2">About Company</h4>
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
                            {...register("website", {
                              required: "Please give me the company websites",
                            })}
                            placeholder="add your website"
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                website: e.target.value,
                              })
                            }
                            value={details.website}
                          />
                        </div>
                      </div>
                      {domainErr && (
                        <span className="errorsInreg">{domainErr}</span>
                      )}

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
                            onChange={(e) => {
                              const truncatedValue = e.target.value.slice(
                                0,
                                15
                              ); // Truncate to 15 characters
                              setDetails({ ...details, gstNo: truncatedValue });
                            }}
                            value={details.gstNo}
                            maxLength="15"
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
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                aboutCompany: e.target.value,
                              })
                            }
                            value={details.aboutCompany}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="row d-flex justify-content-center"
                  style={{ marginTop: "20px" }}
                >
                  <div class="card col-lg-10 col-md-10">
                    <div
                      class="card-header text-start"
                      style={{ width: "100%" }}
                    >
                      Upload Documents
                    </div>
                    <div class="card-body">
                      {/* gst documents............................... */}

                      {details.gstNo && details.gstNo.length == 15 ? (
                        <div className="mb-3 row">
                          <label
                            for="inputlogo"
                            className="col-sm-4 col-form-label d-flex justify-content-start "
                          >
                            GST DOC:
                          </label>
                          <div className="col-sm-6">
                            <input
                              type="file"
                              className="form-control  "
                              id="companyDocument"
                              aria-describedby="inputGroupFileAddon04"
                              aria-label="Upload"
                              onChange={(event) => {
                                setgstdoc(event.target.files[0]);
                              }}
                            />
                            {/* <button className="btn btn-outline-secondary col-sm-3 " type="button" id="inputGroupFileAddon04">Button</button> */}{" "}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* register docmunts ..................................... */}

                      <div className="mb-3 row">
                        <label
                          for="inputlogo"
                          className="col-sm-4 col-form-label d-flex justify-content-start "
                        >
                          register doc:
                        </label>
                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control  "
                            id="logo"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={(event) => {
                              setregisterdoc(event.target.files[0]);
                            }}
                          />
                          {/* <button className="btn btn-outline-secondary col-sm-3 " type="button" id="inputGroupFileAddon04">Button</button> */}{" "}
                        </div>
                      </div>

                      {/* logo ................................................................................................................*/}

                      <div className="mb-3 row">
                        <label
                          for="inputlogo"
                          className="col-sm-4 col-form-label d-flex justify-content-start "
                        >
                          logo :
                        </label>
                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control  "
                            id="companyDocument"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={(event) => {
                              setcompanylogo(event.target.files[0]);
                            }}
                          />
                          {/* <button className="btn btn-outline-secondary col-sm-3 " type="button" id="inputGroupFileAddon04">Button</button> */}{" "}
                        </div>
                      </div>

                      {/* 
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
                            </div> */}
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-md-5">
                    <button
                      type="submit"
                      onClick={validateFormClick()}
                      style={{
                        backgroundColor: "rgb(3, 104, 104)",
                        color: "whitesmoke",
                      }}
                    >
                      Add Company
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Box>
    </div>
  );
}
