import React, {useState, useEffect} from 'react';
import '../App.css';
import apiUrl from '../apiConfig'
import axios from 'axios'
import Songs from './Songs'
import CreateForm from './CreateForm'
// import Faves from './Faves'

function PlaylistContainer(props) {
    const [songs, setSongs] = useState([])
    const [faves, setFaves] = useState([])
    const [input, setInput] = useState({ title: "", time: "", artist: "" });
    const [item, setItem] = useState(null);

console.log(apiUrl)

    useEffect(() => {
      const makeAPICall = async () => {
        try {
          const response = await axios(`${apiUrl}/songs`)
          setSongs(response.data)
          console.log(response.data)
        } catch (err) {
          console.error(err)
        }
      }
      makeAPICall()
    }, [])

    const handleChange = (event) => {
        console.log("event", event.target.name, event.target.value);
        setInput({
          ...input,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = (event) => {
  
        event.preventDefault();
    
        console.log("handleSubmit");
        axios({
          url: `${apiUrl}/songs`,
          method: "POST",
          data: input,
        })
          .then((res) => {
              setItem({ createdItem: res.data.item })
            })
          .catch(console.error);
      };

    useEffect(() => {
        const makeAPICall = async () => {
          try {
            const response = await axios(`${apiUrl}/songs/faves`)
            setFaves(response.data)
            console.log(response.data)
          } catch (err) {
            console.error(err)
          }
        }
        makeAPICall()
      }, [])

    console.log(songs)

        // useEffect(() => {
        //     const makeAPICall = async () => {
        //       try {
        //         const response = await axios(`${apiUrl}/songs/${song.id}/fav`)
        //         setFaves(response.data)
        //         console.log(response.data)
        //       } catch (err) {
        //         console.error(err)
        //       }
        //     }
        //     makeAPICall()
        //   }, [])

    let songList = songs.map(song =>

         (<li key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.time}</p>
            <p>{song.artist}</p>
            {/* <button onClick={toggleFave}>Add to Favorites</button> */}
        </li>
    ))

    let favesList = faves.map(song => (

        <li key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.time}</p>
            <p>{song.artist}</p>
        </li>
    ))

  return (
    <div className="playlist-container">
        <h1>Playlist</h1>
        <ul>{songList}</ul>
        {/* <Songs songs={songs}/> */}
        <button>Add a Song</button>
        <h1>Favorites</h1>
        <ul>{favesList}</ul>
        {/* <Faves faves={faves}/> */}
        <CreateForm 
            item={input}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    </div>
  );
}

export default PlaylistContainer;