import axios from 'axios';
import React, {useEffect , useRef, useState} from 'react'
import "./Spotify.css"
import { reducerCases } from '../statemanager/Constants';
import { useStateProvider } from '../statemanager/StateProvider';
import Body from './Body';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Spotify() {
    const [{token} , dispatch] = useStateProvider()
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false)
    const [headerBackground, setHeaderBackground] = useState(false)
    const bodyScroll =() => {
      bodyRef.current.scrollTop >= 30
      ? setNavBackground(true) 
      : setNavBackground(false)
      bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true) 
      : setHeaderBackground(false)
    }


    useEffect(()=>{
        const getUserinfo =  async() =>{
            const {data} = await axios.get("https://api.spotify.com/v1/me", {
                headers :{
                    Authorization : 'Bearer ' + token,
                    'Content-Type': "application/json",
                },
            });
            console.log({data})
            const userInfo = {
                userId :data.id,
                userUrl: data.external_urls.spotify,
                name : data.display_name,
            };
            dispatch({type : reducerCases.SET_USER_INFO, userInfo})
        };
        getUserinfo();
    } ,[token, dispatch])

    useEffect(() =>{
      const getPLaybackState =async () =>{
        const {data} = await axios.get("https://api.spotify.com/v1/me/player",{
          headers :{
            Authorization : 'Bearer ' + token,
            'Content-Type': "application/json",
        },
        
        });
        console.log('this dta', {data})
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState : data.is_playing
        });
      };
      getPLaybackState();
    },[dispatch,token])
  return (
    <div className='container'>
      <div className="spotify_body">
        <Sidebar/>
        <div className="body" ref={bodyRef} onScroll={bodyScroll}>
            <Navbar navBackground={navBackground} />
            <div className="body_contents">
                <Body headerBackground={headerBackground} />
            </div>     
        </div>
      </div>
      <div className="spotify_footer">
        <Footer/>
      </div>
    </div>
  )
}


