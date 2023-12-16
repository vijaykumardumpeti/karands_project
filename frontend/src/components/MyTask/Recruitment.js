import React, {useState} from 'react'
import myImage from '../../assets/logo2.png'
import MyTaskSideBar from "./MyTaskSideBar";
import MyTaskDetails from "./MyTaskDetails";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';


export default function Recruitment() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };


  return (
    <div className="" >
      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="recruitment" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />

          <hr />
          <div className="container-xl container-lg mt-6 mb-7"
            style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden" }}
          >

            <div className='card border-0'>
              <div className='card-header'>
                <h3 className="d-flex text-start text-Secondary">Drive-in-Support</h3>
              </div>

              <div className='card-body'>
                <div className='row'>
                  <span className="d-flex justify-content-end">
                  <Dropdown onSelect={handleSelect}>
                      <Dropdown.Toggle>
                        <BiDotsVerticalRounded />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                        <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                        <Dropdown.Item eventKey="share">Share</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>

                  <div className='col-xl-2  col-lg-2 d-flex justify-content-center' style={{ width: '80px', height: '80px', borderRadius: "10px", backgroundColor: 'white', marginRight: '22px', marginLeft: '22px' }}>
                    <img src={myImage} alt='logos' ></img>
                  </div>

                  <div className=' col-xl-8 col-lg-8'>
                    <div className='row'>
                      <div className="col-lg-12 d-flex  flex-lg-row   " >
                        <h4 className="  fs-12 fw-normal "> Karands Business Solutions</h4>

                      </div>
                    </div>
                    <div className='row'>

                      <div className='col-lg-6 d-flex  flex-lg-row mt-2 card  border-0'>

                        <h6 className="d-flex justify-content-start ">Recruiter:</h6>
                        <h6 className="text-muted pl-1 text-start">Dev Singh</h6>

                      </div>
                      <div className='col-lg-6 d-flex  flex-lg-row mt-2 card border-0 '>
                        <h6 className="d-flex justify-content-start fs-12 fw-normal ">Required Support HR:</h6>
                        <h6 className="text-muted pl-1 text-start">3</h6>
                      </div>

                    </div>
                    <div className='row'>
                      <div className="col-lg-6 d-flex  flex-lg-row mt-2  " >
                        <h6 className="  fs-12 fw-normal d-flex justify-content-start "> No of Positions:</h6>
                        <h6 className="text-muted pl-1 text-start">10</h6>
                        <a href="/recruitment" class="h6 stretched-link btn-link d-flex justify-content-start ms-2" style={{ textDecoration: 'none' }}  > View Job Details</a>
                      </div>
                      <div className="col-lg-6 d-flex  flex-lg-row mt-2 " >
                        <h6 className="  fs-12 fw-normal d-flex justify-content-start "> Industry:</h6>
                        <h6 className="text-muted pl-1 text-start">Automobiles, FMCG, Software</h6>
                      </div>

                    </div>
                    <div className='row'>
                      <div className="col-lg-6 d-flex  flex-lg-row  mt-2 " >
                        <h6 className="  fs-12 fw-normal d-flex justify-content-start "> Location:</h6>
                        <h6 className="text-muted pl-1 text-start">Hyderabad</h6>
                      </div>
                      <div className="col-lg-6 d-flex  flex-lg-row  mt-2 " >
                        <h6 className="  fs-12 fw-normal d-flex justify-content-start ">Date:</h6>
                        <h6 className="text-muted pl-1 text-start">10th May-2023, 11th May-2023, 12th May-2023</h6>
                      </div>

                    </div>
                    <div className='row'>
                      <div className="col-lg-6 d-flex  flex-lg-row   " >
                        <h6 className="  fs-12 fw-normal d-flex justify-content-start ">Venue:</h6>
                        <div className='d-flex flex-column'>
                          <h6 className="text-muted  text-start pl-2">Madhapur</h6>
                          <h6 className="text-muted text-start pl-2">Near Kavuri hills</h6>
                          <h6 className="text-muted text-start pl-2">Co-Work Zone</h6>
                          <h6 className="text-muted text-start pl-2">Hyderabad</h6>
                        </div>
                      </div>
                    </div>


                  </div>

                  <div className="mt-4 pt-2  ms-3 text-center  d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-center gap-3">
                      <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#companydetailsModal"  >Read Task</button>

                      <div class="modal fade" id="companydetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                          </div>
                        </div>
                      </div>


                      <button type="button" className="btn btn-danger me-3" data-bs-toggle="modal" data-bs-target="#companynotesModal">Notes</button>
                      <div class="modal fade" id="companynotesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button type="button" className="btn btn-success me-3">Accept</button>
                      <button type="button" className="btn btn-danger me-3">Decline</button>
                    </div></div>





                </div>

              </div>


            </div>

          </div>
        </div>
      </div>
      <div className="scroll-to-top" onClick={scrollToTop}>
        <AiOutlineArrowUp /> {/* Replace with your icon */}
      </div>
    </div>

  )
}
