import React, { useContext, useEffect, useState } from "react";
import "./Dashboardadmin.css";
import Box from "@mui/material/Box";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoaderModal from "../spinner/spinnerStyle";
import MyContext from "../../mycontext";

function Dashboardadmin() {
  const [ichp, setIchp] = useState([]);
  const [iu, setIu] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [subadmin, setsubAdmin] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [moneyDetails, setMoneyDetails] = useState({});
  const [companyCount, setCompanyCount] = useState(0);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { profiledata } = useContext(MyContext);

  const [jobs, setjobs] = useState([]);

  const [postfeeds, setpostfeeds] = useState([]);

  const [verifiedusers, setverifiedusers] = useState([]);

  const [unverifiedusers, setunverifiedusers] = useState([]);

  const [verifiedius, setverifiedius] = useState([]);

  const [verifiedichps, setverifiedichps] = useState([]);

  const [unverifiedius, setunverifiedius] = useState([]);

  const [unverifiedichps, setunverifiedichps] = useState([]);






  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("id") ) {
          navigate("/adminlogin");
        }
        if (localStorage.getItem("id")) {
          setIsLoading(true);

          const jobpost = await axios.get(
            `${
              process.env.REACT_APP_IP_ADDRESS
            }/karands/jobs/getjobdetailswithlocation/${localStorage.getItem(
              "id"
            )}`
          );

          setjobs(jobpost.data.data);

          const postfeeds = await axios.get(
            `${
              process.env.REACT_APP_IP_ADDRESS
            }/karands/ichpPost/listofallposts/${localStorage.getItem("id")}`
          );

          setpostfeeds(postfeeds.data.posts);

          const verified_and_unverifiedlist = await axios.post(
            `${
              process.env.REACT_APP_IP_ADDRESS
            }/karands/users/listofverifiedandunverified/${localStorage.getItem(
              "id"
            )}`
          );

          // here we are setting verified ius and verified ichps......................

          if (verified_and_unverifiedlist.data) {
            const verifiedUsers =
              verified_and_unverifiedlist.data?.verifiedusers || [];
            const unverifiedUsers =
              verified_and_unverifiedlist.data?.unverifiedusers || [];

            const verifiedIchps = verifiedUsers.filter(
              (data) => data.role === "ichp"
            );
            const verifiedIus = verifiedUsers.filter(
              (data) => data.role === "iu"
            );

            const unverifiedIchps = unverifiedUsers.filter(
              (data) => data.role === "ichp"
            );
            const unverifiedIus = unverifiedUsers.filter(
              (data) => data.role === "iu"
            );

            setverifiedichps(verifiedIchps);
            setverifiedius(verifiedIus);
            setunverifiedichps(unverifiedIchps);
            setunverifiedius(unverifiedIus);
            setverifiedusers(verifiedUsers);
            setunverifiedusers(unverifiedUsers);
          }

          // here we are setting unverified ius and verified ichps......................

          const moneyDetailsResponse = await axios.get(
            `${process.env.REACT_APP_IP_ADDRESS}/karands/users/changeEarningAndBalance`
          );
          setMoneyDetails(moneyDetailsResponse.data.adminAccess);

          const userDetailsResponse = await axios.get(
            `${
              process.env.REACT_APP_IP_ADDRESS
            }/karands/users/adminAllDetails/${localStorage.getItem("id")}`
          );
          setCompanyCount(userDetailsResponse.data.company);

          const val = Array.isArray(userDetailsResponse.data.details)
            ? userDetailsResponse.data.details
            : [];
          val.forEach((e) => {
            const count = parseInt(e.count, 10);
            if (!isNaN(count)) {
              if (e._id === "ichp") setIchp(e);
              if (e._id === "iu") setIu(e);
              if (e._id === "Admin") setAdmin(e);
              if (e._id === "Sub-Admin") setsubAdmin(e);

              if (e._id === "consultant") setConsultant(e);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminDashboard />
        {isLoading ? (
          <LoaderModal isOpen={isLoading} />
        ) : (
          <Box component="main" sx={{ marginTop: 10 }}>
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">details</h1>
              </div>

              <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                  <div className="card border-left-dark shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase">
                            users
                          </div>
                          <div className=" mb-0 font-weight-bold text-gray-800">
                            {iu.count + ichp.count}
                          </div>
                          <div className="row no-gutters align-items-center">
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "iu",
                                  status: "All",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-info">
                                iu
                              </div>
                              <div className="h6 font-weight-bold ">
                                {iu.count}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "ichp",
                                  status: "All",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-warning">
                                ichp
                              </div>
                              <div className="h6 font-weight-bold">
                                {ichp.count}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "Sub-Admin",
                                  status: "All",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-success ">
                                subadmin
                              </div>
                              <div className="h6 font-weight-bold">
                                {subadmin.count ? subadmin.count : ""}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "Admin",
                                  status: "All",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-danger">
                                Admin
                              </div>
                              <div className="h6 font-weight-bold">
                                {admin.count ? admin.count : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                  <div className="card border-left-dark shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase">
                            Unverified users
                          </div>
                          <div className=" mb-0 font-weight-bold text-gray-800">
                            {unverifiedusers.length > 0
                              ? unverifiedusers.length
                              : "0"}
                          </div>
                          <div className="row mt-4 no-gutters align-items-center">
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "iu",
                                  status: true,
                                  data: unverifiedius,
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-info">
                                iu
                              </div>
                              <div className="h6 font-weight-bold ">
                                {unverifiedius.length > 0
                                  ? unverifiedius.length
                                  : "0"}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "ichp",
                                  status: "un-Verified",
                                  data: unverifiedichps,
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-warning">
                                ichp
                              </div>
                              <div className="h6 font-weight-bold">
                                {unverifiedichps.length > 0
                                  ? unverifiedichps.length
                                  : "0"}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "Sub-Admin",
                                  status: "un-Verified",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-success ">
                                subadmin
                              </div>
                              {/* <div className="h6 font-weight-bold">{subAdmin.unverifiedCount}</div> */}
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "Admin",
                                  status: "un-Verified",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-danger">
                                Admin
                              </div>
                              {/* <div className="h6 font-weight-bold">{admin.unverifiedCount}</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                  <div className="card border-left-dark shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase">
                            verified users
                          </div>
                          <div className=" mb-0 font-weight-bold text-gray-800">
                            {verifiedusers.length > 0
                              ? verifiedusers.length
                              : "0"}
                          </div>
                          <div className="row mt-4 no-gutters align-items-center">
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "iu",
                                  status: "Verified",
                                  data: verifiedius,
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-info">
                                iu
                              </div>
                              <div className="h6 font-weight-bold ">
                                {verifiedius.length > 0
                                  ? verifiedius.length
                                  : "0"}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "ichp",
                                  status: "Verified",
                                  data: verifiedichps,
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-warning">
                                ichp
                              </div>
                              <div className="h6 font-weight-bold">
                                {verifiedichps.length > 0
                                  ? verifiedichps.length
                                  : "0"}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "Sub-Admin",
                                  status: "Verified",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-success ">
                                subadmin
                              </div>
                              {/* <div className="h6 font-weight-bold">{subAdmin.verifiedCount}</div> */}
                            </div>
                            <div
                              className="col"
                              onClick={() => {
                                const level = {
                                  role: "Admin",
                                  status: "Verified",
                                };
                                navigate("/userlist", { state: level });
                              }}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-danger">
                                Admin
                              </div>
                              {/* <div className="h6 font-weight-bold">{admin.verifiedCount}</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- company pages Card Example -->*/}

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div
                        className="row no-gutters align-items-center"
                        onClick={() => navigate("/companytablelist")}
                      >
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Company Pages
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {companyCount}
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- online users Card Example -->*/}

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            no of online
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            50
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Tasks Card Example -->*/}

                <div className="col-xl-8 col-md-6 mb-4">
                  <div className="card border-left-dark shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2 mt-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase">
                            Tasks
                          </div>

                          <div className="row no-gutters align-items-center">
                            <div
                              className="col"
                              onClick={() => navigate("/ongoingtask")}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-info">
                                Completed
                              </div>

                              <div className="h6 font-weight-bold">
                                {profiledata &&
                                profiledata.completedjobtask.length > 0 &&
                                profiledata.completededucationtask.length > 0
                                  ? parseInt(
                                      profiledata.completedjobtask.length
                                    ) +
                                    parseInt(
                                      profiledata.completededucationtask.length
                                    )
                                  : "0"}
                              </div>
                            </div>
                            <div
                              className="col"
                              onClick={() => navigate("/ongoingtask")}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-success ">
                                Pending
                              </div>
                              <div className="h6 font-weight-bold">29</div>
                            </div>
                            <div
                              className="col"
                              onClick={() => navigate("/ongoingtask")}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-danger">
                                declined
                              </div>
                              <div className="h6 font-weight-bold">
                                {profiledata &&
                                profiledata.Declinedjobtask.length > 0 &&
                                profiledata.Declinededucationtask.length > 0
                                  ? parseInt(
                                      profiledata.Declinedjobtask.length
                                    ) +
                                    parseInt(
                                      profiledata.Declinededucationtask.length
                                    )
                                  : "0"}
                              </div>
                            </div>

                            <div
                              className="col"
                              onClick={() => navigate("/ongoingtask")}
                            >
                              <div className=" mb-0 font-weight-bold text-uppercase text-danger">
                                Accepted
                              </div>
                              <div className="h6 font-weight-bold">
                                {profiledata &&
                                profiledata.acceptededucationtask.length > 0 &&
                                profiledata.acceptedjobtask.length > 0
                                  ? parseInt(
                                      profiledata.acceptededucationtask.length
                                    ) +
                                    parseInt(profiledata.acceptedjobtask.length)
                                  : "0"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Reports
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <div className="row mt-3 no-gutters align-items-center">
                              <div className="col">
                                <div className=" mb-0 text-success ">open</div>
                                <div className="h6 font-weight-bold">29</div>
                              </div>
                              <div className="col">
                                <div className=" mb-0 text-danger">close</div>
                                <div className="h6 font-weight-bold">80</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Earnings
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {moneyDetails.totalEarning}/-
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Spent Amount Example -->*/}

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                            spent amount
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {moneyDetails.spend}/-
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Balance amount Card Example -->*/}

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Balance
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {moneyDetails.totalBalance}/-
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- net amount Card Example -->*/}
                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1"></div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Job posted Card Example -->*/}

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div
                      className="card-body"
                      onClick={() => navigate("/listofpostjobs")}
                    >
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Job Posted
                          </div>
                          {console.log(">>>>jobs",jobs)}
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {jobs?.length}
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Post Feeds
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {postfeeds&&postfeeds.length > 0 ? postfeeds.length : "0"}
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1"></div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1"></div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            no of shares
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            1500
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            no of likes
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            1500
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            no of comments
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            1500
                          </div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-3 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1"></div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                        </div>
                        <div className="col-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        )}
      </Box>
    </div>
  );
}
export default Dashboardadmin;
