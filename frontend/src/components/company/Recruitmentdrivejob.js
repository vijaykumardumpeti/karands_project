import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import Details from '../Dashboard/Details'

export default function Recruitmentdrivejob() {
    return (
        <div className="row flex-nowrap" style={{ width: "100%" }}>
            <Sidebar userPage='dashboard' style={{ height: "100%" }} />
            <div className="col container" style={{ maxWidth: "100%" }}>
                <Details />
                <hr />
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-4'>
                            <div className='card bg-light mb-2'>
                                <div className='card-header'>
                                    <h5>Software Developer</h5>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <p>10 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 text-start'>
                                            <p>wipro solutions | 1 LPA- 16 LPA | Hyderabad</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                    <div className='col-12 text-start'>
                                    <b>Job Description :</b><span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</span>
                                    </div> 
                                    </div>
                                </div>
                                <div className='card-footer'>

                                </div>
                            </div>
                            <div className='card bg-light'>
                                <div className='card-header'>
                                    <h5>Software Developer</h5>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <p>10 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 text-start'>
                                            <p>wipro solutions | 1 LPA- 16 LPA | Hyderabad</p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='card-footer'>

                                </div>
                            </div>
                            <div className='card bg-light'>
                                <div className='card-header'>
                                    <h5>Software Developer</h5>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <p>10 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 text-start'>
                                            <p>wipro solutions | 1 LPA- 16 LPA | Hyderabad</p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='card-footer'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
