import React, { useEffect, useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import axios from 'axios'

import '../../components/Dashboard/popupWithCards.css'

const PopupWithCards = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [cardsData, setCardsData] = useState({})
  // const [users, setUsers] = useState([])

  // const [referredUserIds, setReferredUserId] = useState([])

//   // Sample card data
  const cards = [
    { name: 'vijaykumar', location: 'Hyderabad', designation: 'Full stack MERN developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },
    { name: 'sohel', location: 'Hyderabad', designation: 'SQL developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },

    { name: 'rajkumar', location: 'Hyderabad', designation: 'software developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },

    { name: 'ramesh', location: 'Hyderabad', designation: 'software developer', image: 'https://res.cloudinary.com/dymmp1vtz/image/upload/v1702892449/imageProfile_umcjom.png' },
    
  ];
//'http://localhost:8080/karands/users/refferalCode/?refferalCodeTaken=91MSWko6RL'
// const refferalCode = '91MSWko6RL'
// setReferredUserId(res.data.details.RefferalCount)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${localStorage.getItem("id")}`)
        .then(res => 
          setCardsData(res.data)
          
        )
        .catch(err => console.log(err))
}, [])
console.log('cardsData', cardsData)

console.log('Referralcount', cardsData.details)
// console.log(referredUserIds)

const {details} = cardsData
console.log(details)

// console.log(users)



// const fetchUsers = async (userIds)=> {
//            // Fetch user details for each userid in the calllogs array
//           const promises = userIds.map(async (userid) => {
//             const response = await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/karands/users/${userid}`);

//             return response.data;

//         });

//         // Wait for all promises to resolve and set the user details in state

//         const userDetails = await Promise.all(promises);

//         console.log("userDetails", userDetails)

//         setUsers(userDetails);
// }


// useEffect(()=>{
//   fetchUsers(cardsData.details)
// }, [])







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
          {cards.length >=1 && cards.map((card, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
              <Card.Text><img className='image-profile' alt="profile" src={card.image} /></Card.Text>
                <Card.Title>{card.name}</Card.Title>
                <Card.Text>{card.location}</Card.Text>
                <Card.Text>{card.designation}</Card.Text>
              </Card.Body>
            </Card>
          ))}
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
