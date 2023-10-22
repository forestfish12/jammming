import React from "react";
import Tracklist from "../../Tracklist/Tracklist";
import Spotify from "../../util/spotify";
import style from "../songList.module.css";
import menuStyle from "./Playlist.module.css"

function Playlist(props) {
  
  return (
    <div className={style.songsList}>
      <h3>Playlist</h3>
      <input 
        className={menuStyle.nameInput}
        type="text" 
        value={props.name} 
        onChange={props.onNameChange} 
        placeholder="Playlist Name Here"
      />
      <Tracklist 
        isRemove={true} 
        onRemoveSong={props.onRemoveSong} 
        tracks={props.list} 
      />
      {/* <button onClick={props.onSave} >Save Playlist</button> */}
      <button 
        className={menuStyle.saveButton}
        onClick={() => {Spotify.createPlaylist(props.name, props.trackUris)}}
      >Save Playlist</button>
    </div>
  )
}

export default Playlist;