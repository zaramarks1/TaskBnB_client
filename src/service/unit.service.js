import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/units";

const getAllUnits = () => {
  return axios.get(API_URL);
};

const getUnitById = (id) =>{

  return axios.get(API_URL +'/' +id, {headers: authHeader()});
};

const getMyUnits = () => {
  return axios.get(API_URL + '/my', {headers: authHeader()});
};

const getAllListingsByUnit = (id) => {
  return axios.get(API_URL + '/' + id + '/listings', {headers: authHeader()});
};

const addUnit = (unit) => {

  return axios.post(API_URL,{
        capacity: unit.capacity,
        address: unit.address,
        unitType: unit.unitType
},  { headers: authHeader() })
};

const updateUnit = (id, capacity, address, unitType) => {

  return axios.put(API_URL + '/' + id ,{
    capacity: capacity,
    address: address,
    unitType: unitType
},  { headers: authHeader() })

};

const deleteUnit = (id) => {
  return axios.delete(API_URL + '/' + id, { headers: authHeader() })
};



const unitService = {
  getAllUnits,
  getAllListingsByUnit,
  addUnit,
  getMyUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
};

export default unitService;