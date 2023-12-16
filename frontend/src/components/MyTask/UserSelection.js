
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// import Select from 'react-select';
import './admindashboard.css'
import Select from "react-dropdown-select";
import MyContext from '../../mycontext';
import Sidebar from '../Dashboard/Sidebar';
import MyTaskSideBar from './MyTaskSideBar';
import MyTaskDetails from './MyTaskDetails';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Dashboard/Loader';

const UserSelection = ({ show, onHide, onSave, clearselectedrole, iuid, taskname, fetchData }) => {



  const location = useLocation();

  const state = location.state;




  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState("")

  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(4); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const rows = [
    // Your data here
  ];

  // Calculate the total number of pages based on data length and rowsPerPage
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Calculate the starting and ending indices for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };


  const handleCheckboxChange = (event, id) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[id] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };


  const [selectedUsers, setSelectedUsers] = useState([]);

const [selectrole,setselectrole]=useState("")

  const [usersData, setusersData] = useState([])

  const [City, setCity] = useState("")

  const [selectedCity, setSelectedCity] = useState("");



  const { profiledata } = useContext(MyContext)

  const [isLoading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    location: ""
  })

if(!(state && state.taskname)){

navigate("/mytask")

}







  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city`)
      .then((res) => {

        setCity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      if(profiledata.AdditionalPortalAccess=="Admin"){


        setselectrole("Sub-Admin")

      }


   
   



  }, []);






  // city ''''''''''''''''''''



  function handleCityChange(selectedOption) {
    setSelectedCity(selectedOption);



  };

  // selected city.......................


  // city...................




  useEffect(() => {
    async function fetchData() {
      try {
        if (selectrole) {
          let data = {
            role: selectrole,
            userId:localStorage.getItem("id"),
            location: selectedCity || "", // Default to empty string if selectedCity is falsy

            inputValue:inputValue
          };


  
          const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/filter`, data);
          setusersData(response.data.result);
          console.log("User data:", response.data, selectedCity);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors as needed, e.g., set an error state
      }
    }
  
    fetchData();
  }, [selectrole, selectedCity,inputValue]);
  


  // assign task...........................................................



  async function assigntask() {





    if (state && state.taskname == "education" && profiledata) {

      setLoading(true)

      const data = { assigneduserids: selectedUsers, college: state.data.college, qualification: state.data.qualification, assignedby: profiledata._id, iuid: state.iuid }




      const assignededures = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/assigneducationtask`, data)

      if (assignededures.data) {


        navigate("/mytask")

        alert("education task assigned sucessfully...........")

      }

      setLoading(false)
      setSelectedUsers([])

    }


    if (state && state.taskname == "job") {

      setLoading(true)

      const data = { assigneduserids: selectedUsers, companyname: state.data.companyName, experienceStart: state.data.experienceStart, assignedby: profiledata._id, iuid: state.iuid }




      const assignedjobres = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/assignjobtask`, data)


      if (assignedjobres.data) {

        navigate("/mytask")

        alert("job task assigned sucessfully...........")

        

      }

      setLoading(false)
      setSelectedUsers([])

    }





  }





  console.log(iuid, taskname, selectedUsers)





  // function to handle userselect.........................





  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };




  // function to handle select all

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      if (usersData) {
        const allUserIds = usersData.map((user) => user._id);

        setSelectedUsers(allUserIds);
      }



    }
    setSelectAll(!selectAll);
  };






  const [isFocused, setIsFocused] = useState(false); // New state for focus



  const [isExpanding, setIsExpanding] = useState(false); // New state for expanding animation




  const handleInputChange = (e) => {
    setInputValue(e.target.value);

  };





  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsExpanding(false);


    // setShowSuggestions(false)
  };







  console.log("state.....",state)

  console.log("selecteddata",selectedUsers)



  return (
    <div className="" style={{ overflow: "scroll" }}>


{isLoading ? (
            // <div>Loading...</div> 

            <Loader />) : (

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="mytask" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />


          <div className={`search-bar-container ${isFocused ? 'focused' : ''}`}>
            <div className="search-icon" style={{ display: 'flex' }}>
              <div className="InputContainer">
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={handleInputFocus}
                  onKeyUp={(e) => handleInputChange(e)}
                  onBlur={handleInputBlur}
                  className={`form-control ${isExpanding ? 'expanding' : ''}`}
                  id="Searchbar-Input"
                />
              </div>




{/* this is for admins............... */}


{(profiledata.role=="Admin"||profiledata.AdditionalPortalAccess=="Admin")&&
<>


<div style={{ marginLeft: '10px' }}>



{/* <Button onClick={()=>{setselectrole('Admin')}} style={{color:selectrole=="Admin"?"red":""}}>Admin</Button>*/}

<Button onClick={()=>{setselectrole('Sub-Admin')}} style={{color:selectrole=="Sub-Admin"?"red":""}}>Sub Admin</Button>
<Button onClick={()=>{setselectrole('ichp')}} style={{color:selectrole=="ichp"?"red":""}}>ICHP</Button>
</div>


<div className="mb-3">
<label htmlFor="select-location" className="form-label">Select location</label>
<Select id="select-location"  options={City} onChange={(values) => handleCityChange(values[0].value)} />
</div>
</>
}






{/* it is for team lead....................... */}


{(profiledata.AdditionalPortalAccess=="Sub-Admin")&&
<>


<div style={{ marginLeft: '10px' }}>

<Button onClick={()=>{setselectrole('Team Member')}} style={{color:selectrole=="Admin"?"red":""}}>Team Members</Button>

</div>


 <div className="mb-3">
<label htmlFor="select-location" className="form-label">Select location</label>
<Select id="select-location"  options={City} onChange={(values) => handleCityChange(values[0].value)} />
</div> 
</>
}

          

            </div>
          </div>



          <div className="container-lg container-xl bg-light mt-3">
          <div style={{display: "flex"}}>
            <label htmlFor="rowsPerPage">Rows per page:</label>
            <select
            
              id="rowsPerPage"
              onChange={handleRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>


            <p style={{marginLeft:"50px",fontWeight:"bold",color:"blue"}}>now you are assigning {state&&state.taskname?state.taskname:""}... Task Select Below</p>

          </div>

            <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">
                
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <label>Select all</label>
                </th>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">location</th>
                <th scope="col">email</th>
                <th scope="col">edu task</th>
                <th scope="col">job task</th>
                <th scope="col">Company Tasks</th>
                </tr>
              </thead>
              <tbody>

                {
                  usersData && usersData.length > 0 ? usersData.map((data, i) => {


                    return (
                      <tr>

                        <td>
                        <input
                            type="checkbox"
                            name={data.id}
                            checked={selectedUsers.includes(data._id)}
                             onChange={() => handleUserSelect(data._id)}
                          />

                        </td>
                        <th scope="row">{i}</th>
                        <td>{data.name}</td>
                        <td>{data.location?data.location:data.state}</td>
                        <td>{data.email?data.email:"-"}</td>
                        <td>{data.acceptededucationtask&&data.acceptededucationtask.length>0?data.acceptededucationtask.length:"-"}</td>
                        <td>{data.acceptedjobtask&&data.acceptedjobtask.length>0?data.acceptedjobtask.length:"-"}</td>

                        <td>-</td>
                      </tr>


                    )




                  })



                    : ""
                }



             

              </tbody>
            </table>


          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
           
          </div>
          <div >
          <button type='button' style={{backgroundColor: "rgb(3, 104, 104)", color:"white"}}  onClick={()=>{assigntask()}}>Assign</button>
          </div>
        </div>
        </div>

      </div>
            )}
    </div>
  );

};



export default UserSelection;
