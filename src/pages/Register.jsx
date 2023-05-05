import React, { useState } from "react";
import authService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import '../css/auth.css';

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();
    setMessage("");
    try {
      await authService.register(firstname, lastname, email, password).then(
        (response) => {
          // check for token and user already exists with 200
          console.log("Sign up successfully", response);
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error.message);
          setMessage(error.response.data.message || error.message);
        }
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
    <div className="authDiv">
       <h2>Sign Up!</h2>
      <form onSubmit={handleSignup}>
      <div className="txt_field">
        <input
          type="text"
          placeholder="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        </div>
        <div className="txt_field">
        {/* <label>Last Name</label> */}
        <input
          type="text"
          placeholder="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
         </div>
        <div className="txt_field">
         {/* <label>Email</label> */}
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         </div>
        <div className="txt_field">
        {/* <label>Password</label> */}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         </div>
        <button type="submit">Sign up</button>
        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
      </form>
     
    </div>
  
     </>
  );
};

export default Register;