import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { Fragment } from "react";

function ShortListed(props) {


  const [shortlisted, setshortlisted] = useState([])

  const [flag, setFlag] = useState(true);

  async function fetch() {

    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/whoshortlisted/${props.jobId}`)
      .then((res) => {

        console.log("shortlisted............", res.data)



        setshortlisted(res.data.data)

      })
      .catch((err) => {
        console.log(err);
      });


  }


  useEffect(() => {

    fetch()


  }, [flag])







  useEffect(() => {

    fetch()


  }, [])






  async function deleteshortlisted(userId) {


    const data = {
      userId: userId,
      jobId: props.jobId
    }

    const deletedres = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/deleteshortlisted`, data)

    if (deletedres.data) {



      setFlag(!flag)

    }



  }


  return (
      <div className="overflow-auto">
        <div className="container-lg container-xl mt-2 ">
            {
              shortlisted.length > 0 ? shortlisted.map((data, i) => {
                return (

                  <Fragment>
                    <div className="card mt-2 mb-2 ">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="table-responsive">
                            <table className="table manage-candidates-top bg-white ">
                              <thead>
                                <tr>
                                  <th scope="col">no.</th>
                                  <th scope="col"></th>
                                  <th scope="col">Skills</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="col">{i + 1}</th>
                                  <td>
                                    <div className="d-flex align-items-center ">
                                      <img
                                        src="http://mdbootstrap.com/img/new/avatars/8.jpg"
                                        alt=""
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                          marginRight: "20px",
                                          borderRadius: "50%",
                                          objectFit: "cover",
                                          overflow: "hidden",
                                        }}
                                        className="rounded-circle"
                                      />
                                      <div className="ms-7">
                                        <p
                                          className="fw-bold mb-1 mb-3 "
                                          style={{
                                            display: "-ms-flexbox",
                                            display: "flex",
                                            WebkitBoxSizing: "content-box",
                                          }}
                                        >
                                          {data.name ? data.name : ""}
                                        </p>
                                        <p
                                          className="text-muted mb-2  "
                                          style={{
                                            display: "-ms-flexbox",
                                            display: "flex",
                                            WebkitBoxSizing: "content-box",
                                          }}
                                        >
                                          <i className="fas fa-map-marker-alt pr-1"></i>
                                          {data.location ? data.location : ""}
                                        </p>
                                        <p
                                          className="text-muted mb-2 "
                                          style={{
                                            display: "-ms-flexbox",
                                            display: "flex",
                                            WebkitBoxSizing: "content-box",
                                          }}
                                        >
                                          <i className="fas fa-tag pr-1"></i>

                                          {data.Designation ? data.Designation : ""}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="text-muted mb-0">React jS , node js</p>
                                  </td>
                                  <td>
                                    <div className="d-grid">
                                      <Link>
                                        <FaEye />
                                        view
                                      </Link>



                                      <Link onClick={() => { deleteshortlisted(data.userId) }}>
                                        <BsFillTrash3Fill /> delete

                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>


                  </Fragment>
                )

              })
                : "no one is shortlisted!"
            }




          
        </div>

      </div>

   


  )
}

export default ShortListed;
