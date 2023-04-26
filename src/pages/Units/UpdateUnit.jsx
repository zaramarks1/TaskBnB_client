import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';


import Title from '../Title';

import unitService from '../../service/unit.service';

const UpdateUnit = () =>{

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const unit = location.state?.unit;

    const [capacity, setCapacity] = useState(unit?.capacity);
    const [address, setAddress] = useState(unit?.address);
    const [unitType, setUnitType] = useState(unit?.unitType);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.updateUnit(params.id, capacity, address, unitType).then(
        (response) => {
          setSuccess(true);
          navigate('/view-a-unit/'+params.id); 
        },
        (error) => {
          setMessage(error.response.data.message );
          console.log("error");
        });
      }catch (error){
        console.log(error);
      }
    };

  
    return (
     <>
     <Title title="Update a Unit" />
      <div className="divDisplay">
        <form onSubmit={handleSubmit}>
          <label className='inputLabel'>Capacity </label>
          <input
            type="number"
            value={capacity}
            placeholder="Capacity"
            onChange={(e) => setCapacity(e.target.value)}
          />
          <label className='inputLabel'>Address</label>
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className='inputLabel'>Unit Type</label>
          <input
            type="text"
            value={unitType}
            placeholder="UnitType"
            onChange={(e) => setUnitType(e.target.value)}
          />
  
        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
        <h3 className="success">{success ? <p>Unit was updated ! </p> : null}</h3>
  
        <button type="submit">Update</button>
        </form>
  
      </div>

    </>
    );
  }
  
  export default UpdateUnit;
  
  
  
  