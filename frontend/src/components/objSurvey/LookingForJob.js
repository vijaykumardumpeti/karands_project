import React, { useState, useEffect } from "react";
import axios from "axios";

import Select from "react-select";
import { useForm } from "react-hook-form";



export default function LookingForJob({handleCityChange,handleDesignationChange,handleFunctionalAreaChange,handleInputChange, previous, next,AllCities,AllIndustry,AllFunctionalArea,AllSkills,AllDesignation }) {
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();


  const validateDesignation = () => {
   
    return (selectedDesignation && selectedDesignation.length >= 1) || "Please select at least one options";
  };
  const validateFunctionalArea = () => {
    return (selectedFunctionalArea && selectedFunctionalArea.length >= 1) || "Please select at least one options";
  };
  const validateSkills = () => {
    return (selectedSkills && selectedSkills.length >= 5) || "Please select at least Five options";
  };
  const validateIndustry = () => {
    return (selectedIndustry && selectedIndustry.length >= 1) || "Please select at least one options";
  };
 
  const handleSelect = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedLocation(selected);
  };
  const handleSelectDesignation = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedDesignation(selected);
  };
   const handleSelectFunctionalArea = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedFunctionalArea(selected);
  };
  const handleSelectSkills = (selected) => {
    console.log(selected);
    if (selected && selected.length > 5) {
      selected = selected.slice(0, 5); // Limit the selection to the first 3 options
    }

    setSelectedSkills(selected);
  };
  const handleSelectIndustry = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedIndustry(selected);
  };

  const [selectedLocation, setSelectedLocation] = useState([]);
   const [selectedDesignation,setSelectedDesignation]=useState([])
   const [selectedFunctionalArea,setSelectedFunctionalArea]=useState([])
   const [selectedIndustry,setSelectedIndustry]=useState([])
   const [selectedSkills,setSelectedSkills]=useState([])





  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/reason/${localStorage.getItem("email")}`
      )
      .then((res) => {
        console.log(res.data.details);
        let someDetails = res.data.details;
        if (someDetails != null && someDetails.surveyType==='Looking for job') {
          setDetails({
            location: someDetails.location,
            experienceLevel: someDetails.experienceLevel,
            about: someDetails.about,
            jobType: someDetails.jobType,
            surveyType: "Looking for Job",
          });
        }
        setSelectedLocation(someDetails.preferedLocation)
        setSelectedDesignation(someDetails.designation)
        setSelectedFunctionalArea(someDetails.functionalArea)
        setSelectedIndustry(someDetails.industry)
        setSelectedSkills(someDetails.skills)
      })
      .catch((err) => {
        console.log(err);
      });
     
  }, []);
  // const location = useLocation()
  // let [state, setState] = useState(location.state || null);
  const [details, setDetails] = useState({
    location: "",
    preferedLocation: "",
    functionalArea: "",
    designation: "",
    skills: "",
    experienceLevel: "",
    about: "",
    industry: "",
    jobType: "",
    surveyType: "Looking for Job",
    email: localStorage.getItem("email"),
  });

  
  function connectionCheck() {
    // console.log(details);
    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/reason/job`,

        {
          location: details.location,
          preferedLocation: selectedLocation,
          functionalArea: selectedFunctionalArea,
          designation: selectedDesignation,
          skills:selectedSkills,
          experienceLevel: details.experienceLevel,
          about: details.about,
          industry: selectedIndustry,
          jobType: details.jobType,
          id:localStorage.getItem('id'),
          email: localStorage.getItem("email"),
          surveyType: "Looking for Job",
        }
      )
      .then((res) => {
        console.log(res);
        next();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }

  const customStyles = {
    control: (provided, state) => ({
        ...provided,
        marginTop: '30px',
        fontSize: state.selectProps.menuIsOpen ? '15px' : '12px', // Adjust the font size values to your preference
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
    option:(provided,state)=>({
        ...provided,
        backgroundColor:state.isSelected?'#17a2b8':"white"
    })
};







  return (
    <div 
    className="objectSurveyPageContainerToHold"
   style={{width:"100%"}}
    >
  <form
  className="objectSurveyPageForm"
  onSubmit={handleSubmit(connectionCheck)}>

    
  <p 
  style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}
  className=" p-2">
            {" "}
            <b>Looking for Job</b>
          </p>
          <Select
          styles={customStyles}
         
          onInputChange={handleCityChange}
           rules={{ required: 'This field is required' }}
            value={details.location}
            options={AllCities} placeholder="Select Location"
            onChange={(e) => {
              setDetails({ ...details, location: e });
            }}
          />
        <span className="errorsInreg">{errors.location&& errors.location.message}</span>
  <Select
  styles={customStyles}
            options={AllCities}
            isSearchable={true}
            onInputChange={handleCityChange}

            isMulti
            placeholder="Select Preferred Location"
            value={selectedLocation}
            onChange={handleSelect}
          />
 <Select
 styles={customStyles}
         {...register('designation', { validate: validateDesignation })}
              options={AllDesignation}
              isSearchable={true}
              isMulti
              placeholder="Select Designation"
              value={selectedDesignation}
              onChange={handleSelectDesignation}
          onInputChange={handleDesignationChange}

              defaultValue={selectedDesignation}
            />
        <span className="errorsInreg">{errors.designation&& errors.designation.message}</span>
 <Select
 styles={customStyles}
              options={AllFunctionalArea}
         {...register('functionalArea', { validate: validateFunctionalArea })}
              onInputChange={handleFunctionalAreaChange}
              isSearchable={true}
              isMulti
              placeholder="Select Functional Area"
              value={selectedFunctionalArea}
              onChange={handleSelectFunctionalArea}
            />
        <span className="errorsInreg">{errors.functionalArea&& errors.functionalArea.message}</span>
 <Select
 styles={customStyles}
              options={AllIndustry}
              isSearchable={true}
              defaultValue={selectedIndustry}
         {...register('industry', { validate: validateIndustry })}
         

              isMulti
              placeholder="Select Industry"
              value={selectedIndustry}
              onChange={handleSelectIndustry}
            />
        <span className="errorsInreg">{errors.industry&& errors.industry.message}</span>
 <Select
 styles={customStyles}
              options={AllSkills}
              isSearchable={true}
          onInputChange={handleInputChange}

              isMulti
              placeholder="Select skills"
              value={selectedSkills}
         {...register('skills', { validate: validateSkills })}

              onChange={handleSelectSkills}
            />
          <span className="errorsInreg">{errors.skills&& errors.skills.message}</span>
          <h6 style={{
            marginTop:"20px"
          }}>Experience Level</h6>
 <div
            className=" mt-2"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div className="relation">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Freshers"
                  value="Freshers"
                  checked={details.experienceLevel === "Freshers"}
                  onChange={(e) => {
                    setDetails({ ...details, experienceLevel: e.target.value });
                  }}
                />
                <label for="Freshers">Freshers</label>
              </div>
              {console.log("------------")}
              {console.log(AllCities)}
              <div className="relation">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Experience"
                  value="Experience"
                  checked={details.experienceLevel === "Experience"}
                  onChange={(e) => {
                    setDetails({ ...details, experienceLevel: e.target.value });
                  }}
                />
                <label for="Experience">Experience</label>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop:"10px"
            }}
          >
            <textarea
              value={details.about}
             {
              ...register("about",{
                required:"Please fill about yourself",
                minLength:{
                  value:50,
                  message:"Atleast 50 characters"
                },
                maxLength:{
                  value:500,
                  message:"Only 500 characters Accepted"
                }
              })
             }
              onChange={(e) =>
                setDetails({ ...details, about: e.target.value })
              }
              placeholder="About Yourself"
            ></textarea>
            <span style={{alignSelf:"flex-end"}}>
              {details.about.length}/500
            </span>
         
          <span className="errorsInreg">{errors.about&& errors.about.message}</span>
           
          
 
          </div>
          <h6 style={{
            marginTop:"10px"
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
                checked={details.jobType === "Work from Home"}
                onChange={(e) => {
                  setDetails({ ...details, jobType: e.target.value });
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
                checked={details.jobType === "Work from office"}
                onChange={(e) => {
                  setDetails({ ...details, jobType: e.target.value });
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
                checked={details.jobType === "Remote"}
                onChange={(e) => {
                  setDetails({ ...details, jobType: e.target.value });
                }}
              />
              <label for="Remote">Remote</label>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}
                onClick={() => previous()} className=" mt-3">
                <span className="bi bi-chevron-compact-left"></span>prev
              </button>
              <button
                style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}
                type="submit"
                className="mt-3"
              >
                next<span className="bi bi-chevron-compact-right"></span>
              </button>
            </div>

  </form>
    </div>
  );
}
