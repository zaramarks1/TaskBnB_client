import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';

import unitService from '../../service/unit.service';

const AddUnit = () =>{

  const [unit, setUnit] = useState({
      capacity: 0,
      address: '',
      unitType:'HOUSE'
  });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);


    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.addUnit(unit).then(
        (response) => {
          setUnit({capacity:'', address:'', unitType:''});
          setSuccess(true);
        },
        (error) => {
          setMessage(error.response.data.message || error.message);
          console.log(error);
        });
      }catch (error){
        console.log(error);
        setMessage(error.response.data.message);
      }
    };
  
    return (
     <>
     <Title title="Add a Unit" />
      <div className="divDisplay">
        <form onSubmit={handleSubmit}>
          <label className='inputLabel'>Capacity </label>
          <input
            type="number"
            value={unit.capacity}
            placeholder="Capacity"
            onChange={(e) => setUnit({...unit, capacity:e.target.value})}
          />
          <label className='inputLabel'>Address</label>
          <input required
            type="text"
            value={unit.address}
            placeholder="Address"
            onChange={(e) => setUnit({...unit, address:e.target.value})}
          />
          <label className='inputLabel'>Unit Type</label>

          <select  type="text" id="unitType"  onChange={(e) => setUnit({...unit, unitType:e.target.value})}>
              <option selected value="HOUSE">House</option>
              <option value="APT">Appartment</option>
              <option value="STUDIO">Studio</option>
              <option value="ROOM">Room</option>
          </select>
        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
        <h3 className="success">{success ? <p>Unit was created ! </p> : null}</h3>
  
        <button type="submit">Create</button>
        </form>
  
      </div>

    </>
    );
  }
  
  export default AddUnit;
  
  
  
  