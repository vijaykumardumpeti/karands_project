import React, { useEffect, useState } from 'react'

import './Hrmailform.css'

import Logo from '../../assets/kz.png'

import { Route, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import axios from 'axios';



import CryptoJS from 'crypto-js';
import Loader from './Loader';

const decryptionKey = 'your-secret-key';


export default function Hrmailform() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

   const [isLoading,setisLoading]=useState(false)

    const [isFormVisible, setFormVisible] = useState(true);


    const [disciplinaryAction, setDisciplinaryAction] = useState(null);

    const encodedData = queryParams.get('query');
    const [employuserId, adminId,selectedCompany,experienceStart] = encodedData.split("|");
    

    const handleDisciplinaryChange = (event) => {
        setDisciplinaryAction(event.target.value);
    };



    const [reasonableAccommodations, setReasonableAccommodations] = useState(null);

    const handleReasonableAccommodationsChange = (event) => {
        setReasonableAccommodations(event.target.value);
    };


// 


const [formData, setFormData] = useState({
    CompanyName:selectedCompany?selectedCompany:"",
    performance: '',
    strengths: '',
    areas_improvement: '',
    work_ethic: '',
    conduct: '',
    professionalism: '',
    Respectfulness: '',
    company_policies: '',
  });



  const [Percentage,setPercentage]=useState(0)



  // Event handler for radio buttons
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



 // Event handler for the reason_for_leaving textarea
  const handleReasonChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



 // Event handler for Eligibility for Rehire radio buttons
 const handleRehireChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      rehire_eligibility: value,
    }));
  };


    // Event handler for textareas
    const handleTextareaChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    


      let totalAttributes;

      const calculatePercentage = (data) => {
        const maxPointsPerAttribute = 5; // Maximum points for each attribute
        let totalPoints = 0;
       totalAttributes = 0;
      
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key].toLowerCase(); // Convert to lowercase for case-insensitive comparison
            if (value === 'yes') {
              totalPoints += maxPointsPerAttribute;
              totalAttributes++;
            } else if (value === 'no') {
              // For "no" value, we don't count it as an attribute
              totalAttributes++;

            } else {
              const numericValue = parseInt(value, 10);
              if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= maxPointsPerAttribute) {
                totalPoints += numericValue;
                totalAttributes++;
              }
            }
          }
        }


      
        const maximumPossiblePoints = 15 * maxPointsPerAttribute;
      
        const percentage = (totalPoints / maximumPossiblePoints) * 100;
      
        return parseInt(percentage); // Return the percentage with two decimal places
      };






      const percentage = calculatePercentage(formData)



      const [decryptedData, setDecryptedData] = useState('');


      console.log("encodedData",encodedData);



      const [userdetails, setUserdetails] = useState("");





      useEffect(() => {
          async function fetchData() {

            setisLoading(true)
          


              try {
                  const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${employuserId}`);
                  if (res.data) {
                      setUserdetails(res.data.details);
                      console.log("User details:", res.data);

                      setisLoading(false)
                  }
              } catch (error) {
                  console.error("Error fetching user details:", error);
              }

              setisLoading(false) 
          }
      
          fetchData();

          formviewed();

      }, [employuserId]); 





      const [Companydetails, setCompanydetails] = useState("");




      useEffect(() => {

        if (userdetails&&userdetails.JobExperience && userdetails.JobExperience.length > 0 && selectedCompany) {
          const companyDetailsArray = userdetails.JobExperience.filter(
            (data) => data.companyName === selectedCompany && data.experienceStart === experienceStart
          );
      
          // Check if hrform object exists in the company details
          if (companyDetailsArray.length > 0 && companyDetailsArray[0].hrform) {
            setFormVisible(true);
          } else {
            setFormVisible(false);
          }
      
             
            
          setCompanydetails(companyDetailsArray.length > 0 ? companyDetailsArray[0] : null);
        } else {
          setFormVisible(false);
          setCompanydetails("");
        }

      }, [userdetails, selectedCompany, experienceStart]);
      




      async function formviewed() {

        setisLoading(true)
      
      

        const data= { employuserId:employuserId, selectedCompany:selectedCompany, experienceStart:experienceStart,Status:true } 

          try {
              const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/statusformviewed`,data);
              if (res.data) {
                  setUserdetails(res.data.details);
                  console.log("User details:", res.data);

                  setisLoading(false)
              }
          } catch (error) {
              console.error("Error fetching user details:", error);
          }

          setisLoading(false) 
      }










console.log("employuserId","adminId","selectedCompany",employuserId,adminId,selectedCompany)




console.log("Companydetails",Companydetails)



    async function submithrform() {

        setisLoading(true)
        const data = {
            employuserId: employuserId,

            adminId: adminId,

            experienceStart:experienceStart,
            

            selectedCompany: selectedCompany,

            formdata: formData

        }

        console.log("data",data)

        await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/listusers/hrmailform`, data).then((res) => {


            if (res) {

                console.log("res", res)

        

            }





        }).catch((err) => { console.log(err) })


        setisLoading(false)

    }



console.log("formdata",formData)












const [selectedOption, setSelectedOption] = useState('');

const handleRadioChangeforemploy = (event) => {
  setSelectedOption(event.target.value);
};



    return (
        <>
     {isLoading&&!userdetails.fullName ? (
          

            <Loader />) : (

<>
{isFormVisible ? (
  <div className="feedback-form" style={{ width: "400px", margin: "0 auto",color:'white'}}>
    <div className="tick-icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check-circle"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>

      <h2 >Feedback submited</h2>
    </div>
  </div>
) 

 : <div className="container-hrmail">
 

 <form>

     <div className='main-container'>
{
     userdetails&&<div style={{width:"35%"}}>

             <span>
                 <img src={Logo} style={{ width: "100%", height: "100px" }} />
             </span>

             <span>
              <h2 className='headline'>{userdetails&&userdetails.fullName ? userdetails.fullName : "employee"} Background Verification</h2>

                 <h4>Percentage:{percentage ? percentage : 0}%</h4>
             </span>
             <hr></hr>

             <span>
                 <p>Roles & responsibilities</p>
                 <p>{Companydetails && Companydetails.description ? Companydetails.description : ""}</p>

             </span>
             <hr></hr>
             <span>


                 <p>Employee Name:- {userdetails&&userdetails.fullName?userdetails.fullName:""}</p>
                 <p>Employee Email:- {userdetails&&userdetails.email?userdetails.email:""}</p>
                 <p>Date of joining:- {Companydetails&&Companydetails.experienceStart?Companydetails.experienceStart:""}</p>
                 <p>Date of relieving:- {Companydetails&&Companydetails.experienceEnd?Companydetails.experienceEnd:""} </p>   
                 <div className="form-check">

                     <p style={{ fontWeight: "bold" }}>Please Select Below</p><br />
                     <input
                         className="form-check-input"
                         type="radio"
                         id="flexRadioYes"
                         name="employeeDetails"
                         value="yes"
                         onChange={handleRadioChangeforemploy}
                     />
                     <label className="form-check-label mr-3" htmlFor="flexRadioYes">
                         Yes, Employee details are correct
                     </label>





                 </div>

                 <div className="form-check">
                     <input
                         className="form-check-input"
                         type="radio"
                         id="flexRadioNo"
                         name="employeeDetails"
                         value="no"
                         onChange={handleRadioChangeforemploy}
                     />
                     <label className="form-check-label" htmlFor="flexRadioNo">
                         No, Employee details are not correct
                     </label>
                 </div>



                 </span>

           
<div>
<button type="button" class="btn btn-success"   onClick={() => { submithrform() }}>  Submit form</button>

</div>
         </div>
}
 
      
         <div style={{pointerEvents:selectedOption != 'yes'?"none":"auto",backgroundColor:selectedOption != 'yes'?"rgb(192, 192, 192)":"white" ,width:"100%",overflow:'scroll',height:"100%"}}>
 
        
         <div className="form"  >
             <div className="form-group">
                 <label>Performance Evaluation:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="performance"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>


             <div className="form-group">
                 <label>Strengths:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="strengths"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>




             <div className="form-group">
                 <label>Areas of Improvement:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="areas_improvement"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>




             <div className="form-group">
                 <label>Work Ethic:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="work_ethic"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>




             <div className="form-group">
                 <label>Conduct and Behavior:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="conduct"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>



             <div className="form-group">
                 <label>Professionalism:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="professionalism"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>


             <div className="form-group">
                 <label htmlFor="Respectfulness">Respectfulness:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="Respectfulness"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>


             <div className="form-group">
                 <label htmlFor="company_policies">Adherence to Company Policies:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="company_policies"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>



         </div>

         <div className="form">
             <label htmlFor="reason_for_leaving">Reason for Leaving:</label>
             <textarea
                 name="reason_for_leaving"
                 className="form-control"
                 rows="4"
                 value={formData.reason_for_leaving} // Set the value from formData
                 onChange={handleReasonChange} // Attach the onChange handler
                 required // Add the required attribute here
             ></textarea>


             <div style={{ display: "flex", alignContent: "center", marginLeft: "20%", justifyContent: "space-evenly" }}>
                 <label>Eligibility for Rehire:</label>
                 <div className="form-check">
                     <input
                         type="radio"
                         name="rehire_eligibility"
                         className="form-check-input"
                         value="yes"
                         checked={formData.rehire_eligibility === 'yes'} // Use formData to determine the checked status
                         onChange={handleRehireChange}
                     />
                     <label className="form-check-label">Yes</label>
                 </div>
                 <div className="form-check">
                     <input
                         type="radio"
                         name="rehire_eligibility"
                         className="form-check-input"
                         value="no"
                         checked={formData.rehire_eligibility === 'no'} // Use formData to determine the checked status
                         onChange={handleRehireChange}
                     />
                     <label className="form-check-label">No</label>
                 </div>
             </div>
             <div className="form-group">
                 <label htmlFor="company_policies">Attendance and Punctuality::</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="Attendance_and_Punctuality"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>

             <div className="form-group">
                 <label htmlFor="company_policies">Teamwork and Communication Skills:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="Teamwork_and_Communication_Skills"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>




             <div className="form-group">
                 <label htmlFor="company_policies">Communication Skills:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="Communication_Skills"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>





             <label htmlFor="achievements">Special Achievements or Awards:</label>
             <textarea
                 name="achievements"
                 className="form-control"
                 rows="4"
                 onChange={handleTextareaChange}
                 required // Add the required attribute here
             ></textarea>
             <br />


         </div>
         <div className="form">
             <div style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "20%" }}>
                 <label>Disciplinary Actions or Issues:</label>
                 <div className="form-check">
                     <input
                         type="radio"


                         name="disciplinary_actions"
                         className="form-check-input"
                         value="yes"
                         checked={formData.disciplinary_actions === 'yes'}
                         onChange={handleRadioChange}
                     />
                     <label className="form-check-label">Yes</label>
                 </div>
                 <div className="form-check">
                     <input
                         type="radio"
                         name="disciplinary_actions"
                         className="form-check-input"
                         value="no"
                         checked={formData.disciplinary_actions === 'no'}
                         onChange={handleRadioChange}
                     />
                     <label className="form-check-label">No</label>
                 </div>
             </div>


             <div style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "20%" }}>
                 <label>Reasonable Accommodations:</label>
                 <div className="form-check">
                     <input
                         type="radio"
                         name="reasonable_accommodations"
                         className="form-check-input"
                         value="yes"
                         checked={formData.reasonable_accommodations === 'yes'}
                         onChange={handleRadioChange}
                     />
                     <label className="form-check-label">Yes</label>
                 </div>
                 <div className="form-check">
                     <input
                         type="radio"
                         name="reasonable_accommodations"
                         className="form-check-input"
                         value="no"
                         checked={formData.reasonable_accommodations === 'no'}
                         onChange={handleRadioChange}
                     />
                     <label className="form-check-label">No</label>
                 </div>
             </div>


             <div className="form-group">
                 <label htmlFor="attitude_fit">General Attitude and Work Culture Fit:</label><br />
                 {[1, 2, 3, 4, 5].map((value) => (
                     <div className="form-check form-check-inline" key={value}>
                         <input
                             type="radio"
                             name="attitude_fit"
                             className="form-check-input cursor-pointer"
                             value={value.toString()}
                             onChange={handleRadioChange}
                             required
                         />
                         <label className="form-check-label">{value}</label>
                     </div>
                 ))}
             </div>









         </div>
         </div>



     </div>




 </form>

 <div className="feedback-animation">



</div>

</div>}
</>
            )}
  </>  )
}
