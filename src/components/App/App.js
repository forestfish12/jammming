import React, { useCallback, useState } from 'react';
import Playlist from '../song-lists/Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../song-lists/SearchResults/SearchResults';
import * as testData from '../util/testData';
import Spotify from '../util/spotify';
import './App.css';

function App() {
  const [resultsArray, setResultsArray] = useState([]);
  const [playlistArray, setPlaylistArray] = useState([]);
  const [playlistName, setPLaylistName] =useState([]);

  const search = (term) => {
    // const results = Spotify.search(term);
    Spotify.search(term).then(setResultsArray);
  }

  const addSong = (track) => {
    setPlaylistArray(prevArray => [...prevArray, track])
  }

  const removeSong = (track) => {
    setPlaylistArray(prevArray => prevArray.filter(
      (curTrack) => curTrack.id !== track.id
    ));
  }

  const playlistUris = playlistArray.map((track) => track.uri);

  const changePlaylistName = ({target}) =>  setPLaylistName(target.value);
  
  const savePlaylist = () => playlistArray.map((track) => track.uri);
  
  return (
    <div className='App'>
      <header>
        <h1>Jammming</h1>
      </header>
      <SearchBar onSearch={search} />
      <div className='song-display'>
        <SearchResults results={resultsArray} onAddSong={addSong} />
        <Playlist
          name={playlistName}
          onNameChange={changePlaylistName}
          list={playlistArray}
          onRemoveSong={removeSong}
          onSave={savePlaylist}
          trackUris={playlistUris}
        />
      </div>
    </div>
  );
}

export default App;