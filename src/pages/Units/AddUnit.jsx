import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../Title';
import UnitComponents from './UnitComponents';

import unitService from '../../service/unit.service';

const AddUnit = () =>{

  const [unit, setUnit] = useState({
      capacity: 0,
      address: '',
      unitType:'HOUSE'
  });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.addUnit(unit).then(
        (response) => {
          setUnit({capacity:'', address:'', unitType:''});
          setSuccess(true);
          navigate('/my-units')
          
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

     <UnitComponents.UnitForm 
       unit={unit} 
       handleSubmit={handleSubmit} 
       setUnit={setUnit} 
       buttonName='Create'
     >
     </UnitComponents.UnitForm>
     <h3 className="error">{message ? <p>{message}</p> : null}</h3>
    <h3 className="success">{success ? <p>Unit was created ! </p> : null}</h3>
    </>
    );
  }
  
  export default AddUnit;
  
  
  
  