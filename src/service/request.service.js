import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/requests";

const addRequest = (listingId, comment) => {

    return axios.post(API_URL,{
          listingId: listingId,
          comment: comment
  },  { headers: authHeader() })
  };

  const getMyRequests = () => {
    return axios.get(API_URL + '/my', {headers: authHeader()});
  };

  const denyRequest = (id) => {
    return axios.put(API_URL + "/" + id + "/deny",{}, {headers: authHeader()});
  };

  const acceptRequest = (id) => {
    return axios.put(API_URL + "/" + id + "/accept",{}, {headers: authHeader()});
  };

  const deleteRequest = (id) => {
    return axios.delete(API_URL + "/" + id , {headers: authHeader()});
  };

  const requestService = {
    addRequest,
    getMyRequests,
    denyRequest,
    deleteRequest,
    acceptRequest
  };
  
  export default requestService;

