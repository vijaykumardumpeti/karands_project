import Details from "./Details";
import { Link, useNavigate } from 'react-router-dom';
import { GiConfirmed } from 'react-icons/gi'
import { MdVerified } from 'react-icons/md'
import TruncatedText from "../Truncated text/truncatedtext";
import PostTimeDifference from '../TimeCalculation/PostTimeDifference';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import Reload from "../reload/Reload";
import Stop from "../reload/Stop";
import InfiniteScroll from "react-infinite-scroll-component";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import logo from "../../assets/employee1.jpg";

import myPic from '../../assets/backgroundImage.png'

import Sidebar from "./Sidebar";
import React, { useEffect, useState, useRef, Fragment } from "react";
import axios from 'axios'
import OtpVerification from "../authentication/OtpVerification";
import { Avatar, Button } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import myImage from "../../assets/logo2.png";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Editpost from "./Editpost";
import TopUser from "../RoutingPart/TopUser";

function NewPop() {



  const [objectSurvey, setObjectSurvey] = useState(false)
  const [profile, setProfile] = useState(false)
  const [document, setDocument] = useState(false)
  const [account, setAccount] = useState(false);
  const [flag, setFlag] = useState(true)
  const [phoneVerified, setPhoneVerified] = useState(false)

  const [details, setDetails] = useState([])


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





  const name = localStorage.getItem("email").split("@")



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

  function postclick(postId) {

    setEditpostId(postId)

    setshow(!Show)
  }



  // ///////////////////





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




  // ////////////////////////////////////////////////////////



  useEffect(() => {

    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/survey/${localStorage.getItem('email')}`)
      .then(res => {

        let entireDetails = res.data.details;
        // console.log(entireDetails);
        if (entireDetails !== null) {

          setObjectSurvey(true)
        }
      })
      .catch(err => console.log(err))
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem('id')}`)
      .then(res => {
        let entireDetails = res.data.details;
        if (entireDetails.fullName) {
          setProfile(true)

        }
        if (entireDetails.aadharCard || entireDetails.panCard) {
          setDocument(true)

        }
        if (entireDetails.SubscriptionsDate) {
          setAccount(true)

        }
        if (entireDetails.emailVerified && entireDetails.phoneVerified) {

          setPhoneVerified(true)
        }
      })
      .catch(err => console.log(err))
    async function main() {

      const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/getPost/${skip}/${localStorage.getItem("id")}`)




      if (res.data) {


        setDetails(res.data.result)

        setSkip(skip + 1)

      }


    }

    main()
  }, [flag]);
  const refreshingPage = () => {
    setFlag(!flag)
  }




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

      console.log(res.data.result)
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





  }






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








  // cancle edit






  // handle to edit comment...........................................



  // liking comment..................................................






  async function handlecommentlike(postId, commentId) {

    console.log(postId, commentId)

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


  const [hasMore, sethasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [load, setLoad] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/getPost/${skip}/${localStorage.getItem("id")}`)
    console.log(res);




    if (res.data) {

      const ans = res.data.result;
      setDetails([...details, ...ans])
      console.log(res.data.result)
      if (ans.length === 0) sethasMore(false);
      setSkip(skip + 1);

    }


  }
  const scrollContainerRef = useRef(null);

  return (
    <div className="" >

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />
          <hr />
          <div
            ref={scrollContainerRef}
            style={{ width: "100%", height: "86vh", display: "flex", alignItems: "center", overflow: "scroll", flexDirection: "column", overflowX: "hidden" }}>
            {Show && <Editpost Show={Show} postclick={postclick} postId={EditpostId} />}

            {
              (objectSurvey && profile && document && account) ?
                <div style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0px 15px"
                }}>


                  <div style={{ width: "63%" }}>
                    <InfiniteScroll
                      style={{ width: "100%" }}
                      scrollableTarget={scrollContainerRef.current}
                      dataLength={details.length}
                      next={fetchData}
                      hasMore={hasMore}
                      loader={<Reload />}
                      endMessage={<Stop />}
                    >
                      {
                        details.map((data, index) => {
                          const eachLikes = data.likes ? data.likes : "";
                          const eachComments = data.comments ? data.comments : "";
                          return <Fragment>
                            {
                              data.companyName ?
                                <div className='postcardview' >
                                  <div class="d-flex flex-column  align-items-center">
                                    <span class="mb-2">
                                      <div class="flex-shrink-0">
                                        <img
                                          class=" rounded-3"
                                          alt="some"
                                          style={{
                                            width: "70px",
                                            height: "70px",
                                            backgroundColor: "red",
                                          }}
                                          src={myImage}
                                        />
                                      </div>
                                    </span>

                                    <div class="row flex-fill p-4 ">
                                      <div class="col-sm-5 col-md-5 text-start  ">
                                        <h4 class="lead">
                                          <strong>{data.title}</strong>
                                        </h4>
                                        <p >{data.companyName}</p>
                                        <span class="badge bg-secondary ">{data.location}</span>{" "}
                                        <span class="badge bg-success">{data.salaryStartFrom} LPA - {data.salaryEndTo} LPA</span>
                                      </div>
                                      <div class="col-sm-4  col-md-4 py-2">
                                        {data.skills.map(e => {
                                          return <span class="badge  bg-secondary p-1 mr-1">{e}</span>

                                        })}
                                      </div>
                                      <div class="col-sm-3 text-lg-end" >
                                        <button onClick={() => navigate("/jobpreview", { state: data })} class="btn btn-success stretched-link">
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                :
                                <div className='postcardview'>
                                  <div className='postcardheader' >
                                    <div className='postcardheaderleft' >
                                      <Avatar />
                                      <div className='userdetailspostcard' >
                                        <span style={{ fontSize: "18px" }}> <Link path={`/viewprofile/${data._id}`} >{data.name}</Link></span>
                                        <span style={{ fontSize: "10px", color: "gray" }}><PostTimeDifference postDateFromMongoDB={data.createdAt} /></span>
                                      </div>
                                    </div>
                                    <div className='postcardheaderleft'>
                                      <div class="dropdown">

                                        <i class="bi bi-three-dots-vertical" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: "pointer", position: "relative", right: "0" }}></i>




                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">



                                          <a class="dropdown-item" href="#" onClick={() => postclick(data._id)}>Edit</a>

                                          <a class="dropdown-item" href="#" onClick={() => DeletePostFunction(data._id)}>Delete</a>




                                          {/* report is open for other users only not own user */}

                                          <a class="dropdown-item" href="#">Report</a>


                                          {/* report is open for other users only not own user */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='postcardBodyview' style={{ width: "100%", border: "1px solid black" }} >
                                    {data.content && <TruncatedText style={{ width: "100%" }} text={data.content} maxLength={200} />}
                                    {data.file ?
                                      <Fragment>


                                        {data.file.endsWith('.pdf') ? (<embed src={`${process.env.REACT_APP_IP_ADDRESS}/uploads/${data.file}`} width="400" height="300" type="application/pdf" />) : ""}


                                        {data.file.endsWith('.jpg') || data.file.endsWith('.png') ? (<img src={`${process.env.REACT_APP_IP_ADDRESS}/uploads/${data.file}`}  alt="Post Image" className="img-fluid" />) : ""}



                                        {(data.file.endsWith('.mp4') || data.file.endsWith('.webm') || data.file.endsWith('.ogg')) ? (<video width="400" height="300" controls>
                                          <source src={`${process.env.REACT_APP_IP_ADDRESS}/uploads/${data.file}`} type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>) : ""}


                                      </Fragment>


                                      : ""}
                                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                      <span style={{ fontSize: "12px" }}>
                                        <ThumbUpIcon onClick={() => handlelikes(data._id)} fontSize='' style={{ color: "rgb(78, 189, 232)", marginLeft: "20px" }} /> {eachLikes ? eachLikes.length : 0} Likes


                                      </span>
                                      <span onClick={() => toggleCommentBox(data._id)} style={{ fontSize: "12px" }}>
                                        <ChatBubbleIcon fontSize='' style={{ color: "rgb(78, 189, 232)", marginLeft: "20px" }} /> <span style={{ cursor: "pointer" }}>{eachComments ? eachComments.length : 0}  Comments</span>


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
                                                          <span style={{ fontSize: "18px" }}> <Link path={`/viewprofile/${"val"}`} >{data.name}</Link></span>
                                                          <span style={{ fontSize: "10px", color: "gray" }}><PostTimeDifference postDateFromMongoDB={data.createdAt} /></span>
                                                        </div>
                                                      </div>
                                                      <div className='postcardheaderleft' >
                                                        <div class="dropdown">

                                                          <i class="bi bi-three-dots-vertical" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ cursor: "pointer", position: "relative", right: "0" }}></i>




                                                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">



                                                            <a class="dropdown-item" href="#" onClick={() => handleeditcomment(comment._id)}>Edit</a>

                                                            <a class="dropdown-item" href="#" onClick={() => handledeletecomment(data._id, comment._id)}>Delete</a>




                                                            {/* report is open for other users only not own user */}

                                                            <a class="dropdown-item" href="#">Report</a>


                                                            {/* report is open for other users only not own user */}




                                                          </div>
                                                        </div>
                                                      </div>
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



                                                    <span style={{ width: "10%", cursor: "pointer" }} className="comment-like-icon"> <img src="http://static.vecteezy.com/system/resources/previews/003/399/777/original/like-or-thumb-up-and-heart-modern-icons-free-vector.jpg" style={{ width: "90%" }} alt="like"></img></span>

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
                            }
                          </Fragment>
                        })
                      }
                    </InfiniteScroll>
                  </div>
                  <div style={{ width: "35%" }}>
                    <TopUser />
                  </div>
                </div>

                : <Fragment>
                  <div style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    width: "68%",
                    height: "400px",
                    padding: "25px",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white"
                  }}>
                    <h5>Hi {localStorage.getItem('email').split("@")[0]}</h5>
                    <hr style={{ border: "1px solid black", width: "100%" }} />
                    <p>Please Complete object survey to activate your dashboard and my task dashboard</p>
                    <p style={{
                      textAlign: "left", marginLeft: "10px", fontWeight: "bold", width: "100%", paddingLeft: "20px"
                    }}>Steps:</p>
                    <ol style={{
                      textAlign: "left",

                      width: "100%"
                    }}>
                      <li className='popupListEach'>
                        <span className='eachLIstPopup'>1. Complete object survey {!objectSurvey ? <GiConfirmed style={{ marginLeft: "10px" }} /> : <MdVerified style={{ marginLeft: "10px", color: "green" }} />}</span>
                        <Link className='eachLIstPopup' to="/objectsurvey">Go to Object Survey</Link>
                      </li>
                      <li className='popupListEach'>
                        <span className='eachLIstPopup'>2. Edit profile, update and Save {!profile ? <GiConfirmed style={{ marginLeft: "10px" }} /> : <MdVerified style={{ marginLeft: "10px", color: "green" }} />}</span>
                        <Link className='eachLIstPopup' to="/editprofile">Go to Edit profile</Link>
                      </li>
                      <li className='popupListEach'>
                        <span className='eachLIstPopup'>3. Upload Document {!document ? <GiConfirmed style={{ marginLeft: "10px" }} /> : <MdVerified style={{ marginLeft: "10px", color: "green" }} />}</span>
                        <Link className='eachLIstPopup' to="/upload">Go to Upload Document</Link>
                      </li>
                      <li className='popupListEach'>
                        <span className='eachLIstPopup'>4. Activate My Account {!account ? <GiConfirmed style={{ marginLeft: "10px" }} /> : <MdVerified style={{ marginLeft: "10px", color: "green" }} />}</span>
                        <Link className='eachLIstPopup' to="/myaccount">Go to my account</Link>
                      </li>
                    </ol>

                    <div style={{ width: "100%", height: "40px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                      <div className="progress" style={{ width: "50%" }}>
                        <div style={{ width: `${(profile === true && 25) + (objectSurvey === true && 25) + (account === true && 25) + (document === true && 25)}%`, backgroundColor: "#83a4d4" }} className="progress-bar" role="progressbar" aria-valuenow={50} aria-valuemin="0" aria-valuemax={100}></div>
                      </div>
                      <button
                        onClick={() => checkFunction()}

                        style={{
                          backgroundColor: "#83a4d4",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "8px 12px",
                          fontSize: "14px",
                          width: "30%",
                          cursor: "pointer",
                          marginTop: "10px"
                        }}

                      >
                        Go to dashboard
                      </button>
                    </div>

                  </div>

                </Fragment>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPop;
