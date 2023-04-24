import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import { Link, useParams, useNavigate } from 'react-router-dom';



const ViewAUnit = () =>{

    const params = useParams();
    const navigate = useNavigate();

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

    let handleDelete = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.deleteUnit(params.id).then(
        (response) => {
          setSuccess(true);
          navigate('/my-units'); 
          alert('Unit was successfully deleted');
        },
        (error) => {
          setMessage(error.response.data.message);
          console.log("error");
          alert(message);
        });
      }catch (error){
        console.log(error);
      }
    };

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
            
            <button onClick={handleDelete}> Delete </button>
            <button> View Listings (not working yet heheh) </button>
            <button> Add a Listing (not working yet heheh)</button>
        </>}




        
        </>
       

    );


};

export default ViewAUnit;