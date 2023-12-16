import React from 'react'
import Sidebar from './Sidebar'
import Details from './Details'
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Settings() {

  const label = { inputProps: { 'aria-label': 'Switch demo' } };








  return (
    <div>

      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <Sidebar userPage='dashboard' />
        <div className="col container" style={{ maxWidth: "100%" }}>
          <Details />

          <hr />

          <div className='row'>
            <div className='col-10'>

              <div className='postcardview'>
                <div className='row'>
                  <div className='col-6'>
                    <p>On Request Settings</p>

                  </div>
                  <div className='col-6'><Switch {...label} /></div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <p>Connection Request</p>

                  </div>
                  <div className='col-6'><Switch {...label} /></div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <p>Display Profile picture</p>

                  </div>
                  <div className='col-6'><Switch {...label} /></div>
                </div>

                <div className='row'>
                  <div className='col-6'>
                    <p>Notification Sound </p>

                  </div>
                  <div className='col-6'><Switch {...label} /></div>
                </div>
              </div>

              <div className='postcardview'>
                <div className="row">
                  <div className='col-4'>
                    <FormLabel id="phoneDisplay-buttons-group-label" className='d-flex text-start'>Display Phone number to</FormLabel>
                  </div>
                  <div className='col-8' style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="phoneDisplay-buttons-group-label"
                        name="phoneDisplay"
                      >
                        <FormControlLabel value="connections" control={<Radio />} label="connections" />
                        <FormControlLabel value="public" control={<Radio />} label="public" />
                        <FormControlLabel value="onrequest" control={<Radio />} label="on request" />
                        <FormControlLabel value="none" control={<Radio />} label="none" />

                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="row">
                  <div className='col-4'>
                    <FormLabel id="mailDisplay-buttons-group-label" className='d-flex text-start'>Display Mail to</FormLabel>
                  </div>
                  <div className='col-8' style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="mailDisplay-buttons-group-label"
                        name="mailDisplay"
                      >
                        <FormControlLabel value="connections" control={<Radio />} label="connections" />
                        <FormControlLabel value="public" control={<Radio />} label="public" />
                        <FormControlLabel value="onrequest" control={<Radio />} label="on request" />
                        <FormControlLabel value="none" control={<Radio />} label="none" />

                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className='postcardview'>
              <div className="row">
              <div className='col-6'>
                <FormLabel id="picDisplay-buttons-group-label" className='d-flex text-start'>Display Profile Picture to</FormLabel>
              </div>
              <div className='col-6' style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="picDisplay-buttons-group-label"
                    name="picDisplay"
                  >
                    <FormControlLabel value="connections" control={<Radio />} label="connections" />
                    <FormControlLabel value="public" control={<Radio />} label="public" />
                    <FormControlLabel value="none" control={<Radio />} label="none" />

                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="row">
              <div className='col-6'>
                <FormLabel id="messageDisplay-buttons-group-label" className='d-flex text-start'>Messages From</FormLabel>
              </div>
              <div className='col-6' style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="messageDisplay-buttons-group-label"
                    name="messageDisplay"
                  >
                    <FormControlLabel value="connections" control={<Radio />} label="connections" />
                    <FormControlLabel value="public" control={<Radio />} label="public" />
                    <FormControlLabel value="none" control={<Radio />} label="none" />

                  </RadioGroup>
                </FormControl>
              </div>
            </div>
           
              
              </div>
              <div className='postcardview'>
              <div className="row">
              <div className='col-6'>
                <FormLabel id="settingisDisplay-buttons-group-label" className='d-flex text-start'>Default Settings</FormLabel>
              </div>
              <div className='col-6' style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="settingisDisplay-buttons-group-label"
                    name="settingisDisplay"
                  >
                    <FormControlLabel value="onrequest" control={<Radio />} label="On Request" />
                    <FormControlLabel value="none" control={<Radio />} label="none" />
  
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
              <div className="row">
              <div className='col-6'>
                <FormLabel id="documentview-buttons-group-label" className='d-flex text-start'>Documents View to</FormLabel>
              </div>
              <div className='col-6' style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="documentview-buttons-group-label"
                    name="documentview"
                  >
                    <FormControlLabel value="onrequest" control={<Radio />} label="on Request" />
                    <FormControlLabel value="none" control={<Radio />} label="none" />


                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="row">
            <div className='col-6'>
              <FormLabel id="dobDispay-buttons-group-label" className='d-flex text-start'>Display Date of Birth to </FormLabel>
            </div>
            <div className='col-6' style={{ display: "flex", justifyContent: "space-evenly" }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="dobDispay-buttons-group-label"
                  name="dobDispay"
                >
                  <FormControlLabel value="connections" control={<Radio />} label="connections" />
                  <FormControlLabel value="public" control={<Radio />} label="public" />

                </RadioGroup>
              </FormControl>
            </div>
          </div>
              </div>
              
              <div className='postcardview'>
              <div>
              <FormLabel id="documentTime-buttons-group-label" className='d-flex text-start'>Documents View request Time</FormLabel>
            </div>
              <div className="row">
              
              <div className='col-12' style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="documentTime-buttons-group-label"
                    name="documentTime"
                  >
                    <FormControlLabel value="15min" control={<Radio />} label="15 Min" />
                    <FormControlLabel value="30min" control={<Radio />} label="30min" />
                    <FormControlLabel value="1hour" control={<Radio />} label="1 Hour" />
                    <FormControlLabel value="2hour" control={<Radio />} label="2 Hour" />
                    <FormControlLabel value="12hour" control={<Radio />} label="12 Hour" />
                    <FormControlLabel value="1day" control={<Radio />} label="1 Day" />
  
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
              </div>
              <div className='postcardview'>
              <h5 className='mb-2'>Concent Given Verify Documents</h5>
              <div className='row'>
              <div className='col-6'>
              <p>User Terms and Conditions</p>
              </div>
              <div className='col-6'>
              <b>Verified</b>
              </div>
              </div>
              <div className='row'>
              <div className='col-6'>
              <p>Privacy Policy </p>
              </div>
              <div className='col-6'>
              <b>Verified</b>
              </div>
              </div>
              <div className='row'>
              <div className='col-6'>
              <p>Data Privacy Policy</p>
              </div>
              <div className='col-6'>
              <b>Verified</b>
              </div>
              </div>
              <div className='row'>
              <div className='col-6'>
              <p>Payment Poilcy</p>
              </div>
              <div className='col-6'>
              <b>Verified</b>
              </div>
              </div>
              <div className='row'>
              <div className='col-6'>
              <p>Usage Policy</p>
              </div>
              <div className='col-6'>
              <b>Verified</b>
              </div>
              </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>
  )
}
