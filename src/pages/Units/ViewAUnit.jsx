import React from 'react';
import '../../css/pages.css';
import {useState, useEffect} from 'react';
import Title from '../Title';
import unitService from '../../service/unit.service';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ListingComponents from '../Listings/ListingComponents';



const ViewAUnit = () =>{

    const params = useParams();
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [listings, setListings] = useState([]);

    useEffect(() => {
      unitService.getUnitById(params.id).then(
        (response) => {
          setData(response.data);
          console.log(data)
          setSuccess(true);
          setLoading(false);
        },
        (error) => {
          setMessage(error.response.data.message);
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
          setMessage(error.response.data.message);
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
          setMessage(error.response.data.message);
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
            <h2>Capacity : {data.capacity}</h2>
            <h2>Address : {data.address}</h2>
            <h2>Unit type : {data.unitType}</h2>
            <h2>Listings: </h2>
            <ListingComponents.ViewListings listings={listings} owner={true}></ListingComponents.ViewListings>


            <Link to= {`/view-a-unit/${params.id}/update`} state= {{unit :data}}>
              <button> Edit This Unit</button>
            </Link>
            
            <button onClick={handleDelete}> Delete This Unit </button>

            <Link to= {`add-listing`} state= {{unit :data}}>
              <button> Add a Listing </button>
            </Link>

        </>}

        <h3 className="error">{message ? <p>{message}</p> : null}</h3>

        
       </>
       

    );


};

export default ViewAUnit;