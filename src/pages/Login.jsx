import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";
import Title from "./Title";

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
          setMessage(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    
    <Title title = "Login"/>
   
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Log in</button>
      </form>
      <h3 className="error">{message ? <p>{message}</p> : null}</h3>
    </div>

    </>
  );
};

export default Login;