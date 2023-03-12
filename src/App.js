import React, {useEffect} from 'react'
import Login from './components/Login'
import Spotify from './components/Spotify'
import { reducerCases } from './statemanager/Constants'
import { useStateProvider } from './statemanager/StateProvider'

export default function App() {
  const [{token}, dispatch ] = useStateProvider()

  useEffect(() => {
    const hash = window.location.hash
    console.log(hash)
    if(hash) {
      const token =hash.substring(1).split('&')[0].split('=')[1];
      console.log(token)
      dispatch({type: reducerCases.SET_TOKEN, token})
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

