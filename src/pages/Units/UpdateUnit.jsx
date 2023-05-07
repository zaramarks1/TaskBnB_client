import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Title from '../Title';
import unitService from '../../service/unit.service';
import UnitComponents from './UnitComponents';
import authService from '../../service/auth.service';


const UpdateUnit = () =>{

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // const [unit, setUnit] = useState(location.state?.unit);

    const [unit, setUnit] = useState({
      capacity: location.state?.unit.capacity || 0,
      address: location.state?.unit.address || '',
      unitType:location.state?.unit.unitType || 'HOUSE'
  });
    const [message, setMessage] = useState("");

    // useEffect(() => {

    //   const user = authService.getCurrentUser();
    //   unitService.getUnitById(params.id).then(
    //     (response) => {

    //       if(user?.id !== response.data.ownerId){
    //         setMessage('You are not allowed to edit this unit');
    //       }else{
    //         setUnit(response.data);
    //       }
    //     },
    //     (error) => {
    //       setMessage(error.response.data.message || error.message);
    //     }
    //   );
    // }, []);


    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.updateUnit(params.id, unit).then(
        (response) => {
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
     <Title title="Edit a Unit" />
  
     <UnitComponents.UnitForm 
       unit={unit} 
       handleSubmit={handleSubmit} 
       setUnit={setUnit} 
       buttonName='Edit'
     >
     </UnitComponents.UnitForm>

     <h3 className="error">{message ? <p>{message}</p> : null}</h3>

    </>
    );
  }
  
  export default UpdateUnit;
  
  
  
  