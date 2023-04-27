import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Title from '../Title';

import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';
import ListingComponents from './ListingComponents';

const UpdateListing = () =>{

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const listingOld = location.state?.listing;
   
    const [listing, setListing] = useState({
        title: listingOld?.title,
        address: listingOld?.address,
        description: listingOld?.description,
        dateStart: new Date(listingOld?.dateStart).toISOString().substring(0, 10),
        dateEnd: new Date(listingOld?.dateEnd).toISOString().substring(0, 10),
        listingStatus:listingOld?.listingStatus,
        unitId: listingOld?.unitId
      });
     
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();
      console.log(listing);
      try {
       
        await listingService.updateListing(params.id, listing).then(
        (response) => {
            setListing('');
            navigate('/view-a-unit/'+listing.unitId); 
            setSuccess(true);
        },
        (error) => {
          setMessage(error.response.data.message);
          console.log("error");
        });
      }catch (error){
        console.log(error);
      }
    };
  
    return (
    <>
     <Title title="Edit Listing" />

     <ListingComponents.FormListing 
     listing={listing} 
     handleSubmit={handleSubmit} 
     setListing={setListing} 
     buttonName='Edit'
     type='EDIT'
     > </ListingComponents.FormListing>
     
     <h3 className="error">{message ? <p>{message}</p> : null}</h3>
    </>
    );
  };
  
  
  export default UpdateListing;
  
  
  
  