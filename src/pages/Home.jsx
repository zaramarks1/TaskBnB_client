import Title from "./Title";
import { useState, useEffect } from "react";
import authService from "../service/auth.service";

const Home = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user)


    if (user) {
      setCurrentUser(user);
    }
    }, []);

    return (
      <>
     
      <Title title="Welcome to TaskBnB" />

      <button onClick={() => window.open('/javadoc/index.html', '_blank')}>
        View Javadoc
      </button>

      <div>

      { currentUser ? (
        <>

        <h2>You are logged in! </h2>

        {currentUser.role === 'ADMIN' &&
        <h1>You are an admin user!</h1>
        }
        
        </>
      

      ) : (
        <h1>You are not logged in!</h1>
      )}

      <img src="../../logo1.png"></img>

      </div>

    
      </>
    );
  };
  
  export default Home;