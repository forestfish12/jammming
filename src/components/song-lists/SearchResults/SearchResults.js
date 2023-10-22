import React from "react";
import Tracklist from "../../Tracklist/Tracklist";
import styles from "../songList.module.css";

function SearchResults(props) {

  return (
    <div className={styles.songsList} >
      <h3>Search Results</h3>
      <Tracklist 
        tracks={props.results} 
        onAddSong={props.onAddSong} 
      />
    </div>
  )
}

export default SearchResults;