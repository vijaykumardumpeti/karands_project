import axios from "axios";
import Select from "react-select";
import { useForm } from "react-hook-form";

import React, { useState, useEffect } from "react";

export default function ForInvest({ handleCityChange,handleFunctionalAreaChange, previous, next,AllCities,AllIndustry,AllFunctionalArea,AllSkills,AllDesignation }) {

  const [selectedFunctionalArea,setSelectedFunctionalArea]=useState([])
  const [selectedIndustry,setSelectedIndustry]=useState([])
  const [selectedLocation, setSelectedLocation] = useState([]);
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/savings/${localStorage.getItem("email")}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.details);
        let someDetails = res.data.details;
        if (someDetails != null && someDetails.surveyType==='Looking for investments') {
          setDetails({
            location: someDetails.location,
           
            
            industryType: someDetails.industryType,
            investMentAmount: someDetails.investMentAmount,
            projectStage: someDetails.projectStage,
            about: someDetails.about,
            attachament: "",
            surveyType: "Looking for investments",
            email: someDetails.email,
          });
          setSelectedLocation(someDetails.preferedLocation)
          setSelectedFunctionalArea(someDetails.functionalArea)
          setSelectedIndustry(someDetails.industry)
        }
      })
      .catch((err) => {
        console.log(err);
      });
   
  }, []);
  const [details, setDetails] = useState({
    location: "",
    preferedLocation: "",
    industry: "",
    industryType: "",
    investMentAmount: "",
    functionalArea: "",
    projectStage: "",
    about: "",
    attachament: "",
    email: localStorage.getItem("email"),
  });
  const validateIndustry = () => {
    return (selectedIndustry && selectedIndustry.length >= 1) || "Please select at least one options";
  };
  const validateFunctionalArea = () => {
    return (selectedFunctionalArea && selectedFunctionalArea.length >= 1 )|| "Please select at least one options";
  };
  const handleSelectFunctionalArea = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedFunctionalArea(selected);
  };
  const handleSelect = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedLocation(selected);
  };
  const handleSelectIndustry = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedIndustry(selected);
  };
  function connectionCheck() {
  
    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/savings/forInvest`,

        {
          location:details.location,
          preferedLocation: selectedLocation,
          industry: selectedIndustry,
          industryType: details.industryType,
          investMentAmount: details.investMentAmount,
          functionalArea: selectedFunctionalArea,
          projectStage: details.projectStage,
          about: details.about,
          id:localStorage.getItem('id'),
          attachament: details.attachament,
          email: localStorage.getItem("email"),
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
          <b>Looking for Invest....</b>
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
 <div className=" mt-2">
            <h5>Industry</h5>
            <hr />
            {/* <lable >
              Production Industry  <input type="radio" name="industry" />
            </lable>
            <lable className="ms-4">
              Service Industry <input type="radio" name="industry" />
            </lable> */}
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
                  id="Production Industry"
                  value="Production Industry"
                  checked={details.industryType === "Production Industry"}
                  onChange={(e) => {
                    setDetails({ ...details, industryType: e.target.value });
                  }}
                />
                <label for="Production Industry">Production Industry</label>
              </div>
              <div className="something">
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
            </div>
          </div>
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

            onInputChange={handleFunctionalAreaChange}
              options={AllFunctionalArea}
         {...register('functionalArea', { validate: validateFunctionalArea })}

              isSearchable={true}
              isMulti
              placeholder="Select Functional Area"
              value={selectedFunctionalArea}
              onChange={handleSelectFunctionalArea}
            />
        <span className="errorsInreg">{errors.functionalArea&& errors.functionalArea.message}</span>
  <div className="mt-3 mb-2">
              <input
                type="number"
                required
                value={details.investMentAmount}
                onChange={(e) =>
                  setDetails({ ...details, investMentAmount: e.target.value })
                }
                class="form-control"
                placeholder="Investment Amount"
                aria-label="First name"
              />
            </div>

            <div className=" mt-2 p-2">
              <h6 className="mt-2">Project Stage</h6>
              <hr />
             
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="something">
                  <input
                  required
                    style={{
                      marginRight: "10px",
                    }}
                    type="radio"
                    id="Under construction"
                    value="Under construction"
                    checked={details.projectStage === "Under construction"}
                    onChange={(e) => {
                      setDetails({ ...details, projectStage: e.target.value });
                    }}
                  />
                  <label for="Under construction">Under construction</label>
                </div>
                <div className="something">
                  <input
                    style={{
                      marginRight: "10px",
                    }}
                    type="radio"
                    id="Already working"
                    value="Already working"
                    checked={details.projectStage === "Already working"}
                    onChange={(e) => {
                      setDetails({ ...details, projectStage: e.target.value });
                    }}
                  />
                  <label for="Already working">Already working</label>
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

          <div className="form-input mt-2 w-100">
            <input
              value={details.attachament}
              onChange={(e) =>
                setDetails({ ...details, attachament: e.target.value })
              }
              type="url"
              placeholder="Attach project details"
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
