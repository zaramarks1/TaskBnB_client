import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/pages.css';
import {useState, useEffect} from 'react';
import axios from "axios"
import Title from './Title';

const ViewUnits = () => {

    const [capacity, setCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [unitType, setUnitType] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [units, setUnits] = useState([]);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/units`
            );
            setData(response.data);
            setSuccess(true);
            setMessage(null);
          } catch (err) {
            setMessage(err.message);
            setData(null);
          } finally {
            setLoading(false);
            setSuccess(true);
          }
        };
        getData();
      }, []);


    // let handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       let res = await fetch("http://localhost:8080/api/v1/units");
    //       let resJson = await res.json();
    //       if (res.status === 200) {
    //         // setCapacity(resJson.capacity);
    //         // setAddress(resJson.address);
    //         // setUnitType(resJson.unitType);
    //         // setOwnerId(resJson.ownerID);
    //         setUnits(arr => [...arr , `${arr.length}`]);
    //         setSuccess(true);
    //       } else {
    //         setMessage(resJson.message);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    


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

export default ViewUnits;
