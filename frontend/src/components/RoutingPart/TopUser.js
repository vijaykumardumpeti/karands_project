import React, { useEffect, useState } from "react";
import logo from "../../assets/employee1.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './topusers.css';

export default function TopUser() {

  
  const [details, setDetails] = useState([]);
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/suggestionUser/0/${localStorage.getItem("id")}`)
      .then(res => setDetails(res.data))
      .catch(err => console.log(err))
  }, [flag])



  function addFriend(id) {
    console.log(id)
    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/connection/people`, {
      senderid: localStorage.getItem("id"),
      receiverid: id
    })
      .then(res => {
        alert('Friend request added');
        setFlag(!flag)
      })
      .catch(err => console.log(err))
  }


  return (
    <div style={{ width: "100%", marginTop: "20px" }} >
      <div className="card mt-3">
        <div class="shadow bg-body rounded">
          <div>
            <div className="d-flex card-header" style={{ justifyContent: "space-between" }}>
              <h6>Suggested Users</h6>
            </div>


            <div style={{ padding: "0px 10px", textAlign: "left" }} className="mt-2 ">
              {details.map((data, index) => {
                return <div class="job-info">
                  <div
                    class="job-details d-flex mt-3"
                    style={{ alignItems: "center" }}
                  >
                    <div>
                      <img style={{ width: "50px", border: "2px solid #f0f0f0", top: "0" }} src={logo} className="rounded-circle" alt="pic" />
                    </div>


                    <div class="sgt-text" >

                      <Link to={`/viewprofile/${data._id}`} style={{ textDecoration: "none", color: "black" }}>


                        <h6
                          className="text-primary"
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.1)';
                            e.target.style.color = 'red';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'none';
                          }}

                          style={{ zIndex: "2", marginLeft: "5%", color: "black" }}
                        >
                          {data.name}
                        </h6>
                      </Link>
                      <span>{data.designation && data.designation}</span>
                      <div>
                        <span>Location : {data.location}</span>
                      </div>
                    </div>

                    <div style={{ position: "absolute", right: "15px" }} className="personicon">
                      <h4 onClick={() => addFriend(data._id)} >
                        <span className="bi bi-person-plus-fill"></span>
                      </h4>
                    </div>
                  </div>
                  <hr />
                </div>
              })}
              <div class="job-info">
                <Link to="/mynetwork" style={{ textDecoration: "none" }}>
                  <div className="mt-3">
                    <h6 className="text-primary">View all...</h6>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-3">
      <div class="shadow bg-body rounded">
        <div>
          <div className="d-flex card-header" style={{ justifyContent: "space-between" }}>
            <h6>Suggested Users By Designation</h6>
          </div>


          <div style={{ padding: "0px 10px", textAlign: "left" }} className="mt-2 ">
            {details.map((data, index) => {
              return <div class="job-info">
                <div
                  class="job-details d-flex mt-3"
                  style={{ alignItems: "center" }}
                >
                  <div>
                    <img style={{ width: "50px", border: "2px solid #f0f0f0", top: "0" }} src={logo} className="rounded-circle" alt="pic" />
                  </div>


                  <div class="sgt-text" >

                    <Link to={`/viewprofile/${data._id}`} style={{ textDecoration: "none", color: "black" }}>


                      <h6
                        className="text-primary"
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                          e.target.style.color = 'red';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'none';
                        }}

                        style={{ zIndex: "2", marginLeft: "5%", color: "black" }}
                      >
                      </h6>
                    </Link>
                    <span>{data.designation && data.designation}</span>
                    <div>
                      <span>Location : {data.location}</span>
                    </div>
                  </div>

                  <div style={{ position: "absolute", right: "15px" }} className="personicon">
                    <h4>
                      <span className="bi bi-person-plus-fill"></span>
                    </h4>
                  </div>
                </div>
                <hr />
              </div>
            })}
            <div class="job-info">
              <Link to="/mynetwork" style={{ textDecoration: "none" }}>
                <div className="mt-3">
                  <h6 className="text-primary">View all...</h6>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    <div className="card mt-3">
    <div class="shadow bg-body rounded">
      <div>
        <div className="d-flex card-header" style={{ justifyContent: "space-between" }}>
          <h6>Suggested Users By Location</h6>
        </div>


        <div style={{ padding: "0px 10px", textAlign: "left" }} className="mt-2 ">
          {details.map((data, index) => {
            return <div class="job-info">
              <div
                class="job-details d-flex mt-3"
                style={{ alignItems: "center" }}
              >
                <div>
                  <img style={{ width: "50px", border: "2px solid #f0f0f0", top: "0" }} src={logo} className="rounded-circle" alt="pic" />
                </div>


                <div class="sgt-text" >

                  <Link to={`/viewprofile/${data._id}`} style={{ textDecoration: "none", color: "black" }}>


                    <h6
                      className="text-primary"
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.color = 'red';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'none';
                      }}

                      style={{ zIndex: "2", marginLeft: "5%", color: "black" }}
                    >
                    </h6>
                  </Link>
                  <span>{data.designation && data.designation}</span>
                  <div>
                    <span>Location : {data.location}</span>
                  </div>
                </div>

                <div style={{ position: "absolute", right: "15px" }} className="personicon">
                  <h4>
                    <span className="bi bi-person-plus-fill"></span>
                  </h4>
                </div>
              </div>
              <hr />
            </div>
          })}
          <div class="job-info">
            <Link to="/mynetwork" style={{ textDecoration: "none" }}>
              <div className="mt-3">
                <h6 className="text-primary">View all...</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
    
      
    </div>
  );
}
