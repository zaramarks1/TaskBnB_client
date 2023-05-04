import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingComponents from './ListingComponents';
import authService from '../../service/auth.service';



const ViewAListing = () =>{

    const params = useParams();

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState();
    const [message, setMessage] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [requests, setRequests] = useState([]);

    const user = authService.getCurrentUser();

    useEffect(() => {
      listingService.getListingById(params.id).then(
        (response) => {
          setData(response.data);
          setIsOwner(user?.id == response.data.unit.ownerId )
          console.log(data)
          setSuccess(true);

          if(user?.id == response.data.unit.ownerId ){
            console.log("KSDJFNAKJNGJKRSFNBGAKJ")
            listingService.getRequestsByListing(params.id).then(
              (response) => {
                setRequests(response.data);
                console.log(response.data)
              },
              (error) => {
                setMessage(error.response.data.message);
                setData(null);
              }
            );
          }
        },
        (error) => {
          setMessage(error.response.data.message);
          setData(null);
        }
      );
    }, []);


    const handlePopUp= () => {
      setIsPopupOpen(!isPopupOpen);
    }



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

            {isOwner && requests ? 
              <>
               <h2>Requests : {requests.length} </h2>
              <ul>
              {requests.map(request => (
                  <>
                 
                  <li className='list' >
                    <h3>Comment : {request.comment}</h3>
                    <h3>Status : {request.requestStatus}</h3>
                    {/* <button onClick={handlePopUp}>Close Popup</button> */}

                    {request.requestStatus === 'PENDING' &&
                        <>
                          <button onClick={handlePopUp}>Accept</button>
                          <button onClick={handlePopUp}>Deny</button>
                        </>
                        
                    }
                  </li>
                </>
                 ))
              }
              </ul>
              
            </>
            :
            <h1>Is not owner</h1>
          }
          
          {/* <ListingComponents.EditListing listing={data}></ListingComponents.EditListing> */}
        </>}

        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
        </>
       

    );


};

export default ViewAListing;


