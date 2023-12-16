import React from 'react'
import { Avatar } from "@mui/material";
import { Link } from 'react-router-dom';
import PostTimeDifference from '../TimeCalculation/PostTimeDifference';
import TruncatedText from '../Truncated text/truncatedtext';

function Comment() {
    let val=`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).;`
  return (
    <div style={{width:"80%"}}>
      <div className='postcardheader' >
                            <div className='postcardheaderleft' >
                                <Avatar />
                                <div className='userdetailspostcard' >
                                   <span style={{fontSize:"18px"}}> <Link path={`/viewprofile/${"val"}`} >{"data.name"}</Link></span>
                                    <span style={{ fontSize: "10px", color: "gray" }}><PostTimeDifference postDateFromMongoDB={"data.createdAt"} /></span>
                                </div>
                            </div>
                            <div className='postcardheaderleft'>
                                <div class="dropdown">

                                    <i class="bi bi-three-dots-vertical " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ></i>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#" >Edit</a>


                                        <a class="dropdown-item" href="#" >Delete</a>




                                        {/* report is open for other users only not own user */}

                                        <a class="dropdown-item" href="#">Report</a>


                                        {/* report is open for other users only not own user */}




                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <TruncatedText text={val} maxLength={100}/>
                        </div>                  
   
    </div>
  )
}

export default Comment
