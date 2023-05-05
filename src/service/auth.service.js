import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:8080/api/v1/auth";

const register = (firstname, lastname, email, password) => {
  return axios
    .post(API_URL + "/register", {
      firstname : firstname, 
      lastname: lastname,
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/authenticate", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      }
      console.log(response)
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  if(localStorage.getItem("token")){
    return jwtDecode(localStorage.getItem("token"));
  };
  
  }
  

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;