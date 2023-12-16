import React, { useContext, useState, useEffect, Fragment } from 'react';
import MyContext from '../../mycontext';
import "./messages.css";
import { Avatar } from '@mui/material';
// import { Link } from 'react-router-dom';




const ExpandedDiv = ({ recipientuserid }) => {
  const { messages } = useContext(MyContext);
  const [lastDisplayedDay, setLastDisplayedDay] = useState(null);
  const { recipient } = useContext(MyContext)
  const { messageuserdetails } = useContext(MyContext)




  
  const Message = ({ sender, content, timestamp }) => {
    // const messageContent = content.replace(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\]\s*/, '');
    const time = new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const dayHeader = timestamp ? new Date(timestamp).toLocaleDateString('en-US', { weekday: 'long' }) : null;

    useEffect(() => {
      // Update the lastDisplayedDay whenever timestamp changes
      if (timestamp) {
        setLastDisplayedDay(dayHeader);
      }
    }, [timestamp, dayHeader]);


    const Content = content.split(" ");
    const renderDayHeader = () => {
      if (!timestamp || dayHeader === lastDisplayedDay) return null;
      return <div className="day-header">------- {dayHeader.toUpperCase()} ---------</div>;
    };
    const handleDownload = (imageUrl) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'downloaded-image.jpg'; // Specify the desired download filename
      link.click();
    };
    const colonIndex = content.indexOf(": ");

    const messageContent = content.substring(colonIndex + 2);

    const messageClass = `message ${Content === "Me:" ? "my-message" : "other-message"}`;

    const senderClass = `sender ${Content === "Me:" ? "my-message" : "other-message"}`;




    return (
      <div style={{ borderRadius: "5px" }}>
        <hr />


        <div className={messageClass}  >


          <div style={{ display: "flex", textAlign: "start" }}>
            <div >
              <Avatar />
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "80%", marginLeft: "10px" }}>
              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <span style={{ fontWeight: "bold" }}>
                  {Content[1].length < 15 ? Content[1].split(":")[0] : Content[1].slice(0, 15)}
                </span>

                <span style={{ marginLeft: "10px", fontSize: "12px", color: "#1A1110" }}>
                  {time}
                </span>
              </div>

              <div className="message-content" style={{ textAlign: "start" }}>

                {messageContent.endsWith('.pdf') ? (<embed src={`${process.env.REACT_APP_IP_ADDRESS}/messagefiles/${messageContent}`} width="40px" height="30px" type="application/pdf" />) : ""}


                {messageContent.endsWith('.jpg') || messageContent.endsWith('.png') ? (<img onClick={() => handleDownload(`${process.env.REACT_APP_IP_ADDRESS}/messagefiles/${messageContent}`)} src={`${process.env.REACT_APP_IP_ADDRESS}/messagefiles/${messageContent}`} alt="Post pic" className="img-fluid" />) : ""}
                

                {(messageContent.endsWith('.mp4') || messageContent.endsWith('.webm') || messageContent.endsWith('.ogg')) ? (<video width="100%" height="100%" controls>
                  <source src={`${process.env.REACT_APP_IP_ADDRESS}/messagefiles/${messageContent}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>) : ""}
                <p>{messageContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };






  return (
    <div className="expanded-div" style={{ width: "100%", textAlign: "start", padding: "5%" }}>

      {/* <Avatar style={{height:"35%",width:"25%"}}/> */}

      {/* <Link   to={`/viewprofile/${recipient._id}`}> */}

      {/* <h8 style={{fontWeight:"20px"}}>{messageuserdetails.fullName}</h8> */}
      {/* </Link> */}




      {/* <hr></hr> */}



      <div className="message-container">
        {messages.map((message, index) => {
          const sender = message.substring(message.indexOf(']') + 2, message.indexOf(':'));
          const content = message;
          const timestamp = message.match(/\[(.*?)\]/)?.[1];


          return (
            <Fragment>


              {content ?
                <Fragment>
                  <Message key={index} sender={sender} content={content} timestamp={timestamp} />
                </Fragment>
                :

                ""}
            </Fragment>
          )
        })}
      </div>
    </div>
  );
};

export default ExpandedDiv;
