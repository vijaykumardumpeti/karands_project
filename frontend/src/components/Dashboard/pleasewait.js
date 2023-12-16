import React from 'react';
import LoadingRing from './LoadingRing';
// import './PleaseWaitModal.css'; // You can create this CSS file to style the modal

const PleaseWaitModal = ({ show }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Please Wait</h2>
        </div>
        <div className="modal-body">
          <LoadingRing />
        </div>
      </div>
    </div>
  );
}

export default PleaseWaitModal;
