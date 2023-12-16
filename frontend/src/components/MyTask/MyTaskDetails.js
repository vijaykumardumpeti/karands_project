import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidBell } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip'
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-tooltip/dist/react-tooltip.css';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import { Avatar } from "@mui/material";
import { IconButton, Menu } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import MyContext from "../../mycontext";


function MyTaskDetails() {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/adminlogin");  // Navigate to the desired route ("/")
    // // Close the current tab
    // window.close();
  }
  const [anchorEl, setAnchorEl] = useState();


  const { profiledata } = useContext(MyContext)


  // const { profiledata } = React.useContext(MyContext)


  if (!localStorage.getItem('id')) {
    navigate("/adminlogin")
  }


  if (profiledata && profiledata.role == "iu" && !profiledata.AdditionalPortalAccess == "Team Member" && !profiledata.AdditionalPortalAccess == "Sub-Admin") {




    navigate("/adminlogin")


  }




  if (profiledata && profiledata.role == "Super Admin") {


    navigate("/admin")


  }






  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl();
  };
  console.log("profiledata", profiledata)



  
  return (
    <div
      className="container-fluid"
      style={{ fontSize: "larger", fontWeight: "bolder", height: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}
    >
      <div>{

        profiledata ? <span className="text-light text-uppercase">{profiledata.fullName?profiledata.fullName: ""} Portal:<span style={{ color: "red" }}>{profiledata.AdditionalPortalAccess} </span></span> : ""
      }

      </div>
      <div style={{ display: "flex" }}>




        {
          profiledata.role == "ichp" ? "" : <>


            <div>
              <IconButton
                title="Notification"
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ color: "white", backgroundColor: "rgb(3, 104, 104)", marginRight: "10px" }}
              >
                <BiSolidBell />
              </IconButton>
            </div>





            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >


              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>


                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />


                </ListItem>


                <Divider variant="inset" component="li" />


                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />


                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Menu>



          </>}








        {
          profiledata.role == "ichp" ? "" : <>




            <Dropdown >
              <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "rgb(3, 104, 104)", color: "white", border: "none" }}>
                <span data-tooltip-id="my-tooltip" className="ms-3" data-tooltip-content={`${localStorage.getItem("fullName") ? localStorage.getItem("fullName") : ""}`}>
                  <FaUserAlt title="user profile" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/admin/account">My Account</Dropdown.Item>
                <Dropdown.Item href="/admin">Go to Admin DB </Dropdown.Item>
                <Dropdown.Item href="/">Go to User DB</Dropdown.Item>
                <Dropdown.Item onClick={() => { logout() }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Tooltip style={{ zIndex: "5" }} id="my-tooltip" />

          </>
        }


      </div>
    </div>
  )
}

export default MyTaskDetails
