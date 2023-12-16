import React from 'react'

import MyTaskDetails from './MyTaskDetails';
import MyTaskSideBar from './MyTaskSideBar';
export default function CompletedTask() {
  return (
    <div className="" >
      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="completedtask" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />

          <hr />
          <div className="container-xl container-lg mt-6 mb-7"
            style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden" }}
          >


            <div>
              Completed Task

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
