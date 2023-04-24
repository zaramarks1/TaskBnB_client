import { Link} from 'react-router-dom';

const ListingEdit = ({listing}) =>{

    return(
        <>
        <Link to= {`/update-listing/${listing.id || listing._id}`} state= {{listing :listing}}>
            <button> Edit </button>
        </Link>
  
        {/* <button onClick={handleDelete}> Delete </button> */}
        
        </>
    );
    
};

const ViewListings = ({listings}) =>{
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
                    </li>
                    </>
                </Link>
            ))}
        </ul>

        </>
    );
   
};

const ListingComponents = {
    ListingEdit,
    ViewListings
};


export default ListingComponents;