import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingComponents from './ListingComponents';



const ViewAListing = () =>{

    const params = useParams();

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState();
    const [message, setMessage] = useState(null);

    useEffect(() => {
      listingService.getListingById(params.id).then(
        (response) => {
          setData(response.data);
          console.log(data)
          setSuccess(true);
        },
        (error) => {
          setMessage(error.response.data.message);
          setData(null);
        }
      );
    }, []);

    return (
        <>

        <Title title = "Listing"></Title>

        {data &&
        <>
            <h2>Title : {data.title}</h2>
            <h2>Address : {data.address}</h2>
            <h2>Description: {data.description}</h2>
            <h2>Start date: {data.dateStart}</h2>
            <h2>End date: {data.dateEnd}</h2>
            <h2>Listing Status : {data.listingStatus}</h2>
          
          <ListingComponents.ListingEdit listing={data}></ListingComponents.ListingEdit>
        </>}

        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
        </>
       

    );


};

export default ViewAListing;


