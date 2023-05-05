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

const FormListing = ({handleSubmit, listing, setListing, buttonName, type}) =>{
    return(
    <>
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
    {type === 'CREATE' &&
      <>
         <label className='inputLabel'>Listing Status</label>

          <select  type="text" id="unitType"  onChange={(e) => setListing({...listing,listingStatus:e.target.value})}>
              <option selected value="HIDDEN">Hidden</option>
              <option value="PUBLIC">Public</option>
          </select>

      </>
    }
      <br></br>
     <button type="submit">{buttonName}</button>
     </div>
  </form>
    </>
    );
    
}

const ViewListings = ({listings, isOwner=false}) =>{

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [listingErrorId, setListingErrorId] = useState(null);
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
            setListingErrorId(id);
            console.log("error");
            // alert(message);
          });
        }catch (error){
          console.log(error);
        }
      };

      
      return (
        <>
          <ul>
            {listings &&
              listings.map(l => (
                <>
                  {(isOwner || l.listingStatus === "PUBLIC") && (
                    <>
                      <li className="list" key={l.id || l._id}>
                        <Link to={`/view-a-listing/${l.id || l._id}`} state={{ isOwner: isOwner }}>
                          <h3>Title : {l.title}</h3>
                          <h3>Address : {l.address}</h3>
                          <h3>Start date: {l.dateStart}</h3>
                          <h3>End date: {l.dateEnd}</h3>
                          
                        </Link>
                        {isOwner && (
                          <>
                            <h3>
                              Status : {l.listingStatus}
                              {l.listingStatus == "HIDDEN" && (
                                <>
                                <button onClick={(e) => handleChangeStatus(e, l.id || l._id)}>
                                  PUBLISH
                                </button>
                                <EditListing listing={l}></EditListing>
                                </>
                                
                              )}
                              {l.listingStatus == "PUBLIC" && (
                                <>
                                <button onClick={(e) => handleChangeStatus(e, l.id || l._id)}>
                                  HIDE
                                </button>
                                <EditListing listing={l}></EditListing>
                                </>   
                              )}
                            
                             
                              <DeleteListing id={l._id || l.id}></DeleteListing>
                              <h3 className="error">{message  && listingErrorId === (l.id || l._id)? <p>{message}</p> : null}</h3>
                            </h3>
                            
                          </>
                        )}
                      </li>
                    </>
                  )}
                </>
              ))}
          </ul>
        </>
      );
};     

const SearchListings = ({handleSubmitSearch, filters, setFilters}) =>{

  const handleRefresh= () => {
    window.location.reload();
  };

return (
  <>
  <form onSubmit={handleSubmitSearch}>

      <div className="search">
      <label >Address</label>
      <input 
        type="text"
        value={filters.address}
        placeholder="Address"
        onChange={(e) => setFilters({...filters, address:e.target.value})}
      />
       <label>Title</label>
      <input
        type="text"
        value={filters.title}
        placeholder="Title"
        onChange={(e) => setFilters({...filters, title:e.target.value})}
      />
      {/* <br></br> */}
      <label >Start By</label>
      <input 
        type="date"
        value={filters.dateStart}
        placeholder="Start Date"
        onChange={(e) => setFilters({...filters, dateStart:e.target.value})}
      />
      <label >End By</label>
      <input 
        type="date"
        value={filters.dateEnd}
        placeholder="End Date"
        onChange={(e) => setFilters({...filters, dateEnd:e.target.value})}
      />
      <button onClick={handleSubmitSearch}>Search</button>
      <button onClick={ handleRefresh}>Reset</button>
      </div>

    </form>

  </>
);

};

const ListingComponents = {
    EditListing,
    ViewListings,
    FormListing,
    SearchListings
};


export default ListingComponents;