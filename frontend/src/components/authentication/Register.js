import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { BsFillPhoneFill } from 'react-icons/bs';
import Select from "react-select";
import { MDBCheckbox } from "mdb-react-ui-kit";
import TermsAndCondition from "./TermsAndCondition";
import "./signup.css"
import LoaderModal from "../spinner/spinnerStyle";
import Logout from "../completeRole/Logout";

function Register(props) {

    const email = localStorage.getItem("email") || false;
    const [popUp, setPopUp] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [confrimshowPass, setConfrimShowPass] = useState(false);
    const handleCheckBox = () => {
        return details.TermsAndConditionChecked || 'Please Check the Terms and conditions'
    }

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    function handlePhoneNumber(e) {
        let val = e.target.value;
        if (val.length === 1 && /^[6-9]/.test(val)) {
            console.log(e.target.value);
            setDetails({ ...details, mobilenumber: e.target.value });
        } else if (val.length !== 1 && val.length !== 11) {
            setDetails({ ...details, mobilenumber: e.target.value });
        }
    }

    function popUpHandle() {
        setPopUp(false);
        setDetails({ ...details, TermsAndConditionChecked: true });
    }



    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#83a4d4' : provided.borderColor,
            boxShadow: 'none', // Remove the default box-shadow
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#83a4d4', // Set the desired color for the dropdown icon
        }),

        placeholder: (provided) => ({
            ...provided,
            fontSize: '14px',
            textAlign: 'left',
            marginLeft: '15px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#83a4d4' : "white"
        })
    };





    const [isLoading, setIsLoading] = useState(false);


    const [city, setCity] = useState([]);

    const handleCityChange = (inputValue) => {



        if (inputValue.length >= 2) {
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city/${inputValue}`)
                .then((res) => {
                    setCity(res.data);
                })
        }
    };






    const [details, setDetails] = useState({
        name: "",
        email: "",
        mobilenumber: "",
        location: "",
        state: "",
        password: "",
        confirm: "",
        TermsAndConditionChecked: false,
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


    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/city`)
            .then((res) => {

                setCity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {

        if (details.location.value) {

            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/getstatebylocation/${details.location.value}`)
                .then((res) => {

                    if (res) {

                        console.log("details.location", details.location.value)
                        console.log(res)

                        setDetails({ ...details, state: res.data.state })

                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        }


    }, [details.location])

    const signupDetails = () => {
        console.log(details);
        axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/signup`, {
            name: details.name,
            email: details.email,
            mobilenumber: details.mobilenumber,
            state: details.state,
            location: details.location.value,
            password: details.password,
        })
            .then(res => {
                setIsLoading(true);

                localStorage.setItem('id', res.data.id)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('name', res.data.name)
                navigate('/role')


            })
            .catch(err => alert(err.response.data.message))
    };

    
    return (
        <div className="pt-3 pb-3">
            <Fragment>
                {
                    email ? <Logout back="/" />
                        :
                        <div>
                            <div className="formdivRegister">
                                <form
                                    onSubmit={handleSubmit(signupDetails)}
                                    className="container formtag regisFormTag"
                                    style={{ width: "350px", backgroundColor: "#eefeff",maxHeight:"600px" }}
                                >
                                    <div>
                                        <h1>
                                            <span className="logosign">Register</span>
                                        </h1>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"
                                                style={{ width: "60px", maxWidth: "40px" }}
                                                id="basic-addon1"
                                            >
                                                <FaUserCircle style={{ color: "rgb(3, 104, 104)" }} />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control changePlaceHolderSize"

                                            value={details.name}
                                            required
                                            {...register("name", {
                                                required: "Name Required"
                                            })}
                                            onChange={(e) =>
                                                setDetails({ ...details, name: e.target.value })
                                            }
                                            placeholder="Your Name"
                                            id="form1"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                    <span className="errorsInreg">{errors.name && errors.name.message}</span>

                                    <div className="input-group mb-3">
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
                                            {...register("email", {
                                                required: "Please Enter Your Email!",
                                            })}
                                            wrapperClassName="mb-4"
                                            required
                                            rules={{
                                                required: 'Email is required',
                                                pattern: {
                                                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                  message: 'Invalid email address',
                                                },
                                              }}
                                            value={details.email}
                                            onChange={(e) =>
                                                setDetails({ ...details, email: e.target.value })
                                            }
                                            placeholder="Email id"


                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                    <div className="input-group mb-3">
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
                                            placeholder="Enter Mobile Number"
                                            required
                                            value={details.mobilenumber}
                                            onChange={(e) => handlePhoneNumber(e)}

                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                    <div style={{ marginBottom: "10px", width: "100%" }}>

                                        <Select

                                            styles={customStyles}
                                            onInputChange={handleCityChange}

                                            rules={{ required: 'This field is required' }}
                                            value={details.location}
                                            options={city}
                                            placeholder="Select Location"
                                            onChange={(e) => {
                                                console.log(e);
                                                setDetails({ ...details, location: e })
                                            }}
                                        />

                                    </div>
                                    
                                    <input
                                        type="text"
                                        className="form-control changePlaceHolderSize mb-3"

                                        value={details.state}
                                        aria-describedby="basic-addon1"
                                    />

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"
                                                style={{ width: "60px", maxWidth: "40px" }}
                                                id="basic-addon1"
                                            >
                                                <RiLockPasswordFill style={{ color: "rgb(3, 104, 104)" }} />
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
                                            {showPass ? <AiTwotoneEyeInvisible style={{ color: "rgb(3, 104, 104)" }} /> : <AiFillEye style={{ color: "rgb(3, 104, 104)" }} />}
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
                                                <RiLockPasswordFill style={{ color: "rgb(3, 104, 104)" }} />
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            id="confrimpass"
                                            className="form-control changePlaceHolderSize"
                                            placeholder="Confirm Password"
                                            aria-label="Email"

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
                                            {confrimshowPass ? <AiTwotoneEyeInvisible style={{ color: "rgb(3, 104, 104)" }} /> : <AiFillEye style={{ color: "rgb(3, 104, 104)" }} />}
                                        </span>
                                    </div>
                                    <span className="errorsInreg">{errors.confirmPassword && errors.confirmPassword.message}</span>


                                    <div className="d-flex justify-content-center" style={{ fontSize: "13px" }}>
                                        <MDBCheckbox
                                            type="checkbox"
                                            id="flexCheckDefault"
                                            readOnly
                                            {...register('terms', {
                                                validate: { handleCheckBox }
                                            })}
                                            value={details.TermsAndConditionChecked}
                                            onChange={(e) => setDetails({ ...details, TermsAndConditionChecked: e.target.checked })}

                                        />
                                        <label style={{ fontSize: "13px" }}>I have read and agree to the T&C</label>
                                        <Link onClick={(e) => {
                                            e.preventDefault();
                                            setPopUp(true)
                                        }} style={{ marginLeft: "5px", fontSize: "13px" }}>Read</Link>
                                    </div>

                                    <Link style={{ fontSize: "13px" }} onClick={() => { props.setshowfunction() }} >Already a user</Link>

                                    <button
                                        style={{ marginTop: "5px", backgroundColor: "rgb(3, 104, 104)", color: "white", borderRadius: "5px" }}
                                        className="mb-4 w-100 btn "
                                        type="submit"
                                    >
                                        Sign up
                                    </button>
                                </form>
                            </div>
                            <LoaderModal isOpen={isLoading} />

                            {popUp && <TermsAndCondition popUpHandle={popUpHandle} />}
                        </div>
                }
            </Fragment>
        </div>
    )
}

export default Register
