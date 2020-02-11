import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

function SearchBar(props) {
  const [title, setTitle] = useState('')
  let timeout = null

  const doSearch = e => {
    setTitle(e.target.value)
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      props.callback(title)
    }, 500)
  }

  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
        <input
          type="text"
          className="rmdb-searchbar-input"
          placeholder="Search"
          onChange={doSearch}
          value={title}
        />
      </div>
    </div>
  );
}


export default SearchBar;
