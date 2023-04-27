import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Title from '../Title';

import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';
import ListingComponents from './ListingComponents';

const AddListing = () =>{

    const params = useParams();
    const location = useLocation();
    const unit = location.state?.unit

    const [listing, setListing] = useState({
        title: '',
        address: unit?.address,
        description: '',
        dateStart: '',
        dateEnd: '',
        listingStatus: 'HIDDEN',
        unitId: params.id
      });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    console.log(listing)
    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await listingService.addListing(listing).then(
        (response) => {
            setListing('');
            setSuccess(true);
        },
        (error) => {
          setMessage(error.response.data.message);
          console.log("error");
        });
      }catch (error){
        console.log(error);
        // setMessage(error.response.data.message);
      }
    };
  
    return (
    <>
     <Title title="Add a Listing" />

     <ListingComponents.FormListing 
     listing={listing} 
     handleSubmit={handleSubmit} 
     setListing={setListing} 
     buttonName='Create'
     type='CREATE'
     > </ListingComponents.FormListing>

     <h3 className="error">{message ? <p>{message}</p> : null}</h3>
     <h3 className="success">{success ? <p>Listing was created ! </p> : null}</h3>

    </>
    );
  };
  
  
  export default AddListing;
  
  
  
  