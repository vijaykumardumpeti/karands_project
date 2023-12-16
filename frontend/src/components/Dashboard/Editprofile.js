import React, { useEffect, Fragment, useContext } from "react";
import { useState } from "react";
import "./editprofile.css";
import axios from "axios";
import Select from "react-select";
import Sidebar from "./Sidebar";
import Details from "./Details";
import ObjSurveyBox from "../objSurvey/ObjSurveyBox";
import pick from "../../assets/femaleplaceholder.jpg";
import displaypicture from "../../assets/maleploceholder.jpg";
import { ToastContainer, toast } from "react-toastify";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import Loader from "./Loader";
import Modal from "react-modal";

import { Range, getTrackBackground } from "react-range";


import MyContext from '../../mycontext';

import Messagebox from '../../components/messaging/MessageBox'





// import MessageBox from '../../'

// Initialize Modal
Modal.setAppElement("#root");



let educationlevel = ["Doctorate or Ph.D.", "Master's Degree", "Associate's Degree", "Bachelor's Degree", "High School Diploma or Equivalent", "10th"]







function Editprofile() {
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

  const { handleclickdiv, profilepicfunction } = useContext(MyContext)


  // const {profilepicfunction} = useContext(MyContext)
  const [isLoading, setLoading] = useState(true);
  const [selectedFile, setselectedFile] = useState("");

  const [profilePicture, setProfilePicture] = useState(""); // State to store the profile picture URL
  const [newProfilePicture, setNewProfilePicture] = useState(null); // State to store the selected image file

  const [adharotp, setadharotp] = useState("");

  const [request_id, setrequest_id] = useState("");

  const [showotp, setshowopt] = useState(false);






  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];

    // Dismiss any existing toasts

    toast.dismiss();
    if (file) {
      const fileName = "profilepicture";
      const fileExtension = file.name.split(".").pop();
      const formData = new FormData();
      formData.append("pdfFile", file);
      const foldersNameCreation = "personalDetails";
      /////////////////////

      try {
        const response = await fetch(
          `${process.env.REACT_APP_IP_ADDRESS
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
          mainfetch();
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

      setNewProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const years = Array.from(
    { length: 2023 - 1923 + 1 },
    (_, index) => 1923 + index
  );

  const [course, setCourses] = useState([]);

  const [colleges, setcolleges] = useState([]);

  const handleEducationalChange = async (e, index) => {
    try {
      const { name, value } = e.target;
      const updatedEducation = [...education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };
      setEducation(updatedEducation);

      // Assuming e.target.value contains the degree
      const degree = e.target.value;

      await axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/getcourse/${degree}`)
        .then((res) => {
          setCourses(res.data.data); // Assuming res.data.data contains the courses
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false); // Mark loading as false regardless of success or error
        });
    } catch (error) {
      console.log(error);
    }
  };

  function handleEducationalSubmit(e) {
    e.preventDefault();

    // Dismiss any existing toasts
    toast.dismiss();

    education.verified = false;

    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/education/${localStorage.getItem("id")}`,
        {
          education: education,
          email: localStorage.getItem("email"),
        }
      )
      .then((res) => {
        toast.success("changes saved successfully", {
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
      .catch((e) => {
        console.log(e);
      });
  }

  const handlePassingYearChange = (e, index) => {
    const { value } = e.target;
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index].passingYear = value;
      return updatedEducation;
    });
  };

  const handleCollegeChange = (selectedOption, index, field) => {
    if (selectedOption) {
      // Update the education state with the selected college
      setEducation((prevEducation) => {
        const updatedEducation = [...prevEducation];
        updatedEducation[index] = {
          ...updatedEducation[index],
          [field]: selectedOption.value, // Use selected value from react-select
        };
        return updatedEducation;
      });
    }
  };

  const handleCourseChange = (selectedOption, index, field) => {
    if (selectedOption) {
      // Update the education state with the selected course
      setEducation((prevState) => {
        const updatedEducation = [...prevState];
        updatedEducation[index] = {
          ...updatedEducation[index],
          [field]: selectedOption.value, // Use selected value from react-select
        };
        return updatedEducation;
      });
    }
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        qualification: "",
        course: "",
        specialization: "",
        college: "",
        courseType: "",
        passingYear: "",
        verified: false,
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  function otherInfo(e) {
    e.preventDefault();

    // Dismiss any existing toasts
    toast.dismiss();

    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/otherInfo/${id}`,
        {
          otherDocument: others,
          email: localStorage.getItem("email"),
        }
      )
      .then((res) => {
        toast.success("changes saved successfully", {
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
      .catch((err) => {
        console.log(err);
      });
  }
  const [others, setOthers] = useState([
    {
      name: "",
      description: "",
    },
  ]);

  const handleOtherChange = (event, index) => {
    const { name, value } = event.target;
    setOthers((prevOthers) => {
      const updatedOthers = [...prevOthers];
      updatedOthers[index][name] = value;
      return updatedOthers;
    });
  };
  const deleteOther = (index) => {
    setOthers((prevOthers) => {
      const updatedOthers = [...prevOthers];
      updatedOthers.splice(index, 1);
      return updatedOthers;
    });
  };

  const addOther = () => {
    setOthers((prevOthers) => [
      ...prevOthers,
      {
        name: "",
        description: "",
      },
    ]);
  };


  const initialExperience = {
    designation: "",
    companyName: "",
    locationOfCompany: "",
    experienceStart: "",
    experienceEnd: "",
    salarySymbol: "",
    annualSalaryInLakhs: "",
    annualSalaryInThousands: "",
    industry: "",
    functionalArea: "",
    description: "",
    skills: [],
    experienceLevel: "",
    verified: false,
  };

  const [fresher, setFresher] = useState(initialExperience);

  const [experiences, setExperiences] = useState([initialExperience]);






  console.log("experiences", experiences)







  async function jobexperience(e) {
    experiences.verified = false;








    await axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/jobexperience/${localStorage.getItem("id")}`,
        {
          JobExperience: experiences,
          email: localStorage.getItem("email"),
        }
      )
      .then((res) => {
        toast.success("changes saved successfully", {
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
      .catch((err) => {
        console.log(err);
      });
  }

  const [functionalArea, setFunctionalArea] = useState([]);
  const [details, setDetails] = useState({});
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([]);
  const [skills, setSkills] = useState([]);

  const id = localStorage.getItem("id");
  const [iu, setIu] = useState(false);
  const [city, setCity] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [hr, setHr] = useState([]);



  // this is for salary range.................................

  const [values, setValues] = useState([0]);


  console.log("handleOnChange salary", values)



  const [profilepic, setprofilepic] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    gender: "",
    DOB: "",
    MartialStatus: "",
    flatNum: "",
    streetName: "",
    city: "",
    State: "",
    pincode: "",
    language: "",
    about: "",
  });

  const [isDateValid, setIsDateValid] = useState(true);

  const handlePersonalInfoChanges = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prevInfo) => {
      // Check if the entered date is after the maximum date
      if (name === "DOB" && value > "2015-12-31") {
        setIsDateValid(false); // Date is not valid
      } else {
        setIsDateValid(true); // Date is valid
      }

      return {
        ...prevInfo,
        [name]: value,
      };
    });
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

  // useeffec for collegse

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IP_ADDRESS}/getcollegenames`
        );
        if (response.data) {
          console.log(response.data);
          // Update state with fetched data
          setcolleges(response.data);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    }

    // Call the fetchColleges function when the component mounts
    fetchColleges();
  }, []);

  const [socialLinksDetail, setSocialLinkDetails] = useState({
    faceBookLink: "",
    twitterLinks: "",
    linkedInLink: "",
    instagramLink: "",
    otherLinks: "",
    gitHubLink: "",
  });
  const [education, setEducation] = useState([
    {
      qualification: "",
      course: "",
      specialization: "",
      college: "",
      courseType: "",
      passingYear: "",
      verified: false,
    },
  ]);

  const [projects, setProjects] = useState([
    {
      project: "",
      year: "",
      client: "",
      description: "",
    },
  ]);

  const handleDesignationChange = (inputValue) => {
    if (inputValue.length >= 2) {
      axios
        .get(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/designation/${inputValue}`
        )
        .then((res) => {
          setDesignation(res.data);
        });
    }
  };

  function certificationInfo() {
    const updatedCertifications = certificate.map((certifications) => {
      if (certifications.lifeTime) {
        return {
          ...certifications,
          to: "",
        };
      }
      return certifications;
    });

    // Dismiss any existing toasts
    toast.dismiss();

    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/certificationInfo/${localStorage.getItem("id")}`,
        {
          certificationINfo: updatedCertifications,
          email: localStorage.getItem("email"),
        }
      )
      .then((res) => {
        toast.success("changes saved successfully", {
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
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePhoneNumber(e) {
    let val = e.target.value;
    if (val.length === 1 && /^[6-9]/.test(val)) {
      setDetails({ ...details, mobilenumber: e.target.value });
    } else if (val.length !== 1 && val.length !== 11) {
      setDetails({ ...details, mobilenumber: e.target.value });
    }
  }

  const takeDescriptions = (event) => {
    setProjects((prevstate) => ({
      ...prevstate,
      description: event.target.value,
    }));
  };

  const [experienceList, setExperiencelList] = useState([{ experience: "" }]);

  const [profilePic, setProfilePic] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };





  const [certificate, setCertificate] = useState([
    {
      nameOfCertification: "",
      nameOfInstitute: "",
      from: "",
      to: "",
      lifeTime: false,
      description: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    setCertificate((prevCertificate) => {
      const updatedCertificate = [...prevCertificate];
      if (type === "checkbox") {
        updatedCertificate[index][name] = checked;
      } else {
        updatedCertificate[index][name] = value;
      }
      return updatedCertificate;
    });
  };

  const addCertificate = () => {
    setCertificate((prevCertificate) => [
      ...prevCertificate,
      {
        nameOfCertification: "",
        nameOfInstitute: "",
        from: "",
        to: "",
        lifeTime: false,
        description: "",
      },
    ]);
  };

  const deleteCertificate = (index) => {
    setCertificate((prevCertificate) => {
      const updatedCertificate = [...prevCertificate];
      updatedCertificate.splice(index, 1);
      return updatedCertificate;
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setOtherOpen(false);
    setCertOpen(false);

  };

  const [certopen, setCertOpen] = useState(false);

  const handleCertificateToggle = () => {
    setCertOpen(!certopen);
    setOtherOpen(false);
    setIsOpen(false);

  };

  const [otheropen, setOtherOpen] = useState(false);

  const handleOtherToggle = () => {
    setOtherOpen(!otheropen);
    setCertOpen(false);
    setIsOpen(false);

  };



  function projectInfo() {
    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/account/${localStorage.getItem("id")}`,
        {
          projectInfo: projects,
          email: localStorage.getItem("email"),
        }
      )
      .then((res) => {
        toast.success("changes saved successfully", {
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
      .catch((err) => {
        console.log(err);
      });
  }

  // ....................................................box1...........................................................................

  console.log("details,....", details.state);

  async function AccountInfo(e) {
    e.preventDefault();
    // Dismiss any existing toasts
    toast.dismiss();
    if (selectedFile.name) {
      const foldersNameCreation = "personalDetails";

      const fileName = "Resume";

      const fileExtension = selectedFile.name.split(".").pop();

      const formData = new FormData();

      formData.append("pdfFile", selectedFile);

      const response = await fetch(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/uploadresume/${localStorage.getItem(
          "email"
        )}/${fileName}.${fileExtension}/${foldersNameCreation}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response) {
        mainfetch();
      }
    }

    await axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/account/${localStorage.getItem("id")}`,
        {
          name: details.name,
          email: localStorage.getItem("email"),
          mobilenumber: details.mobilenumber,
          location: details.location,
          Professionalstate: details.state,
          designation: details.designation,
          WorkExperienceYear: details.WorkExperienceYear,
          WorkExperienceMonth: details.WorkExperienceMonth,
          industry: details.industry,
        }
      )
      .then((res) => {
        toast.success("changes saved successfully", {
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
      .catch((err) => {
        console.log(err);
      });
  }

  function personalInfoSubmit(e) {
    e.preventDefault();

    // Dismiss any existing toasts
    toast.dismiss();

    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/account/${localStorage.getItem("id")}`,
        {
          fullName: personalInfo.fullName,
          email: localStorage.getItem("email"),
          gender: personalInfo.gender,
          DOB: personalInfo.DOB,
          MartialStatus: personalInfo.MartialStatus,
          flatNum: personalInfo.flatNum,
          streetName: personalInfo.streetName,
          State: personalInfo.State,
          pincode: personalInfo.pincode,
          language: personalInfo.language,
          about: personalInfo.about,
          city: personalInfo.city,
        }
      )
      .then((res) => {
        // console.log(res);

        toast.success("changes saved successfully", {
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
      .catch((e) => {
        console.log(e);
      });
  }

  function socialLinked() {
    // Dismiss any existing toasts
    toast.dismiss();

    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/account/${localStorage.getItem("id")}`,
        {
          email: localStorage.getItem("email"),
          faceBookLink: socialLinksDetail.faceBookLink,
          twitterLinks: socialLinksDetail.twitterLinks,
          linkedInLink: socialLinksDetail.linkedInLink,
          instagramLink: socialLinksDetail.instagramLink,
          otherLinks: socialLinksDetail.otherLinks,
          gitHubLink: socialLinksDetail.gitHubLink,
        }
      )
      .then((res) => {
        // console.log(res);

        toast.success("changes saved successfully", {
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
      .catch((e) => {
        console.log(e);
      });
  }

  // fetching user details...........................................................................mIN festch............................

  async function mainfetch() {
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/functionalArea`)
      .then((res) => {
        setFunctionalArea(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS
        }/karands/users/${localStorage.getItem("id")}`
      )
      .then((res) => {
        if (res.data.details) {
          if (res.data.details.profilepicture) {
            setprofilepic(res.data.details.profilepicture);
          }

          const roles = res.data.details;
          // console.log(roles);
          if (roles.role === "iu") {
            setIu(true);
          }
          setDetails(res.data.details);

          if (res.data.details.JobExperience.length !== 0) {
            setExperiences(res.data.details.JobExperience);
          }
          if (res.data.details.projectInfo.length !== 0) {
            setProjects(res.data.details.projectInfo);
          }
          if (res.data.details.certificationINfo.length !== 0) {
            setCertificate(res.data.details.certificationINfo);
          }
          if (res.data.details.otherDocument.length !== 0) {
            setOthers(res.data.details.otherDocument);
          }
          if (roles.education.length !== 0) {
            setEducation(roles.education);
          }
          setPersonalInfo({
            fullName: roles.fullName,
            gender: roles.gender,
            DOB: roles.DOB,
            MartialStatus: roles.MartialStatus,
            flatNum: roles.flatNum,
            streetName: roles.streetName,
            city: roles.city,
            State: roles.State,
            pincode: roles.pincode,
            language: roles.language,
            about: roles.about,
          });
          setSocialLinkDetails({
            faceBookLink: roles.faceBookLink,
            twitterLinks: roles.twitterLinks,
            linkedInLink: roles.linkedInLink,
            instagramLink: roles.instagramLink,
            gitHubLink: roles.gitHubLink,
            otherLinks: roles.otherLinks,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
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
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city`)
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const val = [];
    const valMonth = [];
    for (let i = 0; i <= 10; i++) {
      val.push({
        value: i,
        label: i,
      });
      valMonth.push({
        value: i,
        label: i,
      });
      if (i === 10) {
        val.push({
          value: "+" + i,
          label: "+" + i,
        });
      }
    }
    valMonth.push({
      value: 11,
      label: 11,
    });
    setMonth(valMonth);
    setYear(val);

    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/designation`)
      .then((res) => {
        setDesignation(res.data);
      })
      .catch((err) => {
        console.log(err);
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
          return null;
        });

        setSkills(newSkills);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    mainfetch();
  }, []);

  const handleAddMore = () => {
    setExperiences([
      ...experiences,
      {
        designation: "",
        companyName: "",
        locationOfCompany: "",
        experienceStart: "",
        experienceEnd: "",
        // salarySymbol: "",
        annualSalaryInLakhs: "",
        // annualSalaryInThousands: "",
        industry: "",
        functionalArea: "",
        description: "",
        skills: [],
        verified: false,
      },
    ]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        project: "",
        year: "",
        client: "",
        description: "",
      },
    ]);
  };

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const updateProjectName = (value, index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index].project = value;
      return updatedProjects;
    });
  };

  const updateProjectYear = (value, index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index].year = value;
      return updatedProjects;
    });
  };

  const updateClientName = (value, index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index].client = value;
      return updatedProjects;
    });
  };

  const updateDescription = (value, index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index].description = value;
      return updatedProjects;
    });
  };

  const deleteProject = (index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(index, 1);
      return updatedProjects;
    });
  };

  const handleExperienceAdd = () => {
    setExperiencelList([...experienceList, { experience: "" }]);
  };






  console.log("salary range value", values)

  const handleOnChange = (index, feild, newValues) => {


    handleInputChange(index, feild, newValues[0]);

    setValues(newValues);




  };











  const handleSkillsEachChange = (inputValue) => {
    // console.log(inputValue);
    if (inputValue.length >= 2) {
      axios
        .get(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/skills/${inputValue}`
        )
        .then((res) => {
          const newSkills = [];
          const val = res.data;
          // console.log("Fetching another data")
          val.map((e) => {
            newSkills.push({
              value: e.allSklls,
              label: e.allSklls,
            });
            return null;
          });
          // console.log(newSkills);

          setSkills(newSkills);
        });
    }
  };
  const handleInputChange = (index, field, value) => {


    console.log("handleInputChange", index, field, value)


    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setExperiences(updatedExperiences);
  };









  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };
  const handleSkillsChange = (index, selectedOptions) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].skills = selectedOptions;
    setExperiences(updatedExperiences);
  };

  // adding profile pic...........

  const handleFileChangeAndSubmit = (foldersNameCreation) => async (event) => {
    event.preventDefault();

    const selectedFile = event.target.files[0];

    const formData = new FormData();

    formData.append("pdfFile", selectedFile);

    const foldername = foldersNameCreation;

    const fileName = event.target.id;

    const fileExtension = selectedFile.name.split(".").pop();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_IP_ADDRESS
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

        // setFlag(!flag)
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
  };

  async function getstatefunction(location) {
    if (details.location) {
      axios
        .get(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/users/getstatebylocation/${details.location}`
        )
        .then((res) => {
          if (res) {
            setPersonalInfo({ ...personalInfo, state: res.data.state });

            setDetails({ ...details, state: res.data.state });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getstatefunction();
  }, [details.location]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log("res course", course)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };






  // adhar auto fill section ,.....................................................//..............................//........................................

  const [adharcardnumber, setadharcardnumber] = useState("");

  // function to send   adhar  otp............

  async function sendadharotp() {
    if (adharcardnumber.length == 12) {
      const data = {
        adharcardnumber: adharcardnumber,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/sendotpforadhar`,
        data
      );

      if (res.data.success == true) {
        setrequest_id(res.data.request_id);

        alert("otp send");

        startTimer();

        setshowopt(true);

        console.log(res.data.request_id);
      }
      if (res.data.success == false) {
        alert("otp failed to send");
      }

      console.log("adharopt res", res);
    } else {
      alert("enter proper adhar card number...");
    }
  }

  // timmer for send otp  button....................................................................

  const [seconds, setSeconds] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);

  const startTimer = () => {
    setSeconds(60);
    setIsDisabled(true);
  };

  const tick = () => {
    if (seconds > 0) {
      setSeconds((prevSeconds) => prevSeconds - 1);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isDisabled) {
      const timer = setInterval(tick, 1000);

      return () => clearInterval(timer);
    }
  }, [isDisabled, seconds]);

  // function to submit otp.........................

  async function submitotp() {
    try {
      const data = {
        adharotp: adharotp,
        request_id: request_id,
        userid: localStorage.getItem("id"),
      };

      const submitres = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/verifyadharcard`,
        data
      );

      if (
        submitres.data &&
        submitres.data.aadharCardverified.status === "true"
      ) {
        alert("OTP verified");

        setshowopt(false);

        window.location.reload();
      } else {
        alert("OTP not verified. Please try again after some time.");
      }
    } catch (error) {
      alert("An error occurred while verifying OTP. Please try again later.");
      console.error("Error:", error);
    }
  }

  console.log("education details", education);








  // pan verification....................


  const [pancardnumber, setpancardnumber] = useState("");

  // function to verify pan card api..............................................


  async function verifypancard() {
    try {
      if (pancardnumber) {
        const data = {
          pancardnumber: pancardnumber,
          userid: localStorage.getItem("id"),
        };

        console.log("pandata", data);

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/verifypancard`,
          data
        );

        console.log("Response:", response);

        if (response.data && response.data.panCardverified && response.data.panCardverified.status) {
          // PAN card is valid
          alert("PAN card is validation sucessfull");
        } else if (response.status === 500) {
          // Server returned an error
          alert("Failed to verify PAN card. Please try again later.");
        } else {
          // Name does not match with the PAN card
          alert("Name does not match with the PAN card.");
        }
      } else {
        // PAN card number is empty
        alert("PAN card number is empty");
      }
    } catch (error) {
      // An error occurred while verifying PAN card
      alert("An error occurred while verifying PAN card. Please try again later.");
      console.error("Error:", error);
    }
  }

  return (
    <div className="" style={{ backgroundColor: "transparent" }}>
      {isLoading ? (
        // <div>Loading...</div>

        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        // Show a loader while loading
        <div className="row flex-nowrap" style={{ width: "100%" }}>
          <Sidebar userPage="editprofile" />
          <div className="col container" style={{ maxWidth: "80%" }}>
            <Details />
            <hr />
            <ToastContainer />
            <div
              className="container-lg container-xl p-3"
              style={{ backgroundColor: "#F0F0F0", height: "95%", overflow: "scroll", marginTop: "20px", overflowX: "hidden", marginLeft: "30px", borderRadius: "10px" }}
            >
              <div className="pr-1">
                <div className="card-body">
                  <div
                    className="container-lg bootstrap snippets bootdey justify-content-end"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <div className="text-center"></div>
                        <div
                          className="card p-2 mt-1"
                          style={{
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          }}
                        >
                          <div className="profile-pic">
                            {profilepic ? (
                              <img
                                src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${profilepic}`}
                                alt="Profile"
                              />
                            ) : (
                              <div className="default-pic">
                                <label htmlFor="profile-pic-upload">
                                  {personalInfo.gender === "Male" ? (
                                    <img
                                      src={displaypicture}
                                      alt="Add profile pic"
                                    />
                                  ) : (
                                    <img src={pick} alt="Add profile pic" />
                                  )}
                                </label>
                              </div>
                            )}
                            <input
                              type="file"
                              accept=""
                              onChange={handleProfilePicUpload}
                              id="profile-pic-upload"
                            />
                          </div>


                          <div className="profile-since">
                            <p className="text-muted mb-2 font-13">
                              <strong>Status :</strong>{" "}
                              <span className="ml-2">Active</span>
                            </p>
                          </div>
                          <div className="profile-since">
                            <p className="text-muted mb-2 font-13">
                              <strong> User Rating:</strong>
                              <span>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <span className="ms-2" key={num}>
                                    ★
                                  </span>
                                ))}
                              </span>
                            </p>
                          </div>
                          <div className="profile-since">
                            <p className="text-muted mb-2 font-13">
                              <strong> Member since: </strong>
                              <span className="ml-2">Jan 2012</span>
                            </p>
                          </div>
                        </div>
                        <div
                          className="profile-since"
                          style={{
                            width: "100%",
                            marginTop: "20px",
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          }}
                        >
                          <ObjSurveyBox />
                        </div>
                        <div></div>
                      </div>

                      <div className="col-lg-8 col-xl-8">
                        <div className="row">
                          <div className="card">
                            <div className="card-header ">
                              <div className="col-lg-12" >
                                <nav>
                                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active viewprofiletabs" id="nav-account-info-tab" data-bs-toggle="tab" data-bs-target="#accountinfo" type="button" role="tab" aria-controls="accountinfo" aria-selected="true">My Account</button>
                                    <button className="nav-link" id="nav-personnal-tab" data-bs-toggle="tab" data-bs-target="#personnal" type="button" role="tab" aria-controls="personnal" aria-selected="false">Personal</button>
                                    <button className="nav-link" id="nav-educational-tab" data-bs-toggle="tab" data-bs-target="#educational" type="button" role="tab" aria-controls="educational" aria-selected="false">Education</button>
                                    <button className="nav-link" id="nav-jobexperience-tab" data-bs-toggle="tab" data-bs-target="#jobexperience" type="button" role="tab" aria-controls="jobexperience" aria-selected="false">Job Experience</button>
                                  </div>
                                </nav>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="tab-content d-flex align-items-center">
                                <div id="accountinfo" className="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-account-info-tab">
                                  <h5 className="mb-4 mt-2 ml-2 text-uppercase d-flex justify-content-start"><i className="mr-1 mdi mdi-account"></i>
                                    Account Info</h5>
                                  <form
                                    className="form-horizontal"
                                    onSubmit={(e) => AccountInfo(e)}
                                  >
                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="staticEmail"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          Email:
                                        </label>
                                        <div className="col-lg-6">
                                          <input
                                            disabled
                                            type="text"
                                            className="form-control"
                                            value={details.email}
                                            id="staticEmail"
                                            placeholder="email@example.com"
                                          />
                                        </div>

                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="inputUsername"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          Username:
                                        </label>
                                        <div className="col-lg-6">
                                          <input
                                            value={details.name}
                                            onChange={(e) =>
                                              setDetails({
                                                ...details,
                                                name: e.target.value,
                                              })
                                            }
                                            className="form-control"
                                            type="text"
                                            placeholder="bootdey"
                                            id="Username"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="inputPassword"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          Mobile No:
                                        </label>
                                        <div className="col-lg-6">
                                          <input
                                            className="form-control"
                                            type="number"
                                            maxLength="10"
                                            placeholder="mobile no"
                                            value={details.mobilenumber}
                                            onChange={(e) => handlePhoneNumber(e)}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="inputPassword"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          Location:
                                        </label>

                                        <div className="col-lg-6">
                                          <Select
                                            onInputChange={handleCityChange}
                                            rules={{
                                              required: "This field is required",
                                            }}
                                            value={{
                                              value: details.location,
                                              label: details.location,
                                            }}
                                            options={city}
                                            placeholder="Select Location"
                                            onChange={(e) => {
                                              setDetails({
                                                ...details,
                                                location: e.value,
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="inputPassword"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          State:
                                        </label>

                                        <div className="col-lg-6">
                                          <input
                                            className="form-control"
                                            type="text"
                                            value={details.state}
                                            aria-describedby="basic-addon1"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="inputPassword"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          role:
                                        </label>
                                        <div className="col-lg-6">
                                          <input
                                            disabled
                                            value={details.role}
                                            className="form-control"
                                            type="text"
                                            placeholder="role"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      {iu ? (
                                        <Fragment>
                                          <div className="row justify-content-md-center">
                                            <label
                                              htmlFor="inputPassword"
                                              className="col-lg-3 col-form-label text-start"
                                            >
                                              Designation:
                                            </label>
                                            <div className="col-lg-6">
                                              <Select
                                                onInputChange={handleDesignationChange}
                                                rules={{
                                                  required: "This field is required",
                                                }}
                                                value={{
                                                  value: details.designation,
                                                  label: details.designation,
                                                }}
                                                options={designation}
                                                placeholder="Select Designation"
                                                onChange={(e) => {
                                                  setDetails({
                                                    ...details,
                                                    designation: e.value,
                                                  });
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </Fragment>
                                      ) : (
                                        <Fragment>
                                          <div className="row justify-content-md-center">
                                            <label
                                              htmlFor="inputPassword"
                                              className="col-lg-3 col-form-label text-start"
                                            >
                                              Title:
                                            </label>
                                            <div className="col-lg-6">
                                              <Select
                                                onInputChange={handleDesignationChange}
                                                rules={{
                                                  required: "This field is required",
                                                }}
                                                value={{
                                                  value: details.hrTitle,
                                                  label: details.hrTitle,
                                                }}
                                                options={hr}
                                                placeholder="Select Designation"
                                                onChange={(e) => {
                                                  setDetails({
                                                    ...details,
                                                    hrTitle: e.value,
                                                  });
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </Fragment>
                                      )}
                                    </div>


                                    <div class="form-group">
                                      <div class="row justify-content-md-center ">
                                        <label
                                          for="totalExp"
                                          class="col-lg-3 col-form-label text-start"
                                        >
                                          Total Exp:
                                        </label>
                                        <div
                                          class="col-lg-6"
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <div class="ui-select">
                                            <Select
                                              menuPlacement="top"
                                              value={{
                                                label: details.WorkExperienceYear,
                                                value: details.WorkExperienceYear,
                                              }}
                                              onChange={(e) =>
                                                setDetails({
                                                  ...details,
                                                  WorkExperienceYear: e.value,
                                                })
                                              }
                                              options={year}
                                              placeholder="Year"
                                            />
                                          </div>
                                          <span>
                                            <div
                                              class="ui-select"
                                              style={{ marginLeft: 20 }}
                                            >
                                              <Select
                                                styles={{ width: "90px" }}
                                                menuPlacement="top"
                                                value={{
                                                  label: details.WorkExperienceMonth,
                                                  value: details.WorkExperienceMonth,
                                                }}
                                                onChange={(e) =>
                                                  setDetails({
                                                    ...details,
                                                    WorkExperienceMonth: e.value,
                                                  })
                                                }
                                                options={month}
                                                placeholder="Month"
                                              />
                                            </div>
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <div className="row justify-content-md-center">
                                        <label
                                          htmlFor="inputPassword"
                                          className="col-lg-3 col-form-label text-start"
                                        >
                                          Industry:
                                        </label>
                                        <div className="col-lg-6">
                                          <Select
                                            rules={{
                                              required: "This field is required",
                                            }}
                                            value={{
                                              label: details.industry,
                                              value: details.industry,
                                            }}
                                            options={industry}
                                            placeholder="Select Industry"
                                            onChange={(e) => {
                                              setDetails({
                                                ...details,
                                                industry: e.value,
                                              });
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div>




                                      {details.resume ? (
                                        <div className="form-group mt-1">
                                          <div className="row justify-content-md-center align-items-center">
                                            <label htmlFor="formFileSm" className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}>
                                              Upload Resume:
                                            </label>
                                            <div className="col-lg-6" style={{ display: "flex" }}>
                                              <div className="input-group">
                                                <input
                                                  className="form-control"
                                                  id="formFileSm"
                                                  type="file"
                                                  accept=".pdf"
                                                  onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    if (file) {
                                                      // Check file type
                                                      if (file.type === "application/pdf") {
                                                        // Check file size (in bytes)
                                                        const maxSize = 5 * 1024 * 1024; // 5MB
                                                        if (file.size <= maxSize) {
                                                          setselectedFile(file);
                                                        } else {
                                                          alert("File size exceeds the 5MB limit. Please choose a smaller file.");
                                                          // Optionally, you can clear the input or handle the error in a different way
                                                        }
                                                      } else {
                                                        alert("Please select a valid PDF file.");
                                                        // Optionally, you can clear the input or handle the error in a different way
                                                      }
                                                    }
                                                  }}
                                                />
                                              </div>
                                              <div
                                                className="input-group-prepend"
                                                onClick={openModal}
                                                style={{
                                                  cursor: "pointer",
                                                  marginLeft: "5px",
                                                }}
                                              >
                                                <i className="fas fa-eye input-group-text"></i>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="form-group">
                                          <div className="row justify-content-md-center align-items-center">
                                            <label htmlFor="formFileSm" className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}>
                                              Upload Resume:
                                            </label>
                                            <div className="col-lg-6">
                                              <input
                                                className="form-control form-control-sm"
                                                id="formFileSm"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(event) => {
                                                  const file = event.target.files[0];
                                                  if (file) {
                                                    // Check file type
                                                    if (file.type === "application/pdf") {
                                                      // Check file size (in bytes)
                                                      const maxSize = 5 * 1024 * 1024; // 5MB
                                                      if (file.size <= maxSize) {
                                                        setselectedFile(file);
                                                      } else {
                                                        alert("File size exceeds the 5MB limit. Please choose a smaller file.");
                                                        // Optionally, you can clear the input or handle the error in a different way
                                                      }
                                                    } else {
                                                      alert("Please select a valid PDF file.");
                                                      // Optionally, you can clear the input or handle the error in a different way
                                                    }
                                                  }
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      )}







                                      <Modal
                                        isOpen={isModalOpen}
                                        onRequestClose={closeModal}
                                      >
                                        <div style={{ margin: "30px" }}>
                                          <button
                                            onClick={closeModal}
                                            style={{
                                              position: "absolute",
                                              top: "5px",
                                              right: "5px",
                                              heightL: "100%"
                                            }}
                                          >
                                            Close
                                          </button>
                                        </div>
                                        {details.resume && (
                                          <div>
                                            {details.resume.endsWith(".pdf") ? (
                                              <embed
                                                src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${details.resume}`}
                                                style={{
                                                  minHeight: "100vh",
                                                  width: "100%",
                                                }}
                                                type="application/pdf"
                                              />
                                            ) : (
                                              ""
                                            )}

                                            {details.resume.endsWith(".jpg") ||
                                              details.resume.endsWith(".png") ? (
                                              <img
                                                src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${details.resume}`}
                                                style={{
                                                  height: "400px",
                                                  width: "100%",
                                                }}
                                                alt="Post Image"
                                                className="img-fluid"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        )}
                                      </Modal>


                                    </div>
                                    <div>
                                      <p>Save your account info before proceeding</p>
                                      <button
                                        style={{
                                          backgroundColor: "rgb(3, 104, 104)",
                                          color: "whitesmoke",
                                        }}
                                        type="submit"
                                        className="btn "
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <div id="personnal" className="tab-pane fade" role="tabpanel" aria-labelledby="nav-personnal-tab">
                                  <h5 className="d-flex justify-content-start ml-2 mt-2 text-uppercase mb-4">
                                    <i className="bi bi-person-fill mr-1"></i>
                                    Personal Info
                                  </h5>

                                  <p>Here enter your adhar number for adhar verification:-</p>
                                  <form
                                    onSubmit={(e) => personalInfoSubmit(e)}
                                    class="form-horizontal"
                                  >
                                    <div>
                                      <div className="form-group">
                                        <div className="row justify-content-md-center align-items-center">
                                          <label
                                            htmlFor="adhaarnumber"
                                            className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                          >
                                            Adhaar Number:
                                          </label>
                                          <div className="col-lg-5">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter your Adhar Card Number"
                                              maxLength="12"
                                              onChange={(e) => {
                                                const input = e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                ); // Remove non-numeric characters
                                                if (input.length <= 12) {
                                                  setadharcardnumber(input);
                                                }
                                              }}
                                              name="adhaarnumber"
                                            />
                                          </div>
                                          <div className="col-lg-1">
                                            <button
                                              type="button"
                                              className={`btn btn-sm ${isDisabled
                                                ? "btn-secondary"
                                                : "btn-success"
                                                }`}
                                              onClick={isDisabled ? null : sendadharotp}
                                              disabled={isDisabled}
                                            >
                                              {isDisabled ? (
                                                <Fragment>
                                                  <span className="mr-2">
                                                    Resend OTP in {seconds}s
                                                    <img
                                                      src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif"
                                                      alt="Loading"
                                                      style={{ width: "20px" }}
                                                    />
                                                  </span>
                                                </Fragment>
                                              ) : (
                                                <span
                                                  className="text-center"
                                                  style={{
                                                    color: "white",
                                                    display: "block",
                                                  }}
                                                >
                                                  Send OTP
                                                </span>
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      {showotp ? (
                                        <div className="form-group">
                                          <div className="row justify-content-md-center align-items-center">
                                            <label
                                              htmlFor="adhaarnumber"
                                              className="col-lg-3 col-form-label text-start"
                                            >
                                              Adhaar Otp:
                                            </label>
                                            <div className="col-lg-5">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Adhar otp.."
                                                maxLength="6"
                                                onChange={(e) => {
                                                  const input = e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                  ); // Remove non-numeric characters
                                                  if (input.length <= 6) {
                                                    setadharotp(e.target.value);
                                                  }
                                                }}
                                              />
                                            </div>
                                            <div className="col-lg-1">
                                              <button type="button">
                                                <span
                                                  className="text-center"
                                                  style={{
                                                    color: "white",
                                                    display: "block",
                                                    fontSize: "15px",
                                                    height: "30px",
                                                    alignItems: "center",
                                                    color: "black",
                                                  }}
                                                  onClick={() => {
                                                    submitotp();
                                                  }}
                                                >
                                                  <p>Submit OTP</p>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}

                                      <div className="form-group">
                                        <div className="row justify-content-md-center align-items-center">




                                          <label
                                            htmlFor="pancardnumber"
                                            className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                          >
                                            Pan Number:
                                          </label>
                                          <div className="col-lg-5">
                                            <input
                                              name="pancardnumber"

                                              type="text"
                                              className="form-control"
                                              placeholder="Enter your Pan Card Number"
                                              value={pancardnumber}
                                              onChange={(e) => {
                                                setpancardnumber(
                                                  e.target.value
                                                    .toUpperCase()
                                                    .slice(0, 10)
                                                );
                                              }}
                                              maxLength={10} // Set the maximum length to 10 characters
                                            />
                                          </div>

                                          <div className="col-lg-1">
                                            <div className="mt-2">
                                              <button
                                                type="button"
                                                style={{
                                                  backgroundColor:
                                                    "rgb(3, 104, 104)",
                                                  color: "white",
                                                }}
                                                onClick={() => {
                                                  verifypancard();
                                                }}
                                              >
                                                Verify
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="fullName"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            Full name:
                                          </label>
                                          <div className="col-lg-6">
                                            <input
                                              required
                                              // onChange={handlePersonalInfoChanges}

                                              disabled={true}
                                              className="form-control"
                                              type="text"
                                              placeholder="Full name as per Govt Document"
                                              id="fullName"
                                              name="fullName"
                                              value={personalInfo.fullName}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="gender"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            Gender:
                                          </label>
                                          <div className="col-lg-6">
                                            <div className="row justify-content-md-center">
                                              <div className="col-md-4 form-check">
                                                <input
                                                  required
                                                  // onChange={handlePersonalInfoChanges}

                                                  disabled={true}
                                                  className="form-check-input"
                                                  type="radio"
                                                  name="gender"
                                                  id="flexCheckDefault"
                                                  value="Female"
                                                  checked={
                                                    personalInfo.gender === "Female"
                                                  }
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="flexCheckDefault"
                                                >
                                                  Female
                                                </label>
                                              </div>

                                              <div className="col-md-4 form-check">
                                                <input
                                                  // onChange={handlePersonalInfoChanges}

                                                  disabled={true}
                                                  className="form-check-input"
                                                  type="radio"
                                                  name="gender"
                                                  id="flexGenderFemale"
                                                  value="Male"
                                                  checked={
                                                    personalInfo.gender === "Male"
                                                  }
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="flexGenderFemale"
                                                >
                                                  Male
                                                </label>
                                              </div>
                                              <div className="col-md-4 form-check">
                                                <input
                                                  // onChange={handlePersonalInfoChanges}

                                                  disabled={true}
                                                  className="form-check-input"
                                                  type="radio"
                                                  name="gender"
                                                  id="flexGenderOther"
                                                  value="Other"
                                                  checked={
                                                    personalInfo.gender === "Other"
                                                  }
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="flexGenderOther"
                                                >
                                                  Other
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Add other fields similarly */}

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="DOB"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            DOB:
                                          </label>
                                          <div className="col-lg-6">
                                            <input
                                              required
                                              disabled={true}
                                              className="form-control"
                                              type="text"
                                              id="DOB"
                                              name="DOB"
                                              value={personalInfo.DOB} // Make sure personalInfo.DOB has the correct date format (e.g., 'yyyy-MM-dd')
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {!isDateValid && (
                                        <div className="invalid-feedback">
                                          Date exceeds maximum (2015-12-31).
                                        </div>
                                      )}

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="city"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            City:
                                          </label>
                                          <div className="col-lg-6">
                                            <Select
                                              id="city"
                                              name="city"
                                              // onInputChange={handleCityChange}
                                              value={{
                                                value: personalInfo.city,
                                                label: personalInfo.city,
                                              }}
                                              isDisabled={true}
                                            // options={options}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="State"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            State:
                                          </label>
                                          <div className="col-lg-6">
                                            <input
                                              className="form-control"
                                              type="text"
                                              id="State"
                                              name="State"
                                              value={personalInfo.State}
                                              disabled={true}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="pincode"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            Pincode:
                                          </label>
                                          <div className="col-lg-6">
                                            <input
                                              className="form-control"
                                              id="pincode"
                                              name="pincode"
                                              value={personalInfo.pincode}
                                              // onChange={handlePersonalInfoChanges}

                                              disabled={true}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="flatNum"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            Address:
                                          </label>
                                          <div className="col-lg-6">
                                            <input
                                              className="form-control"
                                              type="text"
                                              id="flatNum"
                                              name="flatNum"
                                              value={personalInfo.flatNum}
                                              // onChange={handlePersonalInfoChanges}
                                              placeholder="flat no/door no/house no/building/apt"
                                              disabled={true}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="maritalStatus"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            Marital Status:
                                          </label>
                                          <div className="col-lg-6">
                                            <div className="ui-select">
                                              <select
                                                required
                                                id="MartialStatus"
                                                className="form-control"
                                                name="MartialStatus"
                                                value={personalInfo.MartialStatus}
                                                onChange={handlePersonalInfoChanges}
                                              >
                                                <option>Select</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">
                                                  Divorced
                                                </option>
                                                <option value="Widow">Widow</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* <div className="form-group">
                                <div className="row justify-content-md-center">
                                  <label htmlFor="streetName" className="col-lg-3 col-form-label">
                                    Address 2:
                                  </label>
                                  <div className="col-lg-6">
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="streetName"
                                      name="streetName"
                                      value={personalInfo.streetName}
                                      onChange={handlePersonalInfoChanges}
                                      placeholder="street/colony/lane/road no"
                                    />
                                  </div>
                                </div>
                              </div> */}

                                      <div className="form-group">
                                        <div className="row justify-content-md-center">
                                          <label
                                            htmlFor="Description"
                                            className="col-lg-3 col-form-label text-start"
                                          >
                                            About Me:
                                          </label>
                                          <div className="col-lg-6">
                                            <textarea
                                              id="about"
                                              name="about"
                                              value={personalInfo.about}
                                              onChange={handlePersonalInfoChanges}
                                              className="form-control"
                                              rows="3"
                                            ></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <button
                                        style={{
                                          backgroundColor: "rgb(3, 104, 104)",
                                          color: "whitesmoke",
                                        }}
                                        type="submit"
                                        className="btn "
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </form>
                                  <hr />
                                  <div>
                                    <h5 className="d-flex justify-content-start ml-2 mt-2 text-uppercase mb-4">
                                      <i className="bi bi-globe2 mr-1"></i>
                                      Social Links
                                    </h5>

                                    <form
                                      onSubmit={() => socialLinked()}
                                      class="form-horizontal"
                                    >
                                      <div class="form-group">
                                        <div class="row justify-content-md-center">
                                          <label
                                            for="faceBook"
                                            class="col-lg-3 col-form-label text-start"
                                          >
                                            Facebook:
                                          </label>
                                          <div class="col-lg-6">
                                            <input
                                              onChange={(e) =>
                                                setSocialLinkDetails({
                                                  ...socialLinksDetail,
                                                  faceBookLink: e.target.value,
                                                })
                                              }
                                              value={socialLinksDetail.faceBookLink}
                                              class="form-control"
                                              type="url"
                                              id="faceBook"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="form-group">
                                        <div class="row justify-content-md-center">
                                          <label
                                            for="faceBook"
                                            class="col-lg-3 col-form-label text-start"
                                          >
                                            Twitter:
                                          </label>
                                          <div class="col-lg-6">
                                            <input
                                              onChange={(e) =>
                                                setSocialLinkDetails({
                                                  ...socialLinksDetail,
                                                  twitterLinks: e.target.value,
                                                })
                                              }
                                              value={socialLinksDetail.twitterLinks}
                                              class="form-control"
                                              type="url"
                                              id="Twitter"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="form-group">
                                        <div class="row justify-content-md-center">
                                          <label
                                            for="faceBook"
                                            class="col-lg-3 col-form-label text-start"
                                          >
                                            instagram:
                                          </label>
                                          <div class="col-lg-6">
                                            <input
                                              class="form-control"
                                              type="url"
                                              onChange={(e) =>
                                                setSocialLinkDetails({
                                                  ...socialLinksDetail,
                                                  instagramLink: e.target.value,
                                                })
                                              }
                                              value={socialLinksDetail.instagramLink}
                                              id="instagram"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="form-group">
                                        <div class="row justify-content-md-center">
                                          <label
                                            for="faceBook"
                                            class="col-lg-3 col-form-label text-start"
                                          >
                                            Linkedln:
                                          </label>
                                          <div class="col-lg-6">
                                            <input
                                              class="form-control"
                                              type="url"
                                              required
                                              onChange={(e) =>
                                                setSocialLinkDetails({
                                                  ...socialLinksDetail,
                                                  linkedInLink: e.target.value,
                                                })
                                              }
                                              value={socialLinksDetail.linkedInLink}
                                              id="Linkedln"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <div class="row justify-content-md-center">
                                          <label
                                            for="Linkedln"
                                            class="col-lg-3 col-form-label text-start"
                                          >
                                            GitHub:
                                          </label>
                                          <div class="col-lg-6">
                                            <input
                                              class="form-control"
                                              type="url"
                                              onChange={(e) =>
                                                setSocialLinkDetails({
                                                  ...socialLinksDetail,
                                                  gitHubLink: e.target.value,
                                                })
                                              }
                                              value={socialLinksDetail.gitHubLink}
                                              id=""
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div class="form-group">
                                        <div class="row justify-content-md-center">
                                          <label
                                            for="Linkedln"
                                            class="col-lg-3 col-form-label text-start"
                                          >
                                            others:
                                          </label>
                                          <div class="col-lg-6">
                                            <input
                                              class="form-control"
                                              type="url"
                                              onChange={(e) =>
                                                setSocialLinkDetails({
                                                  ...socialLinksDetail,
                                                  otherLinks: e.target.value,
                                                })
                                              }
                                              value={socialLinksDetail.otherLinks}
                                              id=""
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <button
                                          style={{
                                            backgroundColor: "rgb(3, 104, 104)",
                                            color: "whitesmoke",
                                          }}
                                          type="submit"
                                          className="btn "
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                                <div id="educational" className="tab-pane fade" role="tabpanel" aria-labelledby="nav-educational-tab">
                                  <h5 className="d-flex justify-content-start ml-2 mt-2 text-uppercase mb-4">
                                    <i class="bi bi-mortarboard-fill mr-1"></i>
                                    Educational Info
                                  </h5>
                                  <form
                                    onSubmit={(e) => handleEducationalSubmit(e)}
                                    className="form-horizontal"
                                  >
                                    {education.map((educationalInfo, index) => (
                                      <div key={index} className="educational">
                                        <div className="form-group">
                                          <div className="row justify-content-md-center align-items-center">
                                            <label
                                              htmlFor={`qualification${index}`}
                                              className="col-lg-3 text-start col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                            >
                                              Level of Education:
                                            </label>
                                            <div className="col-lg-6 ml-3">
                                              <select
                                                className="form-control"
                                                id={`qualification${index}`}
                                                name="qualification"
                                                value={educationalInfo.qualification}
                                                onChange={(e) =>
                                                  handleEducationalChange(e, index)
                                                }
                                              >
                                                <option value="">
                                                  Education Level
                                                </option>
                                                {
                                                  educationlevel.map((data) => {
                                                    return (

                                                      <option>{data}</option>
                                                    )
                                                  })
                                                }


                                              </select>
                                            </div>
                                          </div>
                                        </div>


                                        {console.log("education[index].qualification", education[index].qualification)}

                                        {education &&
                                          (education[index].qualification !== "High School Diploma or Equivalent" &&
                                            education[index].qualification !== "10th") &&
                                          <div className="form-group" style={{ border: "none" }}>
                                            <div className="row justify-content-md-center">
                                              <label htmlFor="Course" className="col-lg-3 col-form-label text-start">
                                                Course:
                                              </label>
                                              <div className="col-lg-6 ml-3">
                                                <Select
                                                  id="course"
                                                  name="course"
                                                  value={{
                                                    label: educationalInfo.course,
                                                    value: educationalInfo.course,
                                                  }}
                                                  onChange={(selectedOption) =>
                                                    handleCourseChange(selectedOption, index, "course")
                                                  }
                                                  options={course.map((data) => ({
                                                    value: data,
                                                    label: data,
                                                  }))}
                                                  placeholder="Select Course"
                                                  isSearchable
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        }

                                        {education && (education[index].qualification !== "High School Diploma or Equivalent" && education[index].qualification !== "10th") && <div className="form-group">
                                          <div className="row justify-content-md-center align-items-center">
                                            <label
                                              htmlFor="College"
                                              className="col-lg-3 text-start col-form-label"
                                            >
                                              Institute / University Name:
                                            </label>
                                            <div className="col-lg-6 ml-3">
                                              <Select
                                                id="college"
                                                name="college"
                                                value={{
                                                  label: educationalInfo.college,
                                                  value: educationalInfo.college,
                                                }}
                                                onChange={(selectedOption) =>
                                                  handleCollegeChange(
                                                    selectedOption,
                                                    index,
                                                    "college"
                                                  )
                                                }
                                                options={colleges.map((data) => ({
                                                  value: data.name,
                                                  label: data.name,
                                                }))}
                                                placeholder="Select College"
                                                isSearchable
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        }


                                        {education && (education[index].qualification !== "High School Diploma or Equivalent" && education[index].qualification !== "10th") && <div className="form-group">
                                          <div className="row justify-content-md-center align-items-center">
                                            <label
                                              htmlFor="courseType"
                                              className="col-lg-3 text-start col-form-label"
                                            >
                                              CourseType / Passing year:
                                            </label>
                                            <div className="col-lg-6 ml-3">
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <div className="ui-select">
                                                    <select
                                                      id="courseType"
                                                      name="courseType"
                                                      value={educationalInfo.courseType}
                                                      onChange={(e) =>
                                                        handleEducationalChange(
                                                          e,
                                                          index
                                                        )
                                                      }
                                                      className="form-control"
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
                                                    <select
                                                      id="passingYear"
                                                      name="passingYear"
                                                      value={
                                                        educationalInfo.passingYear
                                                      }
                                                      onChange={(e) =>
                                                        handlePassingYearChange(
                                                          e,
                                                          index
                                                        )
                                                      }
                                                      className="form-control"
                                                    >
                                                      <option value="Select passing Year">
                                                        Select Passing Year
                                                      </option>

                                                      {years.map((year) => (
                                                        <option key={year} value={year}>
                                                          {year}
                                                        </option>
                                                      ))}
                                                    </select>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        }
                                        <div className="form-group">
                                          <div className="row justify-content-md-center ">
                                            <div className="col-md-9">
                                              {education.length - 1 === index &&
                                                education.length < 20 && (
                                                  <button
                                                    type="button"
                                                    onClick={handleAddEducation}
                                                    className="btn btn btn-secondary"
                                                    style={{ marginRight: 10 }}
                                                  >
                                                    Add More
                                                  </button>
                                                )}
                                              {education.length !== 1 && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleRemoveEducation(index)
                                                  }
                                                  className="btn btn-secondary"
                                                >
                                                  Delete
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    <div>
                                      <button
                                        style={{
                                          backgroundColor: "rgb(3, 104, 104)",
                                          color: "whitesmoke",
                                        }}
                                        className="btn "
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <div id="jobexperience" className="tab-pane fade" role="tabpanel" aria-labelledby="nav-jobexperience-tab">
                                  <div class="container-lg container-xl">
                                    <h5 className="d-flex justify-content-start text-uppercase mb-4 ml-2 mt-2">
                                      <i class="bi bi-briefcase-fill mr-1"></i>
                                      Job Experience Info
                                    </h5>
                                    <div
                                      className="nav nav-tabs"
                                      id="nav-tab"
                                      role="tablist"
                                    >
                                      <button
                                        className="nav-link active"
                                        id="nav-exp-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-exp"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-exp"
                                        aria-selected="true"
                                        onClick={() =>
                                          setFresher({
                                            ...fresher,
                                            experienceLevel: "Fresher",
                                          })
                                        }
                                      >
                                        Experienced Info
                                      </button>
                                      <button
                                        className="nav-link ms-3"
                                        id="nav-notExp-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-notExp"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-notExp"
                                        aria-selected="true"
                                        onClick={() =>
                                          setFresher({
                                            ...fresher,
                                            experienceLevel: "Fresher",
                                          })
                                        }
                                      >
                                        Not Experienced
                                      </button>
                                    </div>
                                    <div className="tab-content" id="nav-tabContent">
                                      <div
                                        className="tab-pane fade show active"
                                        id="nav-exp"
                                        role="tabpanel"
                                        aria-labelledby="nav-exp-tab"
                                      >
                                        <form
                                          onSubmit={(e) => jobexperience(e)}
                                          className="form-horizontal mt-3"
                                        >
                                          {experiences.map((experience, index) => (
                                            <div key={index}>
                                              <div
                                                className="experience card m-2 pt-4 pb-2"
                                                style={{
                                                  boxShadow:
                                                    "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                                }}
                                              >
                                                <div className="form-group">
                                                  <div className="row justify-content-md-center">
                                                    <label
                                                      htmlFor="Company"
                                                      className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                                    >
                                                      Company Name:
                                                    </label>
                                                    <div className="col-lg-6 ml-4">
                                                      <input
                                                        required
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            index,
                                                            "companyName",
                                                            e.target.value
                                                          )
                                                        }
                                                        value={experience.companyName}
                                                        className="form-control"
                                                        type="text"
                                                        id="Company"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <div className="row justify-content-md-center align-items-center">
                                                    <label
                                                      htmlFor="currentDesignation"
                                                      className="col-lg-3 col-form-label" style={{ whiteSpace: "nowrap" }}
                                                    >
                                                      {index === 0
                                                        ? " Current Designation:"
                                                        : "Designation"}
                                                    </label>
                                                    <div className=" col-lg-6 ml-4">
                                                      <Select
                                                        options={designation}
                                                        onInputChange={
                                                          handleDesignationChange
                                                        }
                                                        value={{
                                                          label: experience.designation,
                                                          value: experience.designation,
                                                        }}
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            index,
                                                            "designation",
                                                            e.value
                                                          )
                                                        }
                                                        rules={{
                                                          required:
                                                            "This field is required",
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="form-group">
                                                  <div className="row justify-content-md-center">
                                                    <label
                                                      htmlFor="Location"
                                                      className="col-lg-3 col-form-label text-start"
                                                    >
                                                      Location:
                                                    </label>
                                                    <div className=" col-lg-6 ml-4">
                                                      <Select
                                                        onInputChange={handleCityChange}
                                                        rules={{
                                                          required:
                                                            "This field is required",
                                                        }}
                                                        value={{
                                                          label:
                                                            experience.locationOfCompany,
                                                          value:
                                                            experience.locationOfCompany,
                                                        }}
                                                        options={city}
                                                        placeholder="Select Location"
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            index,
                                                            "locationOfCompany",
                                                            e.value
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <div className="row justify-content-md-center">
                                                    <label
                                                      htmlFor="Experience"
                                                      className="col-lg-3 col-form-label text-start"
                                                    >
                                                      Experience:
                                                    </label>
                                                    <div className=" col-lg-6 ml-4">
                                                      <div className="row">
                                                        <div className=" col-md-6">
                                                          <input
                                                            className="form-control"
                                                            type="date"
                                                            value={
                                                              experience.experienceStart
                                                            }
                                                            onChange={(e) =>
                                                              handleInputChange(
                                                                index,
                                                                "experienceStart",
                                                                e.target.value
                                                              )
                                                            }
                                                            placeholder="Starting Date"
                                                          />
                                                        </div>
                                                        <div className=" col-md-6">
                                                          <input
                                                            className="form-control"
                                                            type="date"
                                                            value={
                                                              experience.experienceEnd
                                                            }
                                                            onChange={(e) =>
                                                              handleInputChange(
                                                                index,
                                                                "experienceEnd",
                                                                e.target.value
                                                              )
                                                            }
                                                            placeholder="Ending Date"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div class="mb-3 row flex-column align-items-center">
                                                  <label
                                                    for="inputSalary"
                                                    className="col-sm-3 col-form-label text-start text-dark align-self-start ml-5" styles={{ marginLeft: "200px" }}
                                                  >
                                                    Salary:
                                                  </label>
                                                  <div className="col-sm-9">
                                                    <div
                                                      className="d-flex flex-row"
                                                      style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        flexWrap: "wrap",
                                                        margin: "20px 20px 0 20px"
                                                      }}
                                                    >
                                                      <Range
                                                        values={values} // Make sure values is defined and passed as a prop
                                                        step={1}
                                                        max={100} // Updated max value to 100

                                                        onChange={(newValues) => {
                                                          // Assuming you are using an array of values
                                                          handleOnChange(index, "annualSalaryInLakhs", newValues);
                                                        }}

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
                                                                  values: [experiences[index].annualSalaryInLakhs], // Use the correct variable here
                                                                  colors: ["#ccc", "#548BF4", "#ccc"],
                                                                  min: 0,
                                                                  max: 100 // Updated max value to 100
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


                                                      {experiences[index].annualSalaryInLakhs} LPA

                                                    </div>

                                                  </div>
                                                </div>




                                                <div className="form-group">
                                                  <div className="row justify-content-md-center">
                                                    <label
                                                      htmlFor="Industry"
                                                      className="col-lg-3 col-form-label text-start"
                                                    >
                                                      Industry:
                                                    </label>
                                                    <div className=" col-lg-6 ml-4">
                                                      <Select
                                                        options={industry}
                                                        isSearchable={true}
                                                        required
                                                        value={{
                                                          label: experience.industry,
                                                          value: experience.industry,
                                                        }}
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            index,
                                                            "industry",
                                                            e.value
                                                          )
                                                        }
                                                        placeholder="Select Current Industry"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <div className="row justify-content-md-center ">
                                                    <label
                                                      htmlFor="functionalArea"
                                                      className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                                    >
                                                      Functional area:
                                                    </label>
                                                    <div className=" col-lg-6 ml-4">
                                                      <Select
                                                        // options={functionalArea}
                                                        isSearchable={true}
                                                        required
                                                        options={functionalArea}
                                                        value={{
                                                          label:
                                                            experience.functionalArea,
                                                          value:
                                                            experience.functionalArea,
                                                        }}
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            index,
                                                            "functionalArea",
                                                            e.value
                                                          )
                                                        }
                                                        placeholder="Select Current Industry"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <div className="row justify-content-md-center">
                                                    <label
                                                      htmlFor="Skills"
                                                      className="col-lg-3 col-form-label text-start"
                                                    >
                                                      Skills:
                                                    </label>
                                                    <div className="col-lg-6 ml-4" style={{ height: "200px", overflowY: "auto", }}>
                                                      <Select
                                                        onInputChange={
                                                          handleSkillsEachChange
                                                        }
                                                        options={skills}
                                                        isSearchable={true}
                                                        defaultValue={experience.skills}
                                                        isMulti
                                                        placeholder="Select skills"
                                                        value={experience.skills}
                                                        onChange={(selectedOptions) =>
                                                          handleSkillsChange(
                                                            index,
                                                            selectedOptions
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="form-group">
                                                  <div className="row justify-content-md-center">
                                                    <label
                                                      htmlFor="Description"
                                                      className="col-lg-3 col-form-label text-start"
                                                    >
                                                      Description:
                                                    </label>
                                                    <div className="col-lg-6 ml-4">
                                                      <textarea
                                                        value={experience.description}
                                                        onChange={(e) =>
                                                          handleInputChange(
                                                            index,
                                                            "description",
                                                            e.target.value
                                                          )
                                                        }
                                                        className="form-control"
                                                        id="exampleFormControlTextarea1"
                                                        rows="3"
                                                      ></textarea>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="form-group">
                                                  <div className="row justify-content-md-center ">
                                                    <div className="col-md-9">
                                                      {experiences.length ===
                                                        index + 1 && (
                                                          <button
                                                            type="button"
                                                            onClick={handleAddMore}
                                                            className="btn btn btn-secondary"
                                                            style={{ marginRight: 10 }}
                                                          >
                                                            Add More
                                                          </button>
                                                        )}

                                                      {index > 0 && (
                                                        <Fragment>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              removeExperience(index)
                                                            }
                                                            className="btn btn-secondary"
                                                          >
                                                            Delete
                                                          </button>
                                                        </Fragment>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                          <div>
                                            <button
                                              style={{
                                                backgroundColor: "rgb(3, 104, 104)",
                                                color: "whitesmoke",
                                              }}
                                              className="btn  "
                                              type="submit"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                      <div
                                        className="tab-pane fade show"
                                        id="nav-notExp"
                                        role="tabpanel"
                                        aria-labelledby="nav-notExp-tab"
                                      >
                                        <form
                                          className="form-horizontal mt-3 p-2 pb-2 card "
                                          style={{
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                                          }}
                                        >
                                          <div className="experience pt-3">
                                            <div className="form-group">
                                              <div className="row justify-content-md-center align-items-center">
                                                <label
                                                  htmlFor="currentDesignation"
                                                  className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                                >
                                                  Expected Designation:
                                                </label>
                                                <div className=" col-lg-6 ml-5">
                                                  <input
                                                    value={fresher.designation}
                                                    onChange={(e) =>
                                                      setFresher({
                                                        ...fresher,
                                                        designation: e.target.value,
                                                      })
                                                    }
                                                    className="form-control"
                                                    type="text"
                                                    id="currentDesignation"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="form-group">
                                              <div className="row justify-content-md-center align-items-center">
                                                <label
                                                  htmlFor="anualSalary"
                                                  className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                                >
                                                  Expected Annual <br /> Salary:
                                                </label>
                                                <div className="col-lg-6 ml-5">
                                                  <div className="row">
                                                    <div className="col-md-3">
                                                      <div className="ui-select">
                                                        <select
                                                          id="maritalstatus"
                                                          className="form-control"
                                                          value={fresher.salarySymbol}
                                                          onChange={(e) =>
                                                            setFresher({
                                                              ...fresher,
                                                              salarySymbol:
                                                                e.target.value,
                                                            })
                                                          }
                                                        >
                                                          <option value="Rupee">
                                                            &#8377;
                                                          </option>
                                                          <option value="Dollar">
                                                            &#36;
                                                          </option>
                                                          <option value="Euro">
                                                            &#8364;
                                                          </option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                      <div className="ui-select">
                                                        <select
                                                          id="lakhs"
                                                          className="form-control"
                                                          value={
                                                            fresher.annualSalaryInLakhs
                                                          }
                                                          onChange={(e) =>
                                                            setFresher({
                                                              ...fresher,
                                                              annualSalaryInLakhs:
                                                                e.target.value,
                                                            })
                                                          }
                                                        >
                                                          <option value="lakhs">
                                                            Lakhs
                                                          </option>
                                                          <option value="1+">1+</option>
                                                          <option value="2+">2+</option>
                                                          <option value="3+">3+</option>
                                                          <option value="4+">4+</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                      <div className="ui-select">
                                                        <select
                                                          value={
                                                            fresher.annualSalaryInThousands
                                                          }
                                                          onChange={(e) =>
                                                            setFresher({
                                                              ...fresher,
                                                              annualSalaryInThousands:
                                                                e.target.value,
                                                            })
                                                          }
                                                          id="maritalstatus"
                                                          className="form-control"
                                                        >
                                                          <option value="Thousands">
                                                            Thousands
                                                          </option>
                                                          <option value="1+">1+</option>
                                                          <option value="2+">2+</option>
                                                          <option value="3+">3+</option>
                                                          <option value="4+">4+</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row justify-content-md-center">
                                                <label
                                                  htmlFor="Industry"
                                                  className="col-lg-3 col-form-label text-start"
                                                >
                                                  Industry:
                                                </label>
                                                <div className=" col-lg-6 ml-5">
                                                  <Select
                                                    options={industry}
                                                    isSearchable={true}
                                                    required
                                                    value={fresher.industry}
                                                    onChange={(e) =>
                                                      setFresher({
                                                        ...fresher,
                                                        industry: e,
                                                      })
                                                    }
                                                    placeholder="Select Current Industry"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row justify-content-md-center">
                                                <label
                                                  htmlFor="functionalArea"
                                                  className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                                >
                                                  Functional area:
                                                </label>
                                                <div className=" col-lg-6 ml-5">
                                                  <Select
                                                    // options={functionalArea}
                                                    isSearchable={true}
                                                    required
                                                    options={functionalArea}
                                                    value={fresher.functionalArea}
                                                    onChange={(e) =>
                                                      setFresher({
                                                        ...fresher,
                                                        functionalArea: e,
                                                      })
                                                    }
                                                    placeholder="Select Current Industry"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row justify-content-md-center">
                                                <label
                                                  htmlFor="Skills"
                                                  className="col-lg-3 col-form-label text-start"
                                                >
                                                  Skills:
                                                </label>
                                                <div className="col-lg-6 ml-5">
                                                  <Select
                                                    onInputChange={
                                                      handleSkillsEachChange
                                                    }
                                                    options={skills}
                                                    isSearchable={true}
                                                    isMulti
                                                    placeholder="Select skills"
                                                    value={fresher.skills}
                                                    onChange={(e) =>
                                                      setFresher({
                                                        ...fresher,
                                                        skills: e,
                                                      })
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="form-group">
                                              <div className="row justify-content-md-center">
                                                <label
                                                  htmlFor="Location"
                                                  className="col-lg-3 col-form-label text-start"
                                                >
                                                  Location:
                                                </label>
                                                <div className=" col-lg-6 ml-5">
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    id="Location"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row justify-content-md-center">
                                                <label
                                                  htmlFor="Description"
                                                  className="col-lg-3 col-form-label text-start"
                                                >
                                                  Description:
                                                </label>
                                                <div className="col-lg-6 ml-5">
                                                  <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                  ></textarea>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="row justify-content-md-center ">
                                                <div className="col-md-9">
                                                  <button
                                                    type="button"
                                                    onClick={handleExperienceAdd}
                                                    className="btn btn btn-secondary"
                                                    style={{ marginRight: 10 }}
                                                  >
                                                    Add More
                                                  </button>

                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                  >
                                                    Delete
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                        <button
                                          className="btn mt-2"
                                          style={{
                                            backgroundColor: "rgb(3, 104, 104)",
                                            color: "whitesmoke",
                                          }}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            // console.log(fresher)
                                          }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
              <div style={{backgroundColor:"white", borderRadius: "10px"}} className="p-4 mt-3 d-flex flex-column">
                <div className="pr-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                  <h5 className="d-flex justify-content-start text-uppercase">
                  <i class="bi bi-briefcase-fill mr-1"></i>
                    Project Info (if any)
                  </h5>
                  <i
                    className="f-13"
                    style={{ width: "30px", borderRadius: "50" }}
                    onClick={handleToggle}
                  >
                    <i
                      style={{
                        color: "rgb(3, 104, 104)",
                        marginLeft: "10px",
                        fontSize: "1.5rem",
                      }}
                      className={`fa ${isOpen
                        ? "bi bi-dash-circle-fill"
                        : "bi bi-plus-circle-fill"
                        }`}
                    ></i>
                  </i>
                
                    </div>
                    <div className="d-flex">
                  <h5 className="d-flex justify-content-start text-uppercase">
                  <i class="bi bi-trophy-fill mr-1" ></i>
                    Certification (if any)
                  </h5>
                  <i
                    className="f-13"
                    style={{ width: "30px", borderRadius: "50" }}
                    onClick={handleCertificateToggle}
                  >
                    <i
                      style={{
                        color: "rgb(3, 104, 104)",
                        marginLeft: "10px",
                        fontSize: "1.5rem",
                      }}
                      className={`fa ${certopen
                        ? "bi bi-dash-circle-fill"
                        : "bi bi-plus-circle-fill"
                        }`}
                    ></i>
                  </i>
                    </div>
                    <div className="d-flex">
                  <h5 className="d-flex justify-content-start text-uppercase">
                  <i class="bi bi-list-task mr-1"></i>
                    Other
                  </h5>
                  <i
                    className="f-13"
                    style={{ width: "30px", borderRadius: "50" }}
                    onClick={handleOtherToggle}
                  >
                    <i
                      style={{
                        color: "rgb(3, 104, 104)",
                        marginLeft: "10px",
                        fontSize: "1.5rem",
                      }}
                      className={`fa ${otheropen
                        ? "bi bi-dash-circle-fill"
                        : "bi bi-plus-circle-fill"
                        }`}
                    ></i>
                  </i>
                    </div>
                
                </div>
                <hr style={{width:"100%", borderBottom:"1px solid gray"}}/>
                <div className="d-flex flex-column">
                  {isOpen && (
                    <div className="m-auto mt-2 pt-2">
                    <div id="project">
                      {projects.map((project, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="form-group">
                              <div className="row justify-content-md-center">
                                <label
                                  htmlFor={`projectName${index}`}
                                  className="col-lg-3 col-form-label mt-2 text-start"
                                >
                                  Project:
                                </label>
                                <div className="col-lg-6">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <input
                                        className="form-control mt-2"
                                        type="text"
                                        id={`projectName${index}`}
                                        placeholder="Client Name"
                                        value={project.project}
                                        onChange={(e) =>
                                          updateProjectName(
                                            e.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <input
                                        className="form-control mt-2"
                                        type="text"
                                        id={`projectYear${index}`}
                                        placeholder="Year"
                                        value={project.year}
                                        onChange={(e) =>
                                          updateProjectYear(
                                            e.target.value,
                                            index
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row justify-content-md-center">
                                <label
                                  htmlFor={`clientName${index}`}
                                  className="col-lg-3 col-form-label text-start"
                                >
                                  Client:
                                </label>
                                <div className="col-lg-6">
                                  <input
                                    className="form-control"
                                    type="text"
                                    id={`clientName${index}`}
                                    value={project.client}
                                    onChange={(e) =>
                                      updateClientName(
                                        e.target.value,
                                        index
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row justify-content-md-center align-items-center">
                                <label
                                  htmlFor={`description${index}`}
                                  className="col-lg-3 col-form-label text-start"
                                >
                                  Description:
                                </label>
                                <div className="col-lg-6">
                                  <textarea
                                    className="form-control"
                                    id={`description${index}`}
                                    rows="3"
                                    value={project.description}
                                    onChange={(e) =>
                                      updateDescription(
                                        e.target.value,
                                        index
                                      )
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row justify-content-md-center ">
                                <div className="col-md-9">
                                  {projects.length === index + 1 && (
                                    <button
                                      onClick={addProject}
                                      type="button"
                                      className="btn btn-secondary"
                                      style={{ marginRight: 10 }}
                                    >
                                      Add More
                                    </button>
                                  )}
                                  {index !== 0 && (
                                    <button
                                      onClick={() => deleteProject(index)}
                                      type="button"
                                      className="btn btn-secondary"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                      <div className="col-lg-12 d-flex justify-content-center">
                        <button
                          style={{
                            backgroundColor: "rgb(3, 104, 104)",
                            color: "whitesmoke",
                          }}
                          className="btn mt-2"
                          onClick={() => projectInfo()}
                        >
                          Save
                        </button>
                      </div>
                      <hr />
                    </div>
                    </div>
                  )}
                  {certopen && (
                    <div className="m-auto mt-2 pt-2">
                                    <div id="project">
                                      <form className="form-horizontal mt-2">
                                        <Fragment>
                                          {certificate.map((cert, index) => (
                                            <Fragment>
                                              <div className="form-group">
                                                <div className="row justify-content-md-center align-items-center">
                                                  <label
                                                    htmlFor="nameOfCertification"
                                                    className="col-lg-3 col-form-label text-start" style={{ whiteSpace: "nowrap" }}
                                                  >
                                                    Name of Certification:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <input
                                                      className="form-control"
                                                      type="text"
                                                      id="nameOfCertification"
                                                      name="nameOfCertification"
                                                      value={cert.nameOfCertification}
                                                      onChange={(event) =>
                                                        handleChange(event, index)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row justify-content-md-center">
                                                  <label
                                                    htmlFor="nameOfInstitute"
                                                    className="col-lg-3 col-form-label text-start"
                                                  >
                                                    Name of Institute:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <input
                                                      className="form-control"
                                                      type="text"
                                                      id="nameOfInstitute"
                                                      name="nameOfInstitute"
                                                      value={cert.nameOfInstitute}
                                                      onChange={(event) =>
                                                        handleChange(event, index)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row justify-content-md-center">
                                                  <label
                                                    htmlFor="from"
                                                    className="col-lg-3 col-form-label mt-2 text-start"
                                                  >
                                                    Date:
                                                  </label>
                                                  <div className=" col-lg-6">
                                                    <div className="row">
                                                      <div className="col-md-6">
                                                        <lable>From</lable>
                                                        <input
                                                          className="form-control mt-2"
                                                          type="month"
                                                          id="from"
                                                          name="from"
                                                          value={cert.from}
                                                          onChange={(event) =>
                                                            handleChange(event, index)
                                                          }
                                                        />
                                                      </div>
                                                      <div className="col-md-6">
                                                        <lable>To</lable>
                                                        <input
                                                          className="form-control mt-2"
                                                          type="month"
                                                          id="to"
                                                          disabled={cert.lifeTime}
                                                          name="to"
                                                          value={
                                                            !cert.lifeTime ? cert.to : ""
                                                          }
                                                          onChange={(event) =>
                                                            handleChange(event, index)
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                      <input
                                                        type="checkbox"
                                                        name="lifeTime"
                                                        checked={cert.lifeTime}
                                                        onChange={(event) =>
                                                          handleChange(event, index)
                                                        }
                                                      />{" "}
                                                      lifetime
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row justify-content-md-center">
                                                  <label
                                                    htmlFor="description"
                                                    className="col-lg-3 col-form-label"
                                                  >
                                                    Description:
                                                  </label>
                                                  <div className="col-lg-6">
                                                    <textarea
                                                      className="form-control"
                                                      id="description"
                                                      name="description"
                                                      rows="3"
                                                      value={cert.description}
                                                      onChange={(event) =>
                                                        handleChange(event, index)
                                                      }
                                                    ></textarea>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <div className="row justify-content-md-center ">
                                                  <div className="col-md-9">
                                                    {index !== 0 && (
                                                      <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() =>
                                                          deleteCertificate(index)
                                                        }
                                                      >
                                                        Delete
                                                      </button>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </Fragment>
                                          ))}
                                        </Fragment>
                                        <div className="form-group">
                                          <div className="row justify-content-md-center ">
                                            <div className="col-md-9">
                                              <button
                                                type="button"
                                                className="btn btn btn-secondary"
                                                style={{ marginRight: 10 }}
                                                onClick={addCertificate}
                                              >
                                                Add More
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </form>
                                      <button
                                        style={{
                                          backgroundColor: "rgb(3, 104, 104)",
                                          color: "whitesmoke",
                                        }}
                                        className="btn "
                                        onClick={() => certificationInfo()}
                                      >
                                        Save
                                      </button>
                                    </div>
                                    </div>
                                  )}
                  {otheropen && (
                    <div className="m-auto mt-2 pt-2">
                  <div id="project">
                    <form className="form-horizontal mt-2">
                      {others.map((other, index) => (
                        <Fragment>
                          <div className="form-group">
                            <div className="row justify-content-md-center">
                              <label
                                htmlFor="name"
                                className="col-lg-3 col-form-label text-start"
                              >
                                Name of Document:
                              </label>
                              <div className=" col-lg-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={other.name}
                                  onChange={(event) =>
                                    handleOtherChange(event, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className="form-group"
                            onChange={takeDescriptions}
                          >
                            <div className="row justify-content-md-center align-items-center">
                              <label
                                htmlFor="description"
                                className="col-lg-3 col-form-label text-start"
                              >
                                Description:
                              </label>
                              <div className="col-lg-6">
                                <textarea
                                  className="form-control"
                                  id="description"
                                  name="description"
                                  rows="3"
                                  value={other.description}
                                  onChange={(event) =>
                                    handleOtherChange(event, index)
                                  }
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row justify-content-md-center ">
                              <div className="col-md-9">
                                {others.length === index + 1 && (
                                  <button
                                    type="button"
                                    className="btn btn btn-secondary"
                                    style={{ marginRight: 10 }}
                                    onClick={addOther}
                                  >
                                    Add More
                                  </button>
                                )}

                                {index !== 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => deleteOther(index)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      ))}

                      <div className="col-lg-12 d-flex justify-content-center">
                        <button
                          style={{
                            backgroundColor: "rgb(3, 104, 104)",
                            color: "whitesmoke",
                          }}
                          type="submit"
                          className="btn"
                          onClick={(e) => otherInfo(e)}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    <div className="row"></div>
                  </div>
                  </div>
                )}
                </div>
                </div>
                

                

                

                

                
              </div>
            </div>

          </div>
        </div>
      )}
      <div className="scroll-to-top" onClick={scrollToTop}>
        <AiOutlineArrowUp /> {/* Replace with your icon */}
      </div>
      <Messagebox handleclickdiv={handleclickdiv} />
    </div>
  );
}

export default Editprofile;
