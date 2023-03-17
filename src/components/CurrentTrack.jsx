import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../statemanager/StateProvider";
import { reducerCases } from "../statemanager/Constants";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentlyPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_CURRENTPLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_CURRENTPLAYING, currentlyPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track_image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track_info">
            <h4 >{currentlyPlaying.name}</h4>
            <h6>
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
.track{
    display : flex ;
    align-items: center;
    gap: 0.5rem;
    &__info{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
}
.track_image{
    height: 60px;
    width: 60px;
    margin-right: 10px;
    object-fit: contain;
    margin-left: 10px;
    margin-bottom: 10px;
}
.track_info{
    h4{
        color  : white ;
        margin-bottom: 5px;
        padding-bottom: 3px;
        font-size: 14px;
    }
    h6{
        color : #b3b3b3;
        font-size: 12px;
    }
    
}


`
