import React from 'react'
import MyTaskSideBar from './MyTaskSideBar';
import MyTaskDetails from './MyTaskDetails';

export default function Earning() {
  return (
    <div className="" >
      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <MyTaskSideBar userPage="earning" />
        <div className="col container" style={{ maxWidth: "80%" }}>
          <MyTaskDetails />

          <hr />
          <div className="container-xl container-lg mt-6 mb-7"
            style={{ backgroundColor: "#F0F0F0", height: "79vh", overflow: "scroll", marginTop: "20px", overflowX: "hidden" }}
          >
          </div>
        </div>
      </div>
    </div>
  )
}
