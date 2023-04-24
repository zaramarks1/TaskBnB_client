import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';

import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';

const Viewlistings = () => {


    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
      listingService.getAllListings().then(
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

    <Title title = "View All Listings"/>
    <div className='divDisplay'>
    {/* {handleSubmit} */}

    {loading && <div>A moment please...</div>}
    <h3 className="success">{success ? <p>Listings loaded ! </p> : <p>not able to fetch data </p> }</h3>

    <ul>
        {data &&
          data.map( l => (

            <Link to={{ pathname:`/view-a-listing/${l.id || l._id}`}}>
                  <>
                  <li className='list' key = {l.id ||l. _id}  >
                    <h3>Title : {l.title}</h3>
                    <h3>Address : {l.address}</h3>
                    <h3>Start date: {l.dateStart}</h3>
                    <h3>End date: {l.dateEnd}</h3>
                  </li>
                  </>
            </Link>
          ))}
      </ul>
    </div>
    </>
 
);

};

export default Viewlistings;
