import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pricing from '../Pricing/Pricing';
function PricingAll() {
  const navigate=useNavigate()
    function updatePricing(){
      axios
      .post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/subscription/${localStorage.getItem('id')}`)
      .then((res) => {
        console.log(res);
        alert('Subscried')
        navigate("/dashboard")
      })
      .catch((err) => {
        console.log(err);
        alert('error occured')
      });
    }
  return (
<>
<Pricing updatePricing={updatePricing}/>


</>

   
  )
}

export default PricingAll
