import React, { useEffect, useState, Fragment } from 'react'
import Sidebar from './Sidebar'
import Details from './Details'
import axios from 'axios'
import myImage from "../../assets/logo2.png";
import { useNavigate } from 'react-router-dom';

export default function Appliedjobs() {

  const navigate = useNavigate();


  const [details, setdetails] = useState([])


  useEffect(() => {


    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/appliedjobs/${localStorage.getItem("id")}`).then((res) => {


      if (res.data) {

        setdetails(res.data)
      }



    }).catch(err => console.log(err))



  }, [])



  return (
    <div>

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />

          <hr />

          <div>


            {/* <p>we are Working on it..............</p> */}


            {

              details.length > 0 ?

                details.map((data, index) => {
                  return (
                    <Fragment>
                      <React.Fragment key={index}>
                        {data.job.companyName ? (
                          <div className='postcardview'>
                            <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3" >
                                <div className="flex-shrink-0">
                                  <img
                                    className="rounded-3"
                                    alt="some"
                                    style={{
                                      width: "70px",
                                      height: "70px",
                                      backgroundColor: "red",
                                      borderRadius:"10px"
                                    }}
                                    src={myImage}
                                  />
                                </div>
                              </div>
                              <div className='col-lg-3 col-md-3 col-sm-3'>
                                <div>
                                  <h4 className="lead">
                                    <strong>{data.job.title ? data.job.title : ""}</strong>
                                  </h4>

                                  <p>{data.job.companyName ? data.job.companyName : ""}</p>

                                  <span className="badge bg-secondary">{data.job.location}</span>{" "}
                                  <span className="badge bg-success">{data.job.salaryStartFrom} LPA - {data.job.salaryEndTo} LPA</span>
                                </div>
                              </div>

                              <div className="col-lg-3 col-md-3 col-sm-3">
                                {data.job.skills.map((e, i) => (
                                  <span key={i} className="badge bg-secondary p-1 mr-1">
                                    {e}
                                  </span>
                                ))}
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 ">
                                <button
                                  onClick={() => navigate("/jobpreview", { state: data.job })}
                                  className="btn btn-success stretched-link"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    </Fragment>

                  );
                })

                : <p>no applied jobs.....</p>


            }








          </div>

        </div>

      </div>



    </div>
  )
}
