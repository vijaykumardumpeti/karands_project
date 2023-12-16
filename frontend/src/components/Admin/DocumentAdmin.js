import React, { useState } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Box } from "@mui/material";
import AdminDashboard from './AdminDashboard';

const data = [
  { id: 1, name: 'John Doe', age: "view" },
  { id: 2, name: 'Jane Smith', age: "view" },
  { id: 3, name: 'Bob Johnson', age: "view" },
  { id: 4, name: 'Bob Johnson', age: "view" },
  { id: 5, name: 'Bob Johnson', age: "view" },
  { id: 6, name: 'Bob Johnson', age: "view" },
  { id: 7, name: 'Bob Johnson', age: "view" },
  { id: 8, name: 'Bob Johnson', age: "view" },
  { id: 9, name: 'Bob Johnson', age: "view" },
  { id: 10, name: 'Bob Johnson', age: "view" },
  { id: 11, name: 'Bob Johnson', age: "view" },
];




const DocumentAdmin= (props) => {






  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [checkedItems, setCheckedItems] = useState({});
  
  // const handleCheckboxChange = (event) => {
  //     const { value, checked } = event.target;
  //     setCheckedItems(prevState => ({ ...prevState, [value]: checked }));
  //   };
  //   const checkedItemIds = Object.keys(checkedItems).filter(key => checkedItems[key]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);



  const handleCheckboxChange = (e, rowId) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, rowId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    }
  };

  const handleSelectAllChange = (e) => {
   
    if (e.target.checked) {
          setSelectedRows(data.map((row) => row.id));
        } else {
          setSelectedRows([]);
        }
        setSelectAll(e.target.checked);
      };


  

  // const handleSelectAll = (e) => {
  //   if (e.target.checked) {
  //     setSelected(data.map((row) => row.id));
  //   } else {
  //     setSelected([]);
  //   }
  // };

  // const handleSelectRow = (e) => {
    
  //   const row = parseInt(e.target.value);
  //   if (e.target.checked) {
  //     setSelected([...selected, row.id]);
  //   } else {
  //     setSelected(selected.filter((row) => row !== row.id));
  //   }
  // };



  return (
    <div>
        <Box sx={{ display: 'flex' }}>
   <AdminDashboard/>
    <Box component="main" sx={{ marginTop: 10 }}>
     
        <div>

    
      < Container fluid >
      <Row >
<Col lg={12} className='d-flex justify-content-center align-self-center  '>
<Card  style={{ width: '80rem' }}>
<Card.Header className='d-flex justify-content-start'> Uploaded Documents</Card.Header>
<Card.Body >
      <Row >
        
      
   
        <Col  sm=" 12" lg="12"  >
            <Card className='border-0' >
      <Card.Body >
      <div className='d-flex justify-content-start mb-3'>
        <span className='me-2'>Show</span>
        <select value={itemsPerPage}  className='me-2' onChange={handleItemsPerPageChange}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
        <span>rows per page</span>
      </div>
        <Table >
        <thead className="text-uppercase bg-body" style={{borderTop: 'none !important'}} >
        <tr>
        {/* <th>
              <input type="checkbox"  checked={selectAll}
              onChange={handleSelectAllChange} />Select all
            </th> */}
          <th>UserName</th>
          <th>Personal</th>
          <th>Professional</th>
          <th>Educational</th>
     
          <th>Resume</th>
          <th>Photo</th>
          
        </tr>
      </thead>
      <tbody>
      {currentData.map((row) => (
          <tr key={row.id}>
            <td>
              {/* < input
                type="checkbox"
                name={row.id}
                checked={selectedRows.includes(row.id)}
                onChange={(e) => handleCheckboxChange(e, row.id)}
                // checked={selectedRows.includes(row.id)}
             
              /> */}
            </td>
            <td>{row.name}</td>
           
            <td><a className="h6 btn-link text-primary"  data-bs-toggle="modal" data-bs-target="#personaldetailsModal " style={{textDecoration: 'none'}} >{row.age}</a></td>




            <div class="modal fade" id="personaldetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Uploaded Personal Documents</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-lg-row'>
                            <h6 className='d-flex justify-content-start'>Aadhar Card - </h6>
                            <h6  className='d-flex justify-content-start ms-2'><i class="bi bi-check-circle"></i>Verified</h6>
                            </div>
                            
                            </div>
                            <div className='d-flex flex-lg-row'>
                            <h6 className='d-flex justify-content-start'>Pan Card - </h6>
                            <h6 className='d-flex justify-content-start ms-2'><i class="bi bi-x-circle-fill"></i>Not-Verified</h6>
                            </div>
                          </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         
                        </div>
                      </div>
                    </div>
                  </div>




            <td><a className="h6 btn-link text-primary" data-bs-toggle="modal" data-bs-target="#professionaldetailsModal  " style={{textDecoration: 'none'}} >{row.age}</a></td>




            <div class="modal fade" id="professionaldetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Uploaded Personal Documents</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-lg-row'>
                            <h6 className='d-flex justify-content-start'>OfferLetter - </h6>
                            <h6  className='d-flex justify-content-start ms-2'><i class="bi bi-check-circle"></i>Verified</h6>
                            </div>
                            
                            </div>
                            <div className='d-flex flex-lg-row'>
                            <h6 className='d-flex justify-content-start'>Payslips - </h6>
                            <h6 className='d-flex justify-content-start ms-2'><i class="bi bi-x-circle-fill"></i>Not-Verified</h6>
                            </div>
                          </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         
                        </div>
                      </div>
                    </div>
                  </div>

            <td><a className="h6 btn-link text-primary"  data-bs-toggle="modal" data-bs-target="#educationaldetailsModal" style={{textDecoration: 'none'}} >{row.age}</a></td>


            
            <div class="modal fade" id="educationaldetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Uploaded Personal Documents</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='d-flex flex-column'>
                                <div className='d-flex flex-lg-row'>
                            <h6 className='d-flex justify-content-start'>Convocation Letter - </h6>
                            <h6  className='d-flex justify-content-start ms-2'><i class="bi bi-check-circle"></i>Verified</h6>
                            </div>
                            
                            </div>
                            <div className='d-flex flex-lg-row'>
                            <h6 className='d-flex justify-content-start'>Individual Marksheets - </h6>
                            <h6 className='d-flex justify-content-start ms-2'><i class="bi bi-x-circle-fill"></i>Not-Verified</h6>
                            </div>
                          </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         
                        </div>
                      </div>
                    </div>
                  </div>

            <td><a className="h6 btn-link text-primary  " style={{textDecoration: 'none'}} >{row.age}</a></td>
            <td><a className="h6 btn-link text-primary  " style={{textDecoration: 'none'}} >{row.age}</a></td>
            <td><a className="h6 btn-link text-primary  " style={{textDecoration: 'none'}} >{row.age}</a></td>
            <td><a className="h6 btn-link text-primary  " style={{textDecoration: 'none'}} >{row.age}</a></td>
            
           
          </tr>
        ))}
      </tbody>
     
      </Table>
      </Card.Body>
      </Card>
    </Col>
    </Row>
    </Card.Body>
    <Card.Footer  >
     <h6 className='text-success d-flex justify-content-start'>
   Showing {`${startIndex + 1}-${endIndex}  Rows out of ${totalItems}`} Rows</h6>
      <div   >
     
        <button type="button" className=' btn btn-primary me-2' disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </button>
        {currentPage}
        <button type="button" className=' btn btn-primary ms-2' disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
        </div>
      
        
        {/* <a href="#!" className="btn btn-gray d-flex justify-content-end" >View All Transactions</a> */}
       
     
      </Card.Footer>
    </Card>
</Col>
</Row>
    </Container>
    </div>
    </Box>
    </Box>
    </div>
   
  );
};

export default DocumentAdmin;


