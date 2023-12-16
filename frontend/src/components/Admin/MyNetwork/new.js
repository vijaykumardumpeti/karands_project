import React, { useState } from "react";
import Connections from "./Connections";
import Pending from "./Pending";
import Request from "./Request";
import Blocked from "./Blocked";
import Page from "./Page";
import Group from "./Group";
import { Box } from "@mui/material";
import AdminDashboard from "../AdminDashboard";
import Suggestion from "./Suggestion";

export default function MyNetwork() {
  const [mainFlag, setMainFlag] = useState(true);
  
  function refreshConnections() {
    setMainFlag((prevFlag) => !prevFlag);
    console.log('Connections refreshed!');
  }

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
          <div className="d-flex text-start ms-2">
            <h2>My Network</h2>
          </div>
          <div className=" post-feeds">
            <div>
              <div className="container-xl container-lg">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col col-lg-12 mb-4 mb-lg-0">
                        <nav>
                          <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button
                              className="nav-link active"
                              id="nav-connection-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-connection"
                              type="button"
                              role="tab"
                              aria-controls="nav-connection"
                              aria-selected="true"
                              onClick={refreshConnections}
                            >
                              Connections
                            </button>
                            {/* Add other buttons for 'Pending', 'Requests', etc. */}
                            <button
                          className="nav-link"
                          id="nav-pending-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-pending"
                          type="button"
                          role="tab"
                          aria-controls="nav-pending"
                          aria-selected="false"
                        >
                          Pending
                        </button>
                        <button
                          className="nav-link"
                          id="nav-request-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-request"
                          type="button"
                          role="tab"
                          aria-controls="nav-request"
                          aria-selected="false"
                        >
                          Requests
                        </button>
                        <button
                          className="nav-link"
                          id="nav-suggestion-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-suggestion"
                          type="button"
                          role="tab"
                          aria-controls="nav-suggestion"
                          aria-selected="false"
                        >
                          Suggestion
                        </button>
                        <button
                          className="nav-link"
                          id="nav-blocked-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-blocked"
                          type="button"
                          role="tab"
                          aria-controls="nav-blocked"
                          aria-selected="false"
                        >
                          Blocked
                        </button>
                        <button
                          className="nav-link"
                          id="nav-groups-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-groups"
                          type="button"
                          role="tab"
                          aria-controls="nav-groups"
                          aria-selected="false"
                        >
                          Groups
                        </button>
                        <button
                          className="nav-link"
                          id="nav-page-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-page"
                          type="button"
                          role="tab"
                          aria-controls="nav-page"
                          aria-selected="false"
                        >
                          Page
                        </button>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent" key={mainFlag}>
                          <div
                            className="tab-pane fade show active"
                            id="nav-connection"
                            role="tabpanel"
                            aria-labelledby="nav-connection-tab"
                          >
                            <Connections />
                          </div>
                          {/* Add other tab panes for 'Pending', 'Requests', etc. */}
                          <div
                        className="tab-pane fade"
                        id="nav-pending"
                        role="tabpanel"
                        aria-labelledby="nav-pending-tab"
                      >
                        <Pending />
                      </div>

                      <div
                        className="tab-pane fade show "
                        id="nav-request"
                        role="tabpanel"
                        aria-labelledby="nav-request-tab"
                      >
                        <Request />
                      </div>
                      <div
                        className="tab-pane fade show "
                        id="nav-blocked"
                        role="tabpanel"
                        aria-labelledby="nav-blocked-tab"
                      >
                        <Blocked />
                      </div>
                      <div
                        className="tab-pane fade show "
                        id="nav-groups"
                        role="tabpanel"
                        aria-labelledby="nav-groups-tab"
                      >
                       {/* <YourGroup/>*/}
                       <Group/>
                      </div>
                      <div
                        className="tab-pane fade show "
                        id="nav-page"
                        role="tabpanel"
                        aria-labelledby="nav-page-tab"
                      >
                        <Page />
                      </div>
                      <div
                        className="tab-pane fade show "
                        id="nav-suggestion"
                        role="tabpanel"
                        aria-labelledby="nav-suggestion-tab"
                      >
                        <Suggestion />
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
