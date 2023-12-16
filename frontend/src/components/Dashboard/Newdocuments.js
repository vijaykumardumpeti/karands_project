import React, { Fragment, useEffect, useContext} from "react";
import { useState } from "react";
import axios from "axios";

import Select from "react-select";
import Details from "./Details";
import Sidebar from "./Sidebar";
import "./sidebar.css";

import PleaseWaitModal from "./pleasewait";

import Loader from "./Loader";

import { ToastContainer, toast } from "react-toastify";

import MyContext from '../../mycontext';

import Messagebox from '../../components/messaging/MessageBox'



function Newdocuments() {


  const { handleclickdiv, profilepicfunction } = useContext(MyContext)

  const [flag, setFlag] = useState(true);

  const [isLoading, setisLoading] = useState(true);

 

  

  const handleFileChangeAndSubmit = (foldersNameCreation) => async (event) => {
    event.preventDefault();

    const selectedFile = event.target.files[0];

    if (selectedFile !== undefined) {
      const fileName = event.target.id;

      const fileExtension = selectedFile.name.split(".").pop();

      console.log(`File selected for ${event.target.id}: ${fileName}`);
      console.log(`File extension: ${fileExtension}`);

      const formData = new FormData();

      formData.append("pdfFile", selectedFile);

      // formData.append("type",type)

      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_IP_ADDRESS
          }/karands/users/upload/${localStorage.getItem(
            "email"
          )}/${fileName}.${fileExtension}/${foldersNameCreation}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          toast.success("File uploaded successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setFlag(!flag);
        } else {
          toast.warn("Failed to upload  file", {
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
      } catch (error) {
        console.error("Error uploading  file:", error);
        alert("Error Occur");
      }
    }
  };

  // function for educational details upload................................................................................................................................................................
  const isFileTypeAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "application/pdf"];
    return allowedTypes.includes(file.type);
  };

  const handleeducationaldetails =
    (foldersNameCreation, collegeName) => async (event) => {
      event.preventDefault();

      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const formattedCollegeName = collegeName.replace(/\s+/g, "-");

        // Check if the file type is allowed
        if (!isFileTypeAllowed(selectedFile)) {
          alert("Only PDF and JPEG files are allowed.");
          event.target.value = ""; // Reset the input
          return;
        }

        // Check if the file size is within the limit (3MB)

        const maxSizeInBytes = 2 * 1024 * 1024; // 3MB

        if (selectedFile.size > maxSizeInBytes) {
          alert("File size exceeds the limit of 2MB.");
          event.target.value = ""; // Reset the input
          return;
        }

        if (selectedFile !== undefined) {
          const fileName = event.target.id;

          const fileExtension = selectedFile.name.split(".").pop();

          console.log(`File selected for ${event.target.id}: ${fileName}`);
          console.log(`File extension: ${fileExtension}`);

          const formData = new FormData();

          formData.append("pdfFile", selectedFile);

          formData.append("collegeName", collegeName);

          try {
            const response = await fetch(
              `${
                process.env.REACT_APP_IP_ADDRESS
              }/karands/users/uploadeducational/${localStorage.getItem(
                "email"
              )}/${fileName}.${fileExtension}/${foldersNameCreation}/${formattedCollegeName}`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (response.ok) {
              toast.success("File uploaded successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              setFlag(!flag);
            } else {
              toast.warn("Failed to upload  file", {
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
          } catch (error) {
            console.error("Error uploading  file:", error);
            alert("Error Occur");
          }
        }
      }
    };
  // function  for proffetional details upload.............................................................................................................

  const handleproffetional =
    (foldersNameCreation, companyname, experienceStart) => async (event) => {
      event.preventDefault();

      const selectedFile = event.target.files[0];

      if (selectedFile !== undefined) {
        const formattedcompanyname = companyname.replace(/\s+/g, "-");

        const fileName = event.target.id;

        const fileExtension = selectedFile.name.split(".").pop();

        console.log(`File selected for ${event.target.id}: ${fileName}`);
        console.log(`File extension: ${fileExtension}`);

        const formData = new FormData();

        formData.append("pdfFile", selectedFile);

        formData.append("companyname", formattedcompanyname);

        formData.append("experienceStart", experienceStart);

        console.log("formdata edu", formData);

        try {
          const response = await fetch(
            `${
              process.env.REACT_APP_IP_ADDRESS
            }/karands/users/uploadjoddetails/${localStorage.getItem(
              "email"
            )}/${fileName}.${fileExtension}/${foldersNameCreation}/${formattedcompanyname}`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            toast.success("File uploaded successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setFlag(!flag);
          } else {
            toast.warn("Failed to upload  file", {
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
        } catch (error) {
          console.error("Error uploading  file:", error);
          alert("Error Occur");
        }
      }
    };

  // function  for project details upload.............................................................................................................

  // const handleproject = (foldersNameCreation, projectname) => async (event) => {
  //   event.preventDefault();

  //   const selectedFile = event.target.files[0];

  //   if (selectedFile !== undefined) {
  //     const fileName = event.target.id;

  //     const fileExtension = selectedFile.name.split(".").pop();

  //     console.log(`File selected for ${event.target.id}: ${fileName}`);
  //     console.log(`File extension: ${fileExtension}`);

  //     const formData = new FormData();

  //     formData.append("pdfFile", selectedFile);

  //     formData.append("companyname", companyname);

  //     formData.append("experienceStart", experienceStart);

  //     try {
  //       const response = await fetch(
  //         `${
  //           process.env.REACT_APP_IP_ADDRESS
  //         }/karands/users/uploadjoddetails/${localStorage.getItem(
  //           "email"
  //         )}/${fileName}.${fileExtension}/${foldersNameCreation}/${companyname}`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       if (response.ok) {
  //         toast.success("File uploaded successfully", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });

  //         setFlag(!flag);
  //       } else {
  //         toast.warn("Failed to upload  file", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error uploading  file:", error);
  //       alert("Error Occur");
  //     }
  //   }
  // };

  const handleCertificateAndProject =
    (foldersNameCreation) => async (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];
      let LengthOfFile = null;
      const fileName = event.target.name;

      if (foldersNameCreation === "projectDetails") {
        LengthOfFile =
          details.othersProject.length > 0
            ? details.othersProject.length + 1
            : 1;

        console.log(details.othersProject);
      } else {
        LengthOfFile =
          details.othersCertificate.length > 0
            ? details.othersCertificate.length + 1
            : 1;
      }

      const fileExtension = selectedFile.name.split(".").pop();
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);
      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_IP_ADDRESS
          }/karands/users/uploadProjectsCertificate/${localStorage.getItem(
            "email"
          )}/${fileName}/${LengthOfFile}/${fileExtension}/${foldersNameCreation}`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          toast.success("File uploaded successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setFlag(!flag);
        } else {
          toast.warn("Failed to upload  file", {
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
      } catch (error) {
        console.error("Error uploading PDF file:", error);

        toast.warn("Failed to upload  file", {
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
    };
  const [certificate, setCertificate] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projectsFullList, setProjectsFullList] = useState([]);
  const [educationalList, setEducationalList] = useState([]);
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_IP_ADDRESS
        }/karands/users/${localStorage.getItem("id")}`
      )
      .then((res) => {
        const roles = res.data.details;
        console.log(roles);
        setDetails(roles);
        setEducationalList(roles.education);
        setCertificate(roles.certificationINfo);
        setProjectsFullList(roles.projectInfo);
        setExperience(roles.JobExperience);
      })

      .catch((err) => console.log(err))
      .finally(() => {
        setisLoading(false);
      });
  }, [flag]);

  console.log("setEducationalList......................", educationalList);

  // please wait modal

  const [showModal, setShowModal] = useState(true);

  // Simulate some async action

  const simulateAsyncAction = () => {
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 3000); // Simulating a 3-second delay
  };

  useEffect(() => {
    simulateAsyncAction();
  }, []);

 



  


  return (
    <div className="" style={{ backgroundColor: "transparent" }}>
      {isLoading ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <div className="row flex-nowrap" style={{ width: "100%" }}>
          <Sidebar userPage="upload" />
          <div className="col container" style={{ maxWidth: "100%" }}>
            <Details />
            <hr />
            <ToastContainer />

            <div
              className="container-xl container-lg"
              style={{
                backgroundColor: "transparent",
                maxHeight: "980",
                marginTop: "20px",
              }}
            >
              <div className="card ">
                <div className="card-header">
                  <h5 className="d-flex text-start">Upload Documents</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col col-lg-12 mb-4 mb-lg-0">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active"
                            id="nav-personal-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-personal"
                            type="button"
                            role="tab"
                            aria-controls="nav-personal"
                          >
                            Personal
                          </button>
                          <button
                            className="nav-link"
                            id="nav-educational-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-educational"
                            type="button"
                            role="tab"
                            aria-controls="nav-educational"
                            aria-selected="false"
                          >
                            Educational
                          </button>
                          <button
                            className="nav-link"
                            onClick={(e) => console.log(e.target)}
                            id="nav-proffesional-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-proffesional"
                            type="button"
                            role="tab"
                            aria-controls="nav-proffesional"
                            aria-selected="false"
                          >
                            Professional
                          </button>
                          <button
                            className="nav-link"
                            id="nav-projects-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-projects"
                            type="button"
                            role="tab"
                            aria-controls="nav-projects"
                            aria-selected="false"
                          >
                            Projects
                          </button>
                          <button
                            className="nav-link"
                            id="nav-certification-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-certification"
                            type="button"
                            role="tab"
                            aria-controls="nav-certification"
                            aria-selected="false"
                          >
                            Certification
                          </button>
                          <button
                            className="nav-link"
                            id="nav-others-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-others"
                            type="button"
                            role="tab"
                            aria-controls="nav-others"
                            aria-selected="false"
                          >
                            Others
                          </button>
                        </div>
                      </nav>
                    </div>

                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-personal"
                        role="tabpanel"
                        aria-labelledby="nav-personal-tab"
                        tabindex="0"
                      >
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                              <div className="card-header py-3">
                                <h5 className="mb-0 text-start">
                                  Personal details
                                </h5>
                              </div>
                              <div className="card-body">
                                <form>
                                  <div className="row mb-4">
                                    <div className="col-lg-12">
                                      <div className="form-outline">
                                        {/* documents are corrct or wrog header */}

                                        <label
                                          className="form-label d-flex text-start"
                                          for="form9Example1"
                                        >
                                          Full Name as per the Documents
                                        </label>

                                        <input
                                          type="text"
                                          id="form9Example1"
                                          value={details.fullName}
                                          disabled={true}
                                          className="form-control input-custom"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-lg-6">
                                      <div className="form-outline">
                                        <label
                                          className="form-label mt-3 d-flex text-start"
                                          for="form7Example1"
                                        >
                                          Date of Birth
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control is-valid"
                                          value={details.DOB}
                                          disabled={true}
                                          id="validationServer01"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-outline">
                                        <label
                                          className="form-label mt-3 d-flex text-start"
                                          for="form7Example1"
                                        >
                                          Email
                                        </label>
                                        <input
                                          type="text"
                                          id="form7Example2"
                                          disabled={true}
                                          value={details.email}
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-outline">
                                        <label
                                          className="form-label mt-3 d-flex text-start"
                                          for="form7Example1"
                                        >
                                          Gender
                                        </label>
                                        <input
                                          type="text"
                                          disabled={true}
                                          value={details.gender}
                                          className="form-control is-valid"
                                          id="validationServer01"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-outline">
                                        <label
                                          className="form-label mt-3 d-flex text-start"
                                          for="form7Example1"
                                        >
                                          Marital Status
                                        </label>
                                        <input
                                          disabled={true}
                                          value={details.MartialStatus}
                                          type="text"
                                          id="form7Example1"
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-outline">
                                        <label
                                          className="form-label mt-3 d-flex text-start"
                                          for="form7Example6"
                                        >
                                          Phone
                                        </label>
                                        <input
                                          type="number"
                                          disabled={true}
                                          value={details.mobilenumber}
                                          id="form7Example6"
                                          className="form-control"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="form-outline">
                                        <label
                                          className="form-label mt-3 d-flex text-start"
                                          for="form7Example1"
                                        >
                                          Languages
                                        </label>
                                        <input
                                          type="text"
                                          id="form7Example1"
                                          className="form-control"
                                          disabled={true}
                                        />
                                      </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                      <label
                                        className="form-label d-flex text-start"
                                        for="form7Example7"
                                      >
                                        Address
                                      </label>
                                      <textarea
                                        value={`${details.flatNum}\n${details.streetName}\n${details.location}\n${details.State}\n${details.pincode}`}
                                        className="form-control"
                                        id="form7Example7"
                                        rows="4"
                                        disabled={true}
                                      ></textarea>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="card-footer py-3">
                                      <h5 className="mb-0 text-start">
                                        Upload Documents
                                      </h5>

                                      <h6 className="mb-0 text-start mt-3">
                                        Choose any and Upload
                                      </h6>
                                    </div>

                                    <div className="card">
                                      <div className="row g-2 align-items-center">
                                        <div className="col-lg-3">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="flexCheckDefault"
                                              checked={
                                                details.aadharCard
                                                  ? true
                                                  : false
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="flexCheckDefault"
                                            >
                                              Adhaar Card
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-4">
                                          <div className="input-group mt-2">
                                            <input
                                              type="file"
                                              accept=".png, .jpg, .jpeg, .pdf, .doc"
                                              id="aadharCard"
                                              onChange={handleFileChangeAndSubmit(
                                                "personalDetails"
                                              )}
                                              className="form-control"
                                            />
                                          </div>
                                        </div>

                                        {/* <div className="col-lg-4">
                                          <div className="input-group mt-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter your Adhar Card Number"
                                              maxLength="12"
                                              onChange={(e) => {
                                                const input = e.target.value.replace(/\D/g, '');  // Remove non-numeric characters
                                                if (input.length <= 12) {
                                                  setadharcardnumber(input);
                                                }
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-1">
                                          <button
                                            type="button"
                                            className={`btn btn-sm ${isDisabled ? 'btn-secondary' : 'btn-success'}`}
                                            onClick={isDisabled ? null : sendadharotp}
                                            disabled={isDisabled}
                                          >
                                            <span className="text-center" style={{ color: "white", display: "block" }} > {isDisabled ? `Resend OTP in ${seconds}s` : 'Send OTP'}</span>
                                          </button>
                                        </div> */}
                                      </div>
                                      <div className="row">
                                        {/* <div className="col-lg-5">
                                          <div className="input-group">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter your Adhar otp sended to mobile"
                                              maxLength="6"
                                              onChange={(e) => {
                                                const input = e.target.value.replace(/\D/g, '');  // Remove non-numeric characters
                                                if (input.length <= 6) {

                                                  setadharotp(e.target.value)
                                                }
                                              }}
                                            />
                                          </div>
                                            </div>
                                        <div className="col-lg-1">
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-success"
                                          >
                                            <span className="text-center" style={{ color: "white", display: "block" }} onClick={() => { submitotp() }}> Submit OTP</span>
                                          </button>
                                        </div>*/}
                                      </div>
                                    </div>

                                    <div className="card">
                                      <div className="row g-2 align-items-center">
                                        <div className="col-lg-3">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="flexCheckDefault"
                                              checked={
                                                details.panCard ? true : false
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              for="flexCheckDefault"
                                            >
                                              Pan Card
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-4">
                                          <div className="input-group mt-2">
                                            <input
                                              type="file"
                                              accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                              id="panCard"
                                              onChange={handleFileChangeAndSubmit(
                                                "personalDetails"
                                              )}
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                     
                                      </div>
                                    </div>

                                    {/* <div className="card">
                                      <div className="row g-2">
                                        <div className=" col-lg-6">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                            <input
                                              checked={details.panCard ? true : false}

                                              className="form-check-input"
                                              type="checkbox"
                                            />
                                            <label
                                              className="form-check-label"
                                              for="flexCheckDefault"
                                            >
                                              Pan Card
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="input-group mt-2">
                                            <input
                                           type="file"
                                              accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                              id="panCard"
                                              onChange={handleFileChangeAndSubmit('personalDetails')}

                                              className="form-control"
                                            />
                                            
                                          </div>
                                        </div>
                                      </div>
                                    </div> 
                                     */}

                                    <div className="card">
                                      <div className="row g-2">
                                        <div className=" col-lg-6">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="flexCheckDefault"
                                              checked={
                                                details.passport ? true : false
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              for="flexCheckDefault"
                                            >
                                              Passport
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="input-group mt-2">
                                            <input
                                              type="file"
                                              accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                              className="form-control"
                                              id="passport"
                                              onChange={handleFileChangeAndSubmit(
                                                "personalDetails"
                                              )}
                                            />
                                            {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card">
                                      <div className="row g-2">
                                        <div className=" col-lg-6">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="flexCheckDefault"
                                              checked={
                                                details.license ? true : false
                                              }
                                            />
                                            <label
                                              className="form-check-label d-flex text-start"
                                              for="flexCheckDefault"
                                            >
                                              Driving-License
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="input-group mt-2">
                                            <input
                                              type="file"
                                              accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                              className="form-control"
                                              id="license"
                                              onChange={handleFileChangeAndSubmit(
                                                "personalDetails"
                                              )}
                                            />
                                            {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card">
                                      <div className="row g-2">
                                        <div className=" col-lg-6">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="flexCheckDefault"
                                              checked={
                                                details.voterId ? true : false
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              for="flexCheckDefault"
                                            >
                                              Voter ID
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="input-group mt-2">
                                            <input
                                              type="file"
                                              accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                              className="form-control"
                                              id="voterId"
                                              onChange={handleFileChangeAndSubmit(
                                                "personalDetails"
                                              )}
                                            />
                                            {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card">
                                      <div className="row g-2">
                                        <div className=" col-lg-6">
                                          <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={
                                                details.othersPersonal
                                                  ? true
                                                  : false
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              for="flexCheckDefault"
                                            >
                                              Others
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="input-group mt-2">
                                            <input
                                              type="file"
                                              accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                              id="othersPersonal"
                                              onClick={() =>
                                                alert(
                                                  "Make all the document as one and upload"
                                                )
                                              }
                                              onChange={handleFileChangeAndSubmit(
                                                "personalDetails"
                                              )}
                                              className="form-control"
                                            />
                                            {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* educational details................................ */}

                      <div
                        className="tab-pane fade"
                        id="nav-educational"
                        role="tabpanel"
                        aria-labelledby="nav-educational-tab"
                        tabindex="0"
                      >
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                              {educationalList.length === 0 ? (
                                <Fragment>
                                  <h4>No Data</h4>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  {educationalList.map((educations, index) => {
                                    return (
                                      <Fragment>
                                        <div
                                          className="card-body"
                                          style={{ marginBottom: "5px" }}
                                        >
                                          <div
                                            className="card-header py-3"
                                            style={{ marginBottom: "10px" }}
                                          >
                                            <h5 className="mb-0 text-start">
                                              {educations.qualification}{" "}
                                              details:
                                            </h5>
                                          </div>
                                          <form className="form-horizontal">
                                            <div
                                              key={index}
                                              className="educational"
                                            >
                                              <div className="form-group">
                                                <div className="row ">
                                                  <label
                                                    for="highestQualifications"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    Highest-Qualifications:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <select
                                                      className="form-select"
                                                      value={
                                                        educations.qualification
                                                      }
                                                      aria-label="Default select example"
                                                      disabled={true}
                                                    >
                                                      <option selected disabled>
                                                        {" "}
                                                        Select Highest
                                                        Qualifications
                                                      </option>
                                                      <option>
                                                        Doctorate/Phd
                                                      </option>
                                                      <option>
                                                        Post Graduation
                                                      </option>
                                                      <option>
                                                        Graduation
                                                      </option>
                                                      <option>12th</option>
                                                      <option>10th</option>
                                                    </select>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row  ">
                                                  <label
                                                    for="Course"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    Course / Specialization:
                                                  </label>
                                                  <div className="col-lg-6">
                                                    <div className="row">
                                                      <div className="col-md-6">
                                                        <div className="ui-select">
                                                          <select
                                                            value={
                                                              educations.course
                                                            }
                                                            id="course"
                                                            className="form-select"
                                                            disabled={true}
                                                          >
                                                            <option>
                                                              Select Course
                                                            </option>
                                                            <option>
                                                              B.A.
                                                            </option>
                                                            <option>
                                                              B.SC.
                                                            </option>
                                                            <option>
                                                              B.Com
                                                            </option>
                                                            <option>
                                                              Btech
                                                            </option>
                                                          </select>
                                                        </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="ui-select">
                                                          <select
                                                            id="specialization"
                                                            value={
                                                              educations.specialization
                                                            }
                                                            className="form-select"
                                                            disabled={true}
                                                          >
                                                            <option>
                                                              Specialization
                                                            </option>
                                                            <option>1+</option>
                                                            <option>2+</option>
                                                            <option>3+</option>
                                                            <option>4+</option>
                                                          </select>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row ">
                                                  <label
                                                    for="College"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    College:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <input
                                                      className="form-control"
                                                      type="text"
                                                      id="College"
                                                      value={educations.college}
                                                      disabled={true}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row  ">
                                                  <label
                                                    for="courseType"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    CourseType/Passingyear:
                                                  </label>
                                                  <div className="col-lg-6">
                                                    <div className="row">
                                                      <div className="col-md-6">
                                                        <div className="ui-select">
                                                          <select
                                                            id="courseType"
                                                            className="form-control"
                                                            value={
                                                              educations.courseType
                                                            }
                                                            disabled={true}
                                                          >
                                                            <option value="Select Course Type">
                                                              Select Course type
                                                            </option>
                                                            <option value="Regular">
                                                              Regular
                                                            </option>
                                                            <option value="Distance">
                                                              Distance
                                                            </option>
                                                            <option value="Vocational">
                                                              Vocational
                                                            </option>
                                                            {/* <option value="">Btech</option> */}
                                                          </select>
                                                        </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                        <div className="ui-select">
                                                          <input
                                                            className="form-control"
                                                            type="text"
                                                            id="College"
                                                            value={
                                                              educations.passingYear
                                                            }
                                                            disabled={true}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="form-group">
                                                <div className="row  ">
                                                  <div className="col-md-9"></div>
                                                </div>
                                              </div>
                                            </div>

                                            {/* upload documents of educational details.............................................................. */}

                                            <div className="row">
                                              <div className="card-footer py-3">
                                                <h5 className="mb-0 text-start">
                                                  Upload{" "}
                                                  {educations.qualification}{" "}
                                                  Documents
                                                </h5>

                                                <h6 className="mb-0 text-start mt-3">
                                                  Choose any and Upload
                                                </h6>
                                              </div>
                                              <div className="card">
                                                <div className="row g-2">
                                                  <div className=" col-lg-6">
                                                    <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                        checked={
                                                          educations.Convocation
                                                            ? true
                                                            : false
                                                        }
                                                      />
                                                      <label
                                                        className="form-check-label"
                                                        for="flexCheckDefault"
                                                      >
                                                        Convocation
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <div className="input-group mt-2">
                                                      <input
                                                        type="file"
                                                        accept=".jpeg, .pdf,"
                                                        className="form-control"
                                                        id="Convocation"
                                                        onChange={handleeducationaldetails(
                                                          "educationalDetails",
                                                          educations.college
                                                        )}
                                                      />
                                                      {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="card">
                                                <div className="row g-2">
                                                  <div className=" col-lg-6">
                                                    <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                        checked={
                                                          educations.ConsolidatedMarksheets
                                                            ? true
                                                            : false
                                                        }
                                                      />
                                                      <label
                                                        className="form-check-label d-flex text-start"
                                                        for="flexCheckDefault"
                                                      >
                                                        Consolidated Marksheets
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <div className="input-group mt-2">
                                                      <input
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                        className="form-control"
                                                        id="ConsolidatedMarksheets"
                                                        onChange={handleeducationaldetails(
                                                          "educationalDetails",
                                                          educations.college
                                                        )}
                                                      />
                                                      {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="card">
                                                <div className="row g-2">
                                                  <div className=" col-lg-6">
                                                    <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                      <input
                                                        className="form-check-input"
                                                        checked={
                                                          educations.IndividualMarksheet
                                                            ? true
                                                            : false
                                                        }
                                                        type="checkbox"
                                                        id="flexCheckDefault"
                                                      />
                                                      <label
                                                        className="form-check-label d-flex text-start"
                                                        for="flexCheckDefault"
                                                      >
                                                        Individual Marksheet
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <div className="input-group mt-2">
                                                      <input
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                        className="form-control"
                                                        id="IndividualMarksheet"
                                                        onChange={handleeducationaldetails(
                                                          "educationalDetails",
                                                          educations.college
                                                        )}
                                                      />
                                                      {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="card">
                                                <div className="row g-2">
                                                  <div className=" col-lg-6">
                                                    <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                                      <input
                                                        className="form-check-input"
                                                        checked={
                                                          educations.othersEducation
                                                            ? true
                                                            : false
                                                        }
                                                        type="checkbox"
                                                      />
                                                      <label
                                                        className="form-check-label"
                                                        for="flexCheckDefault"
                                                      >
                                                        Others
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <div className="input-group mt-2">
                                                      <input
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                        onChange={handleeducationaldetails(
                                                          "educationalDetails",
                                                          educations.college
                                                        )}
                                                        id="othersEducation"
                                                        onClick={() =>
                                                          alert(
                                                            "Make all the document as one and upload"
                                                          )
                                                        }
                                                        className="form-control"
                                                      />
                                                      {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </Fragment>
                                    );
                                  })}
                                </Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* experiesnce details.......................................................... */}
                      <div
                        className="tab-pane fade"
                        id="nav-proffesional"
                        role="tabpanel"
                        aria-labelledby="nav-proffesional-tab"
                        tabindex="0"
                      >
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                              {experience.length === 0 ? (
                                <Fragment>
                                  <h4>No Data</h4>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <div className="card-body">
                                    <form className="form-horizontal">
                                      {experience.map((exp, index) => (
                                        <div key={index} className="experience">
                                          <div className="card-header py-3">
                                            <h5 className="mb-0 text-start">
                                              {exp.companyName} Experience
                                              details
                                            </h5>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="Company"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Company:
                                              </label>
                                              <div className=" col-lg-6">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  id="Company"
                                                  value={exp.companyName}
                                                  disabled={true}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="currentDesignation"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Designation:
                                              </label>
                                              <div className=" col-lg-6">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  value={exp.designation}
                                                  id="currentDesignation"
                                                  disabled={true}
                                                />
                                              </div>
                                            </div>
                                          </div>

                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="Location"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Location:
                                              </label>
                                              <div className=" col-lg-6">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  id="Location"
                                                  value={exp.locationOfCompany}
                                                  disabled={true}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="Experience"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Experience:
                                              </label>
                                              <div className=" col-lg-6">
                                                <div className="row">
                                                  <div className=" col-md-6">
                                                    <input
                                                      className="form-control"
                                                      type="text"
                                                      value={
                                                        exp.experienceStart
                                                      }
                                                      placeholder="Starting Date"
                                                      disabled={true}
                                                    />
                                                  </div>
                                                  <div className=" col-md-6">
                                                    <input
                                                      className="form-control"
                                                      type="text"
                                                      placeholder="Ending Date"
                                                      value={exp.experienceEnd}
                                                      disabled={true}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row  ">
                                              <label
                                                for="anualSalary"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Anual Salary:
                                              </label>
                                              <div className="col-lg-6">
                                                <div className="row">
                                                  <div className="col-md-2">
                                                    <div className="ui-select">
                                                      <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Ending Date"
                                                        value={exp.salarySymbol}
                                                        disabled={true}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-5">
                                                    <div className="ui-select">
                                                      <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Ending Date"
                                                        value={
                                                          exp.annualSalaryInLakhs +
                                                          " Lakh"
                                                        }
                                                        disabled={true}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-md-5">
                                                    <div className="ui-select">
                                                      <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Ending Date"
                                                        value={
                                                          exp.annualSalaryInThousands +
                                                          " Thousand"
                                                        }
                                                        disabled={true}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="Industry"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Industry:
                                              </label>
                                              <div className=" col-lg-6">
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  id="Industry"
                                                  value={exp.industry}
                                                  disabled={true}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="functionalArea"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Functional area:
                                              </label>
                                              <div className=" col-lg-6">
                                                <input
                                                  value={exp.functionalArea}
                                                  className="form-control"
                                                  type="text"
                                                  id="functionalArea"
                                                  disabled={true}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="Skills"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Skills:
                                              </label>
                                              <div className="col-lg-6">
                                                <Select
                                                  isMulti
                                                  defaultValue={exp.skills}
                                                  value={exp.skills}
                                                  isDisabled={true}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="row ">
                                              <label
                                                for="Description"
                                                className="col-lg-3 col-form-label"
                                              >
                                                Job Roles & Responsibilities:
                                              </label>
                                              <div className="col-lg-6">
                                                <textarea
                                                  value={exp.description}
                                                  className="form-control"
                                                  id="exampleFormControlTextarea1"
                                                  rows="3"
                                                  disabled={true}
                                                ></textarea>
                                              </div>
                                            </div>
                                          </div>
                                          {/* upload documents of experience details.............................................................. */}

                                          <div
                                            className="row"
                                            style={{ marginBottom: "50px" }}
                                          >
                                            <div className="card-footer py-3">
                                              <h5 className="mb-0 text-start">
                                                Upload Documents
                                              </h5>

                                              <h6 className="mb-0 text-start mt-3">
                                                Choose any and Upload
                                              </h6>
                                            </div>
                                            <div className="card">
                                              <div className="row g-2">
                                                <div className=" col-lg-6">
                                                  <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id="flexCheckDefault"
                                                      checked={
                                                        exp.OfferLetter
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      for="flexCheckDefault"
                                                    >
                                                      Offer Letter
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="input-group mt-2">
                                                    <input
                                                      type="file"
                                                      accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                      className="form-control"
                                                      id="OfferLetter"
                                                      onChange={handleproffetional(
                                                        "professionalDetails",
                                                        exp.companyName,
                                                        exp.experienceStart
                                                      )}
                                                    />
                                                    {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="row g-2">
                                                <div className=" col-lg-6">
                                                  <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id="flexCheckDefault"
                                                      checked={
                                                        exp.AppointmentLetter
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      for="flexCheckDefault"
                                                    >
                                                      Appointment Letter
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="input-group mt-2">
                                                    <input
                                                      type="file"
                                                      accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                      className="form-control"
                                                      onChange={handleproffetional(
                                                        "professionalDetails",
                                                        exp.companyName,
                                                        exp.experienceStart
                                                      )}
                                                      id="AppointmentLetter"
                                                    />
                                                    {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="row g-2">
                                                <div className=" col-lg-6">
                                                  <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id="flexCheckDefault"
                                                      checked={
                                                        exp.AppraisalLetter
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      for="flexCheckDefault"
                                                    >
                                                      Appraisal-Letter
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="input-group mt-2">
                                                    <input
                                                      type="file"
                                                      accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                      className="form-control"
                                                      id="AppraisalLetter"
                                                      onChange={handleproffetional(
                                                        "professionalDetails",
                                                        exp.companyName,
                                                        exp.experienceStart
                                                      )}
                                                    />
                                                    {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="row g-2">
                                                <div className=" col-lg-6">
                                                  <div className="form-check m-3 mt-3 d-flex justify-content-start col-lg-4">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id="flexCheckDefault"
                                                      checked={
                                                        exp.SalarySlips
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label d-flex text-start"
                                                      for="flexCheckDefault"
                                                    >
                                                      Salary Slips
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="input-group mt-2">
                                                    <input
                                                      type="file"
                                                      accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                      className="form-control"
                                                      id="SalarySlips"
                                                      onChange={handleproffetional(
                                                        "professionalDetails",
                                                        exp.companyName,
                                                        exp.experienceStart
                                                      )}
                                                    />
                                                    {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="row g-2">
                                                <div className=" col-lg-6">
                                                  <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id="flexCheckDefault"
                                                      checked={
                                                        exp.Rewards
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      for="flexCheckDefault"
                                                    >
                                                      Rewards Awards certificate
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="input-group mt-2">
                                                    <input
                                                      onChange={handleproffetional(
                                                        "professionalDetails",
                                                        exp.companyName,
                                                        exp.experienceStart
                                                      )}
                                                      type="file"
                                                      accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                      className="form-control"
                                                      id="Rewards"
                                                    />
                                                    {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card">
                                              <div className="row g-2">
                                                <div className=" col-lg-6">
                                                  <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                    <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      id="flexCheckDefault"
                                                      checked={
                                                        exp.othersProfessional
                                                          ? true
                                                          : false
                                                      }
                                                    />
                                                    <label
                                                      className="form-check-label"
                                                      for="flexCheckDefault"
                                                    >
                                                      Others
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6">
                                                  <div className="input-group mt-2">
                                                    <input
                                                      type="file"
                                                      accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                      onChange={handleproffetional(
                                                        "professionalDetails",
                                                        exp.companyName,
                                                        exp.experienceStart
                                                      )}
                                                      className="form-control"
                                                      id="othersProfessional"
                                                    />
                                                    {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </form>
                                  </div>
                                </Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*project details..........................................................  */}
                      <div
                        className="tab-pane fade"
                        id="nav-projects"
                        role="tabpanel"
                        aria-labelledby="nav-projects-tab"
                        tabindex="0"
                      >
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                              {projectsFullList.length === 0 ? (
                                <h4>No Data</h4>
                              ) : (
                                <Fragment>
                                  <div className="card-body">
                                    <form className="form-horizontal">
                                      {projectsFullList.map(
                                        (project, index) => {
                                          return (
                                            <Fragment>
                                              <div className="form-group">
                                                <div className="card-header py-3">
                                                  <h5 className="mb-0 text-start">
                                                    Project details
                                                  </h5>
                                                </div>

                                                <div className="row ">
                                                  <label
                                                    for="Projects"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    Project:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <div className="row ">
                                                      <div className="col-md-6 ">
                                                        <input
                                                          className="form-control"
                                                          type="text"
                                                          value={
                                                            project.project
                                                          }
                                                          placeholder="Client Name"
                                                          disabled={true}
                                                        />
                                                      </div>
                                                      <div className="col-md-6">
                                                        <input
                                                          className="form-control "
                                                          value={project.year}
                                                          type="text"
                                                          placeholder="Year"
                                                          disabled={true}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row ">
                                                  <label
                                                    for="Location"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    Client:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <input
                                                      value={project.client}
                                                      className="form-control"
                                                      type="text"
                                                      id="Location"
                                                      disabled={true}
                                                    />
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="form-group">
                                                <div className="row ">
                                                  <label
                                                    for="Description"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    Project Description:
                                                  </label>
                                                  <div className="col-lg-6">
                                                    <textarea
                                                      value={
                                                        project.description
                                                      }
                                                      className="form-control"
                                                      id="exampleFormControlTextarea1"
                                                      rows="3"
                                                      disabled={true}
                                                    ></textarea>
                                                  </div>

                                                  <div className="row">
                                                    <div className="card-footer py-3">
                                                      <h5 className="mb-0 text-start">
                                                        Upload Documents
                                                      </h5>

                                                      <h6 className="mb-0 text-start mt-3">
                                                        Choose any and Upload
                                                      </h6>
                                                    </div>
                                                  </div>

                                                  <div className="card">
                                                    <div className="row g-2">
                                                      <div className=" col-lg-6">
                                                        <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                          <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="flexCheckDefault"
                                                            // checked={exp.OfferLetter ? true : false}
                                                          />
                                                          <label
                                                            className="form-check-label"
                                                            for="flexCheckDefault"
                                                          >
                                                            {project.project}{" "}
                                                            Link
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="col-lg-6">
                                                        <div className="input-group mt-2">
                                                          <input
                                                            type="url"
                                                            className="form-control"
                                                            id="projectLink"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="card">
                                                    <div className="row g-2">
                                                      <div className=" col-lg-6">
                                                        <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                          <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="flexCheckDefault"
                                                          />
                                                          <label
                                                            className="form-check-label"
                                                            for="flexCheckDefault"
                                                          >
                                                            {project.project}{" "}
                                                            file
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="col-lg-6">
                                                        <div className="input-group mt-2">
                                                          <input
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                            className="form-control"
                                                            id="othersProject"
                                                            name="othersProject"
                                                            onChange={handleCertificateAndProject(
                                                              "projectDetails"
                                                            )}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </Fragment>
                                          );
                                        }
                                      )}
                                    </form>
                                  </div>
                                </Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* certification details......................................................... */}
                      <div
                        className="tab-pane fade"
                        id="nav-certification"
                        role="tabpanel"
                        aria-labelledby="nav-certification-tab"
                        tabindex="0"
                      >
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                              <div className="card-header py-3">
                                <h5 className="mb-0 text-start">
                                  Certification details
                                </h5>
                              </div>
                              {certificate.length === 0 ? (
                                <h4>No Data</h4>
                              ) : (
                                <Fragment>
                                  <div className="card-body">
                                    <form className="form-horizontal">
                                      {certificate.map((certificate, index) => {
                                        return (
                                          <Fragment>
                                            <div className="form-group">
                                              <div className="row ">
                                                <label
                                                  for="certificateName"
                                                  className="col-lg-3 col-form-label"
                                                >
                                                  Name of Certification:
                                                </label>
                                                <div className=" col-lg-6">
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    id="certificateName"
                                                    value={
                                                      certificate.nameOfCertification
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row ">
                                                <label
                                                  for="Location"
                                                  className="col-lg-3 col-form-label"
                                                >
                                                  Name of Institute:
                                                </label>
                                                <div className=" col-lg-6">
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    value={
                                                      certificate.nameOfInstitute
                                                    }
                                                    id="Location"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row ">
                                                <label
                                                  for="Projects"
                                                  className="col-lg-3 col-form-label"
                                                >
                                                  Duration:
                                                </label>
                                                <div className=" col-lg-6">
                                                  <div className="row ">
                                                    <div className="col-md-6 ">
                                                      <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="From"
                                                        value={certificate.from}
                                                      />
                                                    </div>
                                                    <div className="col-md-6">
                                                      <input
                                                        className="form-control "
                                                        type="text"
                                                        placeholder="To"
                                                        value={
                                                          certificate.lifeTime
                                                            ? "Life Time"
                                                            : certificate.to
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="form-group">
                                              <div className="row ">
                                                <label
                                                  for="Description"
                                                  className="col-lg-3 col-form-label"
                                                >
                                                  Project Description:
                                                </label>
                                                <div className="col-lg-6">
                                                  <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    value={
                                                      certificate.description
                                                    }
                                                  ></textarea>
                                                </div>
                                              </div>
                                            </div>
                                          </Fragment>
                                        );
                                      })}

                                      <div className="row">
                                        <div className="card-footer py-3">
                                          <h5 className="mb-0 text-start">
                                            Upload Documents
                                          </h5>

                                          <h6 className="mb-0 text-start mt-3">
                                            Choose any and Upload
                                          </h6>
                                        </div>

                                        <div className="card">
                                          {certificate.map(
                                            (certificate, index) => {
                                              return (
                                                <Fragment>
                                                  <div className="row g-2">
                                                    <div className=" col-lg-6">
                                                      <div className="form-check m-3 mt-3 d-flex justify-content-start ">
                                                        <input
                                                          className="form-check-input"
                                                          type="checkbox"
                                                          checked={
                                                            certificate.length >=
                                                            index
                                                          }
                                                          id="flexCheckDefault"
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          for="flexCheckDefault"
                                                        >
                                                          {
                                                            certificate.nameOfCertification
                                                          }
                                                        </label>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <div className="input-group mt-2">
                                                        <input
                                                          type="file"
                                                          accept=".png, .jpg, .jpeg, .pdf,  .doc"
                                                          className="form-control"
                                                          id="othersCertificate"
                                                          name="othersCertificate"
                                                          onChange={handleCertificateAndProject(
                                                            "certificationDetails"
                                                          )}
                                                        />
                                                        {/* <label className="input-group-text" for="inputGroupFile02">Upload</label> */}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Fragment>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* other details.................................................................. */}
                      <div
                        className="tab-pane fade"
                        id="nav-others"
                        role="tabpanel"
                        aria-labelledby="nav-others-tab"
                        tabindex="0"
                      >
                        <div className="row">
                          <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                              <div className="card-header py-3">
                                <h5 className="mb-0 text-start">
                                  Other Details
                                </h5>
                              </div>

                              <div className="card-body">
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <div className="row ">
                                      <label
                                        for="Description"
                                        className="col-lg-3 col-form-label"
                                      >
                                        Other Details Description:
                                      </label>
                                      <div className="col-lg-6">
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          rows="3"
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg "
                            style={{ backgroundColor: "rgb(3, 104, 104)" }}
                          >
                            Save
                          </button>
                            </div>
                      </div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* please wait modal  */}

     < Messagebox handleclickdiv={handleclickdiv} />
    </div>
  );
}

export default Newdocuments;
