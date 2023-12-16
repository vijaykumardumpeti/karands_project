import React, { useEffect ,useState} from 'react';
import myPic from '../../../assets/backgroundImage.png'
import axios from 'axios';

export default function RequestSchema() {
  const [request,setRequest]=useState([]);
const [flag,setFlag]=useState(true)
  useEffect(()=>{
axios.get(`http://localhost:8080/karands/request/allreceivedrequest/${localStorage.getItem("id")}`)
.then(res=>setRequest(res.data))
.catch(err=>console.log(err))
  },[flag]);
  function accept(id){
    console.log(localStorage.getItem("id"))
    axios.patch(`http://localhost:8080/karands/request/acceptRequest`,{
      senderid:id,
      receiverid:localStorage.getItem("id")
    })
    .then(res=>{
      alert('accept');
      setFlag(!flag)
    }).catch(err=>console.log(err))
  }
  function decline(id){
    axios.patch(`http://localhost:8080/karands/request/deleteRequest`,{
      senderid:id,
      receiverid:localStorage.getItem("id")
    })
.then(res=>{
  alert('Declined');
  setFlag(!flag)
})
.catch(err=>console.log(err))
  }
  return (
    <div className='container-fluid' style={{backgroundColor:'#eee'}}>
    <div className="main-body">
    <div className='d-flex flex-start'><h6>No of requestSchema Users : {request.length} </h6></div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
       
        {
          request.map((data,index)=>{
            return  <div className="col mb-3">
            <div className="card">
              <img src={myPic} alt="Cover" className="card-img-top"/>
              <div className="card-body text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style={{width:"100px", marginTop:"-65px"}} alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3"/>
                <h5 className="card-title">{data.name}</h5>
                <p className="text-secondary mb-1">{data.location}</p>
                <p className="text-muted font-size-sm">{data.designation?data.designation:'Designation not updated'}</p>
              </div>
              <div className="card-footer">
              <button onClick={()=>accept(data._id)} className="btn btn-success btn-sm bg-light btn-block m-1 text-success" type="button">Accept</button>
                <button onClick={()=>decline(data._id)} className="btn btn-danger btn-sm bg-light btn-block m-1 text-danger" type="button">Decline</button>
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
