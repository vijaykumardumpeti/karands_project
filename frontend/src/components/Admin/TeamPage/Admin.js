import React, { useContext, useEffect, useState } from 'react'
import "./admin.css";
import UserImage from "../../../assets/userImage1.jpg";
import UserImage1 from "../../../assets/userImage1.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../../mycontext';
import LoaderModal from '../../spinner/spinnerStyle';
import myPic from '.././../../assets/backgroundImage.png';
import Modal from 'react-modal';
import AdminFirstLogin from '../../AdminRegistration/AdminFirstLogin';
import Admininvite from '../../AdminRegistration/Admininvite';
import Teaminvite from '../../AdminRegistration/Teaminvite';

function Admin() {


  const [isLoading, setIsLoading] = useState(false);


  const [admin, setAdmin] = useState([]);
  const [subAdmin, setSubAdmin] = useState([]);
  const [adminPage, setAdminPage] = useState(0)
  const [subadminPage, setSubAdminPage] = useState(0)
  const [superadminPage, setSuperAdminPage] = useState(0)
  const [superAdmin, setSuperAdmin] = useState([]);
  const navigate = useNavigate()



  const [profiledata, setprofiledata] = useState("")




  const { appprofiledata } = useContext(MyContext)





  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
      .then((res) => {
        if (res.data.details) {
          setprofiledata(res.data.details)
        }
      }).catch(err => console.log(err))

  }, [])






  const [userdetails, setUserdetails] = useState("")




  const [userRole, setUserRole] = useState("")



  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);




  useEffect(() => {
    setIsLoading(true);


     
        
     

    // Array to store all Axios requests
    const requests = [
      axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem("id")}`),
      axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/admin/${adminPage}`),
      axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/subadmin/${subadminPage}`),
      axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/superadmin/${subadminPage}`)
    ];

    Promise.all(requests)
      .then((responses) => {


        setUserdetails(responses[0].data.details)

        setUserRole(responses[0].data.details.role);

        setAdmin(responses[1].data.admin);

        setSubAdmin(responses[2].data.subadmin);

        setSuperAdmin(responses[3].data.superAdmin);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        // Set loading to false after all requests have completed
        setIsLoading(false);
      });
  }, [subadminPage, adminPage]);





  console.log("profiledata", profiledata)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };




// open another tab

const handleButtonClick = (link) => {


  console.log("link",link)
  
  
    // This will open the specified page in a new tab
    window.open(link, '_blank');
  
  
  };
  
  
  
  



  console.log("userdetails", userdetails)


  return (
    <div
      className="container-fluid"
      style={{ width: "100%" }}
    >
      {
        isLoading ?
          <LoaderModal isOpen={isLoading} />


          :

          <div >


            {/* super admin */}

            {
              (userdetails && userdetails.role == "Super Admin"|| userdetails.AdditionalPortalAccess == "Super Admin") &&
              <>
              
              
              
             

                <div style={{  display: "flex" }}>

                  <div>
                    <div style={{
                      left: "0",

                    }}>
                      <h4 className='text-light'> Super Admin</h4>

                    </div>


                    <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap",}}>
                      <div className='row' >
                        <div className="col mb-3">
                          <div className="card" style={{width:"200px", marginLeft:"25px"}}>
                            <img src={myPic} alt="Cover" className="card-img-top" />
                            <div className="card-body text-center"  style={{marginBottom:"-20px"}}>
                              <img src={UserImage1} alt='user' style={{ width: "100px", marginTop: "-65px" }} className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                              <h5 className="card-title" style={{fontSize:"12px"}}>{userdetails.name ? userdetails.name : ""}</h5>
                              {userdetails.location &&<p className="text-muted" style={{fontSize:"12px"}}>Location: {userdetails.location ? userdetails.location : ""}</p>}
                               {userdetails.industry&&<p className="text-muted" style={{fontSize:"12px"}}>Industry: {userdetails.industry ? userdetails.industry : ""}</p>}
                                {userdetails.permission&&<p className="text-muted" style={{fontSize:"12px"}}>Permission: {userdetails.permission ? userdetails.permission : ""}</p>}
                            </div>
                            <div className="card-footer">
                              <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


{/* list of admins.................. */}


<div style={{ marginTop: "20px" }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft:"25px"
                      }}>
                        <h4 className='text-light'>Admin</h4>
                        {
                          (profiledata.role === 'Admin' || profiledata.role === "Super Admin") && <button style={{
                            borderRadius: "10px",
                            color: "white",
                            backgroundColor: "red"

                          }}
                            data-bs-toggle="modal"
                            data-bs-target="#invite"
                          >Invite</button>


                        }


                      </div>

                      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap",  marginLeft:"25px"}}>
                        {
                          admin.map((eachAdmin, index) => {



                            return <div className='row'>

                              <div className="col mb-2">
                                <div className="card" style={{ width: "220px", marginLeft:"25px" }}>
                                  <img src={myPic} alt="Cover" className="card-img-top" />
                                  <div className="card-body text-center" style={{marginBottom:"-20px"}}>
                                    <img src={UserImage1} style={{ width: "100px", marginTop: "-65px" }} alt="user" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                                    <h5 className="card-title" style={{fontSize:"12px"}}> {eachAdmin.name}</h5>
                                    <p className="text-secondary" style={{fontSize:"12px"}}>Role: {eachAdmin.role}</p>
                                    {eachAdmin.location&&<p className="text-muted" style={{fontSize:"12px"}}>Location: {eachAdmin.location}</p>}
                              {eachAdmin.industry&&<p className="text-muted" style={{fontSize:"12px"}}>Industry: {eachAdmin.industry}</p>}
                              {eachAdmin.permission&&<p className="text-muted" style={{fontSize:"12px"}}>Permission: {eachAdmin.permission}</p>}
                                  </div>
                                  <div className="card-footer">

                                  {localStorage.getItem("id")!=eachAdmin._id&&<button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>}
                                 
                                  </div>
                                </div>
                              </div>
                            </div>
                          })
                        }
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                          {
                            (adminPage !== 0) && <button
                              onClick={() => setAdminPage(adminPage - 1)}
                              style={{
                                borderRadius: "10px",
                                color: "white",
                                backgroundColor: "#83a4d4",
                                marginRight: "40px"
                              }}
                            >&laquo; Previous</button>
                          }
                          {
                            admin.length === 4 && <button
                              onClick={() => setAdminPage(adminPage + 1)}


                              style={{
                                borderRadius: "10px",
                                color: "white",
                                backgroundColor: "#83a4d4"
                              }}
                            > Next &raquo; </button>
                          }
                        </div>
                      </div>

                    </div>


{/* list of subadmins..........................in future add fiter also.... */}



<div style={{ marginTop: "20px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginLeft:"25px"
              }}>
                <h4 className='text-light'> Sub Admin</h4>
                {
                  (profiledata.role === 'Admin' || profiledata.role === " Super Admin") && <button style={{
                    borderRadius: "10px",
                    color: "white",
                    backgroundColor: "red"

                  }}
                    data-bs-toggle="modal"
                    data-bs-target="#invite"
                  >Invite</button>


                }
              </div>
              <div>
                <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft:"25px" }}>
                  {
                    subAdmin.map((eachAdmin, index) => {
                      return <div className='row'  
                      >



                        <div className="col mb-3">
                          <div className="card" style={{width:"220px", marginLeft:"25px"}} >
                            <img src={myPic} alt="Cover" className="card-img-top" />
                            <div className="card-body text-center" style={{marginBottom:"-20px"}} onClick={()=>{handleButtonClick(`/sharedprofile/${eachAdmin._id}`)}}>
                              <img src={UserImage} style={{ width: "100px", marginTop: "-65px" }} alt="user" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                              <h5 className="card-title" style={{fontSize:"12px"}}>{eachAdmin.name}</h5>
                              <p className="text-secondary" style={{fontSize:"12px"}}>Role: {eachAdmin.role}</p>
                              {eachAdmin.location&&<p className="text-muted" style={{fontSize:"12px"}}>Location: {eachAdmin.location}</p>}
                              {eachAdmin.industry&&<p className="text-muted" style={{fontSize:"12px"}}>Industry: {eachAdmin.industry}</p>}
                              {eachAdmin.permission&&<p className="text-muted" style={{fontSize:"12px"}}>Permission: {eachAdmin.permission}</p>}
                            </div>
                            <div className="card-footer">

                              <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>
                           
                            </div>
                          </div>
                        </div>
                      </div>
                    })
                  }

                  <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                    {
                      (subadminPage !== 0) && <button
                        onClick={() => setSubAdminPage(subadminPage - 1)}
                        style={{
                          borderRadius: "10px",
                          color: "white",
                          backgroundColor: "#83a4d4",
                          marginRight: "40px"
                        }}
                      >&laquo; Previous</button>
                    }
                    {
                      subAdmin.length === 3 && <button
                        onClick={() => setSubAdminPage(subadminPage + 1)}


                        style={{
                          borderRadius: "10px",
                          color: "white",
                          backgroundColor: "#83a4d4"
                        }}
                      > Next &raquo; </button>
                    }
                  </div>
                </div>
              </div>
            </div>


















                
               
</>
            }





            {/*admin */}

            {
              (userdetails && userdetails.role == "Admin" || userdetails.AdditionalPortalAccess == "Admin") && <>



                <div style={{ display: "flex" }}>


                  <div>
                    <div style={{
                      left: "0",


                    }}>
                      <h4 className="text-light"> Admin</h4>
                    </div>

                    <div>
                      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft: "25px" }}>
                        <div className="row">
                          <div className="col mb-3">
                            <div className="card" style={{ width: "200px", marginLeft: "25px" }}>
                              <img src={myPic} alt="Cover" className="card-img-top" />
                              <div className="card-body text-center">
                                <img src={UserImage1} style={{ width: "100px", marginTop: "-65px" }} alt="user" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                                <h5 className="card-title">{userdetails.name ? userdetails.name : ""}</h5>
                                <p className="text-secondary">Role: {userdetails.role ? userdetails.role : ""}</p>
                                {userdetails.location && <p className="text-muted" style={{ fontSize: "12px" }}>Location: {userdetails.location ? userdetails.location : ""}</p>}

                                {userdetails.state && <p className="text-muted" style={{ fontSize: "12px" }}>State: {userdetails.state ? userdetails.state : ""}</p>}

                                {userdetails.industry && <p className="text-muted" style={{ fontSize: "12px" }}>Industry: {userdetails.industry ? userdetails.industry : ""}</p>}
                                {userdetails.permission && <p className="text-muted" style={{ fontSize: "12px" }}>Permission: {userdetails.permission ? userdetails.permission : ""}</p>}



                              </div>
                              <div className="card-footer">
                                {localStorage.getItem("id") != userdetails._id && <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



{/* list of sub admins.................*/}

            
<div style={{ marginTop: "20px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginLeft:"25px"
              }}>
                <h4 className='text-light'> Sub Admin</h4>
                {
                  (profiledata.role === 'Admin' || profiledata.role === " Super Admin") && <button style={{
                    borderRadius: "10px",
                    color: "white",
                    backgroundColor: "red"

                  }}
                    data-bs-toggle="modal"
                    data-bs-target="#invite"
                  >Invite</button>


                }
              </div>
              <div>
                <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft:"25px" }}>
                  {
                    subAdmin.map((eachAdmin, index) => {
                      return <div className='row'  
                      >



                        <div className="col mb-3">
                          <div className="card" style={{width:"220px", marginLeft:"25px"}} >
                            <img src={myPic} alt="Cover" className="card-img-top" />
                            <div className="card-body text-center" style={{marginBottom:"-20px"}} onClick={()=>{handleButtonClick(`/sharedprofile/${eachAdmin._id}`)}}>
                              <img src={UserImage} style={{ width: "100px", marginTop: "-65px" }} alt="user" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                              <h5 className="card-title" style={{fontSize:"12px"}}>{eachAdmin.name}</h5>
                              <p className="text-secondary" style={{fontSize:"12px"}}>Role: {eachAdmin.role}</p>
                              {eachAdmin.location&&<p className="text-muted" style={{fontSize:"12px"}}>Location: {eachAdmin.location}</p>}
                              {eachAdmin.industry&&<p className="text-muted" style={{fontSize:"12px"}}>Industry: {eachAdmin.industry}</p>}
                              {eachAdmin.permission&&<p className="text-muted" style={{fontSize:"12px"}}>Permission: {eachAdmin.permission}</p>}
                            </div>
                            <div className="card-footer">

                              <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>
                           
                            </div>
                          </div>
                        </div>
                      </div>
                    })
                  }

                  <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                    {
                      (subadminPage !== 0) && <button
                        onClick={() => setSubAdminPage(subadminPage - 1)}
                        style={{
                          borderRadius: "10px",
                          color: "white",
                          backgroundColor: "#83a4d4",
                          marginRight: "40px"
                        }}
                      >&laquo; Previous</button>
                    }
                    {
                      subAdmin.length === 3 && <button
                        onClick={() => setSubAdminPage(subadminPage + 1)}


                        style={{
                          borderRadius: "10px",
                          color: "white",
                          backgroundColor: "#83a4d4"
                        }}
                      > Next &raquo; </button>
                    }
                  </div>
                </div>
              </div>
            </div>




              </>



            }

            




            {/* sub admin */}
            {
              (userdetails && userdetails.role == "Sub-Admin"||userdetails.AdditionalPortalAccess=="Sub-Admin")&&

              <div style={{ display: "flex" }}>


                <div>
                  <div style={{
                    left: "0",


                  }}>
                    <h4 className="text-light">Sub Admin</h4>
                  </div>

                  <div>
                    <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft: "25px" }}>
                      <div className="row">
                        <div className="col mb-3">
                          <div className="card" style={{ width: "200px", marginLeft: "25px" }}>
                            <img src={myPic} alt="Cover" className="card-img-top" />
                            <div className="card-body text-center">
                              <img src={UserImage1} style={{ width: "100px", marginTop: "-65px" }} alt="user" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                              <h5 className="card-title">{userdetails.name ? userdetails.name : ""}</h5>
                              <p className="text-secondary">Role: {userdetails.role ? userdetails.role : ""}</p>
                              {userdetails.location && <p className="text-muted" style={{ fontSize: "12px" }}>Location: {userdetails.location ? userdetails.location : ""}</p>}

                              {userdetails.state && <p className="text-muted" style={{ fontSize: "12px" }}>State: {userdetails.state ? userdetails.state : ""}</p>}

                              {userdetails.industry && <p className="text-muted" style={{ fontSize: "12px" }}>Industry: {userdetails.industry ? userdetails.industry : ""}</p>}
                              {userdetails.permission && <p className="text-muted" style={{ fontSize: "12px" }}>Permission: {userdetails.permission ? userdetails.permission : ""}</p>}



                            </div>
                            <div className="card-footer">
                              {localStorage.getItem("id") != userdetails._id && <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* list of ........team members.................list.....................*/}





                  <div style={{ marginTop: "20px" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px"
                    }}>
                      <h4 className='text-light'>Team</h4>
                      {
                        (profiledata.role === 'Sub-Admin'||profiledata.AdditionalPortalAccess=='Sub-Admin') && <button style={{
                          borderRadius: "10px",
                          color: "white",
                          backgroundColor: "red"

                        }}
                          data-bs-toggle="modal"
                          data-bs-target="#inviteteam"
                        >Invite</button>


                      }
                    </div>
                    <div>


                      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft: "25px" }}>
                        {
                          profiledata &&
                          profiledata.AdditionalPortalAccessTeam &&
                          profiledata.AdditionalPortalAccessTeam.length > 0 &&
                          profiledata.AdditionalPortalAccessTeam.map((eachAdmin, index) => (
                            <div className='row' key={index}>
                              <div className="col mb-3">
                                <div className="card" style={{ width: "220px", marginLeft: "25px" }}>
                                  <img src={myPic} alt="Cover" className="card-img-top" />
                                  <div
                                    className="card-body text-center"
                                    style={{ marginBottom: "-20px" }}
                                    onClick={() => {
                                      handleButtonClick(`/sharedprofile/${eachAdmin._id}`);
                                    }}
                                  >
                                    <img
                                      src={UserImage}
                                      style={{ width: "100px", marginTop: "-65px" }}
                                      alt="user"
                                      className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                                    />
                                    <h5 className="card-title" style={{ fontSize: "12px" }}>
                                      {eachAdmin.name}
                                    </h5>
                                    {/* <p className="text-secondary" style={{ fontSize: "12px" }}>
              Role: {eachAdmin.role}
            </p> */}
                                    {eachAdmin.location && (
                                      <p className="text-muted" style={{ fontSize: "12px" }}>
                                        Location: {eachAdmin.location}
                                      </p>
                                    )}
                                    {/* {eachAdmin.industry && (
              <p className="text-muted" style={{ fontSize: "12px" }}>
                Industry: {eachAdmin.industry}
              </p>
            )}
            {eachAdmin.permission && (
              <p className="text-muted" style={{ fontSize: "12px" }}>
                Permission: {eachAdmin.permission}
              </p>
            )} */}
                                    <p style={{ fontSize: "15px" }}>Permissions:-</p>

                                    <ul style={{ overflow: 'auto', maxHeight: '100px' }}>
                                      {Array.isArray(eachAdmin.AdditionalPortalAccessPermissions) && eachAdmin.AdditionalPortalAccessPermissions.length > 0 ? (
                                        eachAdmin.AdditionalPortalAccessPermissions.map((data, index) => (
                                          <li key={index}>{data}</li>
                                        ))
                                      ) : (
                                        <li>No permissions available</li>
                                      )}
                                    </ul>



                                  </div>
                                  <div className="card-footer">
                                    <button
                                      className="btn btn-success btn-sm bg-light btn-block m-1 text-success"
                                      type="button"
                                    >
                                      Message
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }



                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                          {
                            (subadminPage !== 0) && <button
                              onClick={() => setSubAdminPage(subadminPage - 1)}
                              style={{
                                borderRadius: "10px",
                                color: "white",
                                backgroundColor: "#83a4d4",
                                marginRight: "40px"
                              }}
                            >&laquo; Previous</button>
                          }
                          {
                            subAdmin.length === 3 && <button
                              onClick={() => setSubAdminPage(subadminPage + 1)}


                              style={{
                                borderRadius: "10px",
                                color: "white",
                                backgroundColor: "#83a4d4"
                              }}
                            > Next &raquo; </button>
                          }
                        </div>
                      </div>



                    </div>
                  </div>



                </div>



              </div>

                  }


{/* Team member */}

{
        
(userdetails && userdetails.AdditionalPortalAccess=="Team Member")&&

<div style={{ display: "flex" }}>


  <div>
    <div style={{
      left: "0",


    }}>
      <h4 className="text-light">Team Lead</h4>
    </div>
{
   profiledata.AdditionalPortalAccessTeamLead&&
   <div>
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft: "25px" }}>
        <div className="row">
          <div className="col mb-3">
            <div className="card" style={{ width: "200px", marginLeft: "25px" }}>
              <img src={myPic} alt="Cover" className="card-img-top" />
              <div className="card-body text-center">
                <img src={UserImage1} style={{ width: "100px", marginTop: "-65px" }} alt="user" className="img-fluid img-thumbnail rounded-circle border-0 mb-3" />
                <h5 className="card-title">{profiledata.AdditionalPortalAccessTeamLead.name ? profiledata.AdditionalPortalAccessTeamLead.name : ""}</h5>
            
                {profiledata.AdditionalPortalAccessTeamLead.location && <p className="text-muted" style={{ fontSize: "12px" }}>Location: {profiledata.AdditionalPortalAccessTeamLead.location ? profiledata.AdditionalPortalAccessTeamLead.location : ""}</p>}

                {profiledata.AdditionalPortalAccessTeamLead.state && <p className="text-muted" style={{ fontSize: "12px" }}>State: {profiledata.AdditionalPortalAccessTeamLead.state ? profiledata.AdditionalPortalAccessTeamLead.state : ""}</p>}




              </div>
              <div className="card-footer">
                {profiledata.email!= profiledata.AdditionalPortalAccessTeamLead.email && <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}
    


    {/* list of ........team members.................list................additional portal acess team list will come from team lead.......*/}





    <div style={{ marginTop: "20px" }}>
  
      <div>


        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", marginLeft: "25px" }}>
          {
            profiledata &&
            profiledata.AdditionalPortalAccessTeamLead
            &&
            profiledata.AdditionalPortalAccessTeamLead.AdditionalPortalAccessTeam
            .length > 0 &&
            profiledata.AdditionalPortalAccessTeamLead.AdditionalPortalAccessTeam.map((eachAdmin, index) => (
              <div className='row' key={index}>
                <div className="col mb-3">
                  <div className="card" style={{ width: "220px", marginLeft: "25px" }}>
                    <img src={myPic} alt="Cover" className="card-img-top" />
                    <div
                      className="card-body text-center"
                      style={{ marginBottom: "-20px" }}
                      onClick={() => {
                        handleButtonClick(`/sharedprofile/${eachAdmin._id}`);
                      }}
                    >
                      <img
                        src={UserImage}
                        style={{ width: "100px", marginTop: "-65px" }}
                        alt="user"
                        className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                      />
                      <h5 className="card-title" style={{ fontSize: "12px" }}>
                        {eachAdmin.name}
                      </h5>

                      {eachAdmin.location && (
                        <p className="text-muted" style={{ fontSize: "12px" }}>
                          Location: {eachAdmin.location}
                        </p>
                      )}

                      <p style={{ fontSize: "15px" }}>Permissions:-</p>

                      <ul style={{ overflow: 'auto', maxHeight: '100px' }}>
                        {Array.isArray(eachAdmin.AdditionalPortalAccessPermissions) && eachAdmin.AdditionalPortalAccessPermissions.length > 0 ? (
                          eachAdmin.AdditionalPortalAccessPermissions.map((data, index) => (
                            <li key={index}>{data}</li>
                          ))
                        ) : (
                          <li>No permissions available</li>
                        )}
                      </ul>



                    </div>
                    <div className="card-footer">
                    {profiledata.email!= eachAdmin.email && <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Message</button>}

                    </div>
                  </div>
                </div>
              </div>
            ))
          }



          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
            {
              (subadminPage !== 0) && <button
                onClick={() => setSubAdminPage(subadminPage - 1)}
                style={{
                  borderRadius: "10px",
                  color: "white",
                  backgroundColor: "#83a4d4",
                  marginRight: "40px"
                }}
              >&laquo; Previous</button>
            }
            {
              subAdmin.length === 3 && <button
                onClick={() => setSubAdminPage(subadminPage + 1)}


                style={{
                  borderRadius: "10px",
                  color: "white",
                  backgroundColor: "#83a4d4"
                }}
              > Next &raquo; </button>
            }
          </div>
        </div>



      </div>
    </div>



  </div>



</div>

 }




                  


          </div>

      }



{/* modal for inviting Admin  and Sub Admins................ */}


      <div
        class="modal fade mt-5"
        id="invite"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">
                invite
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Admininvite />
            </div>

          </div>
        </div>
      </div>


{/* modal for inviting team members........... */}



<div
        class="modal fade mt-5"
        id="inviteteam"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title text-primary fs-5" id="exampleModalLabel">
                Invite Team Member
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

           <Teaminvite/>

            </div>

          </div>
        </div>
      </div>










    </div>
  )
}

export default Admin
