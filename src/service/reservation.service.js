import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/reservations";

const getMyReservations = () => {
    return axios.get(API_URL + '/my', {headers: authHeader()});
  };

  const reservationService ={
    getMyReservations
  }

  export default reservationService;