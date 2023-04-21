import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import { Link, useParams } from 'react-router-dom';


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

    console.log(data); 

    return (
        <>

        <Title title = "Your Unit"></Title>

        
        {data &&
        <>
            <h1>Capacity : {data.capacity}</h1>
            <h1>Address : {data.address}</h1>
            <h1>Unit type : {data.unitType}</h1>


            <Link to= {`/update-unit/${params.id}`} state= {{unit :data}}>
              <button> Edit </button>
            </Link>
            
            <button> Delete </button>
            <button> View Listings </button>
            <button> Add a Listing </button>
        </>}




        
        </>
       

    );


};

export default ViewAUnit;