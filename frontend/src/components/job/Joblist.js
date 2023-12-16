import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from "../../assets/logo2.png";
import ICHPDashboard from "../company/ICHPDashboard";
import axios from "axios";
function Joblist() {
  const navigate=useNavigate()
    const [details,setDetails]=useState([])
    useEffect(()=>{
axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/allpost/${localStorage.getItem("id")}`)
.then(res=>{
  console.log(res.data);
  setDetails(res.data)
})
.catch(err=>console.log(err))
    },[])
  return (
    <div>
      <ICHPDashboard />
      <div class="container-lg container-xl ">
        <div class="card jobList ">
          <div class="card-header">
            <h5 class="d-flex text-start">Job List</h5>
          </div>

          <div class="card-body">
            {
                details.map((data,index)=>{
                    return <Fragment>
                        <div class="d-flex flex-column flex-lg-row align-items-center">
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
                  <p>{data.companyName}</p>
                  <span class="badge bg-secondary ">{data.location}</span>{" "}
                  <span class="badge bg-success">{data.salaryStartFrom} LPA - {data.salaryEndTo} LPA</span>
                </div>
                <div class="col-sm-4  col-md-4 py-2">
                  {data.skills.map(e=>{
                  return  <span class="badge  bg-secondary p-1 mr-1">{e}</span>

                  })}                  
                </div>
                <div class="col-sm-3 text-lg-end" >
                  <button onClick={()=>navigate("/jobpreview",{state:data})}  class="btn btn-success stretched-link">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <hr class="border border-primary border-2 opacity-50" />
                    </Fragment>
                })
            }
          
          </div>
        </div>
      </div>
    </div>
  );
}
export default Joblist;
