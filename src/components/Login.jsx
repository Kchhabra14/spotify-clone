import React from 'react';
import styled from "styled-components";


    
      const clientId = "4d95ba87aa5e4d63b82f48898cefc90f";
      const redirectUrl = "http://localhost:3000/";
      const apiUrl = "https://accounts.spotify.com/authorize";
      const scope = [
        'user-read-email',
        'user-read-private', 
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-read-playback-position',
        'user-top-read',
        'user-read-recently-played'
      ];

      export const getTokenFromResponse =() => {
        return window.location.hash.substring(1).split("&").reduce((initial, item) => {
          var parts =item.split("=");
          initial[parts[0]]= decodeURIComponent(parts[1]);

          return initial;
        }, {}); 
      }
      const accessUrl = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
        "%20"
        )}&response_type=token&show_dialogue=true`;


export default function Login() {
  return (
    <Container>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' 
        alt='spotify' />
        <a href={accessUrl}>
        <button >Connect Spotify</button>
        </a>
    </Container>
  )
};

const Container = styled.div`
display : flex;
flex-direction : column;
align-items : center;
justify-content : center;
height : 100vh;
width : 100vw;
background-color : #1db954;
gap : 5rem;
img {
    height : 20vh;
}
button{
    padding : 1rem 5rem;
    border-radius: 5rem;
    border : none;
    background-color : black ;
    color : #49f585;
    font-size : 1.4rem;
    cursor : pointer;
}
`;
