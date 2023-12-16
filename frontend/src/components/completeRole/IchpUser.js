import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function IchpUser() {

  const [industry, setIndustry] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    hr: "",
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
  const [hr, setHr] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
   
    axios
    .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem("id")}`)
    .then((res) => {
    console.log(res.data.details);
    const detailsOfUser=res.data.details;
    // if(detailsOfUser.refferalCodeTaken){
    //   navigate("/dashboard")
    // }
    console.log(detailsOfUser.hrTitle);
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
            hr:{
              value:detailsOfUser.hrTitle,
              label:detailsOfUser.hrTitle,
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
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/hr`)
      .then((res) => {
        setHr(res.data);
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


  const validateSkills = () => {
    return (
      (selectedSkills && selectedSkills.length >= 5) ||
      "Please select at least Five options"
    );
  };


  const handleSelectSkills = (selected) => {
    if (selected && selected.length > 10) {
      selected = selected.slice(0, 10); // Limit the selection to the first 3 options
    }

    setSelectedSkills(selected);
  };
  const handleCityChange = (inputValue) => {
    console.log(inputValue);

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
        .then((res) => {
        setCity(res.data);
        });
    }
  };
  const handleHrChange = (inputValue) => {
    console.log(inputValue);

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/hr/${inputValue}`)
        .then((res) => {
         setHr(res.data);
        });
    }
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
  const save = async() => {
    console.log(skills);
    const overAllSkills = selectedSkills.map((e) => e.value);
             

        if(details.years.value<1){

             
   alert("Experience is needed for ichp")

return
        }




   await axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/updateichp/${localStorage.getItem(
          "id"
        )}`,
        {
          industry: details.industry.value,
          hrTitle: details.hr.value,
          WorkExperienceYear: details.years.value,
          WorkExperienceMonth: details.months.value,
          location: details.location.value,
          skills: overAllSkills,
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
          marginTop:"30px"
        }}
      >
        <div className="ichpUserForm">
          <p
            style={{
              backgroundColor: "rgb(3, 104, 104)",
              color: "white",
              marginTop: "20px",
            }}
            className=" text-light p-2"
          >
            {" "}
            <b>ICHP User</b>
          </p>
          <div>
            <Select
              onInputChange={handleCityChange}
              rules={{ required: "This field is required" }}
              value={details.location}
              options={city}
              placeholder="Select Location"
              onChange={(e) => {
                setDetails({ ...details, location: e });
              }}
              required
            />
          </div>
          <div className=" mt-3">
            <Select
              onInputChange={handleHrChange}
              rules={{ required: "This field is required" }}
              value={details.hr}
              options={hr}
              placeholder="Select Hr position"
              onChange={(e) => {
                setDetails({ ...details, hr: e });
              }}
              required
            />
          </div>
          <div className=" mt-3">
            <Select
              options={industry}
              isSearchable={true}
              placeholder="Select Industry"
              value={details.industry}
              onChange={(e) => {
                setDetails({ ...details, industry: e });
              }}
              required
            />
          </div>
          <div className=" mt-3">
            {/* <input type="text" value={details.skills} onChange={(e) => setDetails({ ...details, skills: e.target.value })} class="form-control" placeholder="Skills" aria-label="First name" /> */}
            <Select
              menuPlacement="top"
              onInputChange={handleInputChange}
              options={skills}
              isSearchable={true}
              isMulti
              placeholder="Select skills"
              value={selectedSkills}
              {...register("skills", { validate: validateSkills })}
              onChange={handleSelectSkills}
              required
            />
          </div>
          <span className="errorsInreg">
            {errors.skills && errors.skills.message}
          </span>
          <div>
         <div className="mt-3">
         <label>Experience</label>
         </div>
            <div style={{ display: "flex", justifyContent: "space-between", width:"100%"}}>
              <div
              style={{
                width:"45%"
               }}
              className="mt-1">
                <Select
                  value={details.years}
                  onChange={(e) => setDetails({ ...details, years: e })}
                  options={year}
                  placeholder="Year"
                />
              </div>
              <div className=" mt-1"
              style={{
                width:"45%"
               }}
              >
                <Select
                  value={details.months}
                  onChange={(e) => setDetails({ ...details, months: e })}
                  options={month}
                  placeholder="Month"
                />
              </div>
            </div>
          </div>
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
