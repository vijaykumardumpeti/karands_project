import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout({back}) {
  
    const navigate=useNavigate()

    
  return (
    <div style={{
        margin:"40px",
        width:"100%",
       
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          color:"gray",
          width:"450px"
          
        }}
        className="card"
      >
        <div
          style={{
            margin: "10px 0px",
          }}
          className="card-content"
        >
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
          Do you want to Logout?
          </h2>
          
  
          <div style={{
            display:"flex",alignItems:"center",justifyContent:"space-around",marginTop:"20px"
          }}>
          <button
          onClick={()=>{
            localStorage.clear();
            navigate(back)
          }}
            style={{
              backgroundColor:"#17a2b8",color:"white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 12px",
              fontSize: "14px",
              width: "40%",
              cursor: "pointer",
            }}
            
          >
            Logout
          </button>
          <button
            style={{
              backgroundColor:"#17a2b8",color:"white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 12px",
              fontSize: "14px",
              width: "40%",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Stay on The Page
          </button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Logout
