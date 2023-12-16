import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import AdminDashboard from './AdminDashboard';
import Select from 'react-select';
import Admin from './TeamPage/Admin';
import UserImage from "../../assets/1.jpg";
import ConsultantPage from './TeamPage/ConsultantPage';
import MyContext from '../../mycontext';


import Modal from 'react-modal';

export default function TeamAdmin() {
  const [allUser, setAllUser] = useState([])
  const [city, setCity] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedRole, setSelectedRole] = useState([])
  const [selectedLocation, setSelectedLocation] = useState([]);
  let role = [
    {
      value: "Admin",
      label: "Admin"
    },
    {
      value: "Super Admin",
      label: "Super Admin"
    },
    {
      value: "Sub-Admin",
      label: "Sub-Admin"
    },
  ]


  const { profiledata } = useContext(MyContext)


  function handleFullFilter() {
    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/getFilter`, {
      role: selectedRole.value,
      industry: "",
      location: selectedLocation.map(e => e.value)
    })
      .then((res) => {
        let checkUser = res.data;
        if (checkUser.length === 0) {
          alert('No User Found');
          setAllUser([]);
          setSelectedIndustry([]);
          setSelectedLocation([]);
          setSelectedRole([])
        } else {
          setAllUser(res.data)
        }

      })
      .catch((err) => console.log(err))
  }



  function handleLocation() {
    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/location/getFilter`, {
      role: selectedRole.value,
      industry: "",
      location: selectedLocation.map(e => e.value)
    })
      .then((res) => {
        let checkUser = res.data;
        if (checkUser.length === 0) {
          alert('No User Found');
          setAllUser([])
          setSelectedIndustry([]);
          setSelectedLocation([]);
          setSelectedRole([])
        } else {
          setAllUser(res.data)
        }

      })
      .catch((err) => console.log(err))
  }




  function handleIndustry() {
    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/industry/getFilter`, {
      role: selectedRole.value,
      industry: "",
      location: selectedLocation.map(e => e.value)
    })
      .then((res) => {
        let checkUser = res.data;
        if (checkUser.length === 0) {
          alert('No User Found');
          setSelectedIndustry([]);
          setSelectedLocation([]);
          setSelectedRole([])
          setAllUser([])
        } else {
          setAllUser(res.data)
        }

      })
      .catch((err) => console.log(err))
  }
  function handleEverything() {
    console.log('called');
    handleLocation()

  }
  const handleSelect = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
      alert('Kindly Select any two Location')
    }

    setSelectedLocation(selected);
  };



  const handleCityChange = (inputValue) => {
    console.log(inputValue);

    if (inputValue.length >= 2) {
      axios
        .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
        .then((res) => {
          console.log(res.data);
          setCity(res.data);
        }).catch((err) => {
          console.log(err);
        });
    }
  };


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city`)
      .then((res) => {
        console.log(res.data);
        setCity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/industry`)
      .then((res) => {
        console.log(res.data);
        setIndustry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])



  const handleSelectIndustry = (selected) => {
    if (selected && selected.length > 3) {
      selected = selected.slice(0, 3); // Limit the selection to the first 3 options
      alert('Kindly Select any two Industry')

    }

    setSelectedIndustry(selected);
  };



console.log("profiledata",profiledata)

















  return (
    <div>



      <Box sx={{ display: 'flex' }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>


{/* implememnt this in future..... */}

          {/* <div style={{
            display: "flex",
            width: "80vw",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ width: "33%" }}>
              <Select
                options={city}
                onInputChange={handleCityChange}
                isMulti
                placeholder="Select Location"
                value={selectedLocation}
                onChange={handleSelect}
                styles={{
                  multiValueRemove: () => ({
                    display: 'none',
                  }),

                }}
              />
            </div>
            <div style={{ width: "33%" }}>
              <Select
                options={industry}
                isSearchable={true}
                defaultValue={selectedIndustry}
                isMulti
                placeholder="Select Industry"
                value={selectedIndustry}
                onChange={handleSelectIndustry}
                styles={{
                  multiValueRemove: () => ({
                    display: 'none',
                  }),
                }}
              />
            </div>
            <div style={{ width: "20%" }}>

              <Select
                options={role}
                value={selectedRole}

                placeholder="Select Role"

                onChange={(e) => setSelectedRole(e)}

              />
            </div>
            <button
              onClick={() => {
                if (selectedRole.value) {
                  handleEverything()
                } else {
                  alert('Select admin Type')
                }

              }}
              style={{
                borderRadius: "10px",
                color: "white",
                backgroundColor: "red", color: "white"
              }}

            >Check</button>
          </div> */}



          {
            allUser.length === 0 ? <div style={{
              display: "flex",
              width: "80vw",
              justifyContent: "space-between",
              alignItems: "center"
            }}>



             {!profiledata ? (
        <p>Loading...</p>
      ) : (
        profiledata && profiledata.role !== 'consultant' ? <Admin /> : <ConsultantPage />
      )}



            </div>
              :
              <div className="card">
                <div className="card-header" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <h4>Filter User</h4>

                </div>
                <div className="card-body">
                  <div style={{ width: "85vw", marginTop: "20px", display: "flex", backgroundColor:"whitesmoke" ,flexWrap: "wrap", justifyContent: "space-between" }}>
                    {
                      allUser.map((eachAdmin, index) => {
                        return(



                     <>
                     
          
                      <a>


                      <div className='teamPageCardViewForTeams'  >
                          <img alt='user' className='teamPageCardViewImage' src={UserImage} />
                          <div className='teamPageCardViewDetails'>
                            <span className='teamPageCardViewDetailsSPanTag'>Name: {eachAdmin.name}</span>
                            <span className='teamPageCardViewDetailsSPanTag'>Location: {eachAdmin.location}</span>
                            <span className='teamPageCardViewDetailsSPanTag'>Role: {eachAdmin.role}</span>
                            <span className='teamPageCardViewDetailsSPanTag'>Industry: {eachAdmin.industry}</span>
                            <span className='teamPageCardViewDetailsSPanTag'>Permission: {eachAdmin.permission}</span>
                          </div>
                        </div>
                      </a>
                        
                      </>
                       
                        )

                      })
                    }

                  </div>
                </div>
              </div>
          }
        </Box>
      </Box>
     
   
    </div >
  )
}
