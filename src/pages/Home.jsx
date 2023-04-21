import Title from "./Title";
import { useState, useEffect } from "react";
import authService from "../service/auth.service";

const Home = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    }, []);

    return (
      <>
     
      <Title title="Welcome to TaskBnB" />

      { currentUser ? (
        <h2>You are logged in! {currentUser.email}
        </h2>
      ) : (
        <h1>You are not logged in </h1>
      )}

      </>
    );
  };
  
  export default Home;