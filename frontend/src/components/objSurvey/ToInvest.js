
import React, { useState, useEffect } from "react";

import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ToInvest({ handleCityChange,handleFunctionalAreaChange, previous, next,AllCities,AllIndustry,AllFunctionalArea
}) {
 


  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();
  const [selectedFunctionalArea,setSelectedFunctionalArea]=useState([])
  const [selectedIndustry,setSelectedIndustry]=useState([])
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [singlelLocation,setSignleLocation]=useState([])
  const handleSelect = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedLocation(selected);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/savings/${localStorage.getItem("email")}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.details);
        let someDetails = res.data.details;
        if (someDetails != null && someDetails.surveyType==='Looking to invest') {
          setDetails({
            location: someDetails.location,
           
           
            industryType: someDetails.industryType,
            
            audienceType: someDetails.audienceType,
            investMentAmount: someDetails.investMentAmount,
            about: someDetails.about,
            email: someDetails.email,
          });
          setSignleLocation({
            label:someDetails.location,
            value:someDetails.location,
          })
          setSelectedFunctionalArea(someDetails.functionalArea)
          setSelectedIndustry(someDetails.industry)
          setSelectedLocation(someDetails.preferedLocation)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    

  }, []);
  const validateFunctionalArea = () => {
    return (selectedFunctionalArea && selectedFunctionalArea.length >= 1) || "Please select at least one options";
  };
  const validateIndustry = () => {
    return (selectedIndustry && selectedIndustry.length >= 1) || "Please select at least one options";
  };
  const handleSelectFunctionalArea = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedFunctionalArea(selected);
  };
  const handleSelectIndustry = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
    }

    setSelectedIndustry(selected);
  };
  const [details, setDetails] = useState({
    location: "",
    preferedLocation: "",
    industry: "",
    industryType: "",
    functionalArea: "",
    audienceType: "",
    investMentAmount: "",
    about: "",
    email: localStorage.getItem("email"),
  });
  function connectionCheck() {
    console.log(details);
    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/savings/toInvest`,

        {
          location: details.location,
          industry: selectedIndustry,
          preferedLocation: selectedLocation,
          functionalArea: selectedFunctionalArea,
          industryType: details.industryType,
          id:localStorage.getItem('id'),
          
          audienceType: details.audienceType,
          investMentAmount: details.investMentAmount,
          about: details.about,
          email: details.email,
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
    <div
    className="objectSurveyPageContainerToHold"
    >

      <form 
       
       className="objectSurveyPageForm"
      onSubmit={handleSubmit(connectionCheck)}>
      <p 
           style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}
          className="p-2">
            {" "}
            <b>Looking to Invest</b>
          </p>
          <Select
          styles={customStyles}
        onInputChange={handleCityChange}
          defaultValue={singlelLocation}
           rules={{ required: 'This field is required' }}
            value={details.location}
            options={AllCities} placeholder="Select Location"
            onChange={(e) => {
              setDetails({...details,location:e})
              console.log(details);
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

<div>
<h6 className="mt-2">Industry</h6>
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
                    id="Production Industry"
                    value="Production Industry"
                    checked={details.industryType === "Production Industry"}
                    onChange={(e) => {
                      setDetails({ ...details, industryType: e.target.value });
                    }}
                  />
                  <label for="Production Industry">Production Industry</label>
                </div>
                <div className="something1">
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
                <div className="something1">
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

          <div  
          style={{
            marginTop: "30px"
          }}
          >
            <input
              type="text"
              value={details.investMentAmount}
              onChange={(e) =>
                setDetails({ ...details, investMentAmount: e.target.value })
              }
              class="form-control"
              placeholder="Investment Amount"
              aria-label="First name"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop:"30px"
            }}
          >
            <textarea
              value={details.about}
            {...register("about",{
              required:'Fill about Field',
              minLength:{
                value:50,
                message:"Minimum 50 Letter"
              },
              maxLength:{
                value:500,
                message:"Minimum 500 Letter"
              },
            },
            
            )}
              onChange={(e) =>{
                if(details.about.length<=500){
                  setDetails({ ...details, about: e.target.value })
                }
              }
                
              }
              placeholder="About Yourself"
            ></textarea>
            <span style={{alignSelf:"flex-end"}}>
              {details.about.length}/500
            </span>
         
          <span className="errorsInreg">{errors.about&& errors.about.message}</span>
           
          
 
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
             style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}
            onClick={() => previous()} className="btn  mt-3">
              <span className="bi bi-chevron-compact-left"></span>prev
            </button>
            <button
             style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}
              onClick={() => handleSubmit()}
              className="btn mt-3"
            >
              next<span className="bi bi-chevron-compact-right"></span>
            </button>
          </div>
      </form>
    </div>
  );
}
