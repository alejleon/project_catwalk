import React, { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";



const Search = (props) => {

  return (
    <SearchBar value={props.searchInput} onChange={props.handleSearchOnChange} />
  );
}

export default Search;