import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdPassword } from "react-icons/md";

import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";

import "../authentication/signup.css"



// this is for password change..............................................







function Changepassword() {
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false);
    const [confrimshowPass, setConfrimShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();


    const [details, setDetails] = useState({
        password: "",
        confirm: "",
        emppin: ""
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

    function generateSixDigitPIN() {
        var pin = "";
        for (var i = 0; i < 6; i++) {
            pin += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        }
        setDetails({ ...details, emppin: pin })
    }

   
    const signupDetails = () => {
        console.log(details);
        axios.put(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/changePassword/empin`, {
            email: localStorage.getItem("email"),
            password: details.password,
            emppin: details.emppin
        })
            .then(res => {

                navigate('/dashboard/admin')


            })
            .catch(err => console.log(err))
    };


    return (
        <div className="adminLogin" style={{ marginTop: "15px" }}>
            <form
                onSubmit={handleSubmit(signupDetails)}
                className="container adminLoginForm"
                style={{ width: "380px", maxWidth: "80%" }}
            >
                <div>
                    <h1>
                        <span class="logo black">KARANDS</span><span class="logo orange">ZONE</span>
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
                    <input
                        type="password"
                        id="pass"
                        className="form-control changePlaceHolderSize"

                        {...register("password", {
                            required: "Please Enter Your Password",
                            minLength: {
                                value: 8,
                                message: "The password must contain  at  8 characters long, least one uppercase letter, one lowercase letter, one numeric digit, and one symbol",
                            },
                            pattern: {
                                value:
                                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).*$/,
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
                        {showPass ? <AiTwotoneEyeInvisible style={{ color: "#83a4d4" }} /> : <AiFillEye style={{ color: "#83a4d4" }} />}
                    </span>
                </div>
                <span className="errorsInreg">{errors.password && errors.password.message}</span>

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
                        {confrimshowPass ? <AiTwotoneEyeInvisible style={{ color: "#83a4d4" }} /> : <AiFillEye style={{ color: "#83a4d4" }} />}
                    </span>
                </div>
                <span className="errorsInreg">{errors.confirmPassword && errors.confirmPassword.message}</span>


                <div style={{ display: "flex", width: "100%" }}>
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

                            value={details.emppin}
                            required
                            {...register("emppin", {
                                required: "Generate Emppin"
                            })}

                            placeholder="Generate Emppin"
                            id="form1"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                        />



                    </div>
                    <button onClick={() => generateSixDigitPIN()} style={{ marginLeft: "10px", fontSize: "10px", width: "60px", height: "38px", borderRadius: "10px", color: "white", backgroundColor: "#83a4d4", fontWeight: "bold" }}>Generate</button>
               
               
               </div>
                <span className="errorsInreg">{errors.name && errors.name.message}</span>
                <button
                    style={{ marginTop: "10px", backgroundColor: "#83a4d4", color: "white" }}
                    className="mb-4 w-100 btn "
                    type="submit"
                >
                    Change Password
                </button>
            </form>

        </div>
    )
}

export default Changepassword;
