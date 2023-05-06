import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/requests";

const addRequest = (listingId, comment) => {

    return axios.post(API_URL,{
          listingId: listingId,
          comment: comment
  },  { headers: authHeader() })
  };

  const requestService = {
    addRequest
  };
  
  export default requestService;

