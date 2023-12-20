
import { Avatar } from '@mui/material';
import './App.css';
import AllRoutes from './components/RoutingPart/AllRoutes';
//import Messagelog from './components/messaging/messagelog';
import MyContext from './mycontext';
import "./components/messaging/messages.css"
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { useState, useEffect, useRef } from "react";
import ExpandedDiv from './components/messaging/messages';
import MessageBox from './components/messaging/MessageBox';
import io from 'socket.io-client';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimationChild from "./AnimationChild"
import SessionTimeout from './components/authentication/sessiontimeout';
import ErrorComponent from './components/authentication/errorcomponent';
import { Button } from 'react-bootstrap';

// import AutoRotatePrompt from './components/authentication/autorotate';

function App() {
  const location = useLocation();

  // const routeName = location.pathname.split('/').filter(part => part)[0];



  const [imageFile, setImageFile] = useState(null);

  // const [isExpanded_div1, setIsExpanded_div1] = useState(false);

  const [animationDivs, setAnimationDivs] = useState([]);

  const [userid, setUserId] = useState("");

  const [recipient, setRecipient] = useState("");

  const [right, setRight] = useState(30)

  const [inputMessage, setinputMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [index, setindex] = useState(-1)

  const [expandedIndex, setExpandedIndex] = useState(-1); // Initialize the state to -1 (none expanded)

  const [messageuserdetails, setmessageuserdetails] = useState("")

  const [profiledata, setprofiledata] = useState("")

  const messageContainerRef = useRef();





  // calls the socket io api only its is in dahsboard page



  const socket = io(`${process.env.REACT_APP_IP_ADDRESS}`); // Replace with your backend server URL




  useEffect(() => {
    // Scroll to the bottom of the container whenever new messages are added
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);





  const inputMessageRef = useRef("");

  const imagefileref = useRef("")

  const handleInputChange = (e) => { 
    // Get the updated input value
    // Update the state with the new value
    inputMessageRef.current = e.target.value;
  };



  // this is used to getting profile picture and sending to all components using use context....
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
      .then((res) => {
        if (res.data.details) {
          setprofiledata(res.data.details)
        }
      }).catch(err => console.log(err))

  }, [])


  // Function to handle image upload.........................................................................................
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      imagefileref.current = file
    }
  };
  function closedivs() {

    setAnimationDivs("")
  }


  const sendImage = async () => {

    const imagesfile = imagefileref.current;


    if (imagesfile) {
      const formData = {

        file: imagesfile
      }

      // console.log(formData)

      try {
        const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        //  console.log(response)

        const imagePath = response.data.imagePath;

        socket.emit('image', { recipient, imagePath, userid, recipientname: localStorage.getItem("fullName") });

        setImageFile(null);


        imagefileref.current = null;


      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    fetchmessages()
  };
  // upload images.......................................................................


  useEffect(() => {
    // Replace 'apiUrl' with the actual URL of your API

    fetchmessages();


  }, [userid, recipient]);

  async function fetchmessages() {

    if (recipient) {

      const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/api/messages/${userid}/${recipient}`)

      if (res) {
        setMessages(res.data.messages)

      }

    }

  }
  // send message..................................................................



  async function submit() {

    const inputValue = inputMessageRef.current;


    if (imagefileref.current) {
      await sendImage(); // Await for sending the image
    }

    // Check if the input message is empty or contains only whitespaces
    if (inputMessageRef.current.trim() === '') {
      return; // Don't send the message if it's blank
    }

    socket.emit('message', { recipient, content: inputValue, userid, recipientname: localStorage.getItem("fullName") });

    inputMessageRef.current = ""

    document.getElementById("message").value = ""

    fetchmessages();

  };

  // send message..................................................................


  const handleChildDivClick = (index) => {
    if (expandedIndex === index) {
      // If the clicked child div is already expanded, collapse it
      setExpandedIndex(-1);
    } else {
      // If another child div is expanded, collapse it first and then expand the clicked one
      setExpandedIndex(index);
    }
  };

  const handleclickdiv = (event, data) => {

    if (data._id) {
      // console.log("inside if",data)

      setRecipient(data._id)

      setmessageuserdetails(data)

    }
    if (!data._id) {

      // console.log("inside else",data)
      setRecipient(data)
    }

    // setRecipient(recipientid)

    setUserId(localStorage.getItem("id"))

    event.stopPropagation();

    if (animationDivs.length < 1) {

      setindex(index + 1)

      // Calculate the new right value for the new animation div
      setRight(right + 3)

      // Create a new animation div with a unique key to avoid rendering issues
      const newAnimationDiv = (

        <div key={index} onClick={() => handleChildDivClick(index)} className={`animate-div-child ${expandedIndex === index ? 'expanded' : ''}`} style={{ right: `${right}%` }}>

          <div className={expandedIndex === index ? "message-top" : ""} style={{ display: "flex", position: "absolute", top: "0", left: "0", height: "10%", width: "100%", borderBottom: expandedIndex === index ? "1px solid lightgray" : "" }}    >
            {/* <div className='messages-top' onClick={handleclick} style={{ display: "flex", position: "absolute", top: "0", left: "0", height: "10%", width: "100%", backgroundColor: isExpanded ? "white" : "", borderBottom: isExpanded ? "1px solid lightgray" : "" }}    > */}
            {/* Add your Avatar and other content here */}

            <div>
              <Avatar />

         
            </div>
          
            <div>
              {/* <h8 style={{ color: "black" }}>{messageuserdetails.fullName}</h8> */}

            </div>
            <div >
              {
                expandedIndex === index ? <img style={{ width: "10%" }} src='http://w7.pngwing.com/pngs/175/947/png-transparent-arrow-computer-icons-down-arrow-angle-black-desktop-wallpaper-thumbnail.png' alt='img' /> : <img style={{ width: "10%" }} src='http://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png' alt='img' />
              }
            </div>
          </div>
          <div className="messagelog" ref={messageContainerRef} style={{ height: "90%", display: expandedIndex === index ? "block" : "none", width: "100%", zIndex: "-2", overflow: "scroll" }}>

            {/* fetch the messages................ */}

            <ExpandedDiv />

            {/* fetch the messages................ */}
          </div>
          {
            expandedIndex === index ?
              <Fragment>
                <div style={{ display: "flex" }}>
                  <div>
                    <input
                      type="text"
                      id="message"
                      className="form-control"
                      onChange={handleInputChange} // Use consistent casing here
                    />
                  </div>
                  <div>
                    <button onClick={() => submit()}>send</button><br />
                  </div>
                </div>
                <input type="file" onChange={handleImageUpload} />
              </Fragment>
              : ""
          }
        </div>
      );
      // Add the new animation div to the list of animation divs
      setAnimationDivs((prevDivs) => [...prevDivs, newAnimationDiv]);


    }

  };




  // i need to send props and event handle to create the div from view profile

  return (
    <div className="App">



      <MyContext.Provider value={{ animationDivs, handleclickdiv, userid, recipient, messages, messageuserdetails, profiledata }}>

        {/* <SessionTimeout/> */}

        <AllRoutes />



        {localStorage.getItem("id") && window.location.pathname === "/dashboard" ?

          <Fragment>
            {/* <Messagelog handleclickdiv={handleclickdiv} recipient={recipient} useris={userid} /> */}
            <MessageBox handleclickdiv={handleclickdiv} recipient={recipient} useris={userid} />

          </Fragment>
          : ""}
        {
          animationDivs && localStorage.getItem("id") ?
            animationDivs.map((div, index) => (
              <AnimationChild
                key={index}
                index={index}
                expandedIndex={expandedIndex}
                handleChildDivClick={handleChildDivClick}
                setinputMessage={setinputMessage}
                submit={submit}
                handleInputChange={handleInputChange}
                handleImageUpload={handleImageUpload}
                right={right}
                closedivs={closedivs}
                messages={messages}
              />
            ))
            : ""
        }
      </MyContext.Provider>


    
    </div>
  );
}

export default App;
