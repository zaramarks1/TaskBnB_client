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
      console.log(listing);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    let handleSubmit = async (e) => {
      setMessage("");
      e.preventDefault();

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
     <Title title="Add a Listing" />
     {/* <ListingComponents.FormListing listing={listing}> </ListingComponents.FormListing> */}

      <form onSubmit={handleSubmit}>
      <div className="divDisplay">
      <label className='inputLabel'>Title</label>
      <input required
        type="text"
        value={listing.title}
        placeholder="Title"
        onChange={(e) => setListing({...listing, title:e.target.value})}
      />
      <label className='inputLabel'>Description</label>
      <input
        type="text"
        value={listing.description}
        placeholder="Description"
        onChange={(e) => setListing({...listing, description:e.target.value})}
      />

      <label className='inputLabel'>Start Date</label>
      <input required
        type="date"
        value={listing.dateStart}
        placeholder="Start Date"
        onChange={(e) => setListing({...listing, dateStart:e.target.value})}
      />
      <label className='inputLabel'>End Date</label>
      <input required
        type="date"
        value={listing.dateEnd}
        placeholder="End Date"
        onChange={(e) => setListing({...listing, dateEnd:e.target.value})}
      />

     <h3 className="error">{message ? <p>{message}</p> : null}</h3>
     <button type="submit">Update</button>

     </div>
    </form>
    </>
    );
  };
  
  
  export default UpdateListing;
  
  
  
  