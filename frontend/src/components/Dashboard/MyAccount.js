import React, { Fragment, useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Details from "./Details";
import phonepay from "../../assets/phonepay.jpg";
import googleimg from "../../assets/Google-Pay-hero.webp";
import paytm from "../../assets/paytmlogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GiCheckMark } from "react-icons/gi";
import moment from "moment";
import Loader from "./Loader";
import Modal from "react-modal";

//amount withdraw modal imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./myaccount.css";

import { BsKeyFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";


import MyContext from '../../mycontext';

import Messagebox from '../../components/messaging/MessageBox';

function MyAccount() {

  const { handleclickdiv, profilepicfunction } = useContext(MyContext)


  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setIsOpen(false);
  };
  const [flag, setFlag] = useState(false);
  const [details, setDetails] = useState({});
  const [objectSurvey, setObjectSurvey] = useState(false);
  const [profile, setProfile] = useState(false);
  const [document, setDocument] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();



  function checkStatus() {


    


    if (objectSurvey && profile && document) navigate("/PhonePayIntegration");
    else alert("Go to dashboard and complete all the steps");
  }

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_IP_ADDRESS
        }/karands/survey/${localStorage.getItem("email")}`
      )
      .then((res) => {
        let entireDetails = res.data.details;

        if (entireDetails !== null) {
          setObjectSurvey(true);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${
          process.env.REACT_APP_IP_ADDRESS
        }/karands/users/${localStorage.getItem("id")}`
      )
      .then((res) => {
        let entireDetails = res.data.details;

        setDetails(entireDetails);
        if (entireDetails.fullName) {
          setProfile(true);
        }
        if (entireDetails.aadharCard || entireDetails.panCard) {
          setDocument(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [flag]);

  useEffect(() => {}, [flag]);

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


  async function generation() {
    if (
      details.subscriptiondetails &&
      details.subscriptiondetails.transactionDate &&
      moment(details.subscriptiondetails.transactionDate).isBefore(
        moment(details.subscriptiondetails.expiryDate)
    )) {
      if (details.refferalCodeGenerated) {
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

              alert("code generated");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("Pay subscription to generate refferal code");
    }
  }

  // console.log("details.transation id", details.transactionId)

  // function to add back account

  const [backinput, setbankinput] = useState({
    bankaccountnumber: "",
    ifsc: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setbankinput({
      ...backinput,
      [name]: value,
    });
  };

  const addBankAccount = async () => {
    const data = {
      bankaccountnumber: backinput.bankaccountnumber,

      ifsc: backinput.ifsc,
      userid: localStorage.getItem("id"),
    };

    console.log("data", data);
  };

  const [withdrawopen, setWithdrawopen] = useState(false);

  const handleWithdrawOpen = () => {
    setWithdrawopen(true);
  };

  const handleWitdrawClose = () => {
    setWithdrawopen(false);
  };

  const [statementopen, setStatementopen] = useState(false);

  const handleStatementOpen = () => {
    setStatementopen(true);
  };

  const handlestatementClose = () => {
    setStatementopen(false);
  };

  const [empinopen, setEmpinopen] = useState(false);

  const handleEmpinopen = () => {
    setEmpinopen(true);
  };

  const handleEmpinclose = () => {
    setEmpinopen(false);
  };

  const [showpin, setShowpin] = useState(false);
  const [confirmshowpin, setConfirmShowpin] = useState(false);

  function handleShowpin(id) {
    if (id === "empin") setShowpin(!showpin);
    else setConfirmShowpin(!confirmshowpin);
  }







  return (
    <div className="">
      {isLoading ? (
        // <div>Loading...</div>

        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        // Show a loader while loading
        <div className="row flex-nowrap" style={{ width: "100%" }}>
          <Sidebar userPage="myaccount" />
          <div className="col container" style={{ maxWidth: "80%" }}>
            <Details />
            <hr />

            <div
              style={{
                backgroundColor: "transparent",
                maxHeight: "980",
                marginTop: "20px",
              }}
              className="container-xl container-lg mt-6 mb-7"
            >
              <div className="card">
            

                <div className="card-header d-flex justify-content-between">
                  <h5 className="d-flex text-start">User Account Page</h5>
                  {details.role == "ichp" &&
                  details.subscriptiondetails &&
                  moment(details.subscriptiondetails.transactionDate).isBefore(
                    moment(details.subscriptiondetails.expiryDate)) ? (
                    <Fragment>
                      <a href="/ichpmytask">
                        <button
                          className="btn"
                          formTarget="_blank"
                          style={{
                            backgroundColor: "rgb(3, 104, 104)",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          My Task Dashboard
                        </button>
                      </a>
                      {details.subscriptiondetails &&
                        moment(details.subscriptiondetails.transactionDate).isBefore(
                          moment(details.subscriptiondetails.expiryDate)) ? (
                        <p style={{ color: "rgb(3, 104, 104)" }}>
                          Account is Activated
                          <span>
                            <GiCheckMark />
                          </span>
                        </p>
                      ) : (
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "rgb(3, 104, 104)",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          onClick={() => checkStatus()}
                        >
                          Activate my Account
                        </button>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {details.subscriptiondetails &&
                        moment(details.subscriptiondetails.transactionDate).isBefore(
                          moment(details.subscriptiondetails.expiryDate)) ? (
                        <p style={{ color: "rgb(3, 104, 104)" }}>
                          Account is Activated
                          <span>
                            <GiCheckMark />
                          </span>
                        </p>
                      ) : (
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "rgb(3, 104, 104)",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          onClick={() => checkStatus()}
                        >
                          Activate my account
                        </button>
                      )}
                    </Fragment>
                  )}
                </div>

                <div className="card-body">
                  <h4 className="d-flex text-start pt-3">User Details</h4>
                  <div className="row">
                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Name:</h6>
                      <h6 className="text-muted pl-2">{details.name}</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Mobile Number:</h6>
                      <h6 className="text-muted pl-2">
                        {details.mobilenumber}
                      </h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Role:</h6>
                      <h6 className="text-muted pl-2">{details.role}</h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">
                        Date of Registration:
                      </h6>
                      <h6 className="text-muted pl-2">
                        {details.RegistrationDate}
                      </h6>
                    </div>

                    <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                      <h6 className="  fs-6 fw-normal ">Email Id:</h6>
                      <h6 className="text-muted pl-2">{details.email}</h6>
                    </div>

                    <div className="card mt-3">
                      <div className="row">
                        <h4 className="d-flex text-start pt-3">
                          Refferal Details
                        </h4>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">
                            Refferal code:{" "}
                            {details.refferalCodeGenerated
                              ? details.refferalCodeGenerated
                              : " Not yet Generated"}
                          </h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <button
                            type="button"
                            onClick={() => generation()}
                            className="btn "
                            style={{
                              backgroundColor: "rgb(3, 104, 104)",
                              color: "white",
                              borderRadius: "5px",
                            }}
                            disabled={
                              !(
                                details.subscriptiondetails &&
                                moment(details.subscriptiondetails.transactionDate).isBefore(
                                  moment(details.subscriptiondetails.expiryDate))
                              )
                            }
                          >
                            Generate Code
                          </button>

                          <div
                            className="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    Modal title
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body"></div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">
                            No of Refferals:
                          </h6>
                          <h6 className=" text-muted pl-2 fs-6 fw-normal ">
                            {" "}
                            {details.RefferalCount.length > 0
                              ? details.RefferalCount.length
                              : 0}
                          </h6>
                          <Link
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                            to="/view"
                          >
                            View
                          </Link>
                          {/* <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2" style={{ textDecoration: 'none' }} > View</a> */}
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">
                            Subscriptions Date:
                          </h6>
                          <h6 className=" text-muted pl-2 fs-6 fw-normal ">
                            {" "}
                            {details.subscriptiondetails &&
                            details.subscriptiondetails.transactionDate
                              ? details.subscriptiondetails.transactionDate
                              : "no data"}
                          </h6>
                          {/* <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2" style={{ textDecoration: 'none' }} > View</a> */}
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Valid till:</h6>
                          <h6 className=" text-muted pl-2 fs-6 fw-normal ">
                            {" "}
                            {details.subscriptiondetails &&
                            details.subscriptiondetails.expiryDate
                              ? details.subscriptiondetails.expiryDate
                              : " no data"}
                          </h6>
                          {/* <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2" style={{ textDecoration: 'none' }} > View</a> */}
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          {/* <h6 className="  fs-6 fw-normal ">My Empin: 12345</h6> */}

                          {/* <a href="/ICHP/myaccount" className="h6 stretched-link btn-link d-flex justify-content-start ms-2" style={{ textDecoration: 'none' }} > View</a> */}
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          {/* <button type='button' className='btn' onClick={handleEmpinopen} style={{ backgroundColor: "rgb(3, 104, 104)", color: "white", borderRadius: "5px" }}>Generate Empin</button> */}

                          <Dialog open={empinopen} onClose={handleEmpinclose}>
                            <DialogTitle>Generate your empin</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                <div class="input-group mt-3 mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      <BsKeyFill />
                                    </span>
                                  </div>
                                  <input
                                    id="Empin"
                                    placeholder="Create your Empin"
                                    type="text"
                                    class="form-control"
                                  />
                                  <div class="input-group-append">
                                    <span
                                      onClick={() => handleShowpin('123')}
                                      class="input-group-text"
                                    >
                                      {showpin ? (
                                        <AiFillEyeInvisible />
                                      ) : (
                                        <AiFillEye />
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div class="input-group mt-3 mb-3">
                                  <div class="input-group-prepend"></div>
                                  <input
                                    id="Empin"
                                    placeholder="Confirm Empin"
                                    type="text"
                                    class="form-control"
                                  />
                                </div>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleEmpinclose}>Cancel</Button>
                              <Button onClick={handleEmpinclose}>
                                Confirm
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-3">
                      <div className="row">
                        <h4 className="d-flex text-start pt-3">
                          Payment Details
                        </h4>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Balance:</h6>
                          <h6 className="text-muted pl-2">
                            {details.Balance ? details.Balance : 0} rupees
                          </h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <button
                            type="button"
                            className="btn "
                            style={{
                              backgroundColor: "rgb(3, 104, 104)",
                              color: "white",
                              borderRadius: "5px",
                            }}
                          >
                            Add Topup
                          </button>
                        </div>

                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Total earned:</h6>
                          <h6 className="text-muted pl-2">
                            {details.Earned ? details.Earned : 0} rupees
                          </h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3">
                          <button
                            type="button"
                            className="btn "
                            onClick={handleStatementOpen}
                            style={{
                              backgroundColor: "rgb(3, 104, 104)",
                              color: "white",
                              borderRadius: "5px",
                            }}
                          >
                            Statement
                          </button>
                          <Dialog
                            open={statementopen}
                            onClose={handlestatementClose}
                          >
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                <table class="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Transaction Id</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">1</th>
                                      <td>000000000000000000000</td>
                                      <td>21/12/2021</td>
                                      <td>12222</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">2</th>
                                      <td>7777777777777777777</td>
                                      <td>21/12/2021</td>
                                      <td>12222</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">3</th>
                                      <td>8888888888888888</td>
                                      <td>21/12/2021</td>
                                      <td>12222</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handlestatementClose}>
                                Cancel
                              </Button>
                              <Button onClick={handlestatementClose}>
                                Confirm
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        {/* <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 " >
                          <h6 className="  fs-6 fw-normal ">Withdrawn Amount:</h6>
                          <h6 className="text-muted pl-2">{details.Withdrawn ? details.Withdrawn : 0} rupees</h6>
                      </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 mb-3" >
                          <button type="button" id='' className="btn" style={{ backgroundColor: "rgb(3, 104, 104)", color: "white", borderRadius: "5px" }}>Withdraw</button>
                        </div>*/}
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">
                            Total Withdraw Amount:
                          </h6>
                          <h6 className="text-muted pl-2">2000/- rupees</h6>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 mb-3">
                          <button
                            type="button"
                            className="btn"
                            onClick={handleWithdrawOpen}
                            style={{
                              backgroundColor: "rgb(3, 104, 104)",
                              color: "white",
                              borderRadius: "5px",
                              width: "95px",
                            }}
                          >
                            Withdraw
                          </button>
                          <Dialog
                            open={withdrawopen}
                            onClose={handleWitdrawClose}
                          >
                            <DialogTitle>Withdraw</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                To Withdraw Amount, please enter your mpin
                                Below.
                                <Link>Forget mpin</Link>
                              </DialogContentText>
                              <DialogContentText>
                                <div class="input-group mt-3 mb-3">
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      &#8377;
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Amount (to the nearest dollar)"
                                  />
                                  <div class="input-group-append">
                                    <span class="input-group-text">.00</span>
                                  </div>
                                </div>
                                <div class="input-group mb-3">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="00000000"
                                    aria-label="0000000"
                                    aria-describedby="basic-addon2"
                                  />
                                  <div class="input-group-append">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon2"
                                    >
                                      Your Empin
                                    </span>
                                  </div>
                                </div>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleWitdrawClose}>
                                Cancel
                              </Button>
                              <Button onClick={handleWitdrawClose}>
                                Confirm
                              </Button>
                            </DialogActions>
                          </Dialog>
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
                          <p className="h6  d-flex justify-content-start">
                            https:///api/1/invites /send_invite_link{" "}
                          </p>
                          <span className="bi bi-share-fill ms-2"></span>
                        </div>
                        <div className="col-lg-6 d-flex  flex-lg-row align-items-center mt-3 ">
                          <button
                            type="button"
                            className="btn btn-success"
                            style={{ borderRadius: "5px" }}
                          >
                            Create Link
                          </button>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h5 className=" fs-5 display-6 ">Website links:</h5>
                        </div>
                        <div className="col-lg-12 d-flex  flex-lg-row align-items-center mt-3 ">
                          <h6 className="  fs-6 fw-normal ">Google account:</h6>
                          <p
                            href="/ICHP/myaccount"
                            className="h6 d-flex justify-content-start ms-2"
                          >
                            www.google.com{" "}
                          </p>
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
                              className="btn btn-outline-success me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#addgooglepay"
                              style={{ borderRadius: "5px" }}
                            >
                              Add
                            </button>

                            <button
                              type="button"
                              className="btn btn-success"
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
                                  <img src={googleimg} width={40} height={40} />
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    GooglePay
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        className="d-flex text-start"
                                        for="upiid"
                                      >
                                        Your GooglePay id
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="upiid"
                                        placeholder="(eg: yourname@bankname)"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      class="btn btn-success"
                                    >
                                      Add
                                    </button>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  {/*<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
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
                              width="60"
                            />
                            <div className="d-flex flex-column ms-4">
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
                              className="btn btn-outline-success me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#addphonepay"
                              style={{ borderRadius: "5px" }}
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              className="btn btn-success"
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
                                  <img src={phonepay} width={30} height={30} />
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    PhonePay
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        className="d-flex text-start"
                                        for="phonepayupiid"
                                      >
                                        Your PhonepPay id
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="phonepayupiid"
                                        placeholder="(eg: 1234567890@ybl)"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      class="btn btn-success"
                                    >
                                      Add
                                    </button>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  {/*<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
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
                              src={paytm}
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
                              className="btn btn-outline-success me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#addpaytm"
                              style={{ borderRadius: "5px" }}
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              className="btn btn-success"
                              style={{ borderRadius: "5px" }}
                            >
                              Change
                            </button>
                          </div>
                          <div
                            class="modal fade"
                            id="addpaytm"
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
                                  <img src={paytm} width={40} height={40} />
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Paytm
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <form>
                                    <div class="form-group">
                                      <label
                                        className="d-flex text-start"
                                        for="paytupiid"
                                      >
                                        Your Paytm id
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="paytmupiid"
                                        placeholder="(eg: 1234567890@ybl)"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      class="btn btn-success"
                                    >
                                      Add
                                    </button>
                                  </form>
                                </div>
                                <div class="modal-footer">
                                  {/*<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
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
                            className="btn btn-success"
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
                                    placeholder="Enter Your Bank Name"
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
                                    name="bankaccountnumber"
                                    placeholder="Bank Account Number"
                                    value={backinput.bankaccountnumber}
                                    onChange={handleChange}
                                  />{" "}
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
                                    name="ifsc"
                                    placeholder="IFSC Code"
                                    value={backinput.ifsc}
                                    onChange={handleChange}
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
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={addBankAccount}
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
                      {/* <div className='row'>
                        <div className='col-6'>
                          <div class="cardContainer">
                            <div class="card bankcard">
                           
                              <div class="card-inner">
                             
                                <div class="front">

                                  <div class="row card-no">
                                    <b>1111111111111</b>
                                    
                                  </div>
                                  <div class="visa_crinfo">
                                    <p>IFSC - UCBA1234</p>
                                    <p>Nikhil Bobade chandra sekhar</p>
                                  </div>
                                 
                                </div>
                                <div className='check-bank'>
                                <i>check this box to make this A/C as Primary Account</i>
                                <input className='fw-5 ms-2 ' type='checkbox' />
                                </div>
                              
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}

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
                            className="btn btn-success"
                          >
                            Add Bank Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Messagebox handleclickdiv={handleclickdiv} />
    </div>
  );
}
export default MyAccount;
