import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';

import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';

const AddListing = () =>{

    const [listing, setListing] = useState({
        title: '',
        address: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        listingStatus: ''
      });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);


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
        setMessage(error.response.data.message);
      }
    };
  
    return (
     <>
     <Title title="Add a Lisating" />
      <div className="divDisplay">
        <form onSubmit={handleSubmit}>
          <label className='inputLabel'>Title </label>
          <input
            type="text"
            value={listing.title}
            placeholder="Title"
            onChange={(e) => setListing({...listing, title:e.target.value})}
          />
          <label className='inputLabel'>Address</label>
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className='inputLabel'>Unit Type</label>

          <select  type="text" id="unitType"  onChange={(e) => setUnitType(e.target.value)}>
              <option selected value="HOUSE">House</option>
              <option value="APT">Appartment</option>
              <option value="STUDIO">Studio</option>
              <option value="ROOM">Room</option>
          </select>
        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
        <h3 className="success">{success ? <p>Unit was created ! </p> : null}</h3>
  
        <button type="submit">Create</button>
        </form>
  
      </div>

    </>
    );
  }
  
  export default AddUnit;
  
  
  
  