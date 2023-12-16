
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

import CloseIcon from '@mui/icons-material/Close';

import Modal from 'react-modal';



const customforreport = {
  content: {
    width: '400px',       // Adjust the width as needed
    height: '300px',      // Adjust the height as needed
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the modal on the screen
    overflow: "hidden",
    zIndex: 2
  },
};





const Assignedtasks = () => {



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






// empin modal....

  const [modalIsOpen, setIsOpen] = React.useState(false);





  const closeModal = () => {
    setIsOpen(false);
  }



  const postReportClick = () => {

    setIsOpen(true);



  }






  const { profiledata } = useContext(MyContext)

  const [isLoading, setLoading] = useState(false);


  const [assigneddata, setAssignedData] = useState([]);

  const [taskname,settaskname]=useState("")




  async function fetchData() {
    try {
      setLoading(true);

      if (taskname === 'education' && profiledata) {
        const data = {
          name: inputValue,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getassignededucationtask/${profiledata._id}`,
          data
        );

        if (response.data.result) {
          setAssignedData(response.data.result); // Set the assigned data in the state
        }
      } else if (taskname === 'job' && profiledata) {
        const data = {
          name: inputValue,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/getassignedjobtask/${profiledata._id}`,
          data
        );

        if (response.data.result) {
          setAssignedData(response.data.result); // Set the assigned data in the state
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle errors as needed, e.g., set an error state
    }
  }

  useEffect(() => {
    fetchData();
  }, [inputValue, taskname, profiledata,modalIsOpen]); // Trigger the fetch when inputValue, taskname, or profiledata changes







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









// function to handle to confirm empin....


const [empin, setEmpin] = useState(""); // Adjust the variable name to match your state

async function confirmEmpin() {
  try {
    if (empin.length > 3) {
      const empinRes = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/verifyempinofuser/${profiledata._id}`, { empin });
      
      if (empinRes.data.empin) {
        console.log(empinRes.data.empin);


        // here we can handle ythe change the status function




            // const changestatus=await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands`)










        closeModal()


      } else {
        alert("empin is not correct");
      }
    } else {
      alert("Please enter a proper empin.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    alert("An error occurred while verifying empin.");
  }
}





























  return (
    <div className="" style={{ overflow: "scroll" }}>


{isLoading ? (
            // <div>Loading...</div> 

            <Loader />) : (

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="mytask" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />


{/* search bar............................ */}

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

                  <div style={{ marginLeft: '10px' }}>

                    <Button onClick={()=>{settaskname("education")}}>Education task</Button>
                    <Button onClick={()=>{settaskname("job")}}>Job task</Button>
                    <Button onClick={()=>{settaskname("company")}}>Companies</Button>

                  </div>

            </div>
          </div>




{/* assigned education ataskk table................... */}

              {
                taskname === "education" ?

                  <div className="container-lg container-xl bg-light mt-3">
                    <div style={{ display: "flex" }}>




                    </div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">name</th>
                          <th scope="col">college name</th>
                          <th scope="col">qualification</th>
                          <th scope="col">Assigned date</th>
                          <th scope="col">Assigned to</th>
                          <th scope="col">Accepted user</th>
                          <th scope="col">Accepted date</th>
                          <th scope="col">status</th>
                          <th scope="col">Confirm Status</th>

                        </tr>
                      </thead>
                      <tbody>

{
  assigneddata&&assigneddata.length>0?
  
  assigneddata.map((data,i)=>{

   return(
    <>
    <tr>
      <td>{i+1}</td>
        <td>{data.userdetails?data.userdetails.name:"-"}</td>
        <td>{data.college?data.college:"-"}</td>
        <td>{data.qualification?data.college:"-"}</td>
        <td>{data.date?data.date:"-"}</td>
        <td><ul>{data.Assigneduseremails?data.Assigneduseremails.map((list)=>{return(<><li>{list}</li></>)}):""}</ul></td>
        <td>{data.Accepteduser?data.Accepteduser:"-"}</td>
        <td>{data.Accepteddate?data.Accepteddate:"-"}</td>
        <td>{data.status?data.status:"-"}</td>
        <td><Button onClick={()=>{postReportClick()}}>confirm status</Button></td>
      

    </tr>
    
    </>
   )

  })
  
  :""
}


                       
                      </tbody>
                    </table>


                  </div> : ""
              }
              


{/* assigned job ataskk table................... */}

{
                taskname === "job" ?

                  <div className="container-lg container-xl bg-light mt-3">
                    <div style={{ display: "flex" }}>




                    </div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">name</th>
                          <th scope="col">company name</th>

                          <th scope="col">Assigned date</th>
                          <th scope="col">Assigned to</th>
                          <th scope="col">Accepted user</th>
                          <th scope="col">Accepted date</th>
                          <th scope="col">status</th>
                          <th scope="col">Confirm Status</th>

                        </tr>
                      </thead>
                      <tbody>

                        {
                          assigneddata && assigneddata.length > 0 ?

                            assigneddata.map((data, i) => {

                              return (
                                <>
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{data.userdetails ? data.userdetails.name : "-"}</td>
                                    <td>{data.companyname ? data.companyname : "-"}</td>

                                    <td>{data.date ? data.date : "-"}</td>
                                    <td><ul>{data.Assigneduseremails ? data.Assigneduseremails.map((list) => { return (<><li>{list}</li></>) }) : ""}</ul></td>
                                    <td>{data.Accepteduser ? data.Accepteduser : "-"}</td>
                                    <td>{data.Accepteddate ? data.Accepteddate : "-"}</td>
                                    <td>{data.status ? data.status : "-"}</td>
                                    <td><Button onClick={() => { postReportClick() }}>confirm status</Button></td>


                                  </tr>

                                </>
                              )

                            })

                            : ""
                        }



                      </tbody>
                    </table>


                  </div> : ""
              }
              



        </div>

      </div>
            )}


      {/* modal for confirm empin */}



      <Modal
        isOpen={modalIsOpen}

        onRequestClose={closeModal}
        style={customforreport}
        contentLabel="Example Modal"
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={closeModal} style={{ border: 'none', background: 'transparent' }}>
            <CloseIcon /> {/* Replace the text with the CloseIcon */}
          </button>
        </div>

        <div>

          <p>Confirm your empin to confirm the status of assigned task. if you dont remember!! empin go my account generate it

          </p>
          <hr></hr>


          <label htmlFor="empin">Confirm your empin...</label>



          <input type='text' id='empin' placeholder='confirm your empin' onChange={(e)=>{setEmpin(e.target.value)}}></input>




        </div>

        <Button style={{ background: 'blue', color: 'white' }} onClick={() => { confirmEmpin() }}>
          Submit empin
        </Button>
      </Modal>











    </div>
  );

};



export default Assignedtasks;
