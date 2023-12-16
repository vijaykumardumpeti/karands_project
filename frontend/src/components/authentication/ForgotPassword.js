import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaKeySolid } from "react-icons/lia";
import Logo from "../../assets/kz.png";
import { GrMail } from 'react-icons/gr';

import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./signup.css";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");





  const navigate = useNavigate()


  
  const location=useLocation();

  const state=location.state;




  function handleChange(e) {
    setEmail(e.target.value);
  }

  let useremail=state


  const handleCheck = (e) => {
    e.preventDefault();

if(state){
  axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/forgotpassword/${state}`)
  .then(res => 
    
   {

    toast.success('otp sent successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  })
  
  console.log(res)


  setTimeout(() => {

    navigate('/userchangepassword',{state:useremail})
}, 1000);






   }
  

  
  )
  .catch(err => console.log(err))
};


}

    



console.log(";oijvv;fd;vmlmfvl",state)



  return (
    <div>
      <ToastContainer/>
      <header className="header row">

        <div className="logo col-md-6 col-sm-6 col-lg-6">
          <img src={Logo} style={{ height: "60px", width: "200px", position: "absolute", left: "20px", top: "0px" }}></img>
        </div>

        <div className="custsupport col-md-6 col-sm-6 col-lg-6">  <p><GrMail /> - support@karandszone.com </p></div>
      </header>

      <div style={{ marginTop: "5px"}}>

        <div className="formdivLogin">
          <form
            onSubmit={handleCheck}
            className="container formtag loginFormTag"
            style={{ width: "380px", maxWidth: "80%", height: "300px", justifyContent: 'center', backgroundColor: "whitesmoke" }}>


            <h3 className="text-dark">Reset your password</h3>
            <p>Please Fill the code which we sent to your Email </p>


            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{ width: "60px", maxWidth: "40px" }}
                  id="basic-addon1"
                >
                  <LiaKeySolid style={{ color: "rgb(3, 104, 104)" }} />
                </span>
              </div>
              <input
                className="form-control changePlaceHolderSize"
                type="email"
                value={state}
                placeholder=""
                onChange={handleChange}
                aria-label="Email"
                aria-describedby="basic-addon1"
                required
              />
            </div>





            <p className="text-danger mt-0">{message}</p>

            <button className="mb-2 w-100 btn" style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }}> send otp</button>



          </form>
        </div>
      </div>
    </div>
  );
}
