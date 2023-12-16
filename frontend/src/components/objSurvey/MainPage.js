import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LookingForJob from "./LookingForJob";
import LookingToHire from "./LookingToHire";
import Collaborate from "./Collaborate";
import BuildNetwok from "./BuildNetwork";
import Mentorship from "./Mentorship";
import Mentoring from "./Mentoring";
import ForInvest from "./ForInvest";
import ToInvest from "./ToInvest";
import Adertise from "./Advertise";
import Affiliate from "./Affiliate";
import axios from "axios";
import LoaderModal from "../spinner/spinnerStyle";
import Sidebar from "../Dashboard/Sidebar";
import Details from "../Dashboard/Details"



export default function MainPage() {
  const [city, setCity] = useState([]);
  const location = useLocation();

  let state = location.state || null;



  if (state === null) {
    // Redirect to dashboard if state is null
    navigate("/dashboard");
   
  }



  const [industry, setIndustry] = useState([]);
  const [functionalArea, setFunctionalArea] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);

  // let [state, setState] = useState(location.state || null);
  const [pageName, setPageName] =useState("");
  const [survey, setSurvey] =useState("");


  useEffect(() => {
    if (state && state.priority) {
      const currentSurvey = state.priority[pageNo];
      setPageName(state[currentSurvey]?.value || "");
      setSurvey(state.priority[pageNo]);
    }
  }, [flag, state, pageNo]);



  // useEffect(() => {
  //   console.log(state.priority);
  //   let currentSurvey = state["priority"][pageNo];
  //   setPageName(state[currentSurvey].value);
  //   setSurvey(state["priority"][pageNo]);
  // }, [flag,state,pageNo]);
  
  function previous() {
    if (pageNo === 0) {
      navigate("/dashboard");
    } else {
      setPageNo((prevPageNo) => prevPageNo - 1);
      changeNavigation();
    }
  }

  // function previous() {
  //   setPageNo(pageNo - 1);
  //   if (pageNo === 0) {
  //     navigate("/dashboard");
  //   } else {
  //     changeNavigation();
  //   }
  // }

  // function changeNavigation() {
  //   console.log("Enter");
  //   handleButtonClick();

  //   let currentSurvey = state["priority"][pageNo];
  //   setFlag(!flag);
  //   setPageName(state[currentSurvey].value);
  //   setSurvey(state["priority"][pageNo]);
  //   console.log(survey, pageName);
  // }

  function changeNavigation() {
    if (state && state.priority) {
      const currentSurvey = state.priority[pageNo];
      setFlag(!flag);
      setPageName(state[currentSurvey]?.value || "");
      setSurvey(state.priority[pageNo]);
    }
  }






  // function next() {
  //   setPageNo(prevState=>prevState+1);
  //   handleButtonClick();
  //   // console.log("enter after handlebuttonclick");
  //   // console.log(state.length);
  //   if (state.length === pageNo) {
  //     navigate("/dashboard");
  //   } else {
  //     changeNavigation();
  //   }
  // }

  function next() {
    if (state && state.priority && state.priority.length > pageNo) {
      setPageNo((prevPageNo) => prevPageNo + 1);
      handleButtonClick();
      if (state.priority.length === pageNo + 1) {
        navigate("/dashboard");
      } else {
        changeNavigation();
      }
    }
  }

  const handleButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }


  const handleCityChange = (inputValue) => {
    console.log(inputValue);
    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
        .then((res) => {

          setCity(res.data);
        })
    }
  };
  const handleDesignationChange = (inputValue) => {

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/designation/${inputValue}`)
        .then((res) => {
          setDesignation(res.data);
        })
    }
  };
  const handleInputChange = (inputValue) => {
    console.log(inputValue);
    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/skills/${inputValue}`)
        .then((res) => {
          const newSkills = [];
          const val = res.data;
          console.log("Fetching another data")
          val.map((e) => {
            newSkills.push({
              value: e.allSklls,
              label: e.allSklls,
            });
            return null
          });
          console.log(newSkills);

          setSkills(newSkills);
        })
    }
  };



  const handleFunctionalAreaChange = (inputValue) => {
    console.log(inputValue);
    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/functionalarea/${inputValue}`)
        .then((res) => {
          setFunctionalArea(res.data);
        })
    }
  };
  useEffect(() => {


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
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/functionalArea`)
      .then((res) => {


        setFunctionalArea(res.data);
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
          return null
        });
        console.log(newSkills);

        setSkills(newSkills);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);









  
  return (
    <div style={{backgroundColor:"transparent"}}>
      <div className="row flex-nowrap" style={{ width: "100%",border:0 }}>
        <Sidebar />
        <div className="col container" style={{ maxWidth: "80%",border:0 }}>
          <Details />
          <hr />


          <div
            style={{ backgroundColor:"transparent", height: "79vh", marginTop: "20px"}}

          >
            { }
            <div style={{ display: "flex"}}>
              <a href="editprofile"
                style={{ marginLeft: "10px" }}
                className=" mt-3">
                Back  to edit profile
              </a>
            </div>
            {(() => {
              switch (survey) {
                case "reason":
                  return (
                    <Fragment>
                      {pageName === "Looking for job" ? (
                        <div

                          style={{
                            width: "100%",
                          
                          }}
                        >
                          <LookingForJob
                            handleCityChange={handleCityChange}
                            handleDesignationChange={handleDesignationChange}
                            handleFunctionalAreaChange={handleFunctionalAreaChange}
                            handleInputChange={handleInputChange}
                            AllCities={city}
                            AllIndustry={industry}
                            AllFunctionalArea={functionalArea}
                            AllSkills={skills}
                            AllDesignation={designation}
                            previous={previous}
                            pageNo={pageNo}
                            next={next}
                          />
                        </div>
                      ) : (
                        <LookingToHire
                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation}
                          previous={previous} next={next} />
                      )}
                    </Fragment>
                  );

                case "connection": {
                  return (
                    <Fragment>
                      {pageName === "Looking to collabrate" ? (
                        <Collaborate
                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation}

                          previous={previous} next={next} />
                      ) : (
                        <BuildNetwok

                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation}
                          previous={previous} next={next}
                        />
                      )}
                    </Fragment>
                  );
                }
                case "relation":
                  return (
                    <Fragment>
                      {pageName === "Seeking Mentorship" ? (
                        <Mentorship previous={previous} next={next}
                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation}
                        />
                      ) : (
                        <Mentoring
                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation} previous={previous} next={next} />
                      )}
                    </Fragment>
                  );
                case "savings":
                  return (
                    <Fragment>
                      {pageName === "Looking for investments" ? (
                        <ForInvest

                          handleCityChange={handleCityChange}

                          handleFunctionalAreaChange={handleFunctionalAreaChange}

                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}


                          previous={previous} next={next} />
                      ) : (
                        <ToInvest


                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                         
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          
                          previous={previous} next={next} />
                      )}
                    </Fragment>
                  );
                case "marketing":
                  return (
                    <Fragment>
                      {pageName === "Advertise" ? (
                        <Adertise
                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation}

                          previous={previous} next={next} />
                      ) : (
                        <Affiliate


                          handleCityChange={handleCityChange}
                          handleDesignationChange={handleDesignationChange}
                          handleFunctionalAreaChange={handleFunctionalAreaChange}
                          handleInputChange={handleInputChange}
                          AllCities={city}
                          AllIndustry={industry}
                          AllFunctionalArea={functionalArea}
                          AllSkills={skills}
                          AllDesignation={designation}
                          previous={previous} next={next} />
                      )}
                    </Fragment>
                  );
                default: {
                  return null;
                }
              }
            })()}
          </div>
          <LoaderModal isOpen={isLoading} />
        </div>


      </div>
    </div>
  );
}
