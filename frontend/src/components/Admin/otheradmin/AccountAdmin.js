import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AdminDashboard from "../AdminDashboard";
import phonepay from "../../../assets/phonepay.jpg";
import googleimg from "../../../assets/Google-Pay-hero.webp";
import Modal from "react-modal";
import MyContext from "../../../mycontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BsKeyFill } from "react-icons/bs";

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "@mui/material";

export default function AccountAdmin(props) {
  const [flag, setFlag] = useState(false);

  const [showpin, setShowpin] = useState(true);

  const [confirmshowpin, setConfirmShowpin] = useState(false);

  const navigate = useNavigate();

  const { profiledata } = useContext(MyContext);

  // if(!profiledata){

  //     navigate("/adminlogin")
  // }

  // fetch user account details................

  useEffect(() => {
    // Find the modal backdrop element and change its background color
    const modalBackdrop = document.querySelector(".modal-backdrop");

    if (modalBackdrop) {
      modalBackdrop.style.backgroundColor = "white"; // Adjust alpha for transparency
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setIsOpen(false);
  };

  const [signupobj, setSignupobj] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
  });

  const [code, setCode] = useState("");

  const [empinopen, setEmpinopen] = useState(false);

  const handleEmpinopen = () => {
    setEmpinopen(true);
  };

  const handleEmpinclose = () => {
    setEmpinopen(false);
  };

  function handleShowpin(id) {
    if (id === "empin") setShowpin(!showpin);
    else setConfirmShowpin(!confirmshowpin);
  }

  function generateRandomCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    setFlag(!flag);
    return code;
  }

  async function generateRefferalCode() {
    if (profiledata.refferalCodeGenerated) {
      alert("Already code Generated ! ");
    } else {
      const code = generateRandomCode(10);

      await axios
        .post(
          `${
            process.env.REACT_APP_IP_ADDRESS
          }/karands/users/referralcodeGenerate/${localStorage.getItem("id")}`,
          {
            refferalCodeGenerated: code,
          }
        )
        .then((res) => {
          console.log("res", res);

          if (res.data) {
            setFlag(!flag);

            alert("code generated refreshing page..");

            window.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const [mpin, setmpin] = useState("");

  async function generatempin() {
    const data = {
      mpin: mpin,
    };

    console.log("data from mpin generation", data);

    const res=await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/generatempin`,data)

    if (res) {
      console.log("res from mpin", res);
    }
  }

  // FUNCTION TO GENERAT EMPIN

  async function generateSixDigitPIN() {
    var pin = "";
    for (var i = 0; i < 6; i++) {
      pin += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }

    const res = await axios.put(
      `${process.env.REACT_APP_IP_ADDRESS}/karands/users/generatempin`,
      { email: profiledata.email, empin: pin }
    );

    if (res) {
      console.log("res from mpin", res);

      window.location.reload();
    }
  }

  console.log("profiledata", profiledata);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <div className="container-xl container-lg mt-6 mb-7">
            {profiledata ? (
              <div className="card">
                <div className="card-header">
                  <h5 className="d-flex text-start">User Account Page</h5>
                </div>
                <div className="card-body">
                  <h4 className="d-flex text-start pt-3">User Details</h4>
                  <div className="row">
                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Name:</h6>
                      <h6 className="text-muted pl-2">{profiledata.name}</h6>
                    </div>
                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Role:</h6>
                      <h6 className="text-muted pl-2">{profiledata.role}</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Mobile Number:</h6>
                      <h6 className="text-muted pl-2">
                        {profiledata.mobilenumber}
                      </h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">
                        Additional role:{profiledata.AdditionalPortalAccess}
                      </h6>
                      <h6 className="text-muted pl-2"></h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Email Id:</h6>
                      <h6 className="text-muted pl-2">{profiledata.email}</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">
                        Date of Subscription:
                        {profiledata.subscriptiondetails
                          ? profiledata.subscriptiondetails.transactionDate
                          : ""}
                      </h6>
                      <h6 className="text-muted pl-2"></h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                    <h6 className="  fs-6 fw-normal ">
                      Location:
                      {profiledata.location
                        ? profiledata.location
                        : ""}
                    </h6>
                    <h6 className="text-muted pl-2"></h6>
                  </div>

                  <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                  <h6 className="  fs-6 fw-normal ">
                    
Professionalstate
:
                    {profiledata.Professionalstate
                      
                      ? profiledata.Professionalstate
                      
                      : ""}
                  </h6>
                  <h6 className="text-muted pl-2"></h6>
                </div>

                    <div className="card mt-4">
                      <div className="row">
                        <h4 className="d-flex text-start pt-3">
                          Refferal Details
                        </h4>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Refferal code :</h6>
                          <h6 className="text-muted pl-2">
                            {profiledata.refferalCodeGenerated
                              ? profiledata.refferalCodeGenerated
                              : ""}
                          </h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-2 ">
                          <button
                            type="button"
                            className="btn btn-danger "
                            onClick={generateRefferalCode}
                          >
                            Generate Code
                          </button>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">
                            No of Refferals :
                          </h6>
                          <h6 className=" text-muted pl-2 fs-6 fw-normal ">
                            30
                          </h6>

                          <a
                            href="#"
                            class="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            View
                          </a>
                        </div>

                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-4 ">
                          <h6 className="  fs-6 fw-normal ">
                            Date of Registration :
                          </h6>
                          <h6 className=" text-muted pl-2 fs-6 fw-normal ">
                            20/11/2022
                          </h6>
                        </div>

                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-4 ">
                          <h6 className="  fs-6 fw-normal ">Empin :</h6>

                          <h6 className=" text-muted pl-2 fs-6 fw-normal ">
                            {profiledata.empin
                              ? profiledata.empin
                              : "empin is not generated"}
                          </h6>
                        </div>

                        <button
                          onClick={() => generateSixDigitPIN()}
                          style={{
                            marginLeft: "10px",
                            fontSize: "10px",
                            width: "60px",
                            height: "38px",
                            borderRadius: "10px",
                            color: "white",
                            backgroundColor: "#83a4d4",
                            fontWeight: "bold",
                          }}
                        >
                          Generate
                        </button>

                        {/* <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 " >
                       <button type='button' className='btn' onClick={handleEmpinopen} style={{ backgroundColor: "rgb(3, 104, 104)", color: "white", borderRadius: "5px" }}>Generate Empin</button>
                        <Dialog open={empinopen} onClose={handleEmpinclose}>
                            <DialogTitle>Generate your empin</DialogTitle>
                            <DialogContent>

                              <DialogContentText>
                              <div class="input-group mt-3 mb-3">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><BsKeyFill /></span>
                              </div>
                              <input id="Empin" placeholder='Create your Empin' type="password" class="form-control" />
                              <div class="input-group-append">
                                <span onClick={() => handleShowpin(Empin)} class="input-group-text">
                                {showpin ?  <AiFillEyeInvisible /> :  <AiFillEye />}
                              </span>
                              </div>
                            </div>
                              <div class="input-group mt-3 mb-3">
                              <div class="input-group-prepend">
                              
                              </div>
                              <input id="Empin" placeholder='Confirm Empin' type="text" class="form-control" onChange={(e)=>{setmpin(e.target.value)}} />
                             
                            </div>

                              </DialogContentText>

                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleEmpinclose}>Cancel</Button>
                              <Button onClick={handleEmpinclose}   >Confirm</Button>
                            </DialogActions>
                          </Dialog>
                      </div> */}
                      </div>
                    </div>

                    <div className="card mt-3">
                      <div className="row">
                        <h4 className="d-flex text-start pt-3">
                          Payment Details
                        </h4>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Balance:</h6>
                          <h6 className="text-muted pl-2"> rupees</h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <button type="button" className="btn btn-danger">
                            Add Topup
                          </button>
                        </div>

                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Total earned:</h6>
                          <h6 className="text-muted pl-2"> rupees</h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3">
                          <button type="button" className="btn btn-danger">
                            {" "}
                            View Statement
                          </button>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">
                            Withdraw Amount:
                          </h6>
                          <h6 className="text-muted pl-2"> rupees</h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 mb-3">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#withdrawmodal"
                          >
                            Withdraw
                          </button>
                          <div
                            class="modal fade"
                            id="withdrawmodal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">...</div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-3">
                      <h4 className="d-flex text-start pt-3">
                        share your profile link:
                      </h4>
                      <div className="row">
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal me-2 ">
                            Invite link:
                          </h6>
                          <a
                            href=""
                            className="h6 stretched-link btn-link d-flex justify-content-start"
                          >
                            https:///api/1/invites /send_invite_link{" "}
                          </a>
                          <span className="bi bi-share-fill ms-2"></span>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ borderRadius: "5px" }}
                          >
                            Create Link
                          </button>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h5 className=" fs-5 display-6 ">
                            Social Media links:
                          </h5>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Linkedin:</h6>
                          <a
                            href="/ICHP/myaccount"
                            className="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                          >
                            https://www.linkedin.com/login{" "}
                          </a>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Twitter:</h6>
                          <a
                            href="/ICHP/myaccount"
                            className="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                          >
                            https://www.twitter.com/login{" "}
                          </a>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Facebook:</h6>
                          <a
                            href="/ICHP/myaccount"
                            className="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                          >
                            https://www.facebook.com/login{" "}
                          </a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h5 className=" fs-5 display-6 ">Website links:</h5>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Google account:</h6>
                          <a
                            href="/ICHP/myaccount"
                            className="h6 stretched-link btn-link d-flex justify-content-start ms-2"
                          >
                            www.google.com{" "}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="card  mt-3">
                      <div className="row">
                        <h4 className="d-flex text-start pt-3">
                          Payment Details
                        </h4>
                        <div className="mt-4 d-flex justify-content-between align-items-center col-lg-6">
                          <div className="d-flex flex-row align-items-center">
                            <img
                              alt="logo"
                              src={googleimg}
                              className="rounded "
                              style={{ width: "70px", height: "70px" }}
                            />
                            <div className="d-flex flex-column ms-3">
                              <span className="h5 mb-1 d-flex justify-content-start">
                                Google Pay
                              </span>
                              <span className="small text-muted">
                                8797799XXX@ybl
                              </span>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-danger me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#addgooglepay"
                              style={{ borderRadius: "5px" }}
                            >
                              Add
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{ borderRadius: "5px" }}
                            >
                              Change
                            </button>
                          </div>
                          <div
                            class="modal fade"
                            id="addgooglepay"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            role="dialog"
                          >
                            <div
                              class="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">...</div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="mt-4 d-flex justify-content-between align-items-center col-lg-6">
                          <div className="d-flex flex-row align-items-center">
                            <img
                              alt="logo"
                              src={phonepay}
                              className="rounded "
                              width="70"
                            />
                            <div className="d-flex flex-column ms-3">
                              <span className="h5 mb-1 d-flex justify-content-start">
                                Phone Pay
                              </span>
                              <span className="small text-muted">
                                1234 XXXX XXXX@ybl
                              </span>
                            </div>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-danger me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#addphonepay"
                              style={{ borderRadius: "5px" }}
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{ borderRadius: "5px" }}
                            >
                              Change
                            </button>
                          </div>
                          <div
                            class="modal fade"
                            id="addphonepay"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            role="dialog"
                          >
                            <div
                              class="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">...</div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="mt-4 d-flex justify-content-between align-items-center col-lg-6">
                          <div className="d-flex flex-row align-items-center">
                            <img
                              alt="logo"
                              src="https://i.imgur.com/qHX7vY1.webp"
                              className="rounded "
                              width="70"
                            />
                            <div className="d-flex flex-column ms-3">
                              <span className="h5 mb-1 d-flex justify-content-start">
                                Bank Deatails
                              </span>
                              <span className="small text-muted">
                                1234 XXXX XXXX 2570
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={handleOpen}
                            className="btn btn-danger"
                          >
                            Add Bank Details
                          </button>
                          <Modal
                            isOpen={isOpen}
                            onRequestClose={handleClose}
                            style={{
                              content: {
                                position: "fixed",
                                top: "57%", // Center vertically
                                left: "50%", // Center horizontally
                                transform: "translate(-50%, -50%)", // Center both horizontally and vertically
                                height: "450px",
                                width: "500px",
                              },
                            }}
                          >
                            <div className="card">
                              <div className="card-header">
                                <h5>Add Your Bank Details</h5>
                              </div>
                              <div className="card-body">
                                <div class="form-group">
                                  <label for="exampleInputEmail1">
                                    Enter Bank Name
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id=""
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">
                                    Name of the Account holder
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id=""
                                  />
                                  <small id="" class="form-text text-muted">
                                    Enter your name according to your bank
                                    account
                                  </small>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputEmail1">
                                    Bank Account Number
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id=""
                                    placeholder="Enter Your A/C number"
                                  />
                                  <small id="" class="form-text text-muted">
                                    We'll never share your account details with
                                    anyone else.
                                  </small>
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">
                                    Confirm Account Number
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id=""
                                    placeholder="Confirm Your account number"
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="exampleInputPassword1">
                                    IFSC Code
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id=""
                                  />
                                </div>
                                <div class="input-group mb-3">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="otp"
                                  />
                                  <div class="input-group-append">
                                    <button
                                      class="btn btn-danger"
                                      type="submit"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "no data"
            )}
          </div>
        </Box>
      </Box>
    </div>
  );
}
