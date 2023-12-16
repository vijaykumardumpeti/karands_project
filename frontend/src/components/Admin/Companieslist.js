
import react, { useEffect, useState } from 'react'
import './Documents.css'
import { Box } from "@mui/material";
import AdminDashboard from './AdminDashboard';

import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';


export default function Companieslist() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate()
  const [checkedItems, setCheckedItems] = useState({});

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
  // const currentData = data.slice(startIndex, endIndex);



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








// useeffect to featch all users...........


const [currentData,setcurrentData]=useState([])

const [searchinput,setsearchinput]=useState("")



console.log("search input",searchinput)



async function fetch(){

  

  await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/company/getcompanies/${startIndex}/${itemsPerPage}`,{name:searchinput}).then((res) => {
          
  if(res.data){
    console.log("res from fetch users useeffe",res.data)
  
    setcurrentData(res.data)
  }
  
  
  
  })
  .catch((err) => {
  console.log(err);
  });
  
  
  
  
  
    }







useEffect(()=>{




  fetch()


},[endIndex,searchinput])


















  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>



          <div className='container-lg'>
            <div className='card'>
              <div className=' ms-3'><h5 className='d-flex justify-content-start m-3'>Companies list</h5>

              <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"

          onChange={(e)=>{setsearchinput(e.target.value)}}
        />
                <hr />
                <div className='d-flex justify-content-start mb-3'>
                  <span className='me-2'>Show</span>
                  <select value={itemsPerPage} className='me-2' onChange={handleItemsPerPageChange}>
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                  </select>
                  <span>rows per page</span>
                </div></div>
              <div style={{ overflowX: 'auto', overflowX: 'scroll' }}>
                <table  >
                  <thead className="text-uppercase bg-body" style={{ borderTop: 'none !important' }} >
                    <tr>
                      <th style={{ whiteSpace: 'nowrap' }}>
                        <input type="checkbox" checked={selectAll}
                          onChange={handleSelectAllChange} />Select all
                      </th>
                      <th style={{ whiteSpace: 'nowrap' }}>Name of Company</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Location</th>
                      <th style={{ whiteSpace: 'nowrap' }}>No of Employees</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Mobile NO</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Email</th>
                      <th style={{ whiteSpace: 'nowrap' }}>ConcernPerson</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Website</th>
                      <th style={{ whiteSpace: 'nowrap' }}>About</th>
                      <th style={{ whiteSpace: 'nowrap' }}>jobs Posted</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Verified</th>

                      <th style={{ whiteSpace: 'nowrap' }}>Documents</th>
                      <th style={{ whiteSpace: 'nowrap' }}>Date of Registration</th>

                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row) => (
                      <tr key={row.id}>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                          < input
                            type="checkbox"
                            name={row.id}
                            checked={selectedRows.includes(row.id)}
                            onChange={(e) => handleCheckboxChange(e, row.id)}
                          // checked={selectedRows.includes(row.id)}

                          />
                        </td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }} ><span onClick={() => navigate("/companypage/about", { state: row })}> <Link >{row.nameOfCompany}</Link></span></td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.state}</td>

                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.noOfEmployee}</td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.mobileNumber}</td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.domainEmail}</td>

                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.concernPerson}</td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.website}</td>

                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><a className="h6 btn-link text-primary" data-bs-toggle="modal" data-bs-target="#personaldetailsModal " style={{ textDecoration: 'none' }} >click</a></td>
                       
                       
                        <div class="modal fade" id="personaldetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ display: 'flex', top: '5%', bottom: '30%' }} >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Uploaded Personal Documents</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>

{/* modal */}


                              <div class="modal-body">
                                <div className='d-flex flex-column'>
                                  <div className='d-flex flex-lg-row'>
                                    <h6 className='d-flex justify-content-start'>Aadhar Card - </h6>
                                    <h6 className='d-flex justify-content-start ms-2'><i class="bi bi-check-circle"></i>Verified</h6>
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
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><a className="h6 btn-link text-primary" data-bs-toggle="modal" data-bs-target="#professionaldetailsModal  " style={{ textDecoration: 'none' }} >{row.postedJob}</a></td>
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
                                    <h6 className='d-flex justify-content-start ms-2'><i class="bi bi-check-circle"></i>Verified</h6>
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

                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.verified?row.verified:""}</td>
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
                                    <h6 className='d-flex justify-content-start ms-2'><i class="bi bi-check-circle"></i>Verified</h6>
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

                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><a className="h6 btn-link text-primary  " style={{ textDecoration: 'none' }} >view</a></td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><a className="h6 btn-link text-primary  " style={{ textDecoration: 'none' }} >{row.dateOfRegistration}</a></td>



                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
              <div className='card-footer'  >
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
              </div>



            </div>
          </div>
        </Box>
      </Box>
    </div>

  )
}


