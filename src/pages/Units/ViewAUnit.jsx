import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import authService from '../../service/auth.service';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import ListingComponents from '../Listings/ListingComponents';



const ViewAUnit = () =>{

    const params = useParams();
    const navigate = useNavigate();
    // const location = useLocation();

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [listings, setListings] = useState([]);
    const [isOwner, setIsOwner] = useState(false);


    useEffect(() => {

      const user = authService.getCurrentUser();
      // const isOwner = location.state?.isOwner;
      console.log(user)
      unitService.getUnitById(params.id).then(
        (response) => {
          setData(response.data);
          setSuccess(true);
          setLoading(false);
          setIsOwner(user?.id == response.data.ownerId);
        },
        (error) => {
          setMessage(error.response.data.message || error.message);
          setData(null);
          setLoading(false);
        }
      );
    }, []);

    useEffect(() => {
      unitService.getAllListingsByUnit(params.id).then(
        (response) => {
          setListings(response.data);
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

    let handleDelete = async (e) => {
      setMessage("");
      e.preventDefault();

      try {
        await unitService.deleteUnit(params.id).then(
        (response) => {
          setSuccess(true);
          navigate('/my-units'); 
          alert('Unit was successfully deleted');
        },
        (error) => {
          setMessage(error.response.data.message || error.message);
          console.log("error");
          alert(message);
        });
      }catch (error){
        console.log(error);
      }
    };

    return (
        <>

        <Title title = "Your Unit"></Title>

        
        {data &&
        <>
            { isOwner && 
              <>
              <Link to= {`update`} state= {{unit :data}}>
                <button> Edit This Unit</button>
              </Link>
            
              <button onClick={handleDelete}> Delete This Unit </button>

              <Link to= {`add-listing`} state= {{unit :data}}>
                <button> Add a Listing </button>
              </Link>
              </>
            }
            <h2>Capacity : {data.capacity}</h2>
            <h2>Address : {data.address}</h2>
            <h2>Unit type : {data.unitType}</h2>
            <h2>Listings: </h2>
            <ListingComponents.ViewListings listings={listings} isOwner={isOwner}></ListingComponents.ViewListings>
        </>}

        <h3 className="error">{message ? <p>{message}</p> : null}</h3>

        
       </>
       

    );


};

export default ViewAUnit;