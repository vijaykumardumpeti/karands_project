import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import Logo from "../../assets/kz.png"
import Login from './Login';
import { GrMail } from 'react-icons/gr';

const Header = (props) => {
    // const [isLogedIn, setIsLoggedIn] = useState(false)

    // const signInHandler = () => {
    //     const {history} = props
    //     history.push("/")
    // }


    return (
        <div className='bg-light'>
            {/* <header className="row">
                <div className="logo col-md-6 col-sm-6 col-lg-6">
                    <img src={Logo} style={{ height: "60px", width: "200px", position: "absolute", left: "20px", top: "0px" }} />
                </div>

                <div className="custsupport col-md-6 col-sm-6 col-lg-6">  <p><GrMail /> - support@karandszone.com </p></div>
            </header> */}

            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
           
      <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
      
        {/* <img className="img-fluid" src="img/AdobeStock_233128710.png" alt="" width="100px" height="100px" /> */}
        <h2 className="m-0 " style={{ color: 'orangered' }}>KARANDS</h2>
      </a>
      <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <a href="index.html" className="nav-item nav-link active">Home</a>
          <a href="about.html" className="nav-item nav-link">About</a>
          <a href="services.html" className="nav-item nav-link">Services</a>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Karandszone</a>
            <div className="dropdown-menu fade-down m-0">
              <a href="welcome.html" target="_blank" className="dropdown-item">Go to Karands Zone</a>
              <a href="bpo.html" className="dropdown-item">HRBP - BPO</a>
              <a href="hr.html" className="dropdown-item">ICHP - HRs</a>
              <a href="individual.html" className="dropdown-item">IU - Individual Users</a>
            </div>
          </div>
          <a href="contact.html" className="nav-item nav-link">Contact</a>
        </div>
        <a href="index.html" className="btn py-4 px-lg-5 d-none d-lg-block" style={{ backgroundColor: 'orangered', color: 'white' }} >
          Sign In<i className="fa fa-arrow-right ms-3"></i>
        </a>
      </div>
    </nav>

    {/* {isLogedIn && <Login />}            */}
            
        </div>
    )
}


export default Header