import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import listingService from '../../service/listing.service';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingComponents from './ListingComponents';
import authService from '../../service/auth.service';
import requestService from '../../service/request.service';



const ViewAListing = () =>{

    const params = useParams();

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState();
    const [message, setMessage] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [requests, setRequests] = useState([]);

    const [comment, setComment] = useState('');

    const [request, setRequest] = useState({
        message:'',
        requestStatus:'PENDING'
    });

    const user = authService.getCurrentUser();

    useEffect(() => {
      listingService.getListingById(params.id).then(
        (response) => {
          setData(response.data);
          setIsOwner(user?.id == response.data.unit.ownerId )
          console.log(data)
          setSuccess(true);

          if(user?.id == response.data.unit.ownerId ){
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
      console.log(isPopupOpen);
    };


    let handleSubmitRequest = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await requestService.addRequest(params.id, comment).then(
        (response) => {
          console.log(response);
          // setUnit({capacity:'', address:'', unitType:''});
          setSuccess(true);
          // navigate('/my-units')
          setIsPopupOpen(!isPopupOpen);
          window.location.reload();
          
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

    let handledeyRequets = async (e) =>{


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

            {isOwner ? 
              <>
               <h2>Requests : {requests.length} </h2>
              <ul>
              { requests && requests.map(request => (
                  <>
                 
                  <li className='list' >
                    <h3>Comment : {request.comment}</h3>
                    <h3>Status : {request.requestStatus}</h3>
                    {/* <button onClick={handlePopUp}>Close Popup</button> */}

                    {request.requestStatus === 'PENDING' &&
                        <>
                          <button onClick={handlePopUp}>Accept</button>
                          <button onClick={handledeyRequets}>Deny</button>
                        </>
                        
                    }
                  </li>
                </>
                 ))
              }
              </ul>
              
            </>
            :
            <>
            <h1>Is not owner</h1>
            <button onClick={handlePopUp}>Make a request</button>

            {isPopupOpen &&
              <>
              <div className='popup'>
              <button onClick={handlePopUp} className='closeButton'>Close</button>
                <h1 className='title'>Make a request
                </h1>
                <form onSubmit={handleSubmitRequest}>
                <label className='inputLabel'>Leave a comment </label>
                <div className="txt_field" >
                  <input
                    type="text"
                    placeholder="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  </div>
                  <button type="submit">Send</button>
                  </form>
                
               
              </div>
              </>
            }
            </>
          }
          
          {/* <ListingComponents.EditListing listing={data}></ListingComponents.EditListing> */}
        </>}

        <h3 className="error">{message ? <p>{message}</p> : null}</h3>
        </>
       

    );


};

export default ViewAListing;


