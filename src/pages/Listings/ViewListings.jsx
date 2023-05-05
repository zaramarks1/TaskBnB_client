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

    const [filters, setFilters] = useState({
      title: '',
      address: '',
      description: '',
      dateStart: '',
      dateEnd: ''
    });

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

    let handleSubmitSearch = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await listingService.getSearchListings(filters).then(
        (response) => {
          // setUnit({capacity:'', address:'', unitType:''});
          setData(response.data);
          setSuccess(true);
          // navigate('/my-units')
          
        },
        (error) => {
          setMessage(error.response.data.message || error.message);
          console.log(error);
        });
      }catch (error){
        console.log(error);
        setMessage(error.response.data.message);
      }
    };
  
return(
    <>

    <Title title = "View All Listings"/>

    <ListingComponents.SearchListings filters={filters} setFilters={setFilters}
       handleSubmitSearch={handleSubmitSearch} ></ListingComponents.SearchListings>
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
