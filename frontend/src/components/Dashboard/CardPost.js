import React, { useState, useEffect, Fragment } from 'react'
import "./editprofile.css";

import axios from 'axios';

function CardPost() {


  const [comments, setComments] = useState([]);


  const [isCommentExpanded, setCommentExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [PastcommentsCount, setPastcommentsCount] = useState(5)

  const [EditpostId, setEditpostId] = useState("")
  // ////////////////////////////////////////////////////////edit post

  const [Show, setshow] = useState(false)

  const [commentIdtoshow, setcommentIdtoshow] = useState("")

  const [commentreplyId, setcommentreplyId] = useState("")

  const [newnestedcomment, setNewNestedcomment] = useState("")

  const [showeditcommentId, setshoweditcommentId] = useState("")

  const [editedcomment, seteditedcomment] = useState("")
  const lineStyle = {
    width: '1px',
    height: '25px', // Adjust the height as per your requirement
    backgroundColor: "#656565", // Change the color as per your requirement
    marginLeft: "15px"
  };
  const { parseISO, formatDistanceToNow } = require('date-fns');
  async function handleeditcomment(commentId) {


    setshoweditcommentId(commentId)



  }
  async function handledeletecomment(postId, commentId) {


    const input = {

      commentId: commentId

    }
    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/deletecomment/${postId}`, input)
    commentsfunction(postId)
  }
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
  async function commentsfunction(postId) {

    const res = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/comment/${postId}/${PastcommentsCount}`)


    if (res.data.result) {

      setComments(res.data.result)

      console.log(res.data.result)
    }
  }

  async function canceleditcomment() {

    setshoweditcommentId("")
    seteditedcomment("")

  }
  function postclick(postId) {

    setEditpostId(postId)

    setshow(!Show)
  }
  async function handlelikes(postId) {

    const data = {

      userId: localStorage.getItem("id"),

      name: localStorage.getItem("fullName"),

      email: localStorage.getItem("email")
    }


    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost/like/${postId}`, data)


  }
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

  const [details, setDetails] = useState([])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/ichpPost`)
      .then(res => {
        console.log(res.data);
        setDetails(res.data.result)
      })
      .catch(err => console.log(err))
  }, [])

  const val = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
  return (
    <Fragment>

    </Fragment>
  )
}

export default CardPost
