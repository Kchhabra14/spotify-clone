import axios from 'axios';
import React, {useEffect} from 'react'
import styled from "styled-components";
import { reducerCases } from '../statemanager/Constants';
import { useStateProvider } from '../statemanager/StateProvider';
import Body from './Body';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Spotify() {
    const [{token} , dispatch] = useStateProvider()
    useEffect(()=>{
        const getUserinfo =  async() =>{
            const {data} = await axios.get("https://api.spotify.com/v1/me", {
                headers :{
                    Authorization : 'Bearer' + token,
                    'Content-Type': "application/json",
                },
            });
            console.log({data})
            const userInfo = {
                userId :data.id,
                userName : data.display_name,
            };
            dispatch({type : reducerCases.SET_USER, userInfo})
        };
        getUserinfo();
    } ,[token, dispatch])
  return (
    <Container>
      <div className="spotify_body">
        <Sidebar/>
        <div className="body">
            <Navbar/>
            <div className="body_contents">
                <Body/>
            </div>     
        </div>
      </div>
      <div className="spotify_footer">
        <Footer/>
      </div>
    </Container>
  )
}

const Container = styled.div`
max-width: 100vw;
max-height: 100vh;
overflow: hidden;
display : grid;
grid-template-rows : 85vh 15vh;
.spotify_body{
    display: grid;
    grid-template-columns :  15vw 85vw;
    height :  100%;
    width : 100%;
    background : linear-gradient(transparent , rgba(0,0,0,1));
    background-color : rgb(32, 87, 100);
}
.body{
    height: 100%;
    width: 100%;
    overflow :  auto;
}
`;