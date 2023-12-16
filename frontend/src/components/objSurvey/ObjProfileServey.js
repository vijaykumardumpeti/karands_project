import React from "react";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
  } from "mdb-react-ui-kit";
import Header from "./Header";

export default function ObjProfileServey() {

   

    
  
  return (
    <div>
     <Header/>
      <MDBContainer
          className="p-3 my-5 d-flex flex-column"
          style={{ width: "400px" }}
        >
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          > 
            <MDBTabsItem>
              <MDBTabsLink className="byn btn-primary">
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane>
              <div className="text-center mb-3">
                {/* <p>Sign in with:</p>*/}

                <div
                  className="d-flex justify-content-between"
                  style={{ width: "40%" }}
                >
                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="m-1"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="github" size="sm" />
                  </MDBBtn>
                </div>

                {/*<p className="text-center mt-3">or:</p>*/}
              </div>

              <MDBInput
                wrapperClass="mb-4"
                placeholder="Emali Id"
                id="form1"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="form2"
                type="password"
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="/signup">Forgot password?</a>
              </div>

              <button className="mb-4 w-100 btn btn-primary">Sign in</button>
              <p className="text-center">
                Not a member? <a href="/signup">Register</a>
              </p>
            </MDBTabsPane>

            <MDBTabsPane>
              <div className="text-center mb-3">
                {/*<p>Sign un with:</p>*/}

                {/* <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
           </div>*/}

                {/*<p className="text-center mt-3">or:</p>*/}
              </div>

              <MDBInput
                wrapperClass="mb-4"
                placeholder="Your Name"
                id="form1"
                type="text"
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Email id"
                id="form1"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Number"
                id="form1"
                type="tel"
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="location"
                id="form1"
                type="text"
              />

              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  id="flexCheckDefault"
                  label="I have read and agree to the terms"
                />
              </div>

              <button className="mb-4 w-100 btn btn-primary">
                Sign up
              </button>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
    </div>
  );
}
