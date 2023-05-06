import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';
import requestService from '../../service/request.service';
import unitService from '../../service/unit.service';

const ViewMyRequests = () => {


    const [success, setSuccess] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
      requestService.getMyRequests().then(
        (response) => {
          setRequests(response.data);
          setSuccess(true);
          setLoading(false);
        },
        (error) => {
          setMessage(error.response.data.message);
          setRequests(null);
          setLoading(false);
        }
      );
    }, []);
  
return(
    <>

    <Title title = "Your Requests"/>
    <div className='divDisplay'>
    {/* {handleSubmit} */}

    {loading && <div>A moment please...</div>}
    <h3 className="success">{success ? <p>Requests loaded ! </p> : <p>not able to fetch data </p> }</h3>

    {/* {this.state.data.map(d => (<li key={d.id}>{d.name}</li>))}  */}

    <ul>
        {requests &&
          requests.map(r => (

            <Link to={`/view-a-listing/${r.listingId || r._listingId}`}>
                  <>
                  <li className='list' key = {r.id || r._id}  >
                    <h3>Comment : {r.comment}</h3>
                    <h3>Request Status : {r.requestStatus}</h3>
                    <h3>Listind id : {r.listingId }</h3>
                  </li>
                  </>
            </Link>
          ))}
      </ul>
    </div>
    </>
 
);

};

export default ViewMyRequests;
