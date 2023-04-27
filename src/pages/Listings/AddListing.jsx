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
      <label className='inputLabel'>Listing Status</label>

      <select  type="text" id="unitType"  onChange={(e) => setListing({listingStatus:e.target.value})}>
          <option selected value="HIDDEN">Hidden</option>
          <option value="PUBLIC">Public</option>
      </select>

     <h3 className="error">{message ? <p>{message}</p> : null}</h3>
     <h3 className="success">{success ? <p>Listing was created ! </p> : null}</h3>
     <button type="submit">Create</button>

     </div>
    </form>
    </>
    );
  };
  
  
  export default AddListing;
  
  
  
  