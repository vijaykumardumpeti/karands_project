import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import profilePhoto from '../../../assets/userImage1.jpg'
import Modal from 'react-modal';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';



// this component is not in use.....................

export default function ConsultantPage() {


    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);



    const [searchinput, setsearchinput] = useState("")

    const [ichpdata, setichpdata] = useState("")


// axios to fetch ichps with their emails


async function fetchIchps() {
    const data = {
      email: searchinput // Assuming searchInput is a variable defined in your scope
    };
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/getichpbyemail`, data);
  
      if (res.status === 200 && res.data.ichpdata) {
        setichpdata(res.data.ichpdata);




      } else {
        alert("No user found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching ICHP data:", error);
      alert("An error occurred while fetching ICHP data. Please try again later.");
    }
  }
  



console.log("ichpdata",ichpdata)





    return (
        <div className='container-fluid'>
            <div className='card mt-2 mb-2'>



                <div className='card-header'
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                    <h4>Team</h4>
                    <button onClick={handleOpen} className='btn btn-success'
                    >Invite</button>


                    <Modal isOpen={isOpen} onRequestClose={handleClose} style={{
                        content: {
                            position: 'fixed',
                            top: '50%',     // Center vertically
                            left: '50%',    // Center horizontally
                            transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
                            height: "450px",
                            width: "450px",
                        }
                    }}>
                        <div className='card'>
                            <div className='card-header'>send invitation</div>
                            <div className='card-body'>
                                <form class="form-inline">

                                    <div class="form-group  mb-2">

                                        <input
                                            type="text"
                                            class="form-control"
                                            id="search"
                                            placeholder="Search here"
                                            onChange={(e) => {
                                                setsearchinput(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault(); // Prevent the default behavior (refreshing the page)
                                                    // Handle what you want to do when Enter is pressed
                                                    // For example, you can trigger your fetch function here
                                                    fetchIchps();
                                                }
                                            }}
                                        />


                                        <button type="button" class="btn btn-secondary mb-2 ms-2"   onClick={()=>{fetchIchps()}}><AiOutlineSearch /> </button>

                                    </div>

                                </form>
                                <div>

                                    {
                                        ichpdata?
                                        
                                        <Card sx={{ display: 'flex', marginRight: "10px", marginBottom: "10px", width: "350px", padding: "10px" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: "150px", height: "150px", border: "1px solid black", borderRadius: "50%" }}
                                            image={profilePhoto}
                                            alt="Live cover"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto', textAlign: "start" }}>
                                                <Typography component="div" variant="p">
                                                    Name: {ichpdata.name}
                                                </Typography>
                                                <Typography variant="p" component="div">
                                                    Company:{ichpdata.JobExperience.companyName}
                                                </Typography>
                                                <Typography component="div" variant="p">
                                                    Location: {ichpdata.location}
                                                </Typography>
                                                <Typography component="div" variant="p">
                                                    Industry:{ichpdata.industry}
                                                </Typography>
                                            </CardContent>
                                            <div>
                                                <button className='btn btn-success'>
                                                    Invite
                                                </button>
                                            </div>


                                        </Box>


                                    </Card>
 
                                        
                                        :""
                                    }

                               

                                </div>

                            </div>


                            <div className='card-footer'>
                                <button className='btn btn-secondary' onClick={handleClose}>Cancel</button>
                            </div>
                        </div>


                    </Modal>


                </div>


                <div className='card-body'>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center" }}>
                        <Card sx={{ display: 'flex', marginRight: "10px", marginBottom: "10px", width: "350px", padding: "10px" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: "150px", height: "150px", border: "1px solid black", borderRadius: "50%" }}
                                image={profilePhoto}
                                alt="Live cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto', textAlign: "start" }}>
                                    <Typography component="div" variant="p">
                                        Name: sai
                                    </Typography>
                                    <Typography variant="p" component="div">
                                        Company: gsk
                                    </Typography>
                                    <Typography component="div" variant="p">
                                        Location: hyderabad
                                    </Typography>
                                    <Typography component="div" variant="p">
                                        Industry:
                                    </Typography>
                                </CardContent>
                                <div>
                                    <button className='btn btn-success'>
                                        message
                                    </button>
                                </div>


                            </Box>


                        </Card>

                    </div>
                </div>



            </div>

        </div>
    )
}
