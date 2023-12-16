import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './BCCForm.css'; // Import a CSS file for styling (create this file)
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function BCCForm2() {
  const [selectedValue, setSelectedValue] = useState('');
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const location = useLocation();
  const state = location.state;

  const handleSelectChange = (event) => {
    const selectedAmount = calculateAmount(event.target.value);
    const totalAmountWithTax = selectedAmount * 1.18; // Adding 18% tax
    setSelectedValue(event.target.value);
    setAmount(selectedAmount);
    setTotalAmount(totalAmountWithTax);
  };

  const calculateAmount = (value) => {
    switch (value) {
      case '1-5':
        return 25000;
      case '6-10':
        return 50000;
      case '11-15':
        return 75000;
      case '16-20':
        return 100000;
      case '21-25':
        return 125000;
      default:
        return 0;
    }
  };

  console.log("state", state);








  const handlePhonePe = async () => {
    try {
      // Make a request to your backend server


      const data={
        Companyname:state.nameOfCompany
      }


      const response = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/paymentforcompany`,data);



      console.log("responce............",response)



      // Check if the response is successful
      if (response.status === 200) {
        // Extract the redirect URL from the JSON response
        const redirectURL = response.data;

        // Redirect the user to PhonePe's payment page
        window.location.href = redirectURL;
      } else {
        // Handle the error, e.g., show an error message to the user
        console.error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
















  return (
    <div className="container" style={{ justifyContent: "center", alignItems: "center" }}>
      <div className="centered" style={{ top: "100px", textAlign: "center" }}>
        <div className='form' style={{backgroundColor:"white"}}>
          <div className='text-start'>
            <ul style={{ listStyle: "none" }}>
              <li> You Mention no. of employees in your company is </li>
              <p style={{ fontWeight: "20px" }}>{state&&state.noOfEmployee ? state.noOfEmployee : ""} members</p>
              <li>How many will join us BCC team
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={selectedValue}
                    onChange={handleSelectChange}
                    label="bccteam"
                  >
                    <MenuItem value="">
                      None
                    </MenuItem>
                    <MenuItem value="1-5">1-5</MenuItem>
                    <MenuItem value="6-10">6-10</MenuItem>
                    <MenuItem value="11-15">11-15</MenuItem>
                    <MenuItem value="16-20">16-20</MenuItem>
                    <MenuItem value="21-25">21-25</MenuItem>
                  </Select>
                </FormControl>
              </li>
              {
                totalAmount > 0 ?
                  <>
                    <li>Your Selected team is <b>{selectedValue}</b> + <b>{amount} + 18% tax </b> </li>
                    <li>Total - <b>₹ {totalAmount}</b></li>
                  </>
                  : ""
              }
            </ul>
          </div>
          <button style={{ backgroundColor: "rgb(3, 104, 104)", color: "white" }} onClick={()=>{handlePhonePe()}}>Pay</button>
        </div>
      </div>
    </div>
  );
}
