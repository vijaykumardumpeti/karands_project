import React from 'react';
import { useLocation } from 'react-router-dom';
// import PDF from "../../../src/Jennifer.pdf"
function ViewDocument() {
  const location = useLocation();
  const state = location.state;
  const pdfUrl = state; // Replace with the actual public URL of the PDF file

  return (
    <div>
      {/* <embed src={PDF} width="500" height="600" type="application/pdf" /> */}
    </div>
  );
}

export default ViewDocument;
