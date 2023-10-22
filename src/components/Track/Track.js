import React from "react";
import style from "./Track.module.css";

function Track({track, onAdd, isRemove, onRemove}) {
  const whatButton = () => {
    if (isRemove) {
      return <button className={style.track__action} onClick={() => onRemove(track)}>-</button>
    } else {
      return <button className={style.track__action} onClick={() => onAdd(track)}>+</button>
    }
  }

  return (
    <div className={style.track}>
      <div className={style.track__info}>
        <h4>{track.name}</h4>
        <p>{track.artist}/{track.album}</p>
      </div>
      { whatButton() }
    </div>
  )
}

export default Track;