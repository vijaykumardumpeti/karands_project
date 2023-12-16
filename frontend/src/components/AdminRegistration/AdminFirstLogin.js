import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import "./Style.css";

// actual login page..................................................................

function AdminFirstLogin() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);

  const { register, handleSubmit } = useForm();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    location: "",
    password: "",
    confirm: "",
  });

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

  const signupDetails = async() => {
    console.log("clicked");

   await axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/admin/login`,
        {
          email: details.email,
          password: details.password,
        }
      )
      .then((res) => {
        console.log("res", res);
        if (res.data.id) {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("name", res.data.name);
          console.log(res.data.loginStatus);

          if (res.data.loginStatus === "new") {
            // Show an alert indicating a new user
            alert("Welcome, new user! Please proceed to password change.");
            navigate("/invite/passwordChange");
          } else {
            // Show an alert indicating a returning user
            alert("Welcome back!");
            navigate("/dashboard/admin");
          }
        } else {
          // Show an alert for unexpected response
          alert("Unexpected response from the server.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        // Show an alert for errors
        alert("An error occurred. Please try again later.");
      });
  };

  const [otptext, setOtpText] = useState(false);

  const adminTextClick = () => {
    setOtpText("please enter the 6 digit OTP which you recieve in Email");
  };

  const [emailerror, setemailerror] = useState("");

  useEffect(() => {
    validateemail();
  }, [details]);







  async function validateemail() {
    const email = details.email;
    console.log(">>>came here",email)
    await axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/validateuser`, {
        email: email,
      })
      .then((res) => {
        setemailerror(res.data);
      })
      .catch((err) => console.log("errrrr",err));
  }




  
  return (
    <div style={{ marginTop: "15px" }}>
      <div className="formdivLogin">
        <form
          onSubmit={handleSubmit(signupDetails)}
          className="container formtag "
          style={{
            width: "380px",
            backgroundColor: "whitesmoke",
            maxHeight: "350px",
          }}
        >
          <div>
            <h1>
              <span className="logo">Admin </span>
              <span class="logo orange">Login</span>
            </h1>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <MdEmail style={{ color: "#83a4d4" }} />
              </span>
            </div>
            <input
              type="text"
              className="form-control changePlaceHolderSize"
              {...register("email", {
                required: "Please Enter Your Email!",
              })}
              wrapperClassName="mb-4"
              required
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              placeholder="Enter Email ID"
              aria-label="Email"
              aria-describedby="basic-addon1"
              onBlur={() => {
                validateemail();
              }}
            />
          </div>
          <br />
          {console.log(">>>>>check check", details.email.length, emailerror)}
          {emailerror == false && details.email.length > 0 ? (
            <p style={{ color: "red" }}>email not registered</p>
          ) : (
            ""
          )}

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ width: "60px", maxWidth: "40px" }}
                id="basic-addon1"
              >
                <RiLockPasswordFill style={{ color: "#83a4d4" }} />
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
              placeholder="Enter OTP"
              aria-label="Email"
              aria-describedby="basic-addon1"
              required
            />

            <span
              onClick={() => passwordChange("pass")}
              className="input-group-text"
              style={{ width: "60px", maxWidth: "40px" }}
              id="basic-addon1"
            >
              {showPass ? (
                <AiTwotoneEyeInvisible style={{ color: "#83a4d4" }} />
              ) : (
                <AiFillEye style={{ color: "#83a4d4" }} />
              )}
            </span>
          </div>
          <p style={{ fontSize: "12px" }} className="text-mute">
            {otptext}
          </p>

          <button
            style={{ backgroundColor: "#83a4d4", color: "white" }}
            className="mb-4 w-100 btn "
            // type="submit"

            onClick={() => {
              signupDetails();
            }}
          >
            Signin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminFirstLogin;
