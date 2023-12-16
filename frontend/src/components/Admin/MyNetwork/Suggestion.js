import React, { useEffect ,useState} from 'react';

import myPic from '../../../assets/backgroundImage.png'
import axios from 'axios';

export default function Suggestion() {
    const [suggestion,setSuggestion]=useState([]);
    const [flag,setFlag]=useState(true)
      useEffect(()=>{
    axios.get(`http://localhost:8080/karands/request/suggestionUser/0/${localStorage.getItem("id")}`)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
      },[flag]);
      function addFriend(id){
        console.log(id)
        axios.post(`http://localhost:8080/karands/request/connection/people`,{
          senderid:localStorage.getItem("id"),
          receiverid:id
        })
        .then(res=>{
          alert('Withdrawed');
          setFlag(!flag)
          
        })
        .catch(err=>console.log(err))
      }
  return (
    <div className='container-fluid' style={{backgroundColor:'#eee'}}>
    <div className="main-body">
    <div className='d-flex flex-start'><h6>Connections Suggestion</h6></div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
       {
        suggestion.map((data,index)=>{
          return   <div className="col mb-3">
          <div className="card">
            <img src={myPic} alt="Cover" className="card-img-top"/>
            <div className="card-body text-center">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{width:"100px", marginTop:"-65px"}} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3"/>
              <h5 className="card-title">{data.name}</h5>
              <p className="text-secondary mb-1">{data.designation?data.designation:"No Designation "}</p>
              <p className="text-muted font-size-sm">{data.location}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-success btn-sm bg-light btn-block m-1 text-success" onClick={()=>addFriend(data._id)} type="button">Add Friend</button>
            </div>
          </div>
        </div>
        })
       }
     
      </div>
    </div>
    </div>
  )
}
