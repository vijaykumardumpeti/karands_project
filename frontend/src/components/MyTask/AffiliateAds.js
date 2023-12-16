import React from 'react'
import MyTaskDetails from './MyTaskDetails'
import MyTaskSideBar from './MyTaskSideBar'
export default function AffiliateAds() {
  return (
    <div className="" >
    <div className="row flex-nowrap" style={{width:"100%"}}>
      <MyTaskSideBar userPage="affiliateads"/>
      <div className="col container" style={{ maxWidth: "80%" }}>
   <MyTaskDetails/>
      
        <hr />
       <div className="container-xl container-lg mt-6 mb-7"
        style={{ backgroundColor: "#F0F0F0" ,height:"79vh",overflow:"scroll", marginTop:"20px", overflowX: "hidden" }}
        >
  <div className="card" style={{ borderRadius: "15px" }}>

<div className="card-body p-4">

  <div className="row">

    <div className="col-lg-12">

      <div className="d-flex  text-black">

        <div className="flex-shrink-0">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            alt="Generic placeholder" className="img-fluid"
            style={{ width: "80px", borderRadius: "10px" }} />
        </div>
        <div className="flex-grow-1 ms-3">
          <h5 className="mb-1 d-flex justify-content-start">Sravana</h5>
          <p className="mb-1  d-flex justify-content-start " style={{ color: "#2b2a2a" }}>Frontend Developer</p>
          <div className="d-flex flex-lg-row ">
            <p className="mb-2 pb-1 d-flex justify-content-start" style={{ color: "#2b2a2a" }}><i className="fas fa-map-marker-alt mt-1"></i>Hyderabad</p>
            <p className="ms-3">~3 mints ago</p>
          </div>
        </div>
        <i className="bi bi-three-dots-vertical d-flex justify-content-end"></i>
      </div>

    </div>
    <div className="row mt-3">
      <div className="col-lg-12">
        <h6 className='d-flex justify-content-start text-start'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>
      </div>
    </div>
    <div className="row mt-2 ">
      <div className="col-lg-12  d-flex justify-content-center align-items-center ">
        <div className="card border-0  " style={{ backgroundColor: 'red' }}>
          <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/182.webp" className="card-img-top" alt="Sunset Over the Sea" style={{ width: "100%", height: '100%' }} />

        </div>
      </div>

    </div>
    <div className="row">
      <div className="col-lg-12">
        <div className="card border-0">
          <div className="mt-4 pt-2  mb-3 ms-3 text-center  d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center gap-3">
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#adsreadtaskModal"  >Read Task</button>

              <div className="modal fade" id="adsreadtaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>


              <button type="button" className="btn btn-danger me-3" data-bs-toggle="modal" data-bs-target="#adsnotesModal">Notes</button>
              <div className="modal fade" id="adsnotesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button type="button" className="btn btn-success me-3">Accept</button>
              <button type="button" className="btn btn-danger me-3">Decline</button>
            </div>
          </div>


        </div>
      </div>
    </div>




  </div>





</div>
</div>


</div>
        </div>
        </div>
        </div>
  )
}
