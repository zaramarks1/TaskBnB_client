import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';

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
  
return(
    <>

    <Title title = "Your Units"/>
    <div className='divDisplay'>
    {/* {handleSubmit} */}

    {loading && <div>A moment please...</div>}
    <h3 className="success">{success ? <p>Units loaded ! </p> : <p>not able to fetch data </p> }</h3>

    {/* {this.state.data.map(d => (<li key={d.id}>{d.name}</li>))}  */}

    <ul>
        {data &&
          data.map(unit => (

            <Link to={`/view-a-unit/${unit.id || unit._id}`}>
                  <>
                  <li className='list' key = {unit.id || unit._id}  >
                    <h3>Capacity : {unit.capacity}</h3>
                    <h3>Address : {unit.address}</h3>
                    <h3>Unit type : {unit.unitType}</h3>
                  </li>
                  </>
            </Link>
          ))}
      </ul>
    </div>
    </>
 
);

};

export default ViewMyUnits;
