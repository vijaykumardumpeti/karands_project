import React, { useEffect, useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import axios from 'axios'

import '../../components/Dashboard/popupWithCards.css'

import { useNavigate } from "react-router-dom";


const PopupWithCards = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users, setUsers] = useState([])

  const [profileClickedId, setProfileClickedId] = useState('')

  const [reffarelCount, setRefferalCount] = useState([])

  const navigate = useNavigate()

//   // Sample card data
  const cards = [
    { name: 'vijaykumar', location: 'Hyderabad', designation: 'Full stack MERN developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },
    { name: 'sohel', location: 'Hyderabad', designation: 'SQL developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },

    { name: 'rajkumar', location: 'Hyderabad', designation: 'software developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },

    { name: 'ramesh', location: 'Hyderabad', designation: 'software developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },
    
  ];
// const refferalCode = '91MSWko6RL'

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem("id")}`)
        .then(res => 
          
          setRefferalCount(res.data.details.RefferalCount)
        )
        .catch(err => console.log(err))
}, [])
console.log('reffarelCount', reffarelCount)


const fetchUsers = async (userIds) => {
  // Check if userIds is an array with a length greater than 0
  const promises = (Array.isArray(userIds) && userIds.length > 0)
    ? userIds.map(async (userid) => {
        const response = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${userid}`);
        return response.data;
      })
    : [];

  // Wait for all promises to resolve and set the user details in state
  const userDetails = await Promise.all(promises);

  setUsers(userDetails);

  console.log("userDetails", userDetails);

};

console.log('referred users', users)

// const fetchUsers = async (userIds) => {
//   if (!Array.isArray(userIds) || userIds.length === 0) {
//     console.error('Invalid userIds:', userIds);
//     return;
//   }

//   const promises = userIds.map(async (userid) => {
//     const response = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${userid}`);
//     return response.data;
//   });

//   const userDetails = await Promise.all(promises);
//   setUsers(userDetails);
// };



// useEffect(()=>{
//   if(cardsData.details && (cardsData.details?.RefferalCount !== undefined)){
//     fetchUsers(cardsData.details?.RefferalCount)
//   }
// }, [])


useEffect(()=>{
  if(reffarelCount.length !== 0){
    fetchUsers(reffarelCount)
  }
}, [reffarelCount])




//when profile is clicked then fetch the details of that particular user details by _id
//for debugging purpos only(to console and see the details of referred user when clicked)
useEffect(()=>{
  if(profileClickedId !== ''){
    axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${profileClickedId}`)
    .then(res => 
      console.log(res.data)
      
    )
    .catch(err => console.log(err))
  }
}, [])

const handleSuggestionClick = (suggestion) => {
  setProfileClickedId(suggestion._id)
  console.log("clicked form handleSuggestionClick");

  //   return
console.log(suggestion._id)
console.log(localStorage.getItem("id"))
  if (suggestion.name) {
    navigate(`/ViewProfileForReferrals/${suggestion._id}`);
    //localhost:3000/ViewProfileForReferrals/657ed012e7212ccf78743ac3
  }
};


return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Referred Profiles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users.length >=1 ? users.map((card, index) => (
            <Card onClick={(e)=> handleSuggestionClick(card.details)} key={index} className="mb-3">
              <Card.Body>
              <Card.Text><img className='image-profile' alt="profile" src='https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' /></Card.Text>
                <Card.Title>{card.details.name}</Card.Title>
                <Card.Text>{card.details.preferredLocation}</Card.Text>
                <Card.Text>{card.details.preferredDesignation}</Card.Text>
              </Card.Body>
            </Card>
          )): <span>No referrels by current/ichp user (or) weit for reload because its takes time to reload the users</span>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupWithCards;


//========================================================================================================================================================
