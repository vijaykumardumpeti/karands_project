import React, { useState } from 'react';

import axios from "axios"
import Select from 'react-select';

export default function Sendingmailform({ onRequestClose, sendmaildata, companymaildata }) {



  const [hrmail, sethrmail] = useState("")

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const jobExperienceData = []; // This will hold your transformed data

  // Assuming your MongoDB data is stored in a variable called `mongodbData`
  sendmaildata.JobExperience.forEach((doc) => {

    jobExperienceData.push({
      value: doc.companyName,
      label: doc.companyName,
    });

  });



  // console.log("jobExperienceData",jobExperienceData)

  // console.log("sendmaildata",sendmaildata)







  async function sethrmailfunction() {


    const data = {
      adminId: localStorage.getItem("id"),

      employuserId: sendmaildata._id,
      email: hrmail,

      selectedCompany: companymaildata.companyName,
      experienceStart:companymaildata.experienceStart


    }


    console.log("data",data)


    await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/sendemailtohr`, data).then((res) => {

      console.log(res)
      
      alert("mail sent request has been taken")


      onRequestClose()

    })
      .catch(err => console.log(err))

  }



  console.log("companymaildata", companymaildata.companyName)



  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="form">
        <h2>Employee Background Verification</h2>

        <div style={{ position: "absolute", right: "20px", top: "10px" }}>


          <button type="button" class="btn-close" aria-label="Close" onClick={onRequestClose} ></button>



        </div>

        <p>fullName: {sendmaildata.fullName}</p>

        <p>email: {sendmaildata.email}</p>
        <p>mobilenumber{sendmaildata.mobilenumber}</p>

        <p>DOB
          :{sendmaildata.DOB}</p>

        <p>gender:
          {sendmaildata.gender}</p>


        <p>skills:</p>

        <ul>
          {sendmaildata.skills ? sendmaildata.skills.map((data, index) => (
            <li key={index}>{data}</li>
          )) : ""}
        </ul>

        <p>industry
          :{sendmaildata.industry
          }</p>

        <p>Company Name:- {companymaildata.companyName ? companymaildata.companyName : ""}</p>

        <p>Date of Joining :- {companymaildata.experienceStart?companymaildata.experienceStart:""}</p>

{
  companymaildata.experienceEnd&&<p>Date of relieving:- {companymaildata.experienceEnd?companymaildata.experienceEnd:""}</p>
}
       

        <input type="email" class="form-control" placeholder='hr email' style={{ width: "350px" }} onChange={(e) => { sethrmail(e.target.value) }} /><br />

        <button type="submit" onClick={() => sethrmailfunction()}>send mail</button>

      </div>
    </div>
  );
}
