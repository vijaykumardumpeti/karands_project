
import React, { useState, useEffect } from "react";

import axios from "axios";

import Select from "react-select";
import { useForm } from "react-hook-form";
export default function Adertise({ handleCityChange,handleInputChange, previous, next,AllCities,AllIndustry,AllFunctionalArea,AllSkills,AllDesignation }) {


  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [selectedDesignation,setSelectedDesignation]=useState([])
  const [selectedFunctionalArea,setSelectedFunctionalArea]=useState([])
  const [selectedIndustry,setSelectedIndustry]=useState([])
  const [selectedSkills,setSelectedSkills]=useState([])
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/marketing/${localStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        let someDetails = res.data.details;
        console.log(someDetails);
        if (someDetails !== null && someDetails.surveyType !=='Affiliate') {
          setDetails({
            location: someDetails.location,
          
            industryType: someDetails.industryType,
           
            age: someDetails.age,
            audienceType: someDetails.audienceType,
            about: someDetails.about,
            educationLevel: someDetails.educationLevel,
            earningRange: someDetails.earningRange,
          });
          setSelectedLocation(someDetails.preferedLocation)
          setSelectedDesignation(someDetails.designation)
          setSelectedFunctionalArea(someDetails.functionalArea)
          setSelectedIndustry(someDetails.industry)
          setSelectedSkills(someDetails.skills)
        }
      })
      .catch((err) => {
        console.log(err);
      });
   
  }, []);
  const [details, setDetails] = useState({
    location: "",
   
    industryType: "",

    age: "",
    audienceType: "",
    about: "",
    educationLevel: "",
    earningRange: "",
    email: localStorage.getItem("email"),
  });
  const validateFunctionalArea = () => {
    return( selectedFunctionalArea && selectedFunctionalArea.length >= 1) || "Please select at least one options";
  };
  const validateSkills = () => {
    return (selectedSkills && selectedSkills.length >= 5) || "Please select at least Five options";
  };
  const validateIndustry = () => {
    return (selectedIndustry && selectedIndustry.length >= 1) || "Please select at least one options";
  };
  const validateDesignation = () => {
   
    return (selectedDesignation && selectedDesignation.length >= 1) || "Please select at least one options";
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
  function connectionCheck() {
    console.log(details);
    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/marketing/advertise`,
        {
          location: details.location,
          preferedLocation: selectedLocation,
          industry: selectedIndustry,
          industryType: details.industryType,
          functionalArea: selectedFunctionalArea,
          designation: selectedDesignation,
          skills:selectedSkills,
          age: details.age,
          audienceType: details.audienceType,
          about: details.about,
          educationLevel: details.educationLevel,
          earningRange: details.earningRange,
          email: localStorage.getItem("email"),
          id:localStorage.getItem('id')
        }
      )
      .then((res) => {
        next();
      })
      .catch((err) => {
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
    <div className="objectSurveyPageContainerToHold">
      
      <form className="objectSurveyPageForm" onSubmit={handleSubmit(connectionCheck)}> 
      <p style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }} className="p-2">
          {" "}
          <b>Advertisement</b>
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
          onInputChange={handleCityChange}

            options={AllCities}
            isSearchable={true}

            isMulti
            placeholder="Select Preferred Location"
            value={selectedLocation}
            onChange={handleSelect}
          />
          <div className=" mt-2">
          <h6>Industry</h6>
          <div className=" mt-2">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="somethings">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Production Industry"
                  value="Production Industry"
                  checked={details.industryType === "Production Industry"}
                  onChange={(e) => {
                    setDetails({ ...details, industryType: e.target.value });
                  }}
                />
                <label for="Production Industry">Production Industry</label>
              </div>
              <div className="somethings">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Service Industry"
                  value="Service Industry"
                  checked={details.industryType === "Service Industry"}
                  onChange={(e) => {
                    setDetails({ ...details, industryType: e.target.value });
                  }}
                />
                <label for="Service Industry">Service Industry</label>
              </div>
              <div className="somethings">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Both"
                  value="Both"
                  checked={details.industryType === "Both"}
                  onChange={(e) => {
                    setDetails({ ...details, industryType: e.target.value });
                  }}
                />
                <label for="Both">Both</label>
              </div>
            </div>
          </div>
          </div>
 <Select
            styles={customStyles}
         {...register('designation', { validate: validateDesignation })}
              options={AllDesignation}
              isSearchable={true}
              isMulti
              placeholder="Select Designation"
              value={selectedDesignation}
              onChange={handleSelectDesignation}
              defaultValue={selectedDesignation}
            />
        <span className="errorsInreg">{errors.designation&& errors.designation.message}</span>
        <Select
 styles={customStyles}
              options={AllFunctionalArea}
         {...register('functionalArea', { validate: validateFunctionalArea })}

              isSearchable={true}
              isMulti
              placeholder="Select Functional Area"
              value={selectedFunctionalArea}
              onChange={handleSelectFunctionalArea}
            />
        <span className="errorsInreg">{errors.functionalArea&& errors.functionalArea.message}</span>
<Select
            styles={customStyles}
          onInputChange={handleInputChange}

              options={AllSkills}
              isSearchable={true}
              isMulti
              placeholder="Select skills"
              value={selectedSkills}
         {...register('industry', { validate: validateSkills })}

              onChange={handleSelectSkills}
            />
          <span className="errorsInreg">{errors.skills&& errors.skills.message}</span>
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
<div className=" mt-3">
              <input
                value={details.age}
                onChange={(e) =>
                  setDetails({ ...details, age: e.target.value })
                }
                type="number"
                class="form-control"
                placeholder="Age"
                min={18}
                max={60}
                aria-label="First name"
              />
            </div>
<div className=" mt-2 mb-2">
            <h6>Audience Type</h6>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="something">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Individual"
                  value="Individual"
                  checked={details.audienceType === "Individual"}
                  onChange={(e) => {
                    setDetails({ ...details, audienceType: e.target.value });
                  }}
                />
                <label for="Individual">Individual</label>
              </div>
              <div className="something">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Group"
                  value="Group"
                  checked={details.audienceType === "Group"}
                  onChange={(e) => {
                    setDetails({ ...details, audienceType: e.target.value });
                  }}
                />
                <label for="Group">Group</label>
              </div>
              <div className="something">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Bothaudience"
                  value="Both"
                  checked={details.audienceType === "Both"}
                  onChange={(e) => {
                    setDetails({ ...details, audienceType: e.target.value });
                  }}
                />
                <label for="Bothaudience">Both</label>
              </div>
            </div>
          </div>
  <div>
            {" "}
            <textarea
              value={details.about}
              onChange={(e) =>
                setDetails({ ...details, about: e.target.value })
              }
              className="mt-2 w-100"
              placeholder="About Your Product"
            ></textarea>
          </div>
 <div className=" mt-2 mb-2">
            <h6>Educational Level</h6>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="something1">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Anyone"
                  value="Anyone"
                  checked={details.educationLevel === "Anyone"}
                  onChange={(e) => {
                    setDetails({ ...details, educationLevel: e.target.value });
                  }}
                />
                <label for="Anyone">Anyone</label>
              </div>
              <div className="something1">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Graduates"
                  value="Graduates"
                  checked={details.educationLevel === "Graduates"}
                  onChange={(e) => {
                    setDetails({ ...details, educationLevel: e.target.value });
                  }}
                />
                <label for="Graduates">Graduates</label>
              </div>
              <div className="something1">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="Masters"
                  value="Masters"
                  checked={details.educationLevel === "Masters"}
                  onChange={(e) => {
                    setDetails({ ...details, educationLevel: e.target.value });
                  }}
                />
                <label for="Masters">Masters</label>
              </div>
              <div className="something1">
                <input
                  style={{
                    marginRight: "10px",
                  }}
                  type="radio"
                  id="PG/PHD"
                  value="PG/PHD"
                  checked={details.educationLevel === "PG/PHD"}
                  onChange={(e) => {
                    setDetails({ ...details, educationLevel: e.target.value });
                  }}
                />
                <label for="PG/PHD">PG/PHD</label>
              </div>
            </div>
          </div>
          <div className=" mt-3">
            <input
              value={details.earningRange}
              onChange={(e) =>
                setDetails({ ...details, earningRange: e.target.value })
              }
              type="text"
              class="form-control"
              placeholder="Earning Range"
              aria-label="First name"
            />
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
