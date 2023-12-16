import React, { useEffect, useState, Fragment } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box"

import FormControlLabel from "@mui/material/FormControlLabel";

import './Posterfeed2.css'; // Assuming you have a CSS file named "PostFeed2.css" for custom styles

export default function Editpost(props) {


  const [input, setInput] = useState({

    Title: "",
    content: "",
    file: "",
    reach: ""
  })


  const [showModal, setShowModal] = useState(false);
  const [postOptions, setPostOptions] = useState('');





  const [checked, setChecked] = React.useState([true, false, false, false]);




  const handleChange = () => {
    const allChecked = checked.every((item) => item);
    setChecked([!allChecked, !allChecked, !allChecked, !allChecked]);
  };
  const handleChange1 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleChange2 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };
  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel style={{ color: "black" }}
        label="Looking for job"
        control={<Checkbox checked={checked[0]} onChange={handleChange1} />}
      />
      <FormControlLabel style={{ color: "black" }}
        label="Looking to hire"
        control={<Checkbox checked={checked[1]} onChange={handleChange2} />}
      />
      <FormControlLabel style={{ color: "black" }}
        label="Looking to collabrate"
        control={<Checkbox checked={checked[2]} onChange={handleChange3} />}
      />
      <FormControlLabel style={{ color: "black" }}
        label="Looking to build Network"
        control={<Checkbox checked={checked[3]} onChange={handleChange4} />}
      />
    </Box>
  );























  // post part
  async function handlePost() {
     
    const name = localStorage.getItem("fullName")


    let reason = [];
    let connection = [];
    if (checked[0]) reason.push('Looking for job')
    if (checked[1]) reason.push('Looking to hire')
    if (checked[3]) connection.push('Looking to collabrate')
    if (checked[4]) connection.push('Looking to build Network');
    let objectiveSurvey = {
      reason: reason,
      connection: connection
    }

    const data = {
      userObectId: localStorage.getItem("id"),
      name: name,
      email: localStorage.getItem("email"),
      Title: input.Title,
      content: input.content,
      file: input.file,
      reach: input.reach,
      objectiveSurvey: objectiveSurvey

    }



    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/editpost/${props.postdata._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    if (res) {
      props.postclick()
    }

  }
  const handleShowOptions = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };


  useEffect(() => {
    async function main() {
      if (props.postdata.Title) {
        setInput({ ...input, Title: props.postdata.Title });
      }
      if (props.postdata.content) {
        setInput({ ...input, content: props.postdata.content });
      }
      if (props.postdata.reach) {
        setInput({ ...input, reach: props.postdata.reach });
      }
    }
    main();
  }, [props.postdata]);


console.log("inputs in edit posts",input,props.postdata)





  return (
    <Fragment>

      <Modal isOpen={props.Show} className="postbox" >


        <div className="post-feed-header" style={{ display: 'flex', justifyContent: 'space-between' }} >
          <h2>Edit Post</h2>
          <button onClick={() => { props.postclick() }} >X</button>

        </div>


        <div className="post-feed-content">
          <div className="post-feed-inputs">
            <input
              type="text"
              placeholder="Title (Max 50 characters)"
              maxLength={50}
              value={input.Title}

              onChange={(e) => { setInput({ ...input, Title: e.target.value }) }}


            />
            <textarea
              placeholder="Write something cool... (Max 3000 characters)"
              maxLength={3000}


              onChange={(e) => { setInput({ ...input, content: e.target.value }) }}

              value={input.content}
            />

                        <input type="file" onChange={(e) => { setInput({ ...input, file: e.target.files[0] }) }} /> 


          </div>




          <div className="post-feed-buttons">
            <button onClick={handleShowOptions} style={{ backgroundColor: "#17a2b8" }}>To whom do you want to show this post</button>
            <button onClick={() => handlePost()} style={{ backgroundColor: "#17a2b8" }}>Post</button>
            {/* <button onClick={() => { props.postclick() }} style={{ backgroundColor: "#17a2b8" }}>close</button> */}
          </div>
        </div>



        <Modal
          isOpen={showModal}
          onRequestClose={handleModalClose}
          contentLabel="Post Options"
          className="post-options-modal"
        >
          <h2>To whom do you want to show this post?</h2>
          <button onClick={() => {
            setInput({ ...input, reach: "Public" })
            handleModalClose()
          }} style={{ backgroundColor: "rgb(3, 104, 104)" }}>Public</button>
          <button onClick={() => {
            setInput({ ...input, reach: "Connections" })
            handleModalClose()

          }
          } style={{ backgroundColor: "rgb(3, 104, 104)" }}>To My Connections</button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal0"
            onClick={() => {
              setInput({ ...input, reach: "Select Objective" })
              handleModalClose()


            }} style={{ backgroundColor: "rgb(3, 104, 104)" }}>Select Objective</button>


        </Modal>


      </Modal>


      <div
        className="modal fade"
        id="exampleModal0"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-primary"
                id="exampleModalLabel"
              >
                Post Feed
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <FormControlLabel
                label="All"
                style={{ color: "black" }}
                control={
                  <Checkbox
                    checked={
                      checked[0] && checked[1] && checked[2] && checked[3]
                    }
                    indeterminate={
                      checked[0] !== checked[1] ||
                      checked[1] !== checked[2] ||
                      checked[2] !== checked[3]
                    }
                    onChange={handleChange}
                  />
                }
              />
              {children}
            </div>

            <div
              className="modal-footer"
              style={{ display: "flex", justifyContent: "space-between" }}
            >

              <button
                className="btn btn-primary "
                data-bs-dismiss="modal"
                aria-label="Close"
                type="button"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>








    </Fragment>
  );
}

