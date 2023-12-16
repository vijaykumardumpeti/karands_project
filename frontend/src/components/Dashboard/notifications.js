import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";

import axios from "axios";

import audiofile from "../../assets/alert1.mp3"; // Adjust the file path accordingly

const NotificationComponent = ({
  anchorEl,
  handleClose,
  profiledata,
  handlemessagecount,
}) => {
  const [messages, setMessages] = useState([]);



const [flag,setflag]=useState(false)




  // Function to update the number of messages that are read

  async function updateMessageReadCount(userId, messageCount) {
    try {
      const data = {
        userId: userId,
        messagecount: messageCount,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/updatemessagecount`,
        data
      );

      if (res) {
        console.log(res);

        handlemessagecount(messageCount);
      }
    } catch (error) {
      console.error("Error updating message count:", error);
    }
  }

  const fetchMessages = async () => {
    if (profiledata._id) {
      try {
        const data = {
          userid: profiledata._id,
        };

        const res = await axios.post(
          `${process.env.REACT_APP_IP_ADDRESS}/karands/users/fetchalerts`,
          data
        );

        if (res.data.alerts) {
          setMessages(res.data.alerts);

          // Update the message read count
          const messageCount = res.data.alerts.length;

          updateMessageReadCount(profiledata._id, messageCount);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {
    if (anchorEl) {
      fetchMessages();
    }
  }, [anchorEl, profiledata,flag]);







// if message type is invitation accept the invitation as team emember in admin dashboard


// here tEAM mmeber .........




  async function AcceptingTeamInvitation(TeamLeadEmail, messageId) {



    if (TeamLeadEmail && messageId) {


      const data = {

        TeamMemberEmail: profiledata.email,
        TeamLeadEmail: TeamLeadEmail,
        messageId: messageId

      }




      console.log("message clicked data",data)


      const acceptres = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/AcceptingTeamInvite`,
        data
      )





      if (acceptres) {
        console.log("acceptres", acceptres)

     setflag(!flag)

      }
    }

    if(!TeamLeadEmail && messageId){

      alert("Not a valid message!!!")
    }




  }





































  return (
    <div >
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{
          top: "5%",

          right: "30px",
          maxHeight: "500px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {messages && messages.length > 0 ? (
            messages.map((data, index) => (
              <div key={index} style={{ minWidth: "200px" }}>

                <>
                  <ListItem alignItems="flex-start">
                    {/* {data.data && data.data.companylogo ? ( */}
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={data.data.profilepic}
                      />
                    </ListItemAvatar>
                    {/* ) : (
                        ""
                      )} */}
                    <ListItemText
                      primary={data.subject ? data.subject : ""}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {/* {data.data ? data.data.concernPerson : ""} */}
                          </Typography>
                          {data.content ? data.content : ""}
                          <p
                            style={{
                              fontFamily: "YourFont",
                              color: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {data.date ? data.date : ""}
                          </p>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  {data.messagetype && data.messagetype == "show accept button" ? <>


                    <ListItem
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "16px",
                      }}
                    >
                      <Button variant="contained" color="primary" onClick={()=>{AcceptingTeamInvitation(data.data&&data.data.TeamLeadDetails.email?data.data.TeamLeadDetails.email:"",data._id?data._id:"")}}>
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: "10px" }}
                      >
                        Decline
                      </Button>
                    </ListItem>




                  </> : ""}


                  <Divider variant="inset" component="li" />
                </>

              </div>
            ))
          ) : (
            <Typography>No messages to display.</Typography>
          )}
        </List>
      </Menu>
    </div>
  );
};

export default NotificationComponent;
