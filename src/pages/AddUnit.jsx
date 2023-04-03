import React from 'react';
import '../css/pages.css';
import {useState, useEffect} from 'react';
import Title from './Title';

import unitService from '../service/unit.service';

const AddUnit = () =>{

    const [capacity, setCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [unitType, setUnitType] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.addUnit(capacity, address, unitType).then(
        (response) => {
          setCapacity("");
          setAddress("");
          setUnitType("");
          setSuccess(true);
        },
        (error) => {
          setMessage(error.response.data.message);
          console.log("error");
        });
      }catch (error){
        console.log(error);
      }
    };


    // let handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     let res = await fetch("http://localhost:8080/api/v1/units", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         capacity: capacity,
    //         address: address,
    //         unitType: unitType,
    //         ownerId: '1'
    //       }),
    //       headers: {
    //         'Content-type': 'application/json; charset=UTF-8'
    //       }
    //     });
    //     let resJson = await res.json();
    //     if (res.status === 200) {
    //       setCapacity("");
    //       setAddress("");
    //       setUnitType("");
    //       setSuccess(true);
    //     } else {
    //       setMessage(resJson.message);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
  
    return (
     <>
     <Title title="Add a Unit" />
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
        <h3 className="success">{success ? <p>Unit was created ! </p> : null}</h3>
  
        <button type="submit">Create</button>
        </form>
  
      </div>

    </>
    );
  }
  
  export default AddUnit;
  
  
  
  