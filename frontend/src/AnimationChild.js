import React, { useContext, useEffect, useRef } from "react";
import { Avatar, Link } from "@mui/material";
import ExpandedDiv from "./components/messaging/messages";
import MyContext from "./mycontext";
import { BiSolidSend } from "react-icons/bi";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AnimationChild = ({ index, expandedIndex, handleChildDivClick, setinputMessage, submit, handleInputChange, handleImageUpload, right, closedivs, messages }) => {


  const { messageuserdetails } = useContext(MyContext)

  const messageContainerRef = useRef();


  useEffect(() => {
    // Scroll to the bottom of the container whenever new messages are added
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);




  return (
    <div

      className={`animate-div-child ${expandedIndex === index ? 'expanded' : ''}`} style={{ right: `${right}%` }}
    >
      <div
        className={expandedIndex === index ? "message-top" : ""}


        style={{
          display: "flex",
          alignItems: "center",
          height: "70px",
          width: "100%",
          borderBottom: expandedIndex === index ? "1px solid lightgray" : "",
          justifyContent: "space-between", padding: "0px 10px"
        }}
        onClick={() => handleChildDivClick(index)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>

          <div >
            <Avatar />
          </div>

          <div>
            {
              messageuserdetails.fullName ?

                <Link to={`/viewprofile/${messageuserdetails._id}`}>

                  <h9 style={{ color: "black" }}>{messageuserdetails.fullName}</h9>

                </Link>


                : <Link to={`/viewprofile/${messageuserdetails._id}`}>

                  <h9 style={{ color: "black" }}>{messageuserdetails.name}</h9>

                </Link>




            }





          </div>
        </div>



        <div >
          <button type="button" class="close" aria-label="Close" onClick={() => closedivs()}>
            <span aria-hidden="true">&times;</span>
          </button>


        </div>


      </div>
      <div
        className="messagelog"

        ref={messageContainerRef}

        style={{
          height: "50%",
          display: expandedIndex === index ? "block" : "none",
          width: "100%",
          zIndex: "-2",
          overflow: "scroll",
          overflowX: "hidden"
        }}
      >
        <ExpandedDiv />


      </div>
      <hr style={{ color: "gray", width: "100%" }} />
      {expandedIndex === index ? (
        <>
          <div style={{ display: "flex", marginBottom: "15px", width: "100%", padding: "0px 15px", height: "auto", flexDirection: "column" }}>
            <textarea
              type="text"
              placeholder="Write a Message"
              style={{ width: "100%", height: "100px" }}
              id="message"
              className="form-control"
              onChange={handleInputChange}

            ></textarea>

            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>

              <div className="file-upload" >
                <label htmlFor="file-input">
                  <span style={{ fontSize: "20px", color: "black" }} className="paper-clip-icon" role="img" aria-label="paper clip"><AttachFileIcon /></span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
              </div>
              <div >
                <button style={{ borderTopRightRadius: "5px", borderBottomRightRadius: "5px", backgroundColor: "#83a4d4", color: "white" }} className="btn " onClick={submit}>Send <BiSolidSend /></button>
                <br />
              </div>
            </div>
          </div>


        </>
      ) : null}
    </div>
  );
};

export default AnimationChild;
