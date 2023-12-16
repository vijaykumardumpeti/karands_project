import { Avatar } from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FcSearch } from "react-icons/fc";
import "./messages.css";
import MyContext from '../../mycontext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { BiSolidUserCircle } from "react-icons/bi"
function MessageBox({ handleclickdiv, recipient, userid }) {
    const [vision, setVision] = useState(false);


    const [isExpanded, setIsExpanded] = useState(false);

    const [calllogs, setCalllogs] = useState("")



    const { animationDivs } = useContext(MyContext);

    const [topPosition, setTopPosition] = useState(window.innerHeight);

    const handleclick = () => {
        setIsExpanded(!isExpanded);
    };

    // const [calllogs, setCalllogs] = useState([]);    


    const [userDetails, setUserDetails] = useState([]);



    useEffect(() => {
        // Fetch call logs from the API
        fetchCallLogs();

    }, [recipient]);



    const fetchCallLogs = async () => {

        console.log("triggering fetchCallLogs")



        try {


            const data = {
                folderName: localStorage.getItem("id")
            }

            console.log("response calllogs userid", localStorage.getItem("id"))

            const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/api/textfiles`, data)


            console.log("response calllogs response", response)



            if (response.data.calllogs) {

                setCalllogs(response.data.calllogs);
                fetchUserDetails(response.data.calllogs);
            }




        }


        catch (error) {
            console.error('Error fetching call logs:', error);
        }
    };








    const fetchUserDetails = async (userIds) => {
        try {
            // Fetch user details for each userid in the calllogs array
            const promises = userIds.map(async (userid) => {
                const response = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${userid}`);



                return response.data.details;


            });

            // Wait for all promises to resolve and set the user details in state

            const userDetails = await Promise.all(promises);

            console.log("userDetails", userDetails)

            setUserDetails(userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };


    // delete function ........................................................




    //    async function deletefunction(event,folderName){

    //      event.stopPropagation();

    //      const res=await axios.delete(`${process.env.REACT_APP_IP_ADDRESS}/api/folders/${folderName}`)




    //    }

    async function deletefunction(event, filename) {

        event.stopPropagation();

        const data = {

            folderName: localStorage.getItem("id"),
            fileName: filename

        }

        console.log(data)

        const res = await axios.delete(`${process.env.REACT_APP_IP_ADDRESS}/api/deletefile`, { data: data, });


        fetchCallLogs()

    }

    useEffect(() => {
        // Get a reference to your bottom div
        const bottomDiv = document.getElementById('bottom-div');
    
        // Function to update the position of the bottom div
        function updateBottomDivPosition() {
          const windowHeight = window.innerHeight;
          const divHeight = bottomDiv.offsetHeight;
          const topPosition = windowHeight + window.scrollY - divHeight;
          bottomDiv.style.top = topPosition + 'px';

          
        }
    
        // Call the function initially
        updateBottomDivPosition();
    
        // Listen for window resize events and scroll events to update the position
        window.addEventListener('resize', updateBottomDivPosition);
        window.addEventListener('scroll', updateBottomDivPosition);
    
        // Clean up the event listeners when the component unmounts
        return () => {
          window.removeEventListener('resize', updateBottomDivPosition);
          window.removeEventListener('scroll', updateBottomDivPosition);
        };
      }, []);



      useEffect(() => {
        // Get a reference to your bottom div
        const bottomDiv = document.getElementById('bottom-div');
    
        // Function to update the position of the bottom div
        function updateBottomDivPosition() {
          const divHeight = bottomDiv.offsetHeight;
    
          // Calculate the top position based on vision state and scroll position
          const newTopPosition = vision ? window.innerHeight + window.scrollY - divHeight : window.innerHeight + window.scrollY - divHeight
    
          // Update the top position
          setTopPosition(newTopPosition);
        }
    
        // Call the function initially
        updateBottomDivPosition();
    
        // Listen for window resize events and scroll events to update the position
        window.addEventListener('resize', updateBottomDivPosition);
        window.addEventListener('scroll', updateBottomDivPosition);
    
        // Clean up the event listeners when the component unmounts
        return () => {
          window.removeEventListener('resize', updateBottomDivPosition);
          window.removeEventListener('scroll', updateBottomDivPosition);
        };
      }, [vision]);







    
      function setVisionFunction() {
        setVision(!vision);
      }





    return (
        <div id='bottom-div' className='messageboxfull' style={{ top: `${topPosition}px`, height: vision ? "450px" : "50px", paddingBottom: vision ? "20px" : "", cursor: "pointer" }}>
            <div onClick={() => setVisionFunction()} className='messageHeader' >
                <div className='messagelogo'>
                    <Avatar />
                    <h5 style={{ marginTop: "10px", marginLeft: "15px" }}>Messaging</h5>
                </div>
                <span >{vision ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
            </div>

            {
                vision ? <Fragment>
                    <hr />
                    <div className="input-group mb-3 searchalgorithm">
                        <input
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                borderTopLeftRadius: "25px",
                                borderBottomLeftRadius: "25px",
                            }}
                            type="text"
                            className="form-control searchinputbox"
                            placeholder="search"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <div
                            className="input-group-append"

                        >
                            <span
                                style={{
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

                                    borderTopRightRadius: "25px",
                                    borderBottomRightRadius: "25px",
                                }}
                                className="input-group-text"
                                id="basic-addon2"
                            >
                                <FcSearch />
                            </span>
                        </div>
                    </div>

                    <div className="messagelog" style={{ overflow: "scroll", overflowX: "hidden", marginTop: "10px", padding: "10px", height: "70%" }} >
                        {/* <h8>messages</h8> */}


                        {

                            userDetails.length === 0 ?


                                <Fragment>

                                    <img style={{ width: "50%", height: "50%" }} src='http://static.vecteezy.com/system/resources/thumbnails/025/275/254/small_2x/woman-studying-at-study-desk-free-vector.jpg'></img>

                                    <h5 className='text-light' >No Messages Yet</h5>






                                </Fragment>

                                :

                                userDetails.map((data, index) => {


                                    return (
                                        <div>

                                            {
                                                data&&data._id != localStorage.getItem("id") ?
                                                    <Fragment>
                                                        <div class="eachmessage" style={{ width: "100%", height: "40px", display: "flex", alignItems: "center" }} >

                                                            <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                                                                <div style={{ width: "80%", display: "flex", paddingLeft: "10px", alignItems: "center" }}>
                                                                    <div onClick={(e) => { handleclickdiv(e, data) }} >
                                                                        <span > <BiSolidUserCircle style={{ fontSize: "30px", color: "gray" }} /></span>
                                                                    </div>

                                                                    <div>



                                                                        <h6 style={{ marginLeft: "20px" }} onClick={(e) => { handleclickdiv(e, data) }}>{data.fullName}</h6>



                                                                    </div>

                                                                </div>
                                                                <div style={{ width: "17%" }}>
                                                                    <div class="dropdown" >

                                                                        <i class="bi bi-three-dots-vertical" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: "pointer" }}></i>




                                                                        <div style={{ zIndex: "1" }} class="dropdown-menu" aria-labelledby="dropdownMenuButton">





                                                                            <a class="dropdown-item" href="#" onClick={(e) => deletefunction(e, data._id)}>Delete</a>




                                                                            {/* report is open for other users only not own user */}

                                                                            <a class="dropdown-item" href="#">unfollow</a>


                                                                            {/* report is open for other users only not own user */}




                                                                        </div>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                        {

                                                            userDetails.length != index + 1 && <hr />
                                                        }
                                                    </Fragment>
                                                    : ""
                                            }



                                        </div>




                                    )


                                })


                        }





                    </div>
                </Fragment> :
                    <></>
            }
        </div>
    )
}

export default MessageBox;
