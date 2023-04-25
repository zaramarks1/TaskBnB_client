import { Link} from 'react-router-dom';

const EditListing = ({listing}) =>{

    return(
        <>
        <Link to= {`/update-listing/${listing.id || listing._id}`} state= {{listing :listing}}>
            <button> Edit </button>
        </Link>
  
        {/* <button onClick={handleDelete}> Delete </button> */}
        
        </>
    );
    
};

const FormListing = ({listing}) =>{

}

const ViewListings = ({listings, owner=false}) =>{
    return(
        <>
        <ul>
            {listings &&
            listings.map( l => (

                <Link to={{ pathname:`/view-a-listing/${l.id || l._id}`}}>
                    <>
                    <li className='list' key = {l.id ||l. _id}  >
                        <h3>Title : {l.title}</h3>
                        <h3>Address : {l.address}</h3>
                        <h3>Start date: {l.dateStart}</h3>
                        <h3>End date: {l.dateEnd}</h3>
                        {owner && <h3>Status : {l.listingStatus}</h3>}

                    </li>
                    </>
                </Link>
            ))}
        </ul>

        </>
    );
   
};

// const 

const ListingComponents = {
    EditListing,
    ViewListings
};


export default ListingComponents;