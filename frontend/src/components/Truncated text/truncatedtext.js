import React, { useState } from 'react';

const TruncatedText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded( !isExpanded);
  };

  const truncatedText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div >
   
    <p style={{textAlign:"left"
 
  }}>{truncatedText} {text.length > maxLength && (

<span onClick={toggleExpanded} style={{color:"blue",cursor:"pointer"}}>

{isExpanded ? '' : '...see more'}
{!isExpanded ? '' : '...see Less'}

</span>

)}</p>
 
      

   
      
      
   
      
    </div>
  );
};

export default TruncatedText;
