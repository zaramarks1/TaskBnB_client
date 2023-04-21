import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import { useParams } from 'react-router-dom';


const ViewAUnit = () =>{

    const params = useParams();

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
      unitService.getUnitById(params.id).then(
        (response) => {
          setData(response.data);
          console.log(data)
          setSuccess(true);
          setLoading(false);
        },
        (error) => {
          setMessage(error.response.data.message);
          setData(null);
          setLoading(false);
        }
      );
    }, []);

    return (
        <>
        
        {data &&
        <>
            <h1>Capacity : {data.capacity}</h1>
            <h1>Address : {data.address}</h1>
            <h1>Unit type : {data.unitType}</h1>
        </>
              
          }
        
        </>
       

    );


};

export default ViewAUnit;