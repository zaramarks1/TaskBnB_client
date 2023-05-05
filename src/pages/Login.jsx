import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";
import Title from "./Title";
import '../css/auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await authService.login(email, password).then(
        () => {
          navigate("/");
         window.location.reload();
        },
        (error) => {
          console.log(error);
          setMessage(error.response.data.message  || error.message)
        }
      );
    } catch (error) {
      setMessage(error.response.data.message  || error.message)
    }
  };

  return (
    <>
    
    {/* <Title title = "Login"/> */}
   
    <div className="authDiv">
      <h2>Welcome back! </h2>
      <form onSubmit={handleLogin}>
        <div className="txt_field">
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <span></span>
         
        </div>
      
        <div className="txt_field">
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span></span>
       
        </div>
        <button type="submit">Log in</button> 
        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
      </form>
     
    </div>
  

    </>
  );
};

export default Login;