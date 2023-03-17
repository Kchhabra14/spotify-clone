import React  from 'react'
import { useStateProvider } from '../statemanager/StateProvider';
import axios from 'axios';
import { reducerCases } from '../statemanager/Constants';
import CurrentTrack from './CurrentTrack';
import "./footer.css"
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';



export default function Footer() {
 
const [{token, playerstate}, dispatch] = useStateProvider();

const changeState = async() =>{
  const state = playerstate ? "pause" : "play";
  await axios.put(
    `https://api.spotify.com/v1/me/player/${state}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  dispatch({
    type : reducerCases.SET_PLAYER_STATE,
    playerstate : !playerstate,
  });
};

const changeTrack = async(type) =>{
  await axios.post(
    `https://api.spotify.com/v1/me/player/${type}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
      
  );
  dispatch({
    type : reducerCases.SET_PLAYER_STATE,
    playerstate : true,
  });
  const response1 = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (response1.data !== "") {
    const currentlyPlaying = {
      id: response1.data.item.id,
      name: response1.data.item.name,
      artists: response1.data.item.artists.map((artist) => artist.name),
      image: response1.data.item.album.images[2].url,
    };
    dispatch({ type: reducerCases.SET_CURRENTPLAYING, currentlyPlaying });
  } else {
    dispatch({ type: reducerCases.SET_CURRENTPLAYING, currentlyPlaying: null });
  }
};
  


  return (
    <div className='footer'>
      <div className="footer_left">
       <CurrentTrack/>
      </div>
      
      <div className="footer_center">
        <ShuffleIcon className='footer_green'/>
        <SkipPreviousIcon onClick={()=> changeTrack("previous")} className='footer_icon'/>
        <div className='footer_icon_middle'>
          {playerstate ? (
            <PauseCircleFilledIcon onClick={changeState}/>
          ) : (
            <PlayCircleFilledIcon onClick={changeState}/>
          )}
        </div>
        <SkipNextIcon  onClick={()=> changeTrack("next")} className='footer_icon'/>
        <RepeatIcon className='footer_green'/>
      </div>

      <div className='footer_right'>
      <Grid container spacing={2}>
        <Grid item>
          <QueueMusicIcon/>
        </Grid>
        <Grid item>
          <VolumeDown/>
        </Grid>
        <Grid item xs>
          <Slider aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
      </div>
    
    </div>
  )
}
