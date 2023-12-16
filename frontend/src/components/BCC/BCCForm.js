import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import './BCCForm.css'; // Import a CSS file for styling (create this file)
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BCCForm() {
    const [bccteam, setBccteam] = useState('');
    const [tasksAccepted, setTasksAccepted] = useState(false);

    const [selectedtask,setselectedtask]=useState([])

    const handleToggleTasks = () => {
        setTasksAccepted(!tasksAccepted);
    };
    

    


    const navigate = useNavigate();


    const location = useLocation()



    const state = location.state




// selecting tasks ..........................................................................................................




const handleTaskSelect = (task) => {

    if (selectedtask.includes(task)) {

        setselectedtask(selectedtask.filter((tasks) => tasks !== task));
    } else {
        setselectedtask([...selectedtask, task]);
    }
  };



console.log("state",state)


console.log("selected atsk",selectedtask)



    async function saveOptions() {
        const userId = localStorage.getItem("id");

        if (userId) {
            const data = {
                choosentasks: selectedtask,
                userId: userId
            };

            if (selectedtask.length > 0) {
                try {
                    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/addconsultantchoosentasks`, data);

                    if (res.data.details && res.data.details._id) {
                        alert("Options saved");


                        navigate("/bccform2", { state })
                    } else {
                        alert("Error: Try again later");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("An error occurred while saving options. Please try again later.");
                }
            }
        }

        else {
            navigate("/");
        }
    }




    return (
        <div className="container">
        <div className="centered" style={{top:"100px"}}>


            <div className={`section ${tasksAccepted ? 'fade-out' : 'fade-in'}`} >
                <div className='row'>
                    <div className='col-6'>
                        <div className='card' style={{ maxWidth: "400px" }}>
                            <Box sx={{ maxWidth: 400 }}>
                                <Grid>
                                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                        You will be responsible for monitoring
                                    </Typography>

                                    <List >
                                        <ListItem>

                                            <ListItemText>Users</ListItemText>
                                            <IconButton aria-label="users">
                                                <CheckIcon />
                                            </IconButton>

                                        </ListItem>
                                        <ListItem sx={{ mt: -2 }}>

                                            <ListItemText>Job Posts</ListItemText>
                                            <IconButton aria-label="jobposts">
                                                <CheckIcon />
                                            </IconButton>

                                        </ListItem>
                                        <ListItem sx={{ mt: -2 }}>

                                            <ListItemText>Post Feed</ListItemText>
                                            <IconButton aria-label="postfeed">
                                                <CheckIcon />
                                            </IconButton>

                                        </ListItem>
                                        <ListItem sx={{ mt: -2 }}>

                                            <ListItemText>Document Upload</ListItemText>
                                            <IconButton aria-label="documentupload">
                                                <CheckIcon />
                                            </IconButton>

                                        </ListItem>
                                        <ListItem sx={{ mt: -2 }}>

                                            <ListItemText>Renewels</ListItemText>
                                            <IconButton aria-label="renewal">
                                                <CheckIcon />
                                            </IconButton>

                                        </ListItem>
                                        <ListItem sx={{ mt: -2 }}>

                                            <ListItemText>Tasks</ListItemText>
                                            <IconButton aria-label="tasks">
                                                <CheckIcon />
                                            </IconButton>

                                        </ListItem>

                                    </List>

                                </Grid>
                            </Box>
                        </div>
                    </div>



                    <div className='col-6'>
                        <div className='card' style={{ maxWidth: "400px" }}>
                            <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                Report / Complaints
                            </Typography>

                            <List>
                                <ListItem sx={{ mt: -2 }}>

                                    <ListItemText>Post Feed</ListItemText>
                                    <IconButton aria-label="postfeed">
                                        <CheckIcon />
                                    </IconButton>

                                </ListItem>
                                <ListItem sx={{ mt: -2 }}>

                                    <ListItemText>Post Job</ListItemText>
                                    <IconButton aria-label="postjob">
                                        <CheckIcon />
                                    </IconButton>

                                </ListItem>
                                <ListItem sx={{ mt: -2 }}>

                                    <ListItemText>Comments</ListItemText>
                                    <IconButton aria-label="comment">
                                        <CheckIcon />
                                    </IconButton>

                                </ListItem>
                                <ListItem sx={{ mt: -2 }}>

                                    <ListItemText>User Activities</ListItemText>
                                    <IconButton aria-label="useractivities">
                                        <CheckIcon />
                                    </IconButton>

                                </ListItem>
                            </List>
                        </div>
                    </div>
                </div>
   
            </div>






        {tasksAccepted==true  && (
                    <div className={`section ${tasksAccepted==true ? 'fade-in' : 'fade-out'}`} >
                    <div className='card p-3 mt-3'>
                        <h4>Tasks You can Choose</h4>
                          <div className='row'>
                    <div className='col-4'>
                        <FormControl >
                            <h3 className='text-primary'>Background Verification</h3>
                            <FormControlLabel
                                value="profesionaldocuments"
                                control={<Checkbox onClick={()=>{handleTaskSelect("profesionaldocuments")}} checked={selectedtask.includes("profesionaldocuments")}/>}
                                label=" Professional Docuents"
                                labelPlacement="start"
                                
                            />

                            <FormControlLabel
                                value="companydocuments"
                                control={<Checkbox onClick={()=>{handleTaskSelect("companydocuments")}} checked={selectedtask.includes("companydocuments")}/>}
                                label=" Company Documents"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="educationdocument"
                                control={<Checkbox onClick={()=>{handleTaskSelect("educationdocument")}} checked={selectedtask.includes("educationdocument")}/>}
                                label=" Education Documents"
                                labelPlacement="start"
                            />
                        </FormControl>
                    </div>
                    <div className='col-4'>
                        <FormControl>
                            <h5 className='text-primary'>Recruiment </h5>

                            <FormControlLabel
                                value="profesionaldocuments"
                                control={<Checkbox onClick={()=>{handleTaskSelect("Recruitent")}} checked={selectedtask.includes("Recruitent")}/>}
                                label=" ThirdParty Hiring/Recruitent"
                                labelPlacement="start"
                            />

                            <FormControlLabel
                                value="companydocuments"
                                control={<Checkbox onClick={()=>{handleTaskSelect("Referal")}} checked={selectedtask.includes("Referal")}/>}
                                label="Referal "
                                labelPlacement="start"
                            />
                        </FormControl>
                    </div>
                    <div className='col-4'>
                        <FormControl>
                            <h5 className='text-primary'>Support</h5>

                            <FormControlLabel
                                value="profesionaldocuments"
                                control={<Checkbox onClick={()=>{handleTaskSelect("DriveIn Support")}} checked={selectedtask.includes("DriveIn Support")}/>}
                                label="DriveIn Support"
                                labelPlacement="start"
                            />

                            <FormControlLabel
                                value="companydocuments"
                                control={<Checkbox onClick={()=>{handleTaskSelect("Company Hiring")}} checked={selectedtask.includes("Company Hiring")}/>}
                                label="Company Hiring"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="educationdocument"
                                control={<Checkbox onClick={()=>{handleTaskSelect("Bulk Hiring")}} checked={selectedtask.includes("Bulk Hiring")}/>}
                                label="Bulk Hiring"
                                labelPlacement="start"
                            />

                        </FormControl>
                    </div>

                </div>
                        </div>



                    </div>
                )}
              



              <div className="row" style={{ position: "fixed", width: "100px", marginTop: "20px", justifyContent: "flex-end" }}>
        <button onClick={handleToggleTasks}>{tasksAccepted ? "Previous" : "Next"}</button>
      </div>

      {tasksAccepted && (
        <div style={{ textAlign: "right", marginTop: "20px"}}>


          <button style={{width:"100px"}}  onClick={()=>{saveOptions()}}>Save & Next</button>
        </div>
      )}
           
        

        
       
       
       
        </div>

        </div>
    )
}
