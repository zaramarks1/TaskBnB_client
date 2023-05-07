import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';
import requestService from '../../service/request.service';
import unitService from '../../service/unit.service';
import reservationService from '../../service/reservation.service';

const ViewMyReservations = () => {


    const [success, setSuccess] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        reservationService.getMyReservations().then(
        (response) => {
          setReservations(response.data);
          setSuccess(true);
          setLoading(false);
        },
        (error) => {
          setMessage(error.response.data.message);
          setReservations(null);
          setLoading(false);
        }
      );
    }, []);

  
return(
    <>

    <Title title = "Your Reservations"/>
    <div className='divDisplay'>
    {/* {handleSubmit} */}

    {loading && <div>A moment please...</div>}
    <h3 className="success">{success ? <p>Requests loaded ! </p> : <p>not able to fetch data </p> }</h3>

    {/* {this.state.data.map(d => (<li key={d.id}>{d.name}</li>))}  */}

    <ul>
        {reservations &&
          reservations.map(r => (

            <Link to={`/view-a-listing/${r.listingId}`}>
                  <>
                  <li className='list' key = {r.id || r._id}  >
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

export default ViewMyReservations;
