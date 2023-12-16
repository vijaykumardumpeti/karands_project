import React from 'react'
import MyTaskSideBar from './MyTaskSideBar'
import MyTaskDetails from './MyTaskDetails'
import PostTimeDifference from "../TimeCalculation/PostTimeDifference";

export default function Referalbonus() {
    return (
        <div className="" >
            <div className="row flex-nowrap" style={{ width: "100%" }}>
                <MyTaskSideBar userPage="refferalbonus" />
                <div className="col container" style={{ maxWidth: "80%" }}>
                    <MyTaskDetails />

                    <hr />
                    <div className='row'>
                        <div className="col-6 container-md container-lg mt-4"
                            style={{ height: "79vh", marginTop: "20px", overflowX: "hidden" }}
                        >
                            <div style={{ padding: '10px', backgroundColor: "white", color: "black", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "10px" }}>


                                <div className="d-flex flex-start mt-2">
                                    <h4>Job Title</h4>
                                </div>
                                <div style={{ width: "100%", textAlign: "left" }}>
                                    <PostTimeDifference />

                                </div>
                                <div className="d-flex mt-2 ">
                                   <b> Company Name | LPA- 10 LPA | Location | Industry</b>
                                </div>
                                <div className="d-flex mt-2">

                                </div>
                                <div className="text-start">
                                    <span >Skills: </span>
                                    <span className="badge  bg-secondary p-1 mr-1">html</span>
                                    <span className="badge  bg-secondary p-1 mr-1">css</span>
                                    <span className="badge  bg-secondary p-1 mr-1">bootstrap</span>
                                    <span className="badge  bg-secondary p-1 mr-1">javascript</span>
                                    <span className="badge  bg-secondary p-1 mr-1">mui</span>

                                </div>
                                <div
                                    className="d-flex mt-3"
                                    style={{ display: "flex", textAlign: "start" }}
                                >
                                    <p>
                                        <b>Job description :</b>
                                        is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                    </p>
                                </div>
                                <div
                                    className="d-flex mt-3"
                                    style={{ justifyContent: "space-between" }}
                                >

                                    {/* {data.expirejob&&
                         data.expirejob.status==true?

                         <div style={{display:"flex"}}>
                          <button className="btn btn-outline-success">Renew Job</button>
                            </div>
                             :""

                             } */}
                                </div>
                            </div>

                        </div>
                        <div className='col-6'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
