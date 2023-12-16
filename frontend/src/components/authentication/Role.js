import React from "react";


import { useNavigate } from "react-router-dom";
import Header from "../Cards/Header";
import axios from "axios";
import Card from "../Cards/Card";

export default function Role() {




  async function iu(roles) {
    console.log(roles);

    console.log(localStorage.getItem("id"), localStorage.getItem("email"), roles, localStorage.getItem("email"), process.env.REACT_APP_IP_ADDRESS)

    await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/role/${localStorage.getItem("id")}`, {
      role: roles,
      email: localStorage.getItem("email")

    })
      .then((res) => {
        if (roles === 'iu') {

          navigate("/iu");

        }
        if (roles === 'ichp')  {
          navigate("/ichp");

        }
        if(roles=="consultant"){


          
          navigate("/consultant")



        }

      })
      .catch((err) => console.log(err));
      
  }

  const navigate = useNavigate();



  return (
    <div>
      <Header />
      <div
        className="container-fluid"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "auto",
          marginTop: "25px",
        }}
      >
        <p className="p-2" style={{ width: "60%", backgroundColor: "rgb(3, 104, 104)", color: "white", border: "none" }}>
          {" "}
          <b style={{ fontSize: "22px" }}>Register as IU or ICHP or BCC - Select Any One Role</b>

        </p>
        <div
          style={{
            display: "flex",
            width: "60%",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Card
            title={"Individual User"}
            buttonText={"Select"}
            buttonOnClick={iu}
            role={"iu"}
          />

          <Card
            title={"ICPH User"}
            buttonText={"Select"}
            buttonOnClick={iu}
            role={"ichp"}

          />

           {/* <Card
            title={"BCC"}
            buttonText={"Select"}
            buttonOnClick={iu}
            role={"consultant"}

          /> */}
          
        </div>
      </div>
    </div>
  );
}
