import React, { useContext, useEffect, useRef } from "react";
import { Avatar, Link } from "@mui/material";
import ExpandedDiv from "./messaging/messages";
import MyContext from "../mycontext";

const AnimationDivChild = ({ index, expandedIndex, handleChildDivClick,setinputMessage,submit,handleInputChange,handleImageUpload,right,closedivs,messages}) => {


    const {messageuserdetails}=useContext(MyContext)




    const messageContainerRef = useRef();


    useEffect(() => {
      // Scroll to the bottom of the container whenever new messages are added
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }
    }, [messages]);




  return (
    <div
  
      className={`animate-div-child ${expandedIndex === index ? 'expanded' : ''}`} style={{right: `${right}%`}}
    >
      <div
        className={expandedIndex === index ? "message-top" : ""}

      
        style={{
          display: "flex",
          position: "absolute",
          top: "0",
          left: "0",
          height: "10%",
          width: "100%",
          borderBottom: expandedIndex === index ? "1px solid lightgray" : "",
        }}
        onClick={() => handleChildDivClick(index)}
      >
        <div >
          <Avatar />
        </div>

        <div>
          {
            messageuserdetails._id?
            
            <Link   to={`/viewprofile/${messageuserdetails._id}`}>

            <h9 style={{ color: "black" }}>{messageuserdetails.fullName}</h9>
            
            </Link>
            
            
            :"username"
          }

         

       

        </div>



        <div>
          {/* {expandedIndex === index ? (
            <>
             */}
        
            {/* <img
            onClick={() => handleChildDivClick(index)}
              style={{ width: "10%" }}
              src="https://w7.pngwing.com/pngs/175/947/png-transparent-arrow-computer-icons-down-arrow-angle-black-desktop-wallpaper-thumbnail.png"
              alt="img"
            /> */}




{/* </> */}


{/* 
          ) : (
            <img */}
          
              {/* style={{ width: "10%" }}
              src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
              alt="img"
            />
          )} */}




<button type="button" class="close" aria-label="Close" style={{right:"10px",position:"absolute"}} onClick={()=>closedivs()}>
  <span aria-hidden="true">&times;</span>
</button>


        </div>
       

      </div>
      <div
        className="messagelog"

        ref={messageContainerRef}

        style={{
          height: "90%",
          display: expandedIndex === index ? "block" : "none",
          width: "100%",
          zIndex: "-2",
          overflow: "scroll",
        }}
      >
        {/* fetch the messages................ */}
        <ExpandedDiv />
        {/* fetch the messages................ */}


      </div>
      {expandedIndex === index ? (
        <>
          <div style={{ display: "flex" }}>
            <div>
              <input
                type="text"
                id="message"
                className="form-control"
                onChange={handleInputChange} 
              />
            </div>
            <div>
              <button onClick={()=>submit()}>send</button>
              <br />
            </div>
          </div>
          <input onChange={handleImageUpload} type="file" /> {/* onChange={handleImageUpload} */}
        </>
      ) : null}
    </div>
  );
};

export default AnimationDivChild;
