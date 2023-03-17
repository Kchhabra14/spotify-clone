import React from 'react'
import styled from 'styled-components'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Playlists from './Playlists'

export default function Sidebar() {
  return (
    <Container>
        <div className="top_links">
            <div className="logo">
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' 
             alt='spotify' />
            </div>
            <ul>
                <li>
                    <HomeOutlinedIcon/>
                    <span>Home</span>
                </li>
                <li>
                    <SearchIcon/>
                    <span>Search</span>
                </li>
                <li>
                    <LibraryMusicIcon/>
                    <span>Your Library</span>
                </li>
            </ul>
        </div>
        <br/>
        <strong className="sidebar_title">PLAYLISTS</strong>
        <hr/>
        <Playlists/>
    </Container>
  )
}
const Container = styled.div`
background-color : black;
color: #b3b3b3;
display: flex;
flex: 0.2;
padding-left: 10px;
padding-right: 10px;
flex-direction: column;
height: 100vh;
width: 100%;
/* min-width: 230px; */
.top_links{
    display: flex;
    flex-direction: column;
}
.logo{
    text-align: center;
    margin: 1rem 0;
    img{
        margin-right: auto;
        height: 70px;
        padding: 8px;
    }
}
ul{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    li{
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 200ms color ease-in;
        &:hover{
            color: white;
        }
    }
}
.sidebar_title{
    padding: 5px;
    margin-left: 10px;
    font-size: 12px;
}
hr{
    border: 1px solid #282828;
    width: 90%;
    margin: 10px auto;
}
`;

