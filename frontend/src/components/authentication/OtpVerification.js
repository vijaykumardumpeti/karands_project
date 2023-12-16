import React, { useEffect, useState, Fragment, useContext } from 'react';
import "./signup.css"
import { MdEmail } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BsFillPhoneFill } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Details from '../Dashboard/Details';
import Sidebar from '../Dashboard/Sidebar';
import MyContext from '../../mycontext';

import { MdPassword } from "react-icons/md";



function OtpVerification() {


    const navigate = useNavigate();



    const { profiledata } = useContext(MyContext)



















    function goNext() {



        if (emailVerification) {
            // alert('Thanks for verified')
            setFlag(!flag)



            navigate("/dashboard")


        } else {
            // alert('Please Complete verification')
        }
    }







    const [seconds, setSeconds] = useState(90);

    const [isDisabled, setIsDisabled] = useState(false);

    const startTimer = () => {
        setSeconds(60);
        setIsDisabled(true);
    };

    const tick = () => {
        if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
            setIsDisabled(false);
        }
    };

    useEffect(() => {
        if (isDisabled) {
            const timer = setInterval(tick, 1000);

            return () => clearInterval(timer);
        }
    }, [isDisabled, seconds]);




    const [phoneNumber, setPhoneNumber] = useState("")
    const [emailVerification, setEmailVerification] = useState(false)
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState({
        mobilenumber: "",
        email: "",
    })


    const [empin,setempin]=useState("")


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
            .then(res => {
                const roles = res.data.details

                setPhoneVerification(roles.phoneVerified || false)
                setEmailVerification(roles.emailVerified || false)
                setPhoneNumber(roles.mobilenumber)
                 
                setempin(roles.empin)

                // console.log(roles);
            })

            .catch(err => console.log(err));

    }, [flag])




    // both email and sms otps are sending with his function

    function sendOTP() {


        startTimer()

        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/email/${localStorage.getItem('email')}`)
            .then(res => {
                alert('sms and email otp sended.')
            })
            .catch(err => console.log(err));
    }








    async function generateSixDigitPIN() {
        try {

            if (profiledata) {

                // Check if empin is not already generated
                if (!empin) {
                    // Generate a random 6-digit PIN
                    var pin = "";
                    for (var i = 0; i < 6; i++) {
                        pin += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
                    }

                    // Call the backend to generate and save the PIN
                    const res = await axios.put(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/generatempin`, {
                        email: profiledata.email,
                        empin: pin,
                    });

                    // Check the status of the response
                    if (res.data.status === "Success") {
                        console.log("PIN generated successfully");
                        alert("PIN generated successfully");
                        // Set flag or perform additional actions as needed
                        setFlag(!flag);


                        // window.location.reload();

                    } else {
                        console.error("PIN generation failed:", res.data.error);
                        alert("PIN generation failed");
                        // Handle the error (e.g., show a message to the user)
                    }
                } else {
                    // empin already generated
                    alert("empin already generated");
                }



            }

            if (!profiledata) {
                alert("please try again later!")
            }


        } catch (error) {
            console.error("Error generating PIN", error.message);
            alert("Error generating PIN");
            // Handle the error (e.g., show a message to the user)
        }
    }








    // here mail and phone is verifying   not only emiail

    function checkEmail() {


        console.log('details.email', details.email);


        axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/verification/${localStorage.getItem('email')}`, {
            emailOtp: details.email,
            phoneOtp: details.mobilenumber

        })
            .then(res => {
                console.log(res);
                setEmailVerification(true)
                alert('Email and phone Verified')
                setFlag(!flag)

                goNext()

                navigate("/dashboard")
            })
            .catch(err => alert('Unable to Verify'))
    }





    return (


        <div>

            <div className="row flex-nowrap" style={{ width: "100%" }}>
                <Sidebar userPage='dashboard' style={{ height: "100%" }} />
                <div className="col container" style={{ maxWidth: "100%" }}>
                    <Details />

                    <hr />

                    <div class="container-lg container-xl bigScreenOTP"
                        style={{ height: "80vh", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <div className='otpBox'>
                            <h4 style={{
                                marginBottom: "20px"
                            }}>Verification OTP</h4>
                            {
                                !emailVerification ?

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                                        <div style={{ width: "80%", marginTop: "10px" }} className="input-group mb-3">

                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    style={{ width: "60px", maxWidth: "40px" }}
                                                    id="basic-addon1"
                                                >
                                                    <MdEmail style={{ color: "rgb(3, 104, 104)" }} />
                                                </span>
                                            </div>

                                            <input
                                                type="text"
                                                className="form-control changePlaceHolderSize"

                                                wrapperClassName="mb-4"
                                                required
                                                value={details.email}
                                                onChange={(e) =>
                                                    setDetails({ ...details, email: e.target.value })
                                                }
                                                placeholder="Enter OTP send to your email"


                                                aria-label="Email"
                                                aria-describedby="basic-addon1"
                                            />


                                        </div>

                                    </div>
                                    : <Fragment><h6>Email Verified <VscVerifiedFilled style={{ color: "rgb(3, 104, 104)" }} /></h6></Fragment>
                            }
                            {
                                phoneVerification ? <Fragment><h6 style={{ marginBottom: "20px" }}>Phone Number Verified <VscVerifiedFilled style={{ color: "rgb(3, 104, 104)" }} /></h6></Fragment> :

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

                                        <div style={{ width: "80%", marginTop: "10px" }} className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span
                                                    className="input-group-text"
                                                    style={{ width: "60px", maxWidth: "40px" }}
                                                    id="basic-addon1"
                                                >
                                                    <BsFillPhoneFill style={{ color: "rgb(3, 104, 104)" }} />
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control changePlaceHolderSize"
                                                placeholder="Enter OTP send to your mobile"
                                                required
                                                value={details.mobilenumber}
                                                onChange={(e) =>
                                                    setDetails({ ...details, mobilenumber: e.target.value })
                                                }
                                                aria-label="Email"
                                                aria-describedby="basic-addon1"
                                            />

                                        </div>
                                        {/* <button onClick={() => checkPhoneNumber()} style={{ fontWeight: "bold", fontSize: "10px", marginLeft: "16px", marginBottom: "10px", color: "white", backgroundColor: "rgb(3, 104, 104)", borderRadius: "5px" }}> Verify </button> */}

                                    </div>
                            }




                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            style={{ width: "60px", maxWidth: "40px" }}
                                            id="basic-addon1"
                                        >
                                            <MdPassword style={{ color: "#83a4d4" }} />
                                        </span>
                                    </div>
                                    <input
                                   
                                        type="text"
                                        className="form-control changePlaceHolderSize"
                                        value={profiledata.empin ? profiledata.empin : ""}  // Use profiledata.emppin here
                                        id="form1"
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                    />


                                </div>

                                <button onClick={() => generateSixDigitPIN()} style={{ marginLeft: "10px", fontSize: "10px", width: "60px", height: "38px", borderRadius: "10px", color: "white", backgroundColor: "#83a4d4", fontWeight: "bold" }}>Generate</button>

                            </div>

                            <br />

                            <p >Note:- remember above empin for future use !!</p>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                marginTop: "10px"
                            }}>

                                {
                                    (!phoneVerification || !emailVerification) && <>
                                        {/* <button onClick={() => sendOTP()} style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}>Resend OTP</button> */}

                                        <button
                                            type="button"
                                            className={`btn btn-sm ${isDisabled ? 'btn-secondary' : 'btn-success'}`}
                                            onClick={isDisabled ? null : sendOTP}
                                            disabled={isDisabled}
                                        >
                                            {isDisabled ? (
                                                <Fragment>
                                                    <span className="mr-2">Resend OTP in {seconds}s


                                                    </span>

                                                </Fragment>
                                            ) : (
                                                <span className="text-center" style={{ color: 'white', display: 'block' }}>
                                                    Send OTP
                                                </span>
                                            )}
                                        </button>
                                    </>






                                }




                                <button onClick={() => checkEmail()} style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}>Verify</button>
                            </div>
                        </div>

                    </div>


                </div>

            </div>


        </div>

    )
}

export default OtpVerification
