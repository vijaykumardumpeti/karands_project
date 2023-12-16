import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import Details from '../Dashboard/Details'


export default function FavouritePosts() {
    return (
        <div className="row flex-nowrap" style={{ width: "100%", height: "100%" }}>
            <Sidebar userPage='favouritepage' />
            <div className="col container" style={{ maxWidth: "80%" }}>
                <Details />
                <hr />
                <div className='card mt-2'>
                <h2>hello !!</h2>
                </div>
            </div>
        </div>
    )
}
