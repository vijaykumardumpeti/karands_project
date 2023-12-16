import React, { useEffect,useState } from 'react'
import LoaderModal from '../spinner/spinnerStyle';
import { useNavigate , Navigate} from 'react-router-dom';

function Protect({children}) {
    const [isLoading, setIsLoading] = useState(false);
const navigate=useNavigate()
    let token = localStorage.getItem("token");
    if (token === null) {
        token = "";
    }
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            
        }, 500);
    }, [navigate])
    return (
        <div style={{backgroundColor:"transparent"}}>
            {
                isLoading ?
                <LoaderModal isOpen={isLoading} />

                :
<>
{token.length ? children : <Navigate to="/" />}

</>
}
        </div>
    )
}

export default Protect
