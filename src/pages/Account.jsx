import Title from "./Title";
import { useState, useEffect } from "react";
import authService from "../service/auth.service";

const Account = () =>{

    const [currentUser, setCurrentUser] = useState(undefined);
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        const user = authService.getCurrentUser();

        // console.log(user);
    
        if (user) {
          setCurrentUser(user);
          setSuccess(true);
        }
        }, []);

        console.log(currentUser);

    return(
        <>
    
        <Title title = "My Account"/>
        <div className='divDisplay'>

            {currentUser &&
            <>

            <h1>Email : {currentUser.email}</h1>
            <h1> Name : {currentUser.firstname} {currentUser.lastname}</h1>

            {currentUser.role === 'ADMIN' &&
                <h1>You are an admin user!</h1>
            }
           
            
            </>
            
                
            }
        </div>
        </>
     
    );
    
};

export default Account;