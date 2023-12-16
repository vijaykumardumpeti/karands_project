import axios from 'axios'
import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineTag } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';

export default function Appliedllst(props) {

  const [appliedlist, setappliedlist] = useState([])

  const [flag, setFlag] = useState(true);

  console.log("props.jobId", props.jobId)



  async function fetch() {
    axios
      .get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/whoapplied/${props.jobId}`)
      .then((res) => {

        console.log("appliedlist............", res.data)

        setappliedlist(res.data)

      })
      .catch((err) => {
        console.log(err);
      });


  }





  useEffect(() => {

    fetch()


  }, [])



  useEffect(() => {

    fetch()

  }, [flag])






  async function deleteuserId(userId) {

    const data = {
      userId: userId,
      jobId: props.jobId
    }


    const res = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/deleteuserId`, data)


    if (res) {

      console.log("deleteduserIdres", res)


      setFlag(!flag)
    }






  }


  // functioin to shoertost.........



  async function shortlist(userdata) {


    const data = {
      jobId: props.jobId,
      userId: userdata.userId,
      name: userdata.name,
      email: userdata.email,
      // Designation:userdata.Designation

    }




    const shortlistres = await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/jobs/shortlist`, data)

    if (shortlistres) {
      console.log("shortlistres")


      setFlag(!flag)
    }



  }






  return (
    <div>



      <div>
        <div className="container-lg container-xl mt-3 ">
          <div className="card ">
            {/*<div className="card-header">
            <h5 className="d-flex text-start">User List</h5>
  </div>*/}


            {
              appliedlist.length > 0 ? appliedlist.map((data, i) => {
                return (

                  <Fragment>
                    <div className="card-body">
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
                                      <div>
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
                                          className="text-muted mb-2"
                                          style={{
                                            display: "-ms-flexbox",
                                            display: "flex",
                                            WebkitBoxSizing: "content-box",
                                          }}
                                        >
                                          {" "}
                                          <CiLocationOn />
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
                                          <AiOutlineTag />

                                          {data.Designation ? data.Designation : ""}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="text-muted mb-0">React jS , node js</p>
                                  </td>
                                  <td>
                                    <div className='d-grid'>
                                      <Link>
                                        <FaEye />
                                        view
                                      </Link>

                                      <Link onClick={() => { shortlist(data) }}>

                                        <BsPencilSquare />
                                        shortlist
                                      </Link>

                                      <Link style={{ cursor: "pointer" }} onClick={() => { deleteuserId(data.userId) }}>
                                        <BsFillTrash3Fill />
                                        delete
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
                : ""
            }




          </div>
        </div>

      </div>

    </div>


  )
}

