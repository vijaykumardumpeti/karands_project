import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGalacticSenate, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillPhoneFill } from "react-icons/bs";
import { ImManWoman } from "react-icons/im";
import Select from "react-select";
import LoaderModal from "../spinner/spinnerStyle";
// import './Style.css'

import MyContext from "../../mycontext";

import { Fragment } from "react";
import { Country, State, City }  from 'country-state-city';




// thi sis for inviting admin...............................................................................

function Admininvite({ payment }) {

  const Location = useLocation();

  const State = Location.state;



  const [city, setCity] = useState([]);


  const featureRoleOption = [
    { value: "All", label: "All" },
    { value: "Personal details", label: "Personal details" },
    { value: "Subscription and Renewal", label: "Subscription and Renewal" },
    { value: "Company page", label: "Company page" },
    { value: "Professional details", label: "Professional details" },
    { value: "Report users", label: "Report users" },
    { value: "Post feeds", label: "Post feeds" },
    { value: "Job post", label: "Job post" },
    { value: "Educational details", label: "Educational details" },
    { value: "User Documents", label: "User Documents" },
    { value: "Recruitment Drive", label: "Recruitment Drive" },
    { value: "Refferal Job", label: "Refferal Job" },
  ];


  let state = [
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
    },
    { label: "Chandigarh", value: "Chandigarh" },
    {
      label: "Dadra and Nagar Haveli",
      value: "Dadra and Nagar Haveli",
    },
    {
      label: "Daman and Diu",
      value: "Daman and Diu",
    },
    { label: "Delhi", value: "Delhi" },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Puducherry", value: "Puducherry" },
  ];



  let statewithcodes = [
    { label: "Andhra Pradesh", value: "AP" },
    { label: "Arunachal Pradesh", value: "AR" },
    { label: "Assam", value: "AS" },
    { label: "Bihar", value: "BR" },
    { label: "Chhattisgarh", value: "CT" },
    { label: "Goa", value: "GA" },
    { label: "Gujarat", value: "GJ" },
    { label: "Haryana", value: "HR" },
    { label: "Himachal Pradesh", value: "HP" },
    { label: "Jharkhand", value: "JH" },
    { label: "Karnataka", value: "KA" },
    { label: "Kerala", value: "KL" },
    { label: "Madhya Pradesh", value: "MP" },
    { label: "Maharashtra", value: "MH" },
    { label: "Manipur", value: "MN" },
    { label: "Meghalaya", value: "ML" },
    { label: "Mizoram", value: "MZ" },
    { label: "Nagaland", value: "NZ" },
    { label: "Odisha", value: "OR" },
    { label: "Punjab", value: "PB" },
    { label: "Rajasthan", value: "RJ" },
    { label: "Sikkim", value: "SK" },
    { label: "Tamil Nadu", value: "TN" },
    { label: "Telangana", value: "TG" },
    { label: "Tripura", value: "TR" },
    { label: "Uttar Pradesh", value: "UP" },
    { label: "Uttarakhand", value: "UT" },
    { label: "West Bengal", value: "WB" },
    {
      label: "Andaman and Nicobar Islands",
      value: "AN",
    },
    { label: "Chandigarh", value: "CH" },
    {
      label: "Dadra and Nagar Haveli",
      value: "DN",
    },
    {
      label: "Daman and Diu",
      value: "DD",
    },
    { label: "Delhi", value: "DL" },
    { label: "Lakshadweep", value: "LD" },
    { label: "Puducherry", value: "PY" },
  ];





  const [profiledata, setprofiledata] = useState("")




  const { appprofiledata } = useContext(MyContext)





  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
      .then((res) => {
        if (res.data.details) {
          setprofiledata(res.data.details)
        }
      }).catch(err => console.log(err))

  }, [])





  let role

  if (profiledata.role == "Super Admin") {

    role = [
      {
        value: "Admin",
        label: "Admin",
      },
      {
        value: "Super Admin",
        label: "Super Admin",
      },
      {
        value: "Sub-Admin",
        label: "Sub-Admin",
      },
    ];


  }


  if (profiledata.role == "Admin") {

    role = [

      {
        value: "Sub-Admin",
        label: "Sub-Admin",
      },
    ];


  }





  const [selectedfeatureRoleOption, setSelectedfeatureRoleOption] = useState(
    []
  );



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




  function handlePhoneNumber(e) {
    let val = e.target.value;
    if (val.length === 1 && /^[6-9]/.test(val)) {
      console.log(e.target.value);
      setDetails({ ...details, mobilenumber: e.target.value });
    } else if (val.length !== 1 && val.length !== 11) {
      setDetails({ ...details, mobilenumber: e.target.value });
    }
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#83a4d4" : provided.borderColor,
      boxShadow: "none", // Remove the default box-shadow
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#83a4d4", // Set the desired color for the dropdown icon
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      textAlign: "left",
      marginLeft: "15px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#83a4d4" : "white",
    }),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(false);


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

  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    location: "",
    multilocation:[],
    state: "",
    role: "",
    refferalCodeGenerated: "",
  });


  const navigate = useNavigate();



  useEffect(() => {
    if (profiledata) {
 
      const stateCode = statewithcodes.find((data) =>
        new RegExp(`^${profiledata.Professionalstate}$`, "i").test(data.label)
      );
  

      console.log("stateCode",stateCode)


      if (stateCode) {
        setCity(
          City.getCitiesOfState("IN",stateCode.value).map((data) => ({
            label: data.name,
            value: data.name,
          }))
        );
      }
    }
  }, [profiledata]);


  console.log("get all cities",city)

  // regitratioon................part................................................



  const signupDetails = async () => {


    if (emailerror) {

      let data = {
        name: details.name,
        email: details.email,

        AdditionalPortalAccess: details.role.value,


        AdditionalPortalAccessPermissions: selectedfeatureRoleOption,

      };



  console.log("data", data)


  if (details.role.value === "Admin" || details.role.value === "Super Admin") {
    data.state = details.state.value;
  } else if (details.role.value === "Sub-Admin") {
    data.location = details.location.value;
    data.state = details.state;
  }

  setIsLoading(true);

  await axios
    .post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/inviteadminwithemail`, data)
    .then((res) => {
      setIsLoading(false);
      alert("Registered successfully. Details have been sent to your registered email.");


      setTimeout(() => {

        navigate("/admin/team");


      }, 2000);



    }).catch((err) => {
      setIsLoading(false);
      alert("Registration failed. Please try again later.");
      console.error(err);
    });





}

else if(!emailerror){

  alert("not a valid user")
}


  }




  const handleSelectIndustry = (selected) => {
    const filterSelected = [];
  
    selected.forEach((data) => {
      if (data.value === "All") {
        // Add all feature roles except "All" to filterSelected
        featureRoleOption.forEach((Data) => {
          if (Data.value !== "All") {
            filterSelected.push(Data);
          }
        });
      } else {
        // Add the selected option to filterSelected
        filterSelected.push(data);
      }
    });
  
    console.log("filterSelected: ", filterSelected);
  
    setSelectedfeatureRoleOption(filterSelected);
  };
  



  const [emailerror, setemailerror] = useState(false);


  const [earlierrole, setEarlierrole] = useState("");


  useEffect(() => {
    validateemail();
  }, [details.email]);
  
  async function validateemail() {
    const email = details.email;
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/checkemailexist`, {
        email: email,
      });
  
      console.log("response frm validate user", response.data.user);
  
      if (response.data.user && response.data.user.name) {
         


        setEarlierrole(response.data.user)
        // Update emailerror, name, and mobilenumber
        setemailerror(true);
        setDetails({
          ...details,
          name: response.data.user.name,
          mobilenumber: response.data.user.mobilenumber,
        });
      } else {
        setemailerror(false);
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle the error here (e.g., set emailerror state appropriately)
      setemailerror(true); // You may want to set emailerror to true in case of an error
    }
  }
  
















  return (
 <div>
     <form
        
          style={{}}
        >
       
       <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <MdEmail style={{ color: "#83a4d4" }} />
              </span>
            </div>

            <input
              type="text"
              className="form-control changePlaceHolderSize"
              {...register("email", {
                required: "Please Enter Your Email!",
              })}
              wrapperClassName="mb-4"
              required
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              placeholder="Enter His/Her Email ID"
              aria-label="Email"
              aria-describedby="basic-addon1"

            onBlur={() => { validateemail() }}

          />




        </div><br />

      
        <p style={{ color: "green" }}>{earlierrole ? `Earlier Role:- ${earlierrole.role}` : ""}   <p style={{ color: "red" }}>{earlierrole ? `Verified:- ${earlierrole.verified}` : ""}</p></p>

      

   
        <p style={{ color: "red", display: emailerror === false && details.email.length > 0 ? "block" : "none" }}>
          email not registered in our website
        </p>
        <div className="input-group mb-2 ">
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              <FaUserCircle style={{ color: "#83a4d4" }} />
            </span>
          </div>
          <input
            type="text"
            className="form-control changePlaceHolderSize"
            value={details.name}
            required
        // {...register("name", {
              //   required: "Name Required",
              // })}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              placeholder="Enter Name of the Person"
              id="form1"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>

          {errors.name &&
            <span className="errorsInreg">
              {errors.name.message}
            </span>
          }



        <div className="input-group mb-2">
          <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <BsFillPhoneFill style={{ color: "#83a4d4" }} />
              </span>
            </div>
            <input
              type="text"
              className="form-control changePlaceHolderSize"
              placeholder="Enter His/Her Mobile Number"
              required
              value={details.mobilenumber}
              onChange={(e) => handlePhoneNumber(e)}
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>





          <div className="mb-2" style={{ width: "100%" }}>
            <Select
              styles={customStyles}
              options={role}
              value={details.role}
              placeholder="Select Role"
              onChange={(e) => {
                setDetails({ ...details, role: e });
                if (e.value === "Sub-Admin") {
                  setLocation(true);
                } else {
                  setLocation(false);
                }
              }}
            />
          </div>

          {location ? (
          <Fragment>

            <div className="mb-2" style={{ width: "100%" }}>
              <input
                className="form-control"
                type="text"
                value={profiledata.state}
                aria-describedby="basic-addon1"
              />
            </div>

              <div className="mb-2" style={{ width: "100%" }}>
                <Select
                  styles={customStyles}
                  isMulti
                 isSearchable
                  rules={{ required: "This field is required" }}
                  // value={details.location}
                  options={city}
                  placeholder="Select City"
                  onChange={(e) => {
                    console.log(e);
                    setDetails({ ...details, multilocation: e }); // Set location to e, not state
                  }}
                />
              </div>
              
            </Fragment>
          ) : (
            <div className="mb-2" style={{ width: "100%" }}>
              <Select
                styles={customStyles}
                onInputChange={handleCityChange}
                rules={{ required: "This field is required" }}
                value={details.state}
                options={state}
                placeholder="Select state"
                onChange={(e) => {
                  console.log(e);
                  setDetails({ ...details, state: e }); // Set location to e, not state
                }}
              />
            </div>
          )}



          <div className="mb-2" style={{ width: "100%" }}>
            {/* <input type="text" value={details.industry} onChange={(e) => setDetails({ ...details, industry: e.target.value })} class="form-control" placeholder="Industry" aria-label="First name" /> */}
            <Select
              styles={customStyles}
              options={featureRoleOption}
              isSearchable={true}
              isMulti
              onChange={handleSelectIndustry}
              placeholder="Select Featured Role"
              value={selectedfeatureRoleOption}
            />
          </div>



     
          <button
  style={{
    marginTop: "10px",
    backgroundColor: "#83a4d4",
    color: "white",
  }}
  className="w-100 btn"

  onClick={()=>{signupDetails()}}

  disabled={emailerror === false && details.email.length > 0}


>
  Invite
</button>

        </form>
      
 </div>
    
  );
}

export default Admininvite;
