import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdPassword } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";

import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";

export default function Userchangepassword() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);

  const location = useLocation();

  const state = location.state;

  const [otperror, seteotperror] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [details, setDetails] = useState({
    password: "",
    confirm: "",
    emppin: "",
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

  const handleCheck = (e,email) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/forgotpassword/${email}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const signupDetails = () => {
    console.log(details);

    axios
      .post(
        `${process.env.REACT_APP_IP_ADDRESS}/karands/users/userchangePassword`,
        {
          email: state,

          password: details.password,
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data.details.name) {
          toast.success("password changed successful", {
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
            navigate("/");
          }, 1000);
        }

        // navigate('/')
      })
      .catch((err) => console.log(err));
  };

  async function validateotp(e) {
    const data = {
      email: state,
      emailotp: e.target.value,
    };

    await axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/validateotp`, data)
      .then((res) => {
        seteotperror(res.data);

        console.log("otpverifyfrom backenc", res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="adminLogin" style={{ marginTop: "15px" }}>
      <ToastContainer />

      <form
        onSubmit={handleSubmit(signupDetails)}
        className="container adminLoginForm"
        style={{ width: "380px", maxWidth: "80%" }}
        autoComplete="off"
      >
        <div>
          <h1>
            <span class="logo black">KARANDS</span>
            <span class="logo orange">ZONE</span>
          </h1>
        </div>

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

          {/* otp/......../ */}

          <input
            type="password"
            autoComplete="off"
            id="otp"
            className="form-control changePlaceHolderSize"
            placeholder="Enter otp"
            aria-label="Email"
            aria-describedby="basic-addon1"
            onBlur={(e) => {
              validateotp(e);
            }}
          />

          <span
            onClick={() => passwordChange("otp")}
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

        {otperror == false ? <p style={{ color: "red" }}>wrong otp</p> : ""}

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
            autoComplete="off"
            id="pass"
            className="form-control changePlaceHolderSize"
            {...register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message:
                  "The password must contain  at  8 characters long, least one uppercase letter, one lowercase letter, one numeric digit, and one symbol",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*$/,
                message:
                  "The password must contain  at  8 characters long, least one uppercase letter, one lowercase letter, one numeric digit, and one symbol",
              },
            })}
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            placeholder="Enter Password"
            aria-label="Email"
            aria-describedby="basic-addon1"
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
        <span className="errorsInreg">
          {errors.password && errors.password.message}
        </span>

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
            autoComplete="off"
            id="confrimpass"
            className="form-control changePlaceHolderSize"
            placeholder="Confirm Password"
            aria-label="PASSWORD"
            aria-describedby="basic-addon1"
            {...register("confirmPassword", {
              required: "Please Confirm Your Password",
              validate: (match) => {
                const password = getValues("password");
                return match === password || "Passwords should match!";
              },
            })}
            onChange={(e) =>
              setDetails({ ...details, confirm: e.target.value })
            }
          />
          <span
            onClick={() => passwordChange("confrimpass")}
            className="input-group-text"
            style={{ width: "60px", maxWidth: "40px" }}
            id="basic-addon1"
          >
            {confrimshowPass ? (
              <AiTwotoneEyeInvisible style={{ color: "#83a4d4" }} />
            ) : (
              <AiFillEye style={{ color: "#83a4d4" }} />
            )}
          </span>
        </div>
        <span className="errorsInreg">
          {errors.confirmPassword && errors.confirmPassword.message}
        </span>

        <div style={{ display: "flex", width: "100%" }}>
          <div className="input-group mb-3"></div>
        </div>
        <span className="errorsInreg">
          {errors.name && errors.name.message}
        </span>
        <button
          style={{ backgroundColor: "#83a4d4", color: "white" }}
          className="mb-4 w-100 btn "
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
