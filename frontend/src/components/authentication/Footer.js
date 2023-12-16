import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        
        <div className="footer-basic">
        <footer>
            <div className="social">
            <a ><FaLinkedinIn /></a>
            <a ><FaFacebookF /></a>
            <a><FaTwitter /></a>
            <a ><AiOutlineMail /></a>
            </div>
            <ul className="list-inline">
                <Link to="https://karands.com/">
                
                <li className="list-inline-item">Home</li>
                </Link>
                <Link to="https://karands.com/services">
                <li className="list-inline-item">Services</li>
                </Link>

                <Link>
                <li className="list-inline-item">Accessibility</li>
                </Link>


                  <Link to="https://karands.com/about-us">
                <li className="list-inline-item">About</li>

                </Link>

                <Link to="https://karands.com/terms-and-conditions">
                <li className="list-inline-item">Terms & Conditions</li>
                </Link>

                <Link to="https://karands.com/contact-us">
                <li className="list-inline-item">Contact us</li>
                </Link>



{/* 
                <li className="list-inline-item">Barand Policy</li>

                <li className="list-inline-item">Community Guidelines</li>

                <li className="list-inline-item">Privacy Policy</li> */}
            </ul>
            <p className="copyright">Karands Business Services © 2023</p>
        </footer>
        </div>
    )
}
