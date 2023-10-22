import React from "react";
import Track from "../Track/Track";
import style from "./Tracklist.module.css";

function Tracklist(props) {
  return (
    <div className={style.tracklist}>
      {props.tracks.map((track) => {
        return (
          <Track 
            track={track} 
            key={track.id} 
            onAdd={props.onAddSong} 
            isRemove={props.isRemove} 
            onRemove={props.onRemoveSong} 
          />
        )
      })}
    </div>
  )
}

export default Tracklist;