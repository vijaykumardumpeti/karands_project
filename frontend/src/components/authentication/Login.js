import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { MDBCheckbox } from "mdb-react-ui-kit";

import TermsAndCondition from "./TermsAndCondition";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Register";

import "./signup.css";
import Header from "./Header";
import Footer from "./Footer";

import audiofile from "../../assets/alert1.mp3"; // Adjust the file path accordingly

function Login() {
  // const [currentIndex, setCurrentIndex] = useState(0)

  const [show, setshow] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);
  const [checked, setchecked] = useState(false);

  // const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  // } = useForm();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    location: "",
    password: "",
    confirm: "",
  });

  const [emailerror, setemailerror] = useState("");

  function passwordChange(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (id === "pass") setShowPass(!showPass);
    else setConfrimShowPass(!confrimshowPass);
  }

  const navigate = useNavigate();

  const signupDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Dismiss any existing toasts
    toast.dismiss();

    // Select the password input element by its id
    const passwordInput = document.getElementById("pass-div");

    axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/login`, {
        email: details.email,
        password: details.password,
      })
      .then((res) => {
        console.log(res.data.message);

        if (res.data.message) {
          // Show a password wrong warning toast
          toast.error("Wrong password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Add CSS classes for the animation
          passwordInput.classList.add("wrong-password", "shake-animation");

          setTimeout(() => {
            // Remove the CSS classes after the animation
            passwordInput.classList.remove("wrong-password", "shake-animation");
          }, 1500);
        } else {
          // Handle other cases or success
          if (res.data.id) {
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("fullName", res.data.fullName);

            toast.success("Login successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  // validate the user is their are not.......................................
  useEffect(() => {
    validateemail();
  }, [details]);

  async function validateemail() {
    console.log(
      ">>>came here inside validate Email function",
      details.email,
      `${process.env.REACT_APP_IP_ADDRESS}/validateuser`
    );
    const email = details.email;
    await axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/validateuser`, {
        email: email,
      })
      .then((res) => {
        setemailerror(res.data);
      })
      .catch((err) => console.log(err));
  }

  // handle check box in login

  function popUpHandle() {
    setPopUp(false);
  }

  function setshowfunction() {
    setshow(false);
  }

  const [showDelayedSentences, setShowDelayedSentences] = useState(false);

  useEffect(() => {
    // Use setTimeout to show the delayed sentences after 10 seconds
    const timer = setTimeout(() => {
      setShowDelayedSentences(true);
    }, 3000); // 10 seconds in milliseconds

    // Clear the timer when the component unmounts (cleanup)
    return () => clearTimeout(timer);
  }, []);

  const words = [
    " If you are a start-up then it is a place for you",
    " Find the most exciting jobs in TECH",
    " Be the first to apply with start-ups jobs",
    " Make your Objective visible and verified",
    " Make your Web Presence",
    " Build professional Network",
    " Refer and Earn",
    " Verify others and Earn",
    " Work from home & Remote",
    " Start your professional passive income ",
    " What you like being occupational or being professional",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [forwards, setForwards] = useState(true);
  const [skipCount, setSkipCount] = useState(0);
  const skipDelay = 15;
  const speed = 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (forwards) {
        if (charIndex >= words[wordIndex].length) {
          setSkipCount(skipCount + 1);
          if (skipCount === skipDelay) {
            setForwards(false);
            setSkipCount(0);
          }
        }
      } else {
        if (charIndex === 0) {
          setForwards(true);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setCharIndex(0);
        }
      }

      if (skipCount === 0) {
        if (forwards) {
          setCharIndex((prevIndex) => prevIndex + 2);
        } else {
          setCharIndex((prevIndex) => prevIndex - 2);
        }
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [wordIndex, charIndex, forwards, skipCount]);

  (function () {
    const introElements = document.getElementsByClassName("intro");
  
    // Loop through each element and add the class
    Array.from(introElements).forEach(element => {
      element.classList.add("go");
    });
  
    // Rest of your code...
  })();
  
  // play audio/........

  function playaudio() {
    const audio = new Audio(audiofile);
    audio.play();
  }

  return (
    <div className="landing-page">
      <Header />

      <ToastContainer />

      <div className="d-flex align-items-row align-items-center pl-4" style={{ backgroundColor: "transparent" }} >
        <div className="names-container">
          <h1 className="name-login">WHERE IDEAS BEGINS</h1>
          <h1 className="name-login">BRANDS ARE BORN</h1>
          <h1 className="name-login">VISIBILITY IS CREATED</h1>
        </div>
        {/* <div
          className="col-sm-6 col-md-6 col-lg-6"
          style={{ backgroundColor: "transparent" }}
        >
          <svg class="intro go" viewBox="0 0 200 86">
            <text
              text-anchor="start"
              x="10"
              y="30"
              class="text text-stroke"
              clip-path="url(#text1)"
              style={{ textShadow: "13px 13px black" }}
            >
              Where Ideas Begins{" "}
            </text>
            <text
              text-anchor="start"
              x="10"
              y="50"
              class="text text-stroke"
              clip-path="url(#text2)"
            >
              Brands Are Born
            </text>
            <text
              text-anchor="start"
              x="10"
              y="70"
              class="text text-stroke"
              clip-path="url(#text3)"
            >
              Visibilty Is Created
            </text>
            <text
              text-anchor="start"
              x="10"
              y="100"
              class="text text-stroke text-stroke-2"
              clip-path="url(#text1)"
              style={{ textShadow: "13px 13px black" }}
            >
              Where Ideas Begins
            </text>
            <text
              text-anchor="start"
              x="10"
              y="200"
              class="text text-stroke text-stroke-2"
              clip-path="url(#text2)"
            >
              Brands are Born
            </text>
            <text
              text-anchor="start"
              x="10"
              y="185"
              class="text text-stroke text-stroke-2"
              clip-path="url(#text3)"
            >
              Visibilty Is Created
            </text>
            <defs>
              <clipPath id="text1">
                <text text-anchor="start" x="10" y="30" class="text">
                  Where Ideas Begins
                </text>
              </clipPath>
              <clipPath id="text2">
                <text
                  text-anchor="start"
                  x="10"
                  y="50"
                  class="text"
                  style={{ textShadow: "13px 13px black" }}
                >
                  Brands Are Born
                </text>
              </clipPath>
              <clipPath id="text3">
                <text
                  text-anchor="start"
                  x="10"
                  y="70"
                  class="text"
                  style={{ textShadow: "13px 13px black" }}
                >
                  {" "}
                  Visibilty Is Created
                </text>
              </clipPath>
            </defs>
          </svg>
        </div> */}

        <div className="col-sm-6 col-md-6 col-lg-6">
          {!show ? (
            <Fragment>
              <div className="formdivLogin">
                <form
                  onSubmit={(e) => {
                    signupDetails(e);
                  }}
                  className="container formtag loginFormTag"
                  style={{
                    width: "300px",
                    backgroundColor: "#eefeff",
                    maxHeight: "350px",
                  }}
                >
                  <div>
                    <h3 className="logosign">
                      <span className="logosign">SIGN</span>{" "}
                      <span className="logoin">IN</span>
                    </h3>
                  </div>
                  <div className="input-group mb-2">
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
                      placeholder="Email id"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      onBlur={() => {
                        validateemail();
                      }}
                      autoComplete="off"
                    />
                    <br />
                  </div>

                  {emailerror == false && details.email.length > 0 ? (
                    <p style={{ color: "red" }}>email not registered</p>
                  ) : (
                    ""
                  )}

                  <div className="input-group mb-2" id="pass-div">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        style={{ width: "60px", maxWidth: "40px" }}
                        id="basic-addon1"
                      >
                        <RiLockPasswordFill
                          style={{ color: "rgb(3, 104, 104)" }}
                        />
                      </span>
                    </div>

                    <input
                      type="password"
                      id="pass"
                      className="form-control changePlaceHolderSize"
                      value={details.password}
                      onChange={(e) =>
                        setDetails({ ...details, password: e.target.value })
                      }
                      placeholder="Enter Password"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      autoComplete="off"
                    />

                    <span
                      onClick={() => passwordChange("pass")}
                      className="input-group-text"
                      style={{ width: "60px", maxWidth: "40px" }}
                      id="basic-addon1"
                    >
                      {showPass ? (
                        <AiTwotoneEyeInvisible
                          style={{ color: "rgb(3, 104, 104)" }}
                        />
                      ) : (
                        <AiFillEye style={{ color: "rgb(3, 104, 104)" }} />
                      )}
                    </span>
                  </div>

                  {/* <span className="errorsInreg">{errors.password && errors.password.message}</span> */}

                  <div
                    className="d-flex flex-start"
                    style={{ fontSize: "12px" }}
                  >
                    <MDBCheckbox
                      name="flexCheck"
                      label={
                        <span style={{ color: "black" }}>
                          I have read and agree to the T&C
                        </span>
                      }
                      onChange={(e) => setchecked(!checked)}
                    />
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setPopUp(true);
                      }}
                      style={{ marginLeft: "5px" }}
                    >
                      Read
                    </Link>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontSize: "13px" }}>
                      Not a user yet &nbsp;
                      <Link onClick={() => setshow(true)}>Signup</Link>
                    </p>
                    &nbsp;&nbsp;&nbsp;
                    {details.email && emailerror != false ? (
                      <p
                        style={{
                          fontSize: "13px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() =>
                          navigate("/forgotpassword", {
                            state: details.email ? details.email : "",
                          })
                        }
                      >
                        Forget password
                      </p>
                    ) : null}
                  </div>
                  <button
                    disabled={!checked}
                    style={{
                      backgroundColor: "rgb(3, 104, 104)",
                      color: "white",
                    }}
                    className="w-100 btn "
                    type="submit"
                    onKeyDown={() => {
                      playaudio();
                    }}
                  >
                    Signin
                  </button>
                </form>
              </div>
            </Fragment>
          ) : (
            <Register setshowfunction={setshowfunction} />
          )}
        </div>

        {popUp && <TermsAndCondition popUpHandle={popUpHandle} />}
      </div>

      <Footer />
    </div>
  );
}

export default Login;
