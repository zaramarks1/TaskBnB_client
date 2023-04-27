import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import { Link } from 'react-router-dom';

import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';
import ListingComponents from './ListingComponents';

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
          setMessage(error.response.data.message || error.message);
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

    <ListingComponents.ViewListings listings={data}></ListingComponents.ViewListings>
    </div>
    </>
 
);

};

export default Viewlistings;
