import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/units";

const getAllUnits = () => {
  return axios.get(API_URL);
};

const getMyUnits = () => {
  return axios.get(API_URL + '/my', {headers: authHeader()});
};

const addUnit = (capacity,address,unitType) => {

  return axios.post(API_URL,{
        capacity: capacity,
        address: address,
        unitType: unitType
},  { headers: authHeader() })
};



const unitService = {
  getAllUnits,
  addUnit,
  getMyUnits,
};

export default unitService;