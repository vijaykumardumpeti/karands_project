import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import { useForm } from "react-hook-form";
export default function Collaborate({ handleCityChange,handleDesignationChange,handleFunctionalAreaChange,handleInputChange, previous, next,AllCities,AllIndustry,AllFunctionalArea,AllSkills,AllDesignation }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState([])
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/connection/${localStorage.getItem(
          "email"
        )}`
      )
      .then((res) => {
        console.log("enter");
        console.log(res);
        let someDetails = res.data.details;
        
        if (someDetails != null) {
          setDetails({
            location: someDetails.location,

            about: someDetails.about,
            serviceOffer:someDetails.serviceOffer,
            serviceLooking: someDetails.serviceLooking,
            surveyType: someDetails.surveyType,
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
    preferedLocation: "",
    functionalArea: "",
    designation: "",
    skills: "",
    about: "",
    industry: "",
    email: localStorage.getItem("email"),
    serviceOffer: "",
    serviceLooking: "",
  });
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
    // console.log(details);
    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/connection/collabrate`,

        {
          location: details.location,
          preferedLocation: selectedLocation,
          functionalArea: selectedFunctionalArea,
          designation: selectedDesignation,
          skills: selectedSkills,
          about: details.about,
          id:localStorage.getItem('id'),
          industry: selectedIndustry,
          email: localStorage.getItem("email"),
          serviceOffer: details.serviceOffer,
          serviceLooking: details.serviceLooking,
        }
      )
      .then((res) => {
        console.log(res);

        next();
      })
      .catch((err) => {
        alert(err.response.data.message);

        console.log(err);
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
    >
      <form className="objectSurveyPageForm" onSubmit={handleSubmit(connectionCheck)}>
        <p style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }} className="p-2">
          {" "}
          <b>Looking to Collaborate</b>
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
          <span className="errorsInreg">{errors.location && errors.location.message}</span>
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

                onInputChange={handleDesignationChange}

                {...register('designation', { validate: validateDesignation })}
                options={AllDesignation}
                isSearchable={true}
                isMulti
                placeholder="Select Designation"
                value={selectedDesignation}
                onChange={handleSelectDesignation}
                defaultValue={selectedDesignation}
              />
            <span className="errorsInreg">{errors.designation && errors.designation.message}</span>
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
            <span className="errorsInreg">{errors.functionalArea && errors.functionalArea.message}</span>
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
            <span className="errorsInreg">{errors.industry && errors.industry.message}</span>
<Select
            styles={customStyles}

                onInputChange={handleInputChange}

                options={AllSkills}
                isSearchable={true}
                isMulti
                placeholder="Select skills"
                value={selectedSkills}
                {...register('skills', { validate: validateSkills })}

                onChange={handleSelectSkills}
              />
            <span className="errorsInreg">{errors.skills && errors.skills.message}</span>
<div 
style={{marginTop:"30px"}}
>
<input
           

           type="text"
           class="form-control"
           placeholder="Services you Offer"
           value={details.serviceOffer}
           onChange={(e) =>
             setDetails({ ...details, serviceOffer: e.target.value })
           }
           aria-label="First name"
         />
</div>
<div 
style={{marginTop:"30px"}}

>
<input
          

          type="text"
          class="form-control"
          placeholder="Services you Looking for"
          value={details.serviceLooking}
          onChange={(e) =>
            setDetails({ ...details, serviceLooking: e.target.value })
          }
          aria-label="First name"
        />
</div>
 <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px"
              }}
            >
              <textarea
                value={details.about}
                {...register("about", {
                  minLength: {
                    value: 50,
                    message: "Atleast 50 characters"
                  },
                  maxLength: {
                    value: 500,
                    message: "Only 500 characters Accepted"
                  }
                })}
                onChange={(e) =>
                  setDetails({ ...details, about: e.target.value })
                }
                placeholder="About Yourself"
              ></textarea>
              <span style={{ alignSelf: "flex-end" }}>
                {details.about.length}/500
              </span>

              <span className="errorsInreg">{errors.about && errors.about.message}</span>



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
