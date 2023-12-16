import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import PopUp from '../Dashboard/PopUp';

function CheckEligibility() {
    const [checker,setChecker]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
        .then(res=>{
            const value=res.data.details;
            const skills=value.skills;
            console.log(value)
            if(value.role===null|| value.role===undefined || value.role===""){
                navigate("/role")
                setChecker(true);
            }if(value.role=="consultant"){


              navigate(`/admin`)
            }
            
          
            else if(skills.length===0){
              navigate(`/${value.role}`)
            }
           else if(value.refferalCodeTaken===null|| value.refferalCodeTaken===undefined || value.refferalCodeTaken===""){
                navigate("/refferalcode");
                setChecker(true);
            }
          
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <div>
      {checker===null && <PopUp/>}
    </div>
  )
}

export default CheckEligibility
