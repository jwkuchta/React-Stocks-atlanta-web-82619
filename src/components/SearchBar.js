import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.alphad} onChange={e => props.sort(e)}/>
                                                                          {/* also works {props.sort} */}
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.priced} onChange={e => props.sort(e)}/>
                                                                {/* also works {props.sort} */}
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        {/* <select onChange={e => props.filter(e)}> */}
        <select onChange={props.filter}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
