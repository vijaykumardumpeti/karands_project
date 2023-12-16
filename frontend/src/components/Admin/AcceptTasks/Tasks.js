import React from 'react';
import Bagver from './Bagver';
import AffAdds from './AffAdds';
import DriveInSupport from './DriveInSupport';
import AdminDashboard from '../AdminDashboard';
import { Box } from '@mui/material';

export default function Tasks() {
  return (
    <div>
       <Box sx={{ display: 'flex' }}>
        <AdminDashboard />
        <Box component="main" sx={{ marginTop: 10 }}>
      {/* <div className='d-flex text-start ms-2'><h2>Accepted</h2></div> */}
      <div className=" post-feeds">

        <div className="container-xl container-lg">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col col-lg-12 mb-4 mb-lg-0">
                  <nav>
                    <div
                      className="nav nav-tabs"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-bgv"
                        type="button"
                        role="tab"
                        aria-controls="nav-bgv"
                        aria-selected="true"
                      >
                        Background verification
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-dis"
                        type="button"
                        role="tab"
                        aria-controls="nav-dis"
                        aria-selected="false"
                      >
                        Drive in Support
                      </button>
                      <button
                        className="nav-link"
                        id="nav-refb-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-refb"
                        type="button"
                        role="tab"
                        aria-controls="nav-refb"
                        aria-selected="false"
                      >
                        Refferal bonus
                      </button>
                      <button
                        className="nav-link"
                        id="nav-aff-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-aff"
                        type="button"
                        role="tab"
                        aria-controls="nav-aff"
                        aria-selected="false"
                      >
                        Affiliate adds
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-bgv"
                      role="tabpanel"
                      aria-labelledby="nav-bgv-tab"
                    >
                      <Bagver />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-dis"
                      role="tabpanel"
                      aria-labelledby="nav-dis-tab"
                    >
                      <DriveInSupport />
                    </div>

                    <div
                      className="tab-pane fade show "
                      id="nav-refb"
                      role="tabpanel"
                      aria-labelledby="nav-refb-tab"
                    >
                      <h1>RB</h1>
                    </div>
                    <div
                      className="tab-pane fade show "
                      id="nav-aff"
                      role="tabpanel"
                      aria-labelledby="nav-aff-tab"
                    >
                      <AffAdds />
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

  )
}
