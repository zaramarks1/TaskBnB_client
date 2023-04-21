import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';

import unitService from '../../service/unit.service';

const ViewMyUnits = () => {


    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
      unitService.getMyUnits().then(
        (response) => {
          setData(response.data);
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

    // useEffect(() => {
    //     const getData = async () => {
    //       try {
    //         const response = await axios.get(
    //           `http://localhost:8080/api/v1/units`
    //         );
    //         setData(response.data);
    //         setSuccess(true);
    //         setMessage(null);
    //       } catch (err) {
    //         setMessage(err.message);
    //         setData(null);
    //       } finally {
    //         setLoading(false);
    //         setSuccess(true);
    //       }
    //     };
    //     getData();
    //   }, []);

  
return(
    <>

    <Title title = "View All Units"/>
    <div className='divDisplay'>
    {/* {handleSubmit} */}

    {loading && <div>A moment please...</div>}
    <h3 className="success">{success ? <p>Units loaded ! </p> : <p>not able to fetch data </p> }</h3>

    <ul>
        {data &&
          data.map(({ id, capacity, address, unitType }) => (
            <li className='list' key = {id}>
                <h3>Capacity : {capacity}</h3>
                <h3>Address : {address}</h3>
                <h3>Unit type : {unitType}</h3>
            </li>
 
            
          ))}
      </ul>
    </div>
    </>
 
);

};

export default ViewMyUnits;
