import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from "../../images/logo2.png";
import './refferal.css'
import Logout from './Logout';
import { Fragment } from 'react';
import Header from '../authentication/Header';


export default function ReferalCode() {
  const [refferalCode, setRefferalCode] = useState('');
  const [flag, setFlag] = useState(false)


  const [checked, setchecked] = useState(false)


  const [userDetails, setUserdeatils] = useState({
    name: '',
    nameOfCompany: '',
    location: '',
    designation: ''
  });

  const [refferalCodeTaken, setRefferalCodeTaken] = useState("")

 async function add() {
    console.log("received");

   await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/addReferral`, {

      id: localStorage.getItem('id'),
      email: localStorage.getItem('email'),
      refferalCodeTaken: refferalCode,
      ReffererDetails: userDetails,
      paymentAmount: 1000
    })


      .then(res => {
        console.log('Worked');

        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/email/${localStorage.getItem('email')}`)
          .then(res => {
            const roles = res.data
            
            console.log(roles);

            navigate("/dashboard")
          })

          .catch(err => console.log(err));

      }).catch(err => {
        console.log(err.response);
        // alert(err.response.data);
      })
  }




  const navigate = useNavigate()

  function btnClick() {
    console.log("received");

    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/refferalCode/${refferalCode}`)
      .then(res => {
        console.log(res.data);

        if (res.data === "" || res.data.details === null) {
          alert('Enter valid refferal code')

        } else {
          setFlag(false)
          setUserdeatils(res.data);
        }
      }).catch(err => {
        console.log(err);
        setFlag(true)
      })


  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
      .then(res => {
        let refCode = res.data.details.refferalCodeTaken;

        let skills = res.data.details.skills;
        if (skills.length === 0) {
          navigate("/iu")
        }
        console.log(res.data.details);
        if (refCode !== "" || refCode !== null || refCode !== undefined) {
          setRefferalCodeTaken(res.data.details.refferalCodeTaken || "")
        }
      })
      .catch(err => console.log(err))
  }, [])



  return (
    <div className='container-fluid'>
      <Header />

      {
        refferalCodeTaken ? <Fragment>
          <Logout back="/dashboard" />
        </Fragment> : <Fragment>

          <div className='row mt-5'>
            <div className='col-4'></div>
            <div className='col-4 p-4 card refbox'>
              <h2 style={{color:"#a85432", fontFamily:"sans-serif"}}>Enter Your Referal Code</h2>
              <div className='d-flex'>

                <input onChange={(e) => setRefferalCode(e.target.value)} type="text" className='form-control refferalCodeValueInput' placeholder='Referal Code' />
                <button onClick={() => btnClick()} className='d-flex align-items-center'
                  style={{ backgroundColor: "#17a2b8", color: "white", marginLeft:"15px", height:"37px" }}
                >Add</button>
              </div>
            </div>
            <div className='col-4'></div>

          </div>



          {
            flag && <h5 style={{ color: "red", marginTop: "25px" }}>Check the Referral Code</h5>
          }
          {
            userDetails.name &&

            <Fragment>
              <div className='row mt-4'>
                <div className='col-4'></div>
                <div className=" col-4 card refbox" >
                  <div className='reffererDetailsChildrenContainer'

                  >
                    <div>

                      {
                        userDetails.profilepicture ?

                          <img src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=${userDetails.profilepicture}`} class=" avatar-xl img-thumbnai " alt="profileImage" style={{ borderRadius: '50%', width: '120px', height: '120px' }} />
                          :
                          <img src="bootdey.com/img/Content/avatar/avatar1.png" class=" avatar-xl img-thumbnai " alt="profileImage" style={{ borderRadius: '50%', width: '120px', height: '120px' }} />
                      }



                    </div>
                    <div>
                      <dl style={{ textAlign: "left", marginTop: "10px", marginLeft: "10px" }}>
                        <dt className="mb-2">
                          <h6>{userDetails.name}</h6>
                        </dt>
                        <dt className="mb-2">
                          <h6>{userDetails.JobExperience[0] ? userDetails.JobExperience[0].companyName : ""}</h6>
                        </dt>
                        <dt className="mb-2">
                          <h6>{userDetails.location ? userDetails.location : ""}</h6>
                        </dt>
                        <dt className="mb-2">
                          <h6>{userDetails.designation ? userDetails.designation : ""}</h6>
                        </dt>


                      </dl>
                    </div>
                  </div>
                </div>
                <div className='col-4'></div>


              </div>
              <div className="mt-4 ">
                <h5 className='text-light'>Confirm  above user<input className="ms-2" type="checkbox" onChange={() => { setchecked(!checked) }} /></h5>

                <button style={{backgroundColor: "#17a2b8", color: "white"}}
                   onClick={() => add()} disabled={!checked} >
                  Submit
                  
                  </button>
              </div>
            </Fragment>
          }
        </Fragment>
      }

    </div>

  )
}
