import { Link} from 'react-router-dom';
import { useState } from 'react';
import listingService from '../../service/listing.service';

const EditListing = ({listing}) =>{

    return(
        <>
        <Link to= {`/view-a-listing/${listing.id || listing._id}/update`} state= {{listing :listing}}>
            <button> Edit </button>
        </Link>
  
        {/* <button onClick={handleDelete}> Delete </button> */}
        
        </>
    );
    
};

const DeleteListing = ({id}) =>{
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    let handleDelete = async (e) => {
        setMessage("");
        e.preventDefault();
  
        try {
          await listingService.deleteListing(id).then(
          (response) => {
            setSuccess(true);
            window.location.reload();
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

    return(
        <>
        <button onClick={handleDelete}> Delete </button>
        </>
    );
    
};

// const FormListing = ({listing}) =>{
//     return(
//     <>
// <form onSubmit={handleSubmit}>
//     <div className="divDisplay">
//       <label className='inputLabel'>Title</label>
//       <input
//         type="text"
//         value={listing.title}
//         placeholder="Title"
//         onChange={(e) => setListing({...listing, title:e.target.value})}
//       />
//       <label className='inputLabel'>Description</label>
//       <input
//         type="text"
//         value={listing.description}
//         placeholder="Description"
//         onChange={(e) => setListing({...listing, description:e.target.value})}
//       />

//       <label className='inputLabel'>Start Date</label>
//       <input
//         type="date"
//         value={listing.dateStart}
//         placeholder="Start Date"
//         onChange={(e) => setListing({...listing, dateStart:e.target.value})}
//       />
//       <label className='inputLabel'>End Date</label>
//       <input
//         type="date"
//         value={listing.dateEnd}
//         placeholder="End Date"
//         onChange={(e) => setListing({...listing, dateEnd:e.target.value})}
//       />
//       <label className='inputLabel'>Listing Status</label>

//       <select  type="text" id="unitType"  onChange={(e) => setListing({listingStatus:e.target.value})}>
//           <option selected value="HIDDEN">Hidden</option>
//           <option value="PUBLIC">Public</option>
//       </select>
   
//     <button type="submit">Create</button>
//     </div>
//     </form>
//     </>
//     );
    
// }

const ViewListings = ({listings, isOwner=false}) =>{

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    // const [isOwner, setIsOwner] = useState(false);

    let handleChangeStatus = async (e, id) => {
        setMessage("");
        e.preventDefault();
  
        try {
          await listingService.changeStatusListing(id).then(
          (response) => {
            setSuccess(true);
            window.location.reload();
          },
          (error) => {
            setMessage(error.response.data.message || error.message);
            console.log("error");
            // alert(message);
          });
        }catch (error){
          console.log(error);
        }
      };

      
    return(
        <>
        <ul>
            {listings &&
            listings.map( l => (
                    <>
                    <li className='list' key = {l.id ||l. _id}  >
                    <Link to={`/view-a-listing/${l.id || l._id}`} state={{isOwner:isOwner}}>
                        <h3>Title : {l.title}</h3>
                        <h3>Address : {l.address}</h3>
                        <h3>Start date: {l.dateStart}</h3>
                        <h3>End date: {l.dateEnd}</h3>
                        {/* <h3>{isOwner}</h3> */}
                    </Link>
                        
                        {isOwner && 
                        <>
                        <h3>Status : {l.listingStatus}

                        {l.listingStatus == 'HIDDEN' &&
                            <button onClick={(e) => handleChangeStatus(e, l.id || l._id)}>PUBLISH</button>
                        }
                        {l.listingStatus == 'PUBLIC' &&
                             <button onClick={(e) => handleChangeStatus(e, l.id || l._id)}>HIDE</button>
                        }
                        {/* <button>EDIT</button>
                         */}
                         <EditListing listing={l}></EditListing>
                         <DeleteListing id={l._id||l.id}></DeleteListing>
                        </h3>
                        </>
                        }
                    </li>
                    </>
          
            ))}
        </ul>

        </>
    );
   
};

// const 

const ListingComponents = {
    EditListing,
    ViewListings,
    // FormListing
};


export default ListingComponents;