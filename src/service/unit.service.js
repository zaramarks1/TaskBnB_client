import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/units";

const getAllUnits = () => {
  return axios.get(API_URL);
};

const addUnit = (capacity,address,unitType) => {

    console.log(capacity);
    console.log(address);
  return axios.post(API_URL,{
        capacity: capacity,
        address: address,
        unitType: unitType,
        ownerId: '1'

},  { headers: authHeader() })
};



const unitService = {
  getAllUnits,
  addUnit,
};

export default unitService;