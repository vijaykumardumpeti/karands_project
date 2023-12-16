import React, { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import logo from "../../../images/logo2.png";

export default function ReferalCode() {
const [refferalCode,setRefferalCode]=useState('');
const [flag,setFlag]=useState(false)
const [userDetails,setUserdeatils]=useState({
  email:'',
  name:"",
  mobilenumber:""
});
function add(){
  axios.patch(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/addReferral`,{
    id: localStorage.getItem('id') ,
      refferalCodeTaken: refferalCode,
      refferedBy: userDetails.email
  })
  .then(res=>{
 navigate('/ICHPDashboard')
  }).catch(err=>{
    console.log(err.response);
    // alert(err.response.data);
  })
}
    const navigate = useNavigate()
    function btnClick(){
      axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/refferalCode/${refferalCode}`)
      .then(res=>{
        console.log(res.data);
       setFlag(false)

       setUserdeatils(res.data);
      
      }).catch(err=>{
       setFlag(true)
      })
       

    }
  return (
    <div>
 <Header/>
<div className='row'>
<div className='col-4'></div>
<div className='col-4'>
<div>
<dl>
<dt><label className='mt-3'><h2>Enter Your Referal Code</h2></label></dt>
<dd className='mt-2 w-100%'><input onChange={(e)=>setRefferalCode(e.target.value)} type="text" className='form-control' placeholder='Referal Code'/></dd>
</dl>
</div>
<div>
<button   className='btn btn-primary mt-2' onClick={btnClick}>Add</button>
</div>

</div>

<div className='col-4'></div>

</div>
  
  
  {
    flag && <h5 style={{color:"red", marginTop:"25px"}}>Check the Referral Code</h5>
  }
  {
   userDetails.name!='' && 

   <Fragment>
   <div className="container mt-4">
       <div className=" mt-5">
         <div className="form p-4 mt-4">
           <div>
             <img src={logo} alt="img"/>
           </div>
           <div>
             <dl>
               <dt className="mb-2">
                 <h6>{userDetails.name}</h6>
               </dt>
               <dt className="mb-2">
                 <h6>{userDetails.email}</h6>
               </dt>
               <dt className="mb-2">
                 <h6>{userDetails.mobilenumber}</h6>
               </dt>
             </dl>
           </div>
         </div>
       </div>
       <div className=""></div>
     </div>
     <div className="check mt-3">
       Confirm   <input className="ms-2" type="checkbox" />
     <button onClick={()=>add()} className="btn btn-primary ms-4">Submit</button>
     </div>
   </Fragment>
  }
  </div>
    
  )
}
