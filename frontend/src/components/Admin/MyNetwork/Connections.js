import React, { useEffect ,useState} from 'react';
import './connections.css';
import myPic from '../../../assets/backgroundImage.png'
import axios from "axios"
export default function Connections() {
  const [connections,setConnections]=useState([]);
  useEffect(()=>{
axios.get(`http://localhost:8080/karands/request/allfriends/${localStorage.getItem("id")}`)
.then(res=>setConnections(res.data))
.catch(err=>console.log(err))
  },[])
  return (
  <></>
  )
}
