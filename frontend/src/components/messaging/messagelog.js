import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./messages.css"
import { Avatar } from '@mui/material'
import MyContext from '../../mycontext';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Messagelog({ handleclickdiv, recipient, userid }) {






// call log menu operating



const [anchorEl, setAnchorEl] = useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};




















  const [isExpanded, setIsExpanded] = useState(false);

  const [calllogs, setCalllogs] = useState("")



  const { animationDivs } = useContext(MyContext);



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


  // delete function ...................................................work on it.....




  async function deletefunction(event, folderName) {

    event.stopPropagation();

    const res = await axios.delete(`${process.env.REACT_APP_IP_ADDRESS}/api/folders/${folderName}`)




  }



  // delete function ........................................................




  return (

    <Fragment>



      <div
        className={`animate-div ${isExpanded ? 'expanded' : ''} `} id="bottom-div"
>

        <div style={{ width: "100%" }}>

          <div className={isExpanded ? "message-top" : ""} onClick={handleclick} style={{ display: "flex", position: "absolute", top: "0", left: "0", height: "10%", width: "100%", borderBottom: isExpanded ? "1px solid lightgray" : "" }}    >


            {/* <div className='messages-top' onClick={handleclick} style={{ display: "flex", position: "absolute", top: "0", left: "0", height: "10%", width: "100%", backgroundColor: isExpanded ? "white" : "", borderBottom: isExpanded ? "1px solid lightgray" : "" }}    > */}
            {/* Add your Avatar and other content here */}

            <div>
              <Avatar />
            </div>
            <div>
              <h8 style={{ color: "black" }}>Messaging</h8>
            </div>



            <div>
              {

                isExpanded ? <img style={{ width: "10%" }} src='http://w7.pngwing.com/pngs/175/947/png-transparent-arrow-computer-icons-down-arrow-angle-black-desktop-wallpaper-thumbnail.png' alt='img' /> : <img style={{ width: "10%" }} src='http://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png' alt='img' />
              }



            </div>

          </div>
          {/* <hr style={{color:"black"}}></hr> */}




          {
            isExpanded ?
              <div >

                {/* <input placeholder='Search messages' style={{ position: "absolute", top: "12%", left: "4%", width: "91%", height: "6%", borderRadius: "2px", border: "none", backgroundColor: "#D3DFDF" }} /><br /> */}
                <div style={{ position: "absolute", top: "20%", backgroundColor: "", width: "100%", height: "3%", borderBottom: isExpanded ? "1px solid lightgray" : "" }}>

                </div>


              </div>
              : ""

          }

          <div className="messagelog" style={{ display: isExpanded ? "block" : "none", overflow: "scroll" }} >
            {/* <h8>messages</h8> */}


            {

              userDetails.length == 0 ?


                <Fragment>

                  <img style={{ width: "50%", height: "50%" }} src='http://static.vecteezy.com/system/resources/thumbnails/025/275/254/small_2x/woman-studying-at-study-desk-free-vector.jpg'></img>

                  <h5>No Messages Yet</h5>
                </Fragment>

                :

                userDetails.map((data) => {


                  return (
                    <div style={{ top: "5%" }}>

                      {
                        data._id !== localStorage.getItem("id") ?
                          <div style={{ margin: "5%" }} >



                            <div style={{ display: "flex" }} className='messagelog-user'>

                              <div onClick={(e) => { handleclickdiv(e, data) }}>
                                <Avatar />
                              </div>

                              <div>



                                <h6 onClick={(e) => { handleclickdiv(e, data) }}>{data.fullName}</h6>



                              </div>



                              <div>
                                <IconButton
                                  aria-controls="simple-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                  <MenuItem onClick={(e) => deleteFunction(e, data._id)}>Delete</MenuItem>
                                  <MenuItem>Unfollow</MenuItem>
                                </Menu>
                              </div>


                            </div>

                            <hr></hr>
                          </div> : ""
                      }



                    </div>




                  )


                })


            }





          </div>

        </div>


      </div>
    </Fragment>
  );
};



