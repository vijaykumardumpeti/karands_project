import React, { useState, useEffect, useContext } from "react";


import Blocked from "./Blocked.js";
import Page from "./Page.js";

import Group from "./Group.js";
import Sidebar from "./Sidebar";
import Details from "./Details";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

import myPic from '../../assets/backgroundImage.png'

import MyContext from '../../mycontext';

import Messagebox from '../../components/messaging/MessageBox';

export default function MyNetwork() {
  const { handleclickdiv, profilepicfunction } = useContext(MyContext)


  const [flag, setFlag] = useState(true)

  const [connections, setConnections] = useState([]);
  const [pending, setPending] = useState([]);
  const [request, setRequest] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/suggestionUser/${skip}/${localStorage.getItem("id")}`)
      .then(res => setSuggestion(res.data))
      .catch(err => console.log(err))
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/allreceivedrequest/${localStorage.getItem("id")}`)
      .then(res => setRequest(res.data))
      .catch(err => console.log(err))
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/allfriends/${localStorage.getItem("id")}`)
      .then(res => setConnections(res.data))
      .catch(err => console.log(err))
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/allsendrequest/${localStorage.getItem("id")}`)
      .then(res => setPending(res.data))
      .catch(err => console.log(err))
  }, [flag])




  function withdrawRequest(id) {
    axios.patch(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/deleteRequest`, {
      senderid: localStorage.getItem("id"),
      receiverid: id
    })
      .then(res => {

        toast.info('connection is withdrawed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });


        setFlag(!flag);

      })
      .catch(err => console.log(err))
  }



  function addFriend(id) {
    console.log(id)
    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/connection/people`, {
      senderid: localStorage.getItem("id"),
      receiverid: id
    })
      .then(res => {
        toast.success('connection request has been sent..', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });



        setFlag(!flag)

      })
      .catch(err => console.log(err))
  }



  function accept(id) {
    console.log(localStorage.getItem("id"))
    axios.patch(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/acceptRequest`, {
      senderid: id,
      receiverid: localStorage.getItem("id")
    })
      .then(res => {

        toast.success('connection accepted.....', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });



        setFlag(!flag)
      }).catch(err => console.log(err))
  }




  function decline(id) {
    axios.patch(`${process.env.REACT_APP_IP_ADDRESS}/karands/request/deleteRequest`, {
      senderid: id,
      receiverid: localStorage.getItem("id")
    })
      .then(res => {
        alert('Declined');
        setFlag(!flag)
      })
      .catch(err => console.log(err))
  }




  return (
    
      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage="mynetwork" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <Details />
          <hr />
          <ToastContainer />
          
          <div
            style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden" }}>
            <div className="d-flex text-start ms-2">
              <h2>My Network</h2>
            </div>
            <div className=" post-feeds">
              <div>
                <div className="container-xl container-lg">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col col-lg-12 mb-4 mb-lg-0">
                          <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                              <button
                                className="nav-link active"
                                id="nav-connection-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-connection"
                                type="button"
                                role="tab"
                                aria-controls="nav-connection"
                                aria-selected="true"
                              >
                                Connections
                              </button>
                              <button
                                className="nav-link"
                                id="nav-pending-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-pending"
                                type="button"
                                role="tab"
                                aria-controls="nav-pending"
                                aria-selected="false"
                              >
                                Pending
                              </button>
                              <button
                                className="nav-link"
                                id="nav-request-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-request"
                                type="button"
                                role="tab"
                                aria-controls="nav-request"
                                aria-selected="false"
                              >
                                Requests
                              </button>
                              <button
                                className="nav-link"
                                id="nav-suggestion-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-suggestion"
                                type="button"
                                role="tab"
                                aria-controls="nav-suggestion"
                                aria-selected="false"
                              >
                                Suggestion
                              </button>
                              <button
                                className="nav-link"
                                id="nav-blocked-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-blocked"
                                type="button"
                                role="tab"
                                aria-controls="nav-blocked"
                                aria-selected="false"
                              >
                                Blocked
                              </button>
                              <button
                                className="nav-link"
                                id="nav-groups-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-groups"
                                type="button"
                                role="tab"
                                aria-controls="nav-groups"
                                aria-selected="false"
                              >
                                Groups
                              </button>
                              <button
                                className="nav-link"
                                id="nav-page-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-page"
                                type="button"
                                role="tab"
                                aria-controls="nav-page"
                                aria-selected="false"
                              >
                                Page
                              </button>
                            </div>
                          </nav>
                          <div className="tab-content" id="nav-tabContent" >
                            <div
                              className="tab-pane fade show active"
                              id="nav-connection"
                              role="tabpanel"
                              aria-labelledby="nav-connection-tab"
                            >
                              <div className="container-fluid" style={{ backgroundColor: '#eee' }}>
                                <div className="main-body">


                                  <div className='d-flex flex-start m-2'><h6>No of Connections : {connections.length} </h6></div>
                                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
                                    {
                                      connections.map((data, index) => {
                                        return <div className="col mb-3">
                                          <div className="card">
                                            <img src={myPic} alt="Cover" className="card-img-top" />
                                            <div className="card-body text-center">
                                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{ width: "100px", marginTop: "-65px" }} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                                              <h5 className="card-title">{data.name}</h5>
                                              <p className="text-secondary mb-1">{data.location}</p>
                                              <p className="text-muted font-size-sm">{data.designation ? data.designation : 'Designation not updated'}</p>
                                            </div>
                                            <div className="card-footer">
                                              <button className="btn btn-light btn-sm bg-light has-icon btn-block" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>message</button>
                                            </div>
                                          </div>
                                        </div>
                                      })
                                    }



                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="nav-pending"
                              role="tabpanel"
                              aria-labelledby="nav-pending-tab"
                            >
                              <div className='container-fluid' style={{ backgroundColor: '#eee' }}>
                                <div className="main-body">
                                  <div className='d-flex flex-start'><h6>No of Pending Users : {pending.length}</h6></div>
                                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
                                    {
                                      pending.map((data, index) => {
                                        return <div className="col mb-3">
                                          <div className="card" onClick={() => console.log(data._id)}>
                                            <img src={myPic} alt="Cover" className="card-img-top" />
                                            <div className="card-body text-center">
                                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{ width: "100px", marginTop: "-65px" }} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                                              <h5 className="card-title">{data.name}</h5>
                                              <p className="text-secondary mb-1">{data.location}</p>
                                              <p className="text-muted font-size-sm">{data.designation ? data.designation : "No Designation"}</p>
                                            </div>
                                            <div className="card-footer">
                                              <button onClick={() => withdrawRequest(data._id)} className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Withdraw</button>
                                            </div>
                                          </div>
                                        </div>
                                      })}


                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade show "
                              id="nav-request"
                              role="tabpanel"
                              aria-labelledby="nav-request-tab"
                            >
                              <div className='container-fluid' style={{ backgroundColor: '#eee' }}>
                                <div className="main-body">
                                  <div className='d-flex flex-start'><h6>No of requestSchema Users : {request.length} </h6></div>
                                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">

                                    {
                                      request.map((data, index) => {
                                        return <div className="col mb-3">
                                          <div className="card">
                                            <img src={myPic} alt="Cover" className="card-img-top" />
                                            <div className="card-body text-center">
                                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{ width: "100px", marginTop: "-65px" }} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                                              <h5 className="card-title">{data.name}</h5>
                                              <p className="text-secondary mb-1">{data.location}</p>
                                              <p className="text-muted font-size-sm">{data.designation ? data.designation : 'Designation not updated'}</p>
                                            </div>
                                            <div className="card-footer">
                                              <button onClick={() => accept(data._id)} className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Accept </button>
                                              <button onClick={() => decline(data._id)} className="btn btn-danger btn-sm bg-light btn-block m-1 text-danger" type="button">Decline </button>
                                            </div>
                                          </div>
                                        </div>
                                      })
                                    }

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade show "
                              id="nav-blocked"
                              role="tabpanel"
                              aria-labelledby="nav-blocked-tab"
                            >
                              <Blocked />
                            </div>
                            <div
                              className="tab-pane fade show "
                              id="nav-groups"
                              role="tabpanel"
                              aria-labelledby="nav-groups-tab"
                            >
                              {/* <YourGroup/>*/}
                              <Group />
                            </div>
                            <div
                              className="tab-pane fade show "
                              id="nav-page"
                              role="tabpanel"
                              aria-labelledby="nav-page-tab"
                            >
                              <Page />
                            </div>
                            <div
                              className="tab-pane fade show "
                              id="nav-suggestion"
                              role="tabpanel"
                              aria-labelledby="nav-suggestion-tab"
                            >
                              <div className='container-fluid' style={{ backgroundColor: '#eee' }}>
                                <div className="main-body">
                                  <div className='d-flex flex-start'><h6>Connections Suggestion</h6></div>
                                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
                                    {
                                      suggestion.map((data, index) => {
                                        return <div className="col mb-3">
                                          <div className="card" >
                                            <img src={myPic} alt="Cover" className="card-img-top" />
                                            <div className="card-body text-center">
                                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{ width: "100px", marginTop: "-65px" }} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                                              <h5 className="card-title">{data.name}</h5>
                                              <p className="text-secondary mb-1">{data.designation ? data.designation : "No Designation "}</p>
                                              <p className="text-muted font-size-sm">{data.location}</p>
                                            </div>
                                            <div className="card-footer">
                                              <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" onClick={() => addFriend(data._id)} type="button">connect</button>
                                            </div>
                                          </div>
                                        </div>
                                      })
                                    }

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Messagebox handleclickdiv={handleclickdiv} />
      </div>
  );
}
