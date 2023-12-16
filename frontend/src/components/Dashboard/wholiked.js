import { Avatar } from '@mui/material';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export default function Wholikedpost(props) {

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "55%",
        padding: "2%",
        height: "70%",
        backgroundColor: "white",
        border: "1px solid #ccc",

        textAlign: "justify",
      }}
    >
      <div style={{ overflow: "scroll", height: "100%", backgroundColor: "white", overflowX: "hidden" }}>
        <div >
          <h1 style={{ textAlign: "center" }}>liked people</h1>
          <button style={{ position: "absolute", right: "5px", top: "5px" }} type="button" onClick={() => props.popUpHandle()} class="btn-close" aria-label="Close"></button>
        </div>


        <div >

          {
            props.data ?
              props.data.map((Data) => {

                return (
                  <Fragment>
                    <div style={{ display: "flex" }}>
                      <div>
                        <Avatar />
                      </div>
                      <div style={{ fontSize: "18px" }}> <Link to={Data.userId == localStorage.getItem("id") ? `/viewprofile` : `/viewprofile/${Data.userId}`} style={{ textDecoration: "none" }}>{Data.name} </Link>
                        <p>{Data.Designation ? Data.Designation : ""}</p></div>
                    </div>
                    <hr></hr></Fragment>

                )


              })





              : "no likes"
          }





        </div>

      </div>
    </div>
  );



}
