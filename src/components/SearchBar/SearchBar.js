import React, { useState } from "react";
import style from "./SearchBar.module.css";

function SearchBar(props) {
  const [term, setTerm] = useState('');
  const handleChange = ({target}) => setTerm(target.value);
  const search = () => {
    props.onSearch(term);
  }
  
  return (
    <div className={style.searchBar}>
      <input 
        className={style.searchBar__input}
        type="text" 
        name="search" 
        value={term} 
        onChange={handleChange} 
        placeholder="Search Here"
      />
      <button className={style.searchBar__button} onClick={search} >Search</button>
    </div>
  )
}

export default SearchBar;