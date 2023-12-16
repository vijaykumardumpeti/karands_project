import React from 'react'
import Sidebar from './Sidebar'
import Details from './Details'

export default function Searchpage() {

  return (
      <div className="row flex-nowrap" style={{ width: "100%"}}>
    <Sidebar userPage='dashboard' />
    <div className="col container" style={{ maxWidth: "100%" }}>
      <Details />

      <hr  />

we are working on it ...................

      </div>

</div>
  )
}
