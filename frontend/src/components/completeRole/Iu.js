import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../objSurvey/objsurvey.css"

export default function IuUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [industry, setIndustry] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState([]);
  const handleSelect = (selected) => {
    if (selected && selected.length > 2) {
      selected = selected.slice(0, 2); // Limit the selection to the first 3 options
      alert('Kindly Select any two Location')
    }

    setSelectedLocation(selected);
  };
  const handleSelectDesignation = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
      alert('Kindly Select any two Designation')

    }

    setSelectedDesignation(selected);
  };

  const validateSkills = () => {
    return (
      (selectedSkills && selectedSkills.length >= 5) ||
      "Please select at least Five options"
    );
  };

  const handleSelectSkills = (selected) => {
    if (selected && selected.length > 10) {
      selected = selected.slice(0, 10); // Limit the selection to the first 3 options
      alert('Kindly Select any 10 Skills')

    }

    setSelectedSkills(selected);
  };
  const handleSelectIndustry = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
      alert('Kindly Select any two Industry')

    }

    setSelectedIndustry(selected);
  };
  useEffect(() => {
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
  }, []);
  const [details, setDetails] = useState({
    designation: "",
    location: "",
    industry: "",
    years: "",
    months: "",
  });

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([]);
  const [city, setCity] = useState([]);
  const [designation, setDesignation] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem("id")}`)
    .then((res) => {
    console.log(res.data.details);
    const detailsOfUser=res.data.details;
    console.log(detailsOfUser.preferredDesignation);
    if(detailsOfUser.refferalCodeTaken){
      navigate("/dashboard")
    }
    let bigVal={

    }
    if(details.industry!=""){
      bigVal.industry={
        value:detailsOfUser.industry,
        label:detailsOfUser.industry,
      }
    }
    if(details.location!=""){
      bigVal.location={
        value:detailsOfUser.location,
        label:detailsOfUser.location,
      }
    }
  
    let useEffectLocation=detailsOfUser.preferredLocation
    let locationDestructing=useEffectLocation.map(e=>{
      return {
        label:e,
        value:e
      }
    })

    setSelectedLocation(locationDestructing)

    let useEffectDesignation=detailsOfUser.preferredDesignation

    let designationDestructing=useEffectDesignation.map(e=>{
      return {
        label:e,
        value:e
      }
    })

let useEffectSkills=detailsOfUser.skills;
if(useEffectSkills.length>0){
  setDetails((prevState)=>({
    ...prevState,
    industry:{
      value:detailsOfUser.industry,
      label:detailsOfUser.industry,
    },
    location:{
      value:detailsOfUser.location,
      label:detailsOfUser.location,
    },
    designation:{
      value:detailsOfUser.designation,
      label:detailsOfUser.designation,
    },
    years:{
      value:detailsOfUser.WorkExperienceYear,
      label:detailsOfUser.WorkExperienceYear,
    },
    months:{
      value:detailsOfUser.WorkExperienceMonth,
      label:detailsOfUser.WorkExperienceMonth,
    }
  }))
}
let skillsDestructing=useEffectSkills.map(e=>{
  return {
    label:e,
    value:e
  }
})
    setSelectedSkills(skillsDestructing)

  setSelectedDesignation(designationDestructing)
  
  let useEffectIndustry=detailsOfUser.preferredIndustry;

  let industryDestructing=useEffectIndustry.map(e=>{
    return {
      label:e,
      value:e
    }
  })
  setSelectedIndustry(industryDestructing);
 
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

    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/designation`)
      .then((res) => {

        setDesignation(res.data);
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
        console.log(newSkills);

        setSkills(newSkills);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [navigate]);




  const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#83a4d4' : provided.borderColor,
        boxShadow: 'none', // Remove the default box-shadow
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#83a4d4', // Set the desired color for the dropdown icon
    }),

    placeholder: (provided) => ({
        ...provided,
        fontSize: '14px',
        textAlign: 'left',
        marginLeft: '15px'

    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#83a4d4' : "white"
    })
};


  const handleInputChange = (inputValue) => {
    console.log(inputValue);
    setDetails({ ...details, skills: inputValue });
    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/skills/${inputValue}`)
        .then((res) => {
          const newSkills = [];
          const val = res.data;
          console.log("Fetching another data");
          val.map((e) => {
            newSkills.push({
              value: e.allSklls,
              label: e.allSklls,
            });
          return null;

          });
          console.log(newSkills);

          setSkills(newSkills);
        });
    }
  };
  const handleCityChange = (inputValue) => {
    console.log(inputValue);

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
        .then((res) => {
          console.log(res.data);
          setCity(res.data);
        });
    }
  };
  const handleDesignationChange = (inputValue) => {
    console.log(inputValue);
    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/designation/${inputValue}`)
        .then((res) => {
          setDesignation(res.data);
        });
    }
  };

  const save = async() => {
    // console.log(details);
    const industries = selectedIndustry.map((e) => e.value);
    const locations = selectedLocation.map((e) => e.value);
    const designations = selectedDesignation.map((e) => e.value);
    const skills = selectedSkills.map((e) => e.value);
    console.log(industries);
    
 await  axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/updateiu/${localStorage.getItem("id")}`,
        {
          industry: details.industry.value,
          preferredIndustry: industries,
          location: details.location.value,
          preferredLocation: locations,
          email: localStorage.getItem("email"),
          designation: details.designation.value,
          preferredDesignation: designations,
          skills: skills,
          WorkExperienceYear: details.years.value,
          WorkExperienceMonth: details.months.value,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/refferalcode");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <form
        onSubmit={handleSubmit(save)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:"30px",
          
        }}
      >
        <div className="ichpUserForm" >
          <p
            style={{
              backgroundColor: "rgb(3, 104, 104)",
              color: "white",
              
              marginTop: "20px",
            }}
            className=" text-light p-2"
          >
            <b>Individual User</b>
          </p>

          
            <div>
              <Select   styles={customStyles}

                required
                onInputChange={handleCityChange}
                rules={{ required: "This field is required" }}
                value={details.location}
                options={city}
                placeholder="Select Current Location"
                onChange={(e) => {
                                    setDetails({ ...details, location: e });
                }}
              />
            </div>
            <span className="errorsInreg">
              {errors.location && errors.location.message}
            </span>

            <div className=" mt-3">
              <Select   styles={customStyles}

                options={city}
                onInputChange={handleCityChange}
              isSearchable={true}
              isMulti
              placeholder="Select Preferred Location"
              value={selectedLocation}
              onChange={handleSelect}
            />
          </div>
          <div className=" mt-3">

            
            <Select styles={customStyles}

              onInputChange={handleDesignationChange}
              rules={{ required: "This field is required" }}
              value={details.designation}
              options={designation}
              placeholder="Select Current Designation"
              onChange={(e) => {
                setDetails({ ...details, designation: e });
              }}
            />


          </div>
          <span className="errorsInreg">
            {errors.currDesignation && errors.currDesignation.message}
          </span>

          <div className=" mt-3">
            {/* <input type="text" value={details.industry} onChange={(e) => setDetails({ ...details, industry: e.target.value })} class="form-control" placeholder="Industry" aria-label="First name" /> */}
            <Select styles={customStyles}

              options={designation}
              isSearchable={true}
              isMulti
              onInputChange={handleDesignationChange}
              placeholder="Select Preferred Designation"
                value={selectedDesignation}
                onChange={handleSelectDesignation}
                defaultValue={selectedDesignation}
              />
            </div>
            <span className="errorsInreg">
              {errors.designation && errors.designation.message}
            </span>

            <div className=" mt-3">
              <Select   styles={customStyles}

                options={industry}
                isSearchable={true}
                required
                placeholder="Select Current Industry"
                value={details.industry}
                onChange={(e) => {
                  setDetails({ ...details, industry: e });
                }}
              />
            </div>
            <span className="errorsInreg">
              {errors.currIndustry && errors.currIndustry.message}
            </span>

            <div className=" mt-3">
              {/* <input type="text" value={details.designation} onChange={(e) => setDetails({ ...details, designation: e.target.value })} class="form-control" placeholder="Title/Designation" aria-label="First name" /> */}
              <Select   styles={customStyles}

                options={industry}
                isSearchable={true}
                defaultValue={selectedIndustry}
                isMulti
                placeholder="Select Preferred Industry"
                value={selectedIndustry}
                onChange={handleSelectIndustry}
              />
            </div>
            <span className="errorsInreg">
              {errors.industry && errors.industry.message}
            </span>
            <div className=" mt-3">
              {/* <input type="text" value={details.skills} onChange={(e) => setDetails({ ...details, skills: e.target.value })} class="form-control" placeholder="Skills" aria-label="First name" /> */}
              <Select   styles={customStyles}

                menuPlacement="top"
                onInputChange={handleInputChange}
                options={skills}
                isSearchable={true}
                isMulti
                placeholder="Select skills"
                value={selectedSkills}
                {...register("skills", { validate: validateSkills })}
                onChange={handleSelectSkills}
              />
            </div>
            <span className="errorsInreg">
              {errors.skills && errors.skills.message}
            </span>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
             <div className="mt-3" style={{width:"100%"}}>
            <div><label>Experience</label></div>
             <div  style={{ display: "flex", justifyContent: "space-between" }}>
             <div style={{
              width:"45%"
             }}>
             <Select   styles={customStyles}

               menuPlacement="top"
               value={details.years}
               onChange={(e) => setDetails({ ...details, years: e })}
               options={year}
               placeholder="Year"
             />
           </div>
           <div
            style={{
              width:"45%"
             }}
           >
             <Select   styles={customStyles}

               menuPlacement="top"
               value={details.months}
               onChange={(e) => setDetails({ ...details, months: e })}
               options={month}
               placeholder="Month"
             />
           </div>
           </div>
             </div>
              </div>
            </div>
            <span className="errorsInreg">
              {errors.years && errors.years.message}
            </span>

            <button
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "rgb(3, 104, 104)",
              color: "white",
            }}
            className="btn"
            type="submit"
          >
            Save
          </button>
          </div>
        
      </form>
    </div>
  );
}





