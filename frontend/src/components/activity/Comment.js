import React from 'react'

export default function Comment() {
  return (
    <div>
    <a className='card bg-light mb-2'>
   <div className='d-flex ms-2'>
   <b>Dev singh</b>
   <p className='ms-2'>commented on a post <i>3 months ago</i></p>
   </div>
   <div className='d-flex ms-2'>
   <a className='text-decoration-none' href='/' >some comment</a>
   </div>
    </a>
   
    <a className='card bg-light mb-2'>
   <div className='d-flex ms-2'>
   <b>Dev singh</b>   
   <p className='ms-2'>commented on a post <i>1 months ago</i></p>
   </div>
   <div className='d-flex ms-2'>
   <a className='text-decoration-none' href='/' >very Nice</a>
   </div>
    </a>
    
    <a className='card bg-light mb-2'>
    <div className='d-flex ms-2'>
    <b>Dev singh</b>
    <p className='ms-2'>commented on a post <i>15 days ago</i></p>
    </div>
    <div className='d-flex ms-2'>
    <a className='text-decoration-none' href='/' >very Nice</a>
    </div>
     </a>

    </div>
  )
}
