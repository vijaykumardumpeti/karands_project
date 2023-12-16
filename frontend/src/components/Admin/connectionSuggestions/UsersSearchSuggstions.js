import React from 'react';
import './userSuggestion.css';

export default function UsersSearchSuggstions() {

const addClick = () =>{
 alert(`Sent a request to connet with as your friend`)
}

  return (
   
    <div className='container-fluid'>
    <div className="row">
    <div className="col-md-6">
        <div className="people-nearby">
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Sophia Page</a></h5>
                <p>Software Engineer</p>
                <p className="text-muted"> Hyderabad</p>
              </div>
              <div className="col-md-3 col-sm-3" style={{justifyContent:'start'}}>
                <button className="btn btn-primary pull-right"  onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Emma Johnson</a></h5>
                <p>Model at Fashion</p>
                <p className="text-muted">Pune</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right"  onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Nora Wilson</a></h5>
                <p>Writer at Newspaper</p>
                <p className="text-muted">Bangalore</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Diana Amber</a></h5>
                <p>Student</p>
                <p className="text-muted">Cuttuck</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Addison Thomas</a></h5>
                <p>Barber at Fashion</p>
                <p className="text-muted">Pune</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Jonathon Thompson</a></h5>
                <p>Fashion Designer</p>
                <p className="text-muted">Mumbai</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Olivia Steward</a></h5>
                <p>Creative Director</p>
                <p className="text-muted">Kadapa</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Elena Foster</a></h5>
                <p>Executive Officer</p>
                <p className="text-muted">Vaizag</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Brian Walton</a></h5>
                <p>Designer at Designer</p>
                <p className="text-muted">Jhansi</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
          <div className="nearby-user" style={{border:'1px solid white', borderRadius:'10px',backgroundColor:'white'}}>
            <div className="row">
              <div className="col-md-2 col-sm-2">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg"/>
              </div>
              <div className="col-md-7 col-sm-7" style={{ textAlign:'start'}}>
                <h5><a href="#" className="profile-link" style={{textDecoration:'none'}}>Cris Haris</a></h5>
                <p>General Manager at Manager</p>
                <p className="text-muted">Puri</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-primary pull-right" onClick={addClick}>Add Friend</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
</div>
  )
}
