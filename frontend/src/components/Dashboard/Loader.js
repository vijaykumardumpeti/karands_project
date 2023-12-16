import React from 'react';
import './Loader.css'; // Make sure to replace "Loader.css" with the actual name of your CSS file

function Loader() {
    return (
        <div className="loader">
            <span className="ball"></span>
            <span className="ball2"></span>
            <ul>
                <li></li><li></li><li></li><li></li><li></li>
            </ul>
        </div>
    );
}

export default Loader;
