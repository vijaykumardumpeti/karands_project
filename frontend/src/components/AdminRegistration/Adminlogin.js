import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

import { GrMail } from 'react-icons/gr';

import jobillustrat from '../../assets/image9.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


import "./Style.css";

import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import image5 from "../../assets/image5.png"
import image6 from "../../assets/image6.png"
import image7 from "../../assets/image7.png"
import image8 from "../../assets/image8.png"
import Logo from "../../assets/kz.png"
import AdminFirstLogin from './AdminFirstLogin';
import axios from 'axios';


export default function Adminlogin() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0)
  const [show, setshow] = useState(false)

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6, image7, image8
    // Add more image URLs here
  ]

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000) // Slide every 5 seconds
    return () => clearInterval(interval)
  }, [currentIndex])

  const [popUp, setPopUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [confrimshowPass, setConfrimShowPass] = useState(false);
  const [checked, setchecked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    location: "",
    password: "",
    confirm: ""

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




  const signupDetails = () => {
    console.log(details);
    axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/login`, {

      email: details.email,
      password: details.password,
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('fullName', res.data.fullName)




        toast.success('login successful', {
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

          navigate('/dashboard')
        }, 1000);


      })
      .catch(err => alert(err))
  };

  function popUpHandle() {
    setPopUp(false);
  }

  function setshowfunction() {
    setshow(false)
  }


  return (
    <div className="landing-page container-fluid">

      <header className="header row">

        <div className="logo col-md-6 col-sm-6 col-lg-6">
          <img src={Logo} style={{ height: "60px", width: "200px", position: "absolute", left: "20px", top: "0px" }}></img>
        </div>

        <div className="custsupport col-md-6 col-sm-6 col-lg-6">  <p><GrMail /> - support@karandszone.com </p></div>
      </header>
      <div className="contentAdmin row">

        <div className=" col-sm-6 col-md-6 col-lg-6">
          <div className="left-content">


            <div className="carousel row">
              {/* <div className="carousel-frame col-lg-12 col-sm-12 col-md-12" style={{ height: "100%", width: "500px", display: "flex", overflow: "hidden" }}>
                {images.map((imageUrl, index) => (

                  <div
                    key={index}
                    className={`carousel-item ${index === currentIndex ? 'active' : ''
                      }`}

                  ><img src={imageUrl} style={{ height: "100%", width: "100%" }} alt={`Slide ${index}`}></img></div>
                ))}
              </div> */}

            </div>
          </div>
        </div>


        <div className="col-sm-6 col-md-6 col-lg-6">

          <AdminFirstLogin />

        </div>
      </div>
{/* 
      <div className="bg-light">
        <div className="row mt-2">
          <div className="col-md-6 col-sm-6 col-lg-6">
            <h1 style={{ color: "orange", }}>Where can I get some?
            </h1>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6">
            <img src={jobillustrat} alt="illustrator" height="100%" width="100%" />
          </div>
        </div>
      </div> */}

    </div>

  )
}
