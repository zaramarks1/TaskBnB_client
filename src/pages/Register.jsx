import React, { useState } from "react";
import authService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

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
          console.log("error");
          setMessage(error.response.data.message);
        }
      );
    } catch (err) {
      console.log("ble");
      setMessage(err.message);
    }
  };

  return (
    <div>
       <Title title = "Sign Up"/>
      <form onSubmit={handleSignup}>
       
        <input
          type="text"
          placeholder="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
      <h3 className="error">{message ? <p>{message}</p> : null}</h3>
    </div>
  );
};

export default Register;