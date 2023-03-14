import React, {useEffect} from 'react'
import styled from 'styled-components'
import {AiFillClockCircle}  from 'react-icons/ai'
import { useStateProvider } from '../statemanager/StateProvider'
import axios from 'axios'
import { reducerCases } from '../statemanager/Constants'

export default function Body() {
  const [{token , selectedPlaylistId , selectedPlaylist} , dispatch] = useStateProvider()
  console.log("Hello world");
  useEffect(() =>{ 
    const getInitialplaylist = async() =>{
      console.log(selectedPlaylistId, "this id");
      const response = await axios.get(`https://api.spotify.com/v1/playlists/0Ryai7BcyDRRJooKqqMIjz`, {
        headers :{
          Authorization : 'Bearer ' + token,
          'Content-Type': "application/json",
      },
      });

      console.log(response, " this response")
      const selectedPlaylist = {
        id : response.data.id,
        name : response.data.name,
        description : response.data.description.startsWith('<a') 
        ?  "" : response.data.description,
        images : response.data.images[0].url,
        tracks : response.data.tracks.items.map(({track}) => ({
          id : track.id,
          name : track.name,
          artists : track.artists.map((artist) => artist.name),
          image : track.album.images[2].url,
          duration : track.duration_ms,
          album : track.album.name,
          context_uri : track.context_uri,
          track_number : track.track_number,
        }))
      }
      console.log(selectedPlaylist.images);
//if description starts with anchor tag, then give "" empty string otherwise return
// response.data.description
      console.log(response.data )
      dispatch({type : reducerCases.SET_PLAYLIST, selectedPlaylist})
    }  
    getInitialplaylist()
  } , [token, dispatch , selectedPlaylistId])
  return (
    <Container>
      {
        selectedPlaylist && (
          <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.images} alt='selectedimage' />
            </div>
            <div className="details">
              <span className='type'> PLAYLIST</span>
              <h1 className='title'>{selectedPlaylist.name}</h1>
              <p className='description'>{selectedPlaylist.description}</p>
            </div>

            <div className="list">
              <div className="header_row">
                <div className="col">
                  <span>#</span>
                </div>
                <div className="col">
                  <span>TITLE</span>
                </div>
                <div className="col">
                  <span>ALBUM</span>
                </div>
                <div className="col">
                  <span><AiFillClockCircle/></span>
                </div>
              </div>
            </div>
            
            <div className="tracks">
              {selectedPlaylist.tracks.map(({
                id,
                name,
                artists,
                image, 
                duration,
                album,
                context_uri,
                track_number,
              }, index) => {
                return(
                  <div className='row' key={id}>
                    <div className="col">
                      <span>
                        {index+1}
                      </span>
                    </div>
                    <div className="col_detail">
                      <div className="image">
                        <img src={image} alt="track"/>
                      </div>
                      <div className="info">
                        <span className='name'>{name}</span>
                        <span>{artists}</span>
                      </div>
                    </div>
                    <div className="col">
                      <span>{album}</span>
                    </div>
                    <div className="col">
                      <span>{duration}</span>
                    </div>
                    
                  </div>
                )
              })}
            </div>
          </div>
          </>
        )
      }
    </Container>
  )
}

const Container  = styled.div `
.playlist{
  margin: 0.2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  .image{
    img{
      height:15rem ;
    }
  }
}
`;
