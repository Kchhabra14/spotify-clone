import React, {useEffect} from 'react'
import Login from './components/Login'
import Spotify from './components/Spotify'
import { useStateProvider } from './statemanager/StateProvider'
import { getTokenFromResponse } from './components/Login'
import SpotifyWebApi from "spotify-web-api-js"

const spotify = new SpotifyWebApi()

export default function App() {
  const [{token}, dispatch ] = useStateProvider()

  useEffect(() => {
    
    const hash = getTokenFromResponse();
    window.location.hash ="";
    console.log(hash)
    let _token = hash.access_token

    if(_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type:"SET_USER",
          user: user,
         });
      });
       
      
    }

  }, [token, dispatch])
  // so whenever dependencies token and disptach are changed, the useEffect will re-run

  return (
    <div>
      {
        token ? <Spotify/> : <Login/>
      }
      
    </div>
  )
}

