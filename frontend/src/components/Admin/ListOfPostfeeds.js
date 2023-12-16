
import { Link, useNavigate } from 'react-router-dom';
import { GiConfirmed } from 'react-icons/gi'
import { MdVerified } from 'react-icons/md'
import TruncatedText from "../Truncated text/truncatedtext";
import PostTimeDifference from '../TimeCalculation/PostTimeDifference';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import Modal from 'react-modal';
import Reload from "../reload/Reload";
import Stop from "../reload/Stop";

import InfiniteScroll from "react-infinite-scroll-component";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import moment from 'moment';


import React, { useEffect, useState, useRef, Fragment, useContext } from "react";
import axios from 'axios'

import { Avatar, Button, TextField } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import myImage from "../../assets/logo2.png";
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import TopUser from "../RoutingPart/TopUser";



import MyContext from "../../mycontext";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import CloseIcon from '@mui/icons-material/Close';

import Editpost from '../Dashboard/Editpost';
import Wholikedpost from '../Dashboard/wholiked';
import Loader from '../Dashboard/Loader';
import AdminDashboard from './AdminDashboard';








const customforreport = {
  content: {
    width: '400px',       // Adjust the width as needed
    height: '300px',      // Adjust the height as needed
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the modal on the screen
    overflow: "hidden",
    zIndex: 2
  },
};










export default function ListOfPostfeeds() {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const postReportClick = () => {

    setIsOpen(true);

    handleClose()

  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);


  const [postdata,setpostdata]=useState("")
  
  const handleClick = (event,data) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);


    setpostdata(data)


  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [showpopUp, setshowPopUp] = useState(false);

  const [objectSurvey, setObjectSurvey] = useState(false)
  const [profile, setProfile] = useState(false)
  const [document, setDocument] = useState(false)
  const [account, setAccount] = useState(false);
  const [flag, setFlag] = useState(true)
  const [phoneVerified, setPhoneVerified] = useState(false)

  const [details, setDetails] = useState([])

  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const lineStyle = {
    width: '1px',
    height: '25px', // Adjust the height as per your requirement
    backgroundColor: "#656565", // Change the color as per your requirement
    marginLeft: "15px"
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const [likes, setLikes] = useState(0);

  const [username, setUsername] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [userImage, setUserImage] = useState('');
  const [Pastcomments, setPastcomments] = useState("")
  const [PastcommentsCount, setPastcommentsCount] = useState(5)
  const { profiledata } = useContext(MyContext)
  const [comments, setComments] = useState([]);
  const [isCommentExpanded, setCommentExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');

  const [EditpostId, setEditpostId] = useState("")
  // ////////////////////////////////////////////////////////edit post

  const [Show, setshow] = useState(false)

  const [commentIdtoshow, setcommentIdtoshow] = useState("")

  const [commentreplyId, setcommentreplyId] = useState("")

  const [newnestedcomment, setNewNestedcomment] = useState("")

  const [showeditcommentId, setshoweditcommentId] = useState("")

  const [editedcomment, seteditedcomment] = useState("")

  const { parseISO, formatDistanceToNow } = require('date-fns');


  const [wholikedpost, setwholikedpost] = useState("")






  const[searchinput,setsearchinput]=useState("")













  function postclick(postId) {

    setEditpostId(postId)

    setshow(!Show)

    handleClose()

    setFlag(!flag)
  }



  // ///////////////////


  useEffect(() => {

  }, [])


  async function handleCommentChange(event) {


    setNewComment(event.target.value);


  };

  async function handlenestedCommentChange(event) {


    setNewNestedcomment(event.target.value);


  };

  async function handleeditCommentChange(event, comment) {


    seteditedcomment(comment);

    seteditedcomment(event.target.value)

  };

  function popUpHandle() {
    setshowPopUp(false);

  }


  // ////////////////////////////////////////////////////////

  const [skip, setskip] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {

  
    

        const ichpPostResponse = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/listofallposts/${skip}/${localStorage.getItem("id")}`,{name:searchinput});



if(ichpPostResponse.data.posts){

  setDetails(ichpPostResponse.data.posts);

}





      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [flag,skip,searchinput]);


  const refreshingPage = () => {
    setFlag(!flag)
  }

  console.log("details", details)



  function checkFunction() {
    if (objectSurvey === false || profile === false || document === false || account === false) {
      alert('Please complete all the steps')
    } else {
      navigate("/dashboard")
    }
  }

  // handle like function..............................................

  async function handlelikes(postId) {

    const data = {

      userId: localStorage.getItem("id"),

      name: localStorage.getItem("fullName"),

      email: localStorage.getItem("email")
    }


    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/like/${postId}`, data)
  }
  // togle comments..........................................

  async function toggleCommentBox(postId) {



    setcommentIdtoshow(postId)



    // handle comment function............................................




    // commentsfunction(postId)



    const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/comment/${postId}/${PastcommentsCount}`)


    if (res.data.result) {

      setComments(res.data.result)
    }





    // handle comment function............................................




    setCommentExpanded(!isCommentExpanded);




  };




  // handle get all past comments upto 10  function .........................................




  async function commentsfunction(postId) {





    const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/comment/${postId}/${PastcommentsCount}`)


    if (res.data.result) {

      setComments(res.data.result)


    }







  }

  // load more.................................................


  async function handlecommentloadmore(postId) {


    setPastcommentsCount(PastcommentsCount + 5)

    commentsfunction(postId)

    //   const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/comment/${postId}/${PastcommentsCount}`)


    // if(res.data.result){

    //   let data=res.data.result


    //   setComments(res.data.result)

    //   console.log(res.data.result)



    // }




  }













  // load more.................................................


  // handle get all past comments upto 10  function .........................................

  // postig comment...........................................


  async function handleCommentSubmit(postId) {




    const data = {
      userId: localStorage.getItem("id"),
      name: localStorage.getItem("fullName"),
      email: localStorage.getItem("email"),
      comment: newComment

    }


    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/comment/${postId}`, data)


    commentsfunction(postId)


    setNewComment("")
  };


  // postig comment...........................................


  // get all comments 10.......................







  // hadle nested comment submit

  async function handlesubmitnestedcomment(postId, commentId) {



    const data = {
      userId: localStorage.getItem("id"),
      name: localStorage.getItem("fullName"),
      email: localStorage.getItem("email"),
      comment: newnestedcomment,
      commentId: commentId

    }

    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/nestedcomment/${postId}`, data)



    commentsfunction(postId)

    setNewNestedcomment("")

  }










  // ........................




  // 
  // handle function to delete the post





  async function DeletePostFunction(postId) {



    // console.log(postId)

    const res = await axios.delete(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/delete/${postId}`)


     if(res){
      
      handleClose()
      setFlag(!flag)
     }


  }



  // who liked the post......................................................


  async function wholiked(postId) {




    const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/like/${postId}`)

    if (res) {

      // console.log("who liked",res.data.result)

      setwholikedpost(res.data.result)

      setshowPopUp(true)

    }



  }









  // who liked the post......................................................


  async function handledeletecomment(postId, commentId) {


    const input = {

      commentId: commentId

    }



    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/deletecomment/${postId}`, input)




    commentsfunction(postId)



  }







  // handle to delete comment........................................


  // handle to edit comment...........................................


  async function handleeditcomment(commentId) {


    setshoweditcommentId(commentId)



  }



  async function saveeditcomment(postId, commentId) {



    const input = {

      commentId: commentId,
      content: editedcomment

    }



    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/editcomment/${postId}`, input)


    commentsfunction(postId)

    setshoweditcommentId("")

    seteditedcomment("")


  }

  // cancle edit


  async function canceleditcomment() {

    setshoweditcommentId("")
    seteditedcomment("")

  }




  console.log("account...............", account)



  // cancle edit






  // handle to edit comment...........................................



  // liking comment..................................................






  async function handlecommentlike(postId, commentId) {



    const input = {

      userId: localStorage.getItem("id"),

      name: localStorage.getItem("fullName"),

      email: localStorage.getItem("email"),
      commentId: commentId

    }



    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/likecomment/${postId}`, input)

    if (res) {

      commentsfunction(postId)

    }




  }






  const scrollContainerRef = useRef(null);




const [reportreason,setreportreason]=useState("")






async function handlereportssubmit(postdata,reporttype) {
  if (profiledata && profiledata.name) {
    const currentDate = new Date(); // Get the current date and time

    const data = {
      contentdata: postdata,
      reportedby: {
        name: profiledata.name,
        email: profiledata.email,
        date: currentDate.toISOString(), // Use toISOString() to format the date as a string
      },
      reporttype: reporttype,
      reportreason: reportreason,
    };

    console.log("postdata data", data);

    const reportres = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/report/report`, data);

    if (reportres.data) {
      console.log("reportres", reportres);
      alert("We have received your report and will look into it.");
      closeModal()
    }
  }
}









function handleloadmore(){


  setskip(skip+10)
}

























  return (
    <div>
      {isLoading ?
        <Loader />

        // <LoaderModal isOpen={isLoading}/>
        :
        <>
          <div className="row flex-nowrap" style={{ width: "100%" }}>
                         



            <div className="col container" style={{ maxWidth: "100%" }}>

            <AdminDashboard />

            
            <TextField
  id="filled-search"
  label="Search post"
  type="search"
  variant="filled"
  onChange={(e) => { setsearchinput(e.target.value) }}
  style={{ backgroundColor: '#f5f5f5' }} 
/>
              <hr />




              <Fragment>

                <div
                  ref={scrollContainerRef}
                  style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", overflow: "scroll", flexDirection: "column", overflowX: "hidden", overflowY: "hidden",justifyContent:"center",marginLeft:'22%' }}>
              

               
               

                      <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        padding: "0px 15px",
                        overflow: 'scroll',
                        overflowX: "hidden"
                      }}>

{
       details&& details.length > 0 ?


                            <div style={{ width: "63%" }}>
                           
                                {

                                  details.map((data, index) => {
                                    const eachLikes = data.likes ? data.likes : "";
                                    const eachComments = data.comments ? data.comments : "";
                                    return <Fragment>
                                   
                                          <div className='postcardview' style={{ backgroundColor: "white" }}>
                                            <div className='postcardheader' >
                                              <div className='postcardheaderleft' >
                                                <Avatar />
                                                <div className='userdetailspostcard' >
                                                  <span style={{ fontSize: "18px" }}> <Link to={`/viewprofile/${data.userObectId}`} style={{ textDecoration: "none", color: "black" }} >{data.name}</Link></span>
                                                  <span style={{ fontSize: "13px", color: "black" }}><p>{data.designation ? data.designation : ""}</p></span>

                                                  {/* <span style={{ fontSize: "10px", color: "gray" }}><PostTimeDifference postDateFromMongoDB={data.createdAt} /></span> */}
                                                </div>
                                              </div>



                                              <div className='postcardheaderleft'>
                                                <MoreVertIcon
                                                  onClick={(e)=>handleClick(e,data)}
                                                  size="small"
                                                  sx={{ ml: 2 }}
                                                  aria-controls={open ? 'account-menu' : undefined}
                                                  aria-haspopup="true"
                                                  aria-expanded={open ? 'true' : undefined}
                                                />
                                           

</div>


                                            </div>
                                            <div className='postcardBodyview' style={{ width: "100%" }} >
                                              {data.content && <TruncatedText style={{ width: "100%" }} text={data.content} maxLength={200} />}
                                              {data.file ?
                                                <Fragment>
                                                  {/* {data.file.endsWith('.pdf') ? (<PDFViewerComponent pdfUrl={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=uploads/${data.file}`} />) : ""} */}


                                                  {data.file.endsWith('.pdf') ? (<embed src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=uploads/${data.file}`} width="400" height="300" type="application/pdf" sandbox="allow-same-origin allow-scripts"/>) : ""}


                                                  {data.file.endsWith('.jpg') || data.file.endsWith('.png') ? (<img src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=uploads/${data.file}`} style={{ height: "200px", maxHeight: "20ppx" }} alt="Post Image" className="img-fluid" />) : ""}



                                                  {(data.file.endsWith('.mp4') || data.file.endsWith('.webm') || data.file.endsWith('.ogg')) ? (<video width="400" height="300" controls>
                                                    <source src={`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/get-private-file?key=uploads/${data.file}`} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                  </video>) : ""}


                                                </Fragment>


                                                : ""}
                                              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: "12px" }}>

                                                  <div style={{ cursor: "pointer" }} onClick={() => { wholiked(data._id) }}>


                                                    <ThumbUpIcon onClick={() => handlelikes(data._id)} fontSize='' style={{ color: "rgb(78, 189, 232)", marginLeft: "20px", cursor: "pointer" }} /> <span>{eachLikes ? eachLikes.length : 0} Likes</span>
                                                  </div>

                                                </span>
                                                <span onClick={() => toggleCommentBox(data._id)} style={{ fontSize: "12px" }}>
                                                  <ChatBubbleIcon fontSize='' style={{ color: "rgb(78, 189, 232)", marginLeft: "20px" }} /> <span >{eachComments ? eachComments.length : 0}  Comments</span>


                                                </span>
                                              </div>
                                              <hr />
                                              <div className='postcardconnection'>
                                                <div style={{ display: "flex", height: "auto", alignItems: "center", justifyContent: "space-around" }}>

                                                  <div onClick={() => handlelikes(data._id)}>
                                                    <ThumbUpOffAltIcon style={{ cursor: "pointer" }} />
                                                    <p style={{ cursor: "pointer" }} >Likes</p>
                                                  </div>


                                                  <div onClick={() => toggleCommentBox(data._id)}>
                                                    <InsertCommentIcon style={{ cursor: "pointer" }} />
                                                    <p style={{ cursor: "pointer" }} >Comments</p>
                                                  </div>
                                                  <div>
                                                    <SendIcon style={{ cursor: "pointer" }} />
                                                    <p style={{ cursor: "pointer" }} >Share</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="comments">


                                              {/* Show expandable comment box */}



                                              {/*  {   isCommentExpanded && ( */}




                                              <div className="comment-box mt-3" style={{ display: data._id == commentIdtoshow ? "block" : "none" }}>
                                                {comments.length > 0 && (
                                                  <Fragment>


                                                    <hr />


                                                    <div className="past-comments">





                                                      {/* comments....................................................... */}
                                                      {

                                                        comments.map((comment) => (

                                                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                                                            <div style={{ backgroundColor: "rgb(241, 238, 238)", borderRadius: "10px", margin: "5px 10px", padding: "10px", width: "100%" }}>
                                                              <div className='postcardheader'  >
                                                                <div className='postcardheaderleft' >
                                                                  <Avatar />
                                                                  <div className='userdetailspostcard' >
                                                                    <span style={{ fontSize: "18px" }}> <Link path={`/viewprofile/${"val"}`} style={{ textDecoration: "none" }}>{data.name}</Link></span>
                                                                    <span style={{ fontSize: "10px", color: "gray" }}><PostTimeDifference postDateFromMongoDB={data.createdAt} /></span>
                                                                  </div>
                                                                </div>

                                                                {/* <div className="postcardheaderleft">
                                                                  <IconButton
                                                                    aria-controls="menu"
                                                                    aria-haspopup="true"
                                                                    onClick={handleClick}
                                                                  >
                                                                    <MoreVertIcon />
                                                                  </IconButton>
                                                                </div> */}

                                                              </div>
                                                              <div>
                                                                {showeditcommentId == comment._id ?



                                                                  <Fragment>

                                                                    <input onChange={(e) => handleeditCommentChange(e, comment.comment)} value={editedcomment} />

                                                                    <button onClick={() => saveeditcomment(data._id, comment._id)}>save</button>

                                                                    <button onClick={() => canceleditcomment()}>cancel</button>

                                                                  </Fragment>


                                                                  : <TruncatedText text={comment.comment} maxLength={100} />

                                                                }
                                                              </div>
                                                            </div>

                                                            <div style={{ display: "flex" }} className="comment-footer">


                                                              <span style={{ cursor: "pointer", marginLeft: "5%", marginRight: "3%" }} className="comment-like" onClick={() => handlecommentlike(data._id, comment._id)}><h6>Like</h6></span>



                                                              <span onClick={() => handlecommentlike(data._id, comment._id)} style={{ width: "10%", cursor: "pointer",height:"10%" }} className="comment-like-icon"> <img src="http://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png" style={{ width: "90%" }} alt="like"></img></span>

                                                              <span ><p>{comment.likes.length > 0 ? comment.likes.length : 0}</p></span>
                                                              <div style={lineStyle}></div>

                                                              <span style={{ cursor: "pointer", marginLeft: "5%" }} className="comment-reply" onClick={() => setcommentreplyId(comment._id)}><h6>Reply</h6></span>




                                                            </div>


                                                            {/* nested comments.................................... */}


                                                            {

                                                              comment.nestedComments && comment.nestedComments.length > 0 ?

                                                                comment.nestedComments.map((nestedComments) => {


                                                                  return (

                                                                    <Fragment>


                                                                      <div style={{ backgroundColor: "rgb(241, 238, 238)", borderRadius: "10px", margin: "5px 5px 5px 50px", padding: "10px", width: "90%" }}>
                                                                        <div className='postcardheader'  >
                                                                          <div className='postcardheaderleft' >
                                                                            <Avatar />
                                                                            <div className='userdetailspostcard' >
                                                                              <span style={{ fontSize: "18px" }}> <Link path={`/viewprofile/${"val"}`} >{nestedComments.name
                                                                              }</Link></span>
                                                                              <span style={{ fontSize: "10px", color: "gray" }}><PostTimeDifference postDateFromMongoDB={nestedComments.createdAt} /></span>
                                                                            </div>
                                                                          </div>
                                                                          <div className='postcardheaderleft' >
                                                                            <div class="dropdown">

                                                                              <i class="bi bi-three-dots-vertical" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: "pointer", position: "relative", right: "0" }}></i>




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
                                                                          <TruncatedText text={nestedComments.comment} maxLength={100} />
                                                                        </div>
                                                                      </div>





                                                                    </Fragment>

                                                                  )
                                                                })






                                                                : ""}



                                                            {/* nested comments.................................... */}




                                                            {
                                                              commentreplyId == comment._id &&


                                                              <div style={{ maxWidth: "60%", marginLeft: "40%" }}>
                                                                <input

                                                                  type="text"
                                                                  className="form-control me-2"
                                                                  placeholder="Add your reply"

                                                                  value={newnestedcomment}
                                                                  onChange={(e) => { handlenestedCommentChange(e) }}
                                                                />


                                                                <button type="submit" onClick={() => handlesubmitnestedcomment(data._id, comment._id)} style={{ marginTop: "5%", marginLeft: "70%", height: "30px", color: "white", backgroundColor: "#007BFF" }}>reply
                                                                </button>
                                                              </div>

                                                            }




                                                          </div>
                                                        ))

                                                      }


                                                      {/* comments....................................................... */}



                                                    </div>

                                                    <h6 onClick={() => handlecommentloadmore(data._id)} className="load-more" style={{ cursor: "pointer" }}>Load more comments</h6>

                                                  </Fragment>
                                                )}

                                                {/* <form style={{display:"flex"}}> */}

                                                <div style={{ display: "flex", padding: "0px 15px 15px 15px" }}>
                                                  <input
                                                    type="text"
                                                    style={{ borderRadius: "5px" }}
                                                    className="form-control me-2"
                                                    placeholder="Add your comment"
                                                    value={newComment}
                                                    onChange={handleCommentChange}
                                                  />


                                                  <button style={{ backgroundColor: "#83a4d4", color: "white", borderRadius: "5px" }} type="submit" className="btn " onClick={() => handleCommentSubmit(data._id)}>
                                                    Submit
                                                  </button>
                                                </div>

                                                {/* </form> */}



                                              </div>
                                            </div>
                                          </div>
                                   
                                    </Fragment>
                                  })

                                }
                         
                            </div>
                            : <p> {!isLoading && details.length == 0 ? 'no posts to shown' : ""}</p>

                        }




{/* sugested users are displayed here................... */}


              
                      </div>

                    
                  

                </div>
                <button onClick={()=>{handleloadmore()}}>Load More</button>
              </Fragment>

            </div>
          </div>


          {showpopUp && <Wholikedpost popUpHandle={popUpHandle} data={wholikedpost} />}



          {/* menuitmes modal */}


                                                <Menu
                                                  anchorEl={anchorEl}
                                                  id="account-menu"
                                                  open={open}
                                                  onClose={handleClose}
                                                  PaperProps={{
                                                    elevation: 0,
                                                    sx: {
                                                      overflow: 'visible',
                                                      filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.32))',
                                                      mt: 1.5,
                                                      '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                      },
                                                      '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                      },
                                                    },
                                                  }}
                                                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                          
                                   
                                          <MenuItem onClick={()=>{DeletePostFunction(postdata._id)}}>Delete</MenuItem>
                                              
                                        
                                                
                                                </Menu>



                                          

{/* menu for commments */}



{/* 
<div>
    
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => console.log('Edit clicked')}>Edit</MenuItem>
        <MenuItem onClick={() => console.log('Delete clicked')}>Delete</MenuItem>
        <MenuItem onClick={() => console.log('Report clicked')}>Report</MenuItem>
      </Menu>
    </div>



 */}



























                                              <Modal
                                                isOpen={modalIsOpen}
                                                onAfterOpen={afterOpenModal}
                                                onRequestClose={closeModal}
                                                style={customforreport}
                                                contentLabel="Example Modal"
                                              >
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                                  <button onClick={closeModal} style={{ border: 'none', background: 'transparent' }}>
                                                    <CloseIcon /> {/* Replace the text with the CloseIcon */}
                                                  </button>
                                                </div>

                                                <div>
                                                  <label htmlFor="reason">Reason:</label>
                                                  <textarea
                                                    id="reason"
                                                    style={{
                                                      width: '100%',
                                                      height: '100px',
                                                      padding: '10px',
                                                      marginBottom: '10px',
                                                      border: '1px solid #ccc',
                                                      borderRadius: '4px',
                                                    }}
                                                    placeholder="Type your reason here..."
                                                    onChange={(e) => {
                                                      setreportreason(e.target.value);
                                                    }}
                                                  />
                                                </div>

                                                <Button style={{ background: 'blue', color: 'white' }} onClick={() => { handlereportssubmit(postdata, "postfeeds") }}>
                                                  Submit
                                                </Button>
                                              </Modal>




{/* edit post  */}


{Show && <Editpost Show={Show} postclick={postclick} postId={EditpostId} postdata={postdata}/>}








        </>

      }

    </div>
  )

}
