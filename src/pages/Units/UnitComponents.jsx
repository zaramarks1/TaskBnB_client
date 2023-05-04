


const UnitForm = ({handleSubmit, unit, setUnit, buttonName}) =>{
    return(
        <>
        <div className="divDisplay">
        <form onSubmit={handleSubmit}>
          <label className='inputLabel'>Capacity </label>
          <input
            type="number"
            value={unit.capacity}
            placeholder="Capacity"
            onChange={(e) => setUnit({...unit, capacity:e.target.value})}
          />
          <label className='inputLabel'>Address</label>
          <input required
            type="text"
            value={unit.address}
            placeholder="Address"
            onChange={(e) => setUnit({...unit, address:e.target.value})}
          />
          <label className='inputLabel'>Unit Type</label>

          <select  type="text" id="unitType"  onChange={(e) => setUnit({...unit, unitType:e.target.value})}>
              <option selected value="HOUSE">House</option>
               <option value="APT">Appartment</option>
              <option value="STUDIO">Studio</option>
              <option value="ROOM">Room</option>
          </select>
        <br></br>
        <button type="submit">{buttonName}</button>
        </form>
  
      </div>

        
        </>
    );
};

const UnitComponents ={
    UnitForm
}

export default UnitComponents;